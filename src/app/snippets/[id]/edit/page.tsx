import SnippetEditForm from "@/components/SnippetForm";
import { db } from "@/db"
import { notFound } from "next/navigation";

interface SnippetEditPageProps{
    params : Promise<{
        id : string
    }>
}


export default async function snippetEditPage(props : SnippetEditPageProps){ 
    
        const { id } = await props.params ;
        const snippet = await db.snippet.findFirst({
            where : { id : parseInt(id)}
        }) 

        if(!snippet){
          return  notFound();
        }
    return (
        <> 
            <SnippetEditForm snippet={snippet} />
        </>
    )
}