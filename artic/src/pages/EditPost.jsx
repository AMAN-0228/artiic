import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";

const EditPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState();

  const loadPost = async () => {
    appwriteService.getPostBySlug(slug).then((post) => {
      console.log(post);
      if (post) {
        const fileId = post.featuredImage;
        const file = appwriteService.getFilePreview(fileId);
        if (file) {
          post.featuredImage = file;
          setPost(post);
        }
      }
    });
  };

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
