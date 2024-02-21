import  { useEffect, useState } from 'react'
import {Container, NoDataTag, PostCard, SinglePost} from '../components/index'
import appwriteService from '../appwrite/config'
import {  useNavigate } from 'react-router-dom'

const AllPost = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        
        appwriteService.getPosts([])
          .then((posts) => {
            console.log(posts)
         if(posts){
                        setPosts(posts.documents)
            }
          })
    },[])

    if(posts.length === 0)
    return <NoDataTag> No posts </NoDataTag>
    // return <div className='text-center'>No posts</div>

  return (
    <div>
      <Container>
        <div className='flex flex-wrap justify-evenly md:grid md:grid-cols-2 gap-6'>

        {
          posts && 
          posts?.map((post) => (            
            // {post card}
            <PostCard post={post} key={post.$id} className='hover:cursor-pointer hover:scale-90' onClick={() => navigate(`/post/${post.$id}`)} />
            // <SinglePost post={post} key={post.$id} className='hover:cursor-pointer' onClick={() => navigate(`/post/${post.$id}`)}/>
            )) 
          }
          </div>
      </Container>
    </div>
  )
}

export default AllPost
