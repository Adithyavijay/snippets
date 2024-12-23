import { db } from "@/db";
import Link from "next/link"; 

export default async function Home() { 
  const snippets = await db.snippet.findMany();
  const renderedSnippets = await snippets.map((snippet) => {
    return (
      <div
        className="p-2 text-2xl flex justify-between border border-black"
        key={snippet.id}
      >
        <div>{snippet.title}</div>
        <Link href={`/snippets/${snippet.id}`}>view</Link>
      </div>
    );
  });
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <div className="flex justify-between">
        <h1 className="text-2xl">Snippets</h1>
        <Link className="text-2xl border p-2 m-2 border-black" href={"/snippets/new"}>
          new
        </Link>
      </div>
      <div className="flex flex-col gap-y-2 ">{renderedSnippets}</div>
    </div>
  );
}
