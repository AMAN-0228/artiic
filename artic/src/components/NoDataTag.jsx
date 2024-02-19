import React from 'react'

const NoDataTag = ({children, className=""}) => {
  return (
    <div className={`w-full h-full flex justify-center items-center ${className}`}>
      {children}
    </div>
  )
}

export default NoDataTag
