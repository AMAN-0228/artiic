import React from "react";
import { Container, PostForm } from "../components";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState();

  const loadPost = async () => {
    
  }
  return (
    <div>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
};

export default EditPost;
