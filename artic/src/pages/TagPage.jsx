import React from 'react'
import { useParams } from 'react-router-dom'
import { TagsDisplaySection } from '../components'

const TagPage = () => {
    const {tagName} = useParams()
    
  return ( 
    <div >
      <TagsDisplaySection isInline tagName={tagName} />
    <div className='mt-10 flex flex-col items-center'>
        {/* display tag name  */}
        <h3 className='text-3xl font-semibold'>{tagName.toUpperCase()}</h3>
        <p className='mt-3 text-gray-400'><span >POST</span> . <span>count</span></p>
    </div>
    <div className='mt-10'>
        <h2>recommended</h2>
        
    </div>
    </div>

  )
}

export default TagPage
