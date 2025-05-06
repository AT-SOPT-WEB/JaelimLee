import { useNavigate } from "react-router";
const PokemonCard = ({ name }) => {
  const navigate = useNavigate();
  const handleCard = () => {
    navigate(`/pokemon/${name}`);
  };
  return (
    <div
      style={{ backgroundColor: "black", color: "white" }}
      onClick={handleCard}
    >
      <p>{name}</p>
    </div>
  );
};
export default PokemonCard;
