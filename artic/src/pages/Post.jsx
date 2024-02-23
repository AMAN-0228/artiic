import  { useEffect, useState } from 'react'
import {  Container, SinglePost } from '../components';
import {  useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';

const Post = () => {
    const { slug } = useParams();
    const [post, setPost] = useState('');
    const loadPost = async() => {
      try {
        const data = await appwriteService.getPostBySlug(slug)
        setPost(data)
      } catch (error) {
        console.log(error)
      }
    }

    
    useEffect(() => {
        loadPost()
    },[slug])
  return (
    <div className='w-full py-4'>
      <Container >
      <SinglePost post={post}  />
      </Container>
    </div>
  )
}

export default Post
