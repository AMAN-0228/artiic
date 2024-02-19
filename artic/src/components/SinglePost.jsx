import React, { useEffect, useState } from 'react'
import { Container } from '../components'
import { useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config'

const SinglePost = ({post}) => {
    
  return (
    <div>
      <Container>
        <div>
          <h2>{post?.title}</h2>
          <img src={post?.featureImage} className="w-full" alt="image" />
          <p>{post?.content}</p>
        </div>
      </Container>
    </div>
  )
}

export default SinglePost
