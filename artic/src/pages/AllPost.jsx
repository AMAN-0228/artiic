import React, { useEffect, useState } from 'react'
import {Container, NoDataTag, SinglePost} from '../components/index'
import appwriteService from '../appwrite/config'
import { Query } from 'appwrite'

const AllPost = () => {
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
    return <NoDataTag> No posts </NoDataTag>
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

export default AllPost
