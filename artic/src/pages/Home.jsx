import { useEffect, useState } from "react";
import {
  Container,
  HeroSection,
  NoDataTag,
  SinglePost,
  TagsDisplaySection,
  Trending,
} from "../components";
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
      <HeroSection />
      <Container className="px-4">
        {/* trending section */}
        <div>
        <Trending posts={posts} />
        </div>

        <div className="mt-5 grid grid-cols-8 md:grid-cols-12 gap-8 h-full">
          <section className="col-span-8 md:col-start-1 h-full">
            recommended
            <div>
              {posts &&
                posts?.map((post) => (
                  // {post card}
                  <SinglePost post={post} key={post.$id} className="my-4" />
                ))}
            </div>
          </section>
          <aside className="md:block col-span-8 md:col-span-4 md:col-start-9">
            <TagsDisplaySection />
          </aside>
        </div>
      </Container>
    </div>
  );
};

export default Home;
