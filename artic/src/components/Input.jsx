import React  from "react";

const Input = React.forwardRef(
  function Input({ label, type = "text", name, className = "", isRequired, ...props }, ref) { 
    return(
    <div className="mb-6 w-full">
      {label && <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>}
      <input
        type={type}
        name={name}
        className={`border-gray-300 border-2 px-4 py-2 rounded-xl w-[90%] ${className}`}
        {...props}
        ref={ref}
        />
      {isRequired && <span className="text-red-500 ml-2 font-bold">*</span>}
    </div>
  )}
);

export default Input;
