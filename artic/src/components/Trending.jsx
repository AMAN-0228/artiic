import { useNavigate } from "react-router-dom"
import PostCardLessDetails from "./PostCardLessDetails"

const Trending = ({ posts }) => {
    const navigate = useNavigate()
  return (
    <div className="mt-10">
          <h3 className="text-2xl text-textTrending font-medium">Trending</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* {post card} */}
            {posts &&
              posts?.map((post, index) => (
                // {post card}
                <PostCardLessDetails
                  trendListNumber={index + 1}
                  post={post}
                  key={post.$id}
                  className="my-4 col-span-1 hover:cursor-pointer"
                  onClick={() => navigate(`/post/${post.$id}`)}
                />
              ))}
          </div>
        </div>
  )
}

export default Trending
