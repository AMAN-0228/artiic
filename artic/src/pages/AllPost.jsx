import  { useEffect, useState } from 'react'
import {Container, NoDataTag, SinglePost} from '../components/index'
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
            const fileId = posts.documents[0].featuredImage
            const file = appwriteService.getFilePreview(fileId)
            if(file){
              posts.documents[0].featuredImage = file
              setPosts(posts.documents)
            }
         }
          })
    },[])

    if(posts.length === 0)
    return <NoDataTag> No posts </NoDataTag>
    // return <div className='text-center'>No posts</div>

  return (
    <div>
      <Container>
        {
          posts && 
          posts?.map((post) => (            
            // {post card}
            <SinglePost post={post} key={post.$id} className='hover:cursor-pointer' onClick={() => navigate(`/post/${post.$id}`)}/>
          )) 
        }
      </Container>
    </div>
  )
}

export default AllPost
