import appwriteService from '../appwrite/config'
import DateConverter from '../action/DateConverter'
const PostCardLessDetails = ({post,trendListNumber,className='',...props}) => {
  return (
    <div className={`py-3 px-5 flex max-w-2xl  items-center rounded-md border-2  ${className}`} {...props}>
      {/* <div className="h-full w-full max-h-fit max-w-fit md:h-[200px] md:w-[300px]">
        <img
          src={`${appwriteService.getFilePreview(post?.featuredImage)}`}
          alt={`${post?.title}`}
          className="h-full w-full rounded-md object-cover border border-black shadow-md"
        />
      </div> */}
      <div className='mr-auto'>
        <span className='text-3xl font-semibold text-gray-400'>0{trendListNumber}</span>
      </div>
      <div>
        <div className="p-4 ml-auto">
          <h2 className="inline-flex items-center text-lg font-semibold">
            {post?.title}
            {/* About Macbook <ArrowUpRight className="ml-2 h-4 w-4" /> */}
          </h2>
          {/* <p className="mt-3 text-sm text-gray-600">
            {post?.content}
          </p> */}
          {post?.tag &&
            <div className="mt-4">
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              #Macbook
            </span>
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              #Apple
            </span>
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              #Laptop
            </span>
          </div>}
          {/* <div className="mt-3 flex items-center space-x-2">
            <img
              className="inline-block h-8 w-8 rounded-full"
              src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
              alt="Dan_Abromov"
            />
            <span className="flex flex-col">
              <span className="text-[10px] font-medium text-gray-900">Dan Abromov</span>
              <span className="text-[8px] font-medium text-gray-500">@dan_abromov</span>
            </span>
          </div> */}
          <div className="mt-3 flex items-center space-x-2">
            <span className="flex flex-col">
              <span className="text-[10px] font-medium text-gray-900">Published On</span>
              <span className="text-[8px] font-medium text-gray-500">{DateConverter(post?.$createdAt)}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCardLessDetails
