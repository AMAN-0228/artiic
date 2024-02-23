
const Button = ({
    children, 
    type,
    bgColor = '',
    textColor = 'text-white',
    className,
    ...props
    
}) => {
  return <button type={type} className={`rounded-xl px-3 py-2 active:scale-95 text-sm bg-cyan-600 ${bgColor} ${textColor} ${className}`} {...props}>
      {children}
    </button>
  
}

export default Button
