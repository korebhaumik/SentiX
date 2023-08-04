import { StreamingTextResponse, LangChainStream } from "ai";
import {} from "openai-edge";
import { OpenAIChat } from "langchain/llms/openai";
import {
  PromptTemplate,
  FewShotPromptTemplate,
  LengthBasedExampleSelector,
  BaseExampleSelector,
} from "langchain/prompts";

import { Message } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages }: { messages: Message[]; config: string } =
    await req.json();
  const tweet =
    messages.at(-1)?.role === "user" ? messages.at(-1)?.content : "";
  // console.log("tweet", tweet);
  const { stream, handlers } = LangChainStream();

  const llm = new OpenAIChat({
    streaming: true,
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
  });

  const examplePrompt = new PromptTemplate({
    inputVariables: ["input", "output"],
    template: "Input: {input}\nOutput: {output}",
  });

  const exampleSelector = await LengthBasedExampleSelector.fromExamples(
    [
      {
        input: "I hate the movie Tenet.",
        output: `The sentiment in the above tweet is predominantly negative.\nThe subject emotion attached is hate and the subject is the movie Tenet.`,
      },
      {
        input: "I love watching movies, but i absolutely hate horror movies.",
        output: `The sentiment in the above tweet is positive for watching movies but negative for horror movies.\nThe sentiment analysis reveals that the subject "watching movies" is associated with the emotion of "love," while the subject "horror movies" is associated with the emotion of "hate"`,
      },
      {
        input: "I hate video games, especially the violent ones.",
        output: `The sentiment in the above tweet is negative for video games.\nThe sentiment analysis indicates that the subject "video games" is associated with the emotion of "hate," and specifically, the subject "violent ones" is also associated with the emotion of "hate."`,
      },
    ],
    {
      examplePrompt,
    }
  );
  const dynamicPrompt = new FewShotPromptTemplate({
    exampleSelector,
    examplePrompt,
    prefix: "Give the antonym of every input",
    suffix: "Input: {tweet}\nOutput:",
    inputVariables: ["tweet"],
  });

  const formattedPrompt = await dynamicPrompt.format({ tweet });

  llm.call(formattedPrompt, {}, [handlers]).catch(console.error);
  return new StreamingTextResponse(stream);
}
