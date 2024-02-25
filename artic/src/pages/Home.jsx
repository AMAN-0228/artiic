import { useEffect, useState } from "react";
import { Container, NoDataTag, SinglePost, TagsDisplaySection, Trending } from "../components";
import appwriteService from "../appwrite/config";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    appwriteService
      .getPosts([])
      .then((posts) => {
        // console.log(posts);
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <NoDataTag>
        <div className="text-3xl text-center font-semibold h-screen">
          Loading...
        </div>
      </NoDataTag>
    );

  if (posts.length === 0)
    return (
      <NoDataTag className="my-10 text-xl font-bold"> No posts </NoDataTag>
    );
  // return <div className='text-center'>No posts</div>

  return (
    <div>
      {/* something about ARTIIC */}
      <div className="w-full bg-slate-600">
        <div className="px-4 py-20 text-white">
          <h1 className="text-5xl md:text-9xl font-bold text-sky-600">
            ARTIIC
          </h1>
          <p className="text-2xl mt-8">
            The place where you can{" "}
            <span className="text-3xl text-sky-600">Share</span> your{" "}
            <span className="text-3xl text-sky-600">Knowledge</span> . . .
          </p>
        </div>
      </div>
      <Container className="px-4">
        {/* trending section */}
        <Trending posts={posts} />
        
        <div className="mt-5 grid grid-cols-8 md:grid-cols-12 gap-8 h-full">
          <section className="col-span-8 md:col-start-1">
            recommended
              {posts &&
                posts?.map((post) => (
                  // {post card}
                  <SinglePost post={post} key={post.$id} className="my-4" />
                ))}
          </section>
          <aside className="md:block col-span-8 md:col-span-4 md:col-start-9">
            <TagsDisplaySection/>
          </aside>
        </div>
      </Container>
    </div>
  );
};

export default Home;
