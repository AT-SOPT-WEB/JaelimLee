import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
const PokemonDetail = () => {
  const { name } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        console.log(res.data);
        setDetail(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetailData();
  }, [name]); // 'name'이 변경될 때마다 데이터를 새로 가져오도록 의존성 추가

  // detail이 없을 경우 로딩 상태 표시
  if (!detail) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <Link to="/">홈으로</Link>
      <h1>{detail.name}</h1>
      <img src={detail.sprites.front_default} alt="포켓몬 이미지" />
    </div>
  );
};

export default PokemonDetail;
