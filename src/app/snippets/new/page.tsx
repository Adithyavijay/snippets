'use client'
import * as actions from '@/actions';
import { useActionState ,startTransition} from "react";


export default function SnippetsPage(){  
    
  const [formState , action] = useActionState(actions.createSnippet , { message : ""}) 
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    startTransition(async()=>{ 
      const formData = new FormData(e.currentTarget)
      await action(formData)
    })
  }
    
  return (
        <div className="">
        <h1 className="font-bold text-2xl mb-4 ">Create Snippets</h1> 
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <div className="flex gap-4  items-center">
        <label className="w-12">Title</label>
        <input  type="text"
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
        { formState && (<div> { formState.message}</div>)}
    <button type="submit" className="rounded p-2 bg-green-200">
        Create
    </button> 
  
        </form>
        </div>
    )
}