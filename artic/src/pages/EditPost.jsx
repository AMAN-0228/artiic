import React from "react";
import { Container, PostForm } from "../components";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { slug } = useParams();
  return (
    <div>
      <Container>
        {/* <PostForm post={post} /> */}
      </Container>
    </div>
  );
};

export default EditPost;
