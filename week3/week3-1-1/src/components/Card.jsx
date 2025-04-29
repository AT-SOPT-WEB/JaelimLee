// Card.jsx

import style from "./Card.module.css";

const Card = ({ name, github, englishName }) => {
  return (
    <div className={style.card}>
      <div>{name}</div>
      <div>{github}</div>
      <div>{englishName}</div>
    </div>
  );
};

export default Card;
