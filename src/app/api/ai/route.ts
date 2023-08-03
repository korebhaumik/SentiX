import { StreamingTextResponse, LangChainStream } from "ai";
import {} from "openai-edge";
import { OpenAIChat } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { Message } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  //   const { tweet } = await req.json();
  const { messages }: { messages: Message[] } = await req.json();
  const tweet = messages.at(-1)?.role === "user" ? messages.at(-1)?.content : "";
  console.log("Backend", tweet);
  const { stream, handlers } = LangChainStream();

  const llm = new OpenAIChat({
    streaming: true,
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
  });
  const oneInputPrompt = new PromptTemplate({
    inputVariables: ["tweet"],
    template:
      `Do sentimental Analysis on the following text and give the subject that is liked or hated : {tweet}
      Example,

      Input: "I hate the movie Tenet".
      Output: "The sentiment in the above tweet is predominantly negative.\n The subject emotion attached is hate and the subject is the movie Tenet".

      Input: "I love watching movies, but i absolutely hate horror movies.".
      Output: "The sentiment in the above tweet is positive for watching movies but negative for horror movies.\n  The sentiment analysis reveals that the subject "watching movies" is associated with the emotion of "love," while the subject "horror movies" is associated with the emotion of "hate"".
      
      Input: "I hate video games, especially the violent ones.".
      Output: "The sentiment in the above tweet is negative for video games.\n  the sentiment analysis indicates that the subject "video games" is associated with the emotion of "hate," and specifically, the subject "violent ones" is also associated with the emotion of "hate."`,
  });
  const formattedPrompt = await oneInputPrompt.format({
    tweet,
  });

  llm.call(formattedPrompt, {}, [handlers]).catch(console.error);
  return new StreamingTextResponse(stream);
}
