'use server';
import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


interface FormState {
    message ?: string ;
    errors ?: {
      title ?:string;
      code ?:string;
    }
  }
export async function editSnippet(id : number , code : string){ 
    await db.snippet.update({
        where : { id } , 
        data : { code}
    }) 
    revalidatePath(`/snippets/${id}`)
    redirect(`/snippets/${id}`)
} 

export async function deleteSnippet( id : number){ 
    await db.snippet.delete({where : { id }})
    revalidatePath('/')
    redirect('/')
} 

export async function createSnippet (formState : FormState ,formData : FormData){ 
    try{
        const title = formData.get('title') ;
        const code = formData.get('code') ;
        const errors : FormState["errors"] = { };
    if(typeof title !== 'string'  || title.length <3  || !title) {
        errors.title = "title needs to be greater that 3 characters ";
    }
    if(typeof code !== 'string'  || code.length <3 || !code) {
        errors.code ="code needs to be greater than 3 characters";
    } 

    if(errors.title || errors.code ){
        return { 
            errors 
        }
    }
   await db.snippet.create({
        data :{
            title : title as string ,
            code : code as string
        } 
    })   
   

    }catch(err : unknown){
        if(err instanceof Error){
            return { message : err.message}
        } else 
        return { message : "some unexpected error happened"}
    }
    
    revalidatePath('/')
    redirect('/')
   
}