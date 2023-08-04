import { StreamingTextResponse, LangChainStream } from "ai";
import {} from "openai-edge";
import { OpenAIChat } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { Message } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  //   const { tweet } = await req.json();
  const { messages }: { messages: Message[] } = await req.json();
  const hashtag = messages.at(-1)?.role === "user" ? messages.at(-1)?.content : "";
  console.log("hashtag", hashtag);
  const { stream, handlers } = LangChainStream();

  const llm = new OpenAIChat({
    streaming: true,
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
  });
  const oneInputPrompt = new PromptTemplate({
    inputVariables: ["hashtag"],
    template:
      `Give me general sentiment around the hashtag: {hashtag}"
      `
  });
  const formattedPrompt = await oneInputPrompt.format({
    hashtag,
  });

  llm.call(formattedPrompt, {}, [handlers]).catch(console.error);
  return new StreamingTextResponse(stream);
}