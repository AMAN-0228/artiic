import React from 'react'

function Select  ({
    label,
    name,
    options=[],
    className='',
    ...props
},ref) {
  return (
    <>
      <label htmlFor={name} className="">{label}</label>
      <select name={name} className={`border-gray-300 border-2 px-4 py-2 rounded-xl w-[90%] ${className}`} ref={ref} {...props}>
        {options.map((option) => (
          <option className=' hover:cursor-pointer' key={option} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </>
  )
}

export default React.forwardRef(Select)
