
const Button = ({
    type,
    children,
    className
    
}) => {
  return <button type={type} className={`rounderd-xl px-4 py-2 ${className}`}>
      {children}
    </button>
  
}

export default Button
