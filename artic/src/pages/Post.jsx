import  { useEffect, useState } from 'react'
import {  Container, SinglePost } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { useSelector } from 'react-redux';

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
    <div className='w-full '>
      <Container >
      <SinglePost post={post}  />
      </Container>
    </div>
  )
}

export default Post
