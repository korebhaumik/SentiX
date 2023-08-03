import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QueryBar from "@/components/QueryBar";
import Result from "@/components/ui/Result";
import { AiContextProvider } from "@/context/Ai.context";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Hero />
      <AiContextProvider>
        <QueryBar />
        <Result />
      </AiContextProvider>
    </main>
  );
}
