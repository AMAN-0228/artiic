import React, { useCallback, useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";

const EditPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState();


  const loadPost = useCallback(async () => {
    appwriteService.getPostBySlug(slug).then((post) => {
      console.log(post);
      if (post) {
        
          setPost(post);
      }
    });
  }, [slug, setPost]);

  useEffect(() => {
    loadPost();
  }, [slug]);
  return (
    <div>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
};

export default EditPost;
