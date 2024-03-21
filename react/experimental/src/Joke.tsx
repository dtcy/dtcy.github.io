import { use } from "react";
const fetchData = async () => {
  const res = await fetch("https://api.chucknorris.io/jokes/random");
  return res.json();
};
const JokeItem = () => {
  const joke = use(fetchData());
  return;
  <>
    {" "}
    <div>{joke.value}</div>;
  </>;
};

const Joke = () => {
  return;
  <div>
    {" "}
    <JokeItem></JokeItem>;
  </div>;
};

export default Joke;
