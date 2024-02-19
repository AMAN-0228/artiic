import React, { useEffect, useState } from 'react'
import { SinglePost } from '../components';
import { useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';

const Post = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    useEffect(() => {
        appwriteService.getPostBySlug(slug)
        .then((post)=>{
            setPost(post)
        })
    })
  return (
    <>
      <SinglePost post={post} />
    </>
  )
}

export default Post
