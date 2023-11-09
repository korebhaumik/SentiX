import { StreamingTextResponse, LangChainStream } from "ai";
import {} from "openai-edge";
import { OpenAIChat } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { Message } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  //   const { tweet } = await req.json();
  const { messages }: { messages: Message[] } = await req.json();
  const content = messages.at(-1)?.role === "user" ? messages.at(-1)?.content : "";

  const { handle, tweets } = JSON.parse(content as string);
  console.log("hashtag", tweets);
  const { stream, handlers } = LangChainStream();

  const llm = new OpenAIChat({
    streaming: true,
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
  });
  const oneInputPrompt = new PromptTemplate({
    inputVariables: ["tweets", "handle"],
    template:
      `The following are the tweets of the user "{handle}": "{tweets}"
      Give the sentiment analysis of the above tweets.
      `
  });
  const formattedPrompt = await oneInputPrompt.format({
    tweets,
    handle
  });

  llm.call(formattedPrompt, {}, [handlers]).catch(console.error);
  return new StreamingTextResponse(stream);
}