const formatDate = (dateString) => {
     const date = new Date(dateString);
     const day = date.getUTCDate();
     const month = date.getUTCMonth() + 1;
     const year = date.getUTCFullYear();
     return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}

export default formatDate;