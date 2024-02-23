import  { useEffect, useState } from 'react'
import { Button, Container, SinglePost } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { useSelector } from 'react-redux';

const Post = () => {
    const { slug } = useParams();
    const navigate = useNavigate()
    const [post, setPost] = useState('');
    const userData = useSelector(state => state.auth.userData)
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
    <div className='w-full px-3'>
      <Container className='flex '>
        {/* left section (post) */}
        <div className='w-3/4'>
      <SinglePost post={post}  />          
        </div>

      {/* right section (list of posts) */}
      <div className='pl-5 w-1/4 '>
        {
          userData && userData?.$id === post?.userId &&
        <div className='text-center flex  flex-wrap gap-2 md:ml-10 w-full  h-14'>{}
        </div>
        }
      </div>

      </Container>
    </div>
  )
}

export default Post
