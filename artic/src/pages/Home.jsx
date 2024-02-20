import { useEffect, useState } from 'react'
import { Container, NoDataTag, SinglePost } from '../components';
import appwriteService from '../appwrite/config';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        appwriteService.getPosts([])
          .then((posts) => {
            console.log(posts)
         if(posts){
           const fileId = posts.documents[0].featuredImage
           const file = appwriteService.getFilePreview(fileId)
           console.log(file)
           posts.documents[0].featuredImage = file
             setPosts(posts.documents)
         }
          })
          .finally(() => setLoading(false))
    },[])

    if(loading)
    return (
  <NoDataTag>
      <div className="text-3xl text-center font-semibold h-screen">
        Loading...
        
      </div>
  </NoDataTag>
    );

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
            <SinglePost post={post} key={post.$id} className='my-4' />
          )) 
        }
      </Container>
    </div>
  )
}

export default Home
