import {db} from '@/db'
import { redirect } from 'next/navigation';

export default function SnippetsPage(){  

    async function createSnippet (formData : FormData){
        'use server';
        const title = formData.get('title') as string;
        const code = formData.get('code') as string;
        
       await db.snippet.create({
            data :{
                title : title ,
                code : code 
            }
        }) 
        redirect('/')
    }
    return (
        <div className="">
        <h1 className="font-bold text-2xl mb-4 ">Create Snippets</h1> 
        <form action={createSnippet} className="flex flex-col gap-y-4">
        <div className="flex gap-4  items-center">
        <label className="w-12">Title</label>
        <input type="text"
        name="title"
        id="title"
        className="border rounded p-2 w-full"
        />
        </div>
        <div className="flex gap-4 items-center">
        <label className="w-12">Code</label>
        <textarea
        id="code"
        name="code"
        className="border rounded p-2 w-full"
        />
        </div> 
    <button type="submit" className="rounded p-2 bg-green-200">
        Create
    </button>
        </form>
        </div>
    )
}