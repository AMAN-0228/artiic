import { Container } from '../components'
import parse  from 'html-react-parser';

const SinglePost = ({post,className='',...props}) => {
    // console.log(post)
  return (
    <div className={`border border-gray-400 p-2 ${className}`} {...props}>
      {post && <Container>
        <div className='w-full px-4' >
          <h2 className='font-semibold text-2xl py-5'>{post?.title}</h2>
          <div className='w-full flex justify-center items-center '>
          <img src={post?.featuredImage?.href} className=" h-96  w-full border border-black" alt={post?.title} />
          </div>
          <div className='my-5'>{parse(post?.content)}</div>
        </div>
      </Container>}
    </div>
  )
}

export default SinglePost
