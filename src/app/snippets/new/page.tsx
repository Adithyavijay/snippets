'use client'
import * as actions from '@/actions';
import { useActionState ,startTransition} from "react";


interface FormState {
  message ?: string ;
  errors ?: {
    title ?:string;
    code ?:string;
  }
}

export default function SnippetsPage(){  
    
  const [formState , action] = useActionState<FormState ,FormData>(actions.createSnippet , { }) 
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
        { formState.errors?.title && <div className='text-red-500'>{formState.errors.title}</div>}
        <div className="flex gap-4 items-center">
        <label className="w-12">Code</label>
        <textarea
        id="code"
        name="code"
        className="border rounded p-2 w-full"
        />
        </div> 
        { formState.errors?.code && <div className='text-red-500'>{formState.errors.code}</div>}
      
    <button type="submit" className="rounded p-2 bg-green-200">
        Create
    </button> 
    { formState && (<div className='text-green-500'> { formState.message}</div>)}
        </form>
        </div>
    ) 
} 

