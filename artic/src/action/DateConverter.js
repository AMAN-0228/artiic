
const DateConverter = (publishedDate) => {
    const date = new Date(publishedDate)
    const dateFormate = date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
  return dateFormate
   
  
}

export default DateConverter
