import axios from "axios";

export const fetchFavorite = () => {
  return axios.get("http://localhost:3000/posts")
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error("There was an error fetching the data", error);
      throw error; // This will allow you to handle the error in the component where you use fetchFavorite
    });
};
