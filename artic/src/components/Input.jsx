import React  from "react";

const Input = React.forwardRef(
  ({ label, type = "text", name, className = "", isRequired, onChange, ...props }, ref) => (
    <div className="mb-6 ">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        className={`border-gray-300 border-2 px-4 py-2 rounded-xl sm:w-[50%] ${className}`}
        {...props}
        onChange={onChange}
        ref={ref}
      />
      {isRequired && <span className="text-red-500 ml-2 font-bold">*</span>}
    </div>
  )
);

export default Input;
