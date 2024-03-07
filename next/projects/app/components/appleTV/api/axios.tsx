import axios from "axios";

const apiKey = "f9b516bf3928ca6a1594beec998ef13e";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWI1MTZiZjM5MjhjYTZhMTU5NGJlZWM5OThlZjEzZSIsInN1YiI6IjY1ZTY4ZWQxZWY4YjMyMDE4NWQ3MTMwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P1JxdUZOk7rcmElWWb4KlKyMd8pKL8t4t7oSJ2P4CJE";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey,
  },
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
