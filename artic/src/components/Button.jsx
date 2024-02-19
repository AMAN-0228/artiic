
const Button = ({
    children, 
    type,
    bgColor = 'bg-sky-500',
    textColor = 'text-white',
    className,
    ...props
    
}) => {
  return <button type={type} className={`rounded-xl px-4 py-2 active:scale-95 ${bgColor} ${textColor} ${className}`} {...props}>
      {children}
    </button>
  
}

export default Button
