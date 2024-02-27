import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Button from "./Button";

const TagsDisplaySection = ({ isInline = false,tagName="" }) => {
  const navigate = useNavigate();
  const [tagsList, settagsList] = useState([
    "eduction",
    "eating",
    "fishing",
    "travelling",
    "coding",
    "animals",
    "music",
    "art",
    "photography",
    "adventure",
    "travel",
    "singing",
  ]);
  console.log(tagName)
  return (
    <>
      {isInline ? (
        // display in an inline shape
        <div className="flex overflow-hidden">
          <div className="bg-white border-r-2 border-gray-500">
            <p className=" text-xl py-2 px-6" >explore</p>
          </div>
          <div className="flex">
            {tagsList &&
              tagsList.map((tag) => {
                return (
                  <SingleTag
                    key={tag}
                    tag={tag}
                    active={tag==tagName?true:false}
                    onClick={() => navigate(`/tag/${tag}`)}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        // display in a block shape
        <div className="sticky top-0">
          <h3 className="text-xl ">Discover more about </h3>
          <div>
            {tagsList &&
              tagsList.map((tag) => {
                return (
                  // <Button className={"m-1 rounded-3xl py-2 px-6"} bgColor="bg-gray-300" textColor="black" key={tag}>{tag}</Button>
                  <SingleTag
                    key={tag}
                    tag={tag}
                    onClick={() => navigate(`/tag/${tag}`)}
                  />
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

const SingleTag = ({ tag, active = false, ...props }) => {
  return (
    <button
      className={` m-1 rounded-3xl py-1 px-6 bg-gray-300 ${
        active ? "border-2 border-black" : ""
      }`}
      {...props}
    >
      {tag}
    </button>
  );
};

export { SingleTag };
export default TagsDisplaySection;
