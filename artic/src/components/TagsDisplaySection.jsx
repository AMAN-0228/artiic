import { useState } from "react";
// import Button from "./Button";

const TagsDisplaySection = () => {

    const [tagsList, settagsList] = useState(["eduction","eating","fishing","travelling","coding","animals","music","art","photography","adventure","travel","singing"]);
  return (
    <div className="sticky top-0">
        <h3 className="text-xl ">Discover more about  </h3>
        <div>
            {tagsList && tagsList.map((tag) => {
                return(
                // <Button className={"m-1 rounded-3xl py-2 px-6"} bgColor="bg-gray-300" textColor="black" key={tag}>{tag}</Button>
                <SingleTag key={tag} tag={tag}  />
            )})}
        </div>
    </div>
  )
}


const SingleTag = ({tag,active=false}) => {
    return(
        <button className={` m-1 rounded-3xl py-1 px-6 bg-gray-300 ${active?"border border-black":""}`}>{tag}</button>
    )
}

export {SingleTag}
export default TagsDisplaySection
