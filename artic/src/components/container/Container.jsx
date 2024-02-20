const Container = ({ children, className = "", ...props }) => {
  return (
    <div className={`w-full h-full ${className}`} {...props}>
      {children}{" "}
    </div>
  );
};

export default Container;
