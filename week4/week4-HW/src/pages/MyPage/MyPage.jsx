/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MyPageInput from "../../components/MyPageInput";
import {
  mainStyle,
  headerStyle,
  headerLeft,
  sectionStyle,
} from "./MyPageStyles.style";
import { useNavigate, useParams } from "react-router";
import api from "../../services/api";
import { useEffect, useState } from "react";
const Home = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    if (!storedUserId) {
      alert("로그인 후 이용해주세요.");
      navigate("/");
    }
  }, [navigate]);
  useEffect(() => {
    if (userId) {
      const fetchDetailData = async () => {
        try {
          const res = await api.get("/api/v1/users/me", {
            headers: { userId },
          });
          // setUserName(res.data.data.nickname);
          console.log(userName, "지금", res.data.data.nickname);
          setUserName(res.data.data.nickname);
        } catch (error) {
          console.log(error.code);
        }
      };
      fetchDetailData();
    }
  }, [userId]);
  let title, label, btnTxt;

  if (name === "myInfo") {
    title = "내 정보 수정하기";
    label = "내 이름";
    btnTxt = "저장";
  } else if (name === "view") {
    title = "회원 정보 보기";
    label = "이름";
    btnTxt = "검색";
  }

  return (
    <div css={mainStyle}>
      <header css={headerStyle}>
        <div css={headerLeft}>
          <div onClick={() => navigate("/mypage/myInfo")}>내 정보</div>
          <div onClick={() => navigate("/mypage/view")}>회원 조회</div>
          <div onClick={() => navigate("/")}>로그아웃</div>
        </div>
        <div>{userName}</div>
      </header>
      <section css={sectionStyle}>
        <MyPageInput title={title} label={label} btnTxt={btnTxt} name={name} />
      </section>
    </div>
  );
};

export default Home;
