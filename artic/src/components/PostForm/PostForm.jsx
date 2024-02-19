import  { useEffect, useState } from 'react'
import {Input, Button, RTE, Select} from '../index'
import { useForm } from 'react-hook-form' 
import appwriteService from '../../appwrite/config.js'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostForm = ({post}) => {

  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('');
  const userData = useSelector(state => state.auth.userData)

    const {register, handleSubmit, watch, setValue, control, getValues, formState:{errors}} = useForm({
      defaultValues:{
        title:post?.title|| '',
        slug:post?.$id|| '',
        featureImage:post?.featureImage|| '',
        content:post?.content|| '',
        status:post?.status|| 'active',
      }
    })

    
    const submit = async(data)=>{
      try {
        if(post){
          const {title, featureImage, content, status} = data
          const deletedFile = await appwriteService.deleteFile(post?.featureImage)
          if(!deletedFile){
            setErrorMsg('image change failed, please try again')
            return
          }
          const file = await appwriteService.fileUpload(data?.featureImage[0])
          if(!file){
            setErrorMsg('image upload failed, please try again')
            return
          }
          data.featureImage = file?.$id
          // update
          const res = await appwriteService.updatePost(post?.$id, {title,featureImage,content, status})
          if(res){
            console.log("res",res)
            navigate('/post/'+data?.$id)
          }
        }
        else{
          // create
          const file = await appwriteService.fileUpload(data?.featureImage[0])
          if(!file){
            setErrorMsg('image upload failed, please try again')
          }
          const fileId = file?.$id
          data.featureImage = fileId
          const res =await appwriteService.createPost({...data},userData?.$id)
          if(res){
            console.log("res",res)
            navigate('/post/'+data?.slug)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    const subscribe = watch((value,{name}) => {
        if(name==='title'){
            setValue("slug", value.title.toLowerCase().replaceAll(' ', '-'), { shouldValidate: true })
            console.log("object", value.title.toLowerCase().replaceAll(' ', '-'))
        }
    })
    return () => {
      subscribe.unsubscribe()
    }
  },[watch,setValue])
  return (
    <div>
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">

      <div className="w-2/3">
        <Input  label="Title" name="title" {...register("title",{required: true})} placeholder="Title" />
        <Input  label="Slug" name="slug" {...register("slug",{required: true})} disabled onInput={(e) => setValue("slug", e.currentTarget.value, { shouldValidate: true })} placeholder="Slug" />
        <RTE name="content" control={control} defaultValue={post?.content}/>
        {/* <RTE name="content" control={control} defaultValue={getValues('content')}/> */}
      </div>
      <div className="w-1/3">
        <Input type="file" label="Image" name="featureImage" {...register("featureImage",{required: true})} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
        <Select label={"Status"} name="status" {...register("status",{required: true})} options={['active', 'inactive']} />
      </div>

        <Button className={"mt-6"}>{post ? 'Update Post' : 'Create Post'}</Button>
        </form>
    </div>
  )
}

export default PostForm
