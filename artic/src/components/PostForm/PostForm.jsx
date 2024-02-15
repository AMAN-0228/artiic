import React, { useEffect } from 'react'
import {Input, Button, RTE} from '../index'
import { useForm } from 'react-hook-form'

const PostForm = ({post}) => {
    const {register, handleSubmit, watch, setValue, control, getValues, formState:{errors}} = useForm({
      defaultValues:{
        title:post?.title|| '',
        slug:post?.slug|| '',
        featureImage:post?.featureImage|| '',
        content:post?.content|| '',
        status:post?.status|| 'active',
      }
    })

  useEffect(() => {
    const subscribe = watch((value,{name}) => {
      console.log(value, name)
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
        <form onSubmit={handleSubmit((data) => console.log(data))}>

      <div className="w-2/3">
        <Input  label="Title" name="title" {...register("title",{required: true})} placeholder="Title" />
        <Input  label="Slug" name="slug" {...register("slug",{required: true})} onInput={(e) => setValue("slug", e.currentTarget.value, { shouldValidate: true })} placeholder="Slug" />
        <RTE name="content" control={control} defaultValue={post?.content}/>
      </div>
      <div className="w-1/3">
        <Input type="file" label="Image" name="featureImage" {...register("featureImage",{required: true})}/>
      </div>
        <Button>{post ? 'Update Post' : 'Create Post'}</Button>
        </form>
    </div>
  )
}

export default PostForm
