import { db } from "@/db"
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteSnippet } from "@/actions";


interface showSnippetPageProps {
    params : Promise<{id : string }>
}

export default async function showSnippetPage(props: showSnippetPageProps ){
    const {id } = await props.params ;
    await new Promise( (r)=> setTimeout(r , 2000))

    const snippet = await db.snippet.findFirst({
        where : { 
            id : parseInt(id)
        }
    }) 
  
    if(!snippet){
        return notFound();
    }

    const deleteSnippetAction = deleteSnippet.bind(null , snippet.id )

    return ( 
        <div> 
            <div className="flex justify-between items-center m-4">
                <h1 className="font-bold text-2xl">  { snippet?.title}</h1>
                <div className="flex gap-4">
                    <Link href={`/snippets/${snippet.id}/edit`} className="border p-2 text-2xl">Edit</Link>
                   <form action={deleteSnippetAction}><button className="border p-2 text-2xl">Delete</button></form>

                </div>
            </div>
            <pre className="bg-gray-200 p-4 rounded-md border-gray-200">
                <code>
                    {snippet.code}
                </code>
            </pre>
        </div>
    )
}


export async function generateStaticParams(){

    const snippets = await db.snippet.findMany();
    console.log(snippets)
    return snippets.map((snippet)=>{
      return { 
        id : snippet.id.toString()
      }
    })
  }