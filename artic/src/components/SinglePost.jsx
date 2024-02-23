import { Button } from "../components";
import parse from "html-react-parser";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SinglePost = ({ post, className = "", ...props }) => {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const deleteHandler = async () => {
    try {
      await appwriteService.deletePost(post?.$id);
      navigate("/");
    } catch (error) {
      console.log("On delete post handler :: error ", error);
    }
  };

  console.log((parse(post.content)[0]?.props))
  return (
    <div className={`box-border align-middle ${className}`} {...props}>
      {post && (
        <>
          <div className="w-full max-w-[680px] px-4 flex flex-col justify-center items-center mx-auto ">
            <div className=" w-full h-fit flex">
              <div className="">
              <h2 className="font-bold text-3xl py-5 ">{post?.title}</h2>
              </div>
              {userData && userData?.$id === post?.userId && (
                <div className="ml-auto flex flex-wrap  my-auto gap-3  align-middle md:h-fit">
                  {}
                  <Button onClick={() => navigate(`/edit-post/${post?.$id}`)}>
                    edit
                  </Button>
                  <Button onClick={deleteHandler}>delete</Button>
                </div>
              )}
            </div>
            <figure className="w-full align-middle mt-5">
              <img
                src={appwriteService.getFilePreview(post?.featuredImage)}
                className="  md:w-[760px] md:h-[360px] border border-black"
                alt={post?.title}
              />
            </figure>
            <div className="w-full">
              <div className="my-5">{parse(post?.content)}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePost;
