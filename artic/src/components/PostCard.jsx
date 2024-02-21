import React from 'react'
import appwriteService from '../appwrite/config'
// import { ArrowUpRight } from 'lucide-react'

const PostCard = ({post,className='',...props}) => {
  return (
    <>
     
    <div className={`flex max-w-2xl flex-col items-center rounded-md border md:flex-row ${className}`} {...props}>
      <div className="h-full w-full md:h-[200px] md:w-[300px]">
        <img
          src={`${appwriteService.getFilePreview(post?.featuredImage)}`}
          alt={`${post?.title}`}
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      <div>
        <div className="p-4">
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
          <div className="mt-3 flex items-center space-x-2">
            <img
              className="inline-block h-8 w-8 rounded-full"
              src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
              alt="Dan_Abromov"
            />
            <span className="flex flex-col">
              <span className="text-[10px] font-medium text-gray-900">Dan Abromov</span>
              <span className="text-[8px] font-medium text-gray-500">@dan_abromov</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  
    </>
  )
}

export default PostCard
