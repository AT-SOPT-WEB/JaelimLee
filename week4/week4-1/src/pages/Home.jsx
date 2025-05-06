import { Link } from "react-router";
import PokemonCard from "../components/PokemonCard";
import { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const [resultData, setResultData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=40"
        );
        setResultData(res.data.results);
        console.log(res.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>포켓몬 도감</h1>
      {/* <Link to="/pokemon/피카츄">피카츄</Link>
      <Link to="/pokemon/이상해씨">이상해씨</Link> */}
      <section>
        {resultData.map((item) => (
          <PokemonCard key={item.name} name={item.name} />
        ))}
      </section>
    </div>
  );
};

export default Home;
