import { StreamingTextResponse, LangChainStream } from "ai";
import {} from "openai-edge";
import { OpenAIChat } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { Message } from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RetrievalQAChain } from "langchain/chains";

export const runtime = "edge";

export async function POST(req: Request) {
  //   const { tweet } = await req.json();
  const { messages }: { messages: Message[] } = await req.json();
  const handle =
    messages.at(-1)?.role === "user" ? messages.at(-1)?.content : "";
  console.log("handle", handle);
  const { stream, handlers } = LangChainStream();

  if(handle !== "scotthamilton") return new Response(`Regrettably, due to the constraints imposed by the new Twitter policy, my access to user handles is restricted.\nKindly attempt your request again using the user handles outlined in the Readme.md.`);

  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY as string,
    environment: process.env.NEXT_PUBLIC_PINECONE_ENVIRONMENT as string,
  });
  const pineconeIndex = client.Index("bankathon-dev");
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY as string,
      modelName: "text-embedding-ada-002",
    }),
    { pineconeIndex }
  );

  const model2 = new ChatOpenAI({
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY as string,
    modelName: "gpt-3.5-turbo",
    streaming: true,
  });

  const retriever = vectorStore.asRetriever(10, {
    handle: {
      $eq: handle,
    },
  });

  const chain = RetrievalQAChain.fromLLM(model2, retriever);
  chain
    .call(
      {
        query: `do sentimental analysis for the following tweets.`,
      },
      [handlers]
    )
    .catch(console.error);

  //   llm.call(formattedPrompt, {}, [handlers]).catch(console.error);
  return new StreamingTextResponse(stream);
}
