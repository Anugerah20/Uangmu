// EDITOR: Nabil (23/05/2024)
// const formatDate = (dateString) => {
//      const date = new Date(dateString);
//      const year = date.getFullYear();
//      const month = (date.getMonth() + 1).toString().padStart(2, "0");
//      const day = date.getDate().toString().padStart(2, "0");
//      return `${year}-${month}-${day}`;
// }
// export default formatDate;

const formatDate = (dateString, format = "DD-MM-YYYY") => {
     const date = new Date(dateString);
     const year = date.getFullYear();
     const month = (date.getMonth() + 1).toString().padStart(2, "0");
     const day = date.getDate().toString().padStart(2, "0");

     if (format === "DD-MM-YYYY") {
          return `${day}-${month}-${year}`;
     } else if (format === "YYYY-MM-DD") {
          return `${year}-${month}-${day}`;
     }
     return dateString;
}

export default formatDate;