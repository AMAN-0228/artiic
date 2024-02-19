import { useEffect, useState } from 'react'
import { Container, NoDataTag, SinglePost } from '../components';
import appwriteService from '../appwrite/config';

const Home = () => {
  const [posts, setPosts] = useState([]);
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
    return <NoDataTag className='my-10 text-xl font-bold'> No posts </NoDataTag>
    // return <div className='text-center'>No posts</div>

  return (
    <div>
      <Container>
        {
          posts && 
          posts?.map((post) => (            
            // {post card}
            <SinglePost post={post} key={post.$id} />
          )) 
        }
      </Container>
    </div>
  )
}

export default Home
