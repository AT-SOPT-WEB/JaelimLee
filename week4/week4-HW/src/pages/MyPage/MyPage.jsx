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
const Home = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  return (
    <div css={mainStyle}>
      <header css={headerStyle}>
        <div css={headerLeft}>
          <div onClick={() => navigate("/mypage/myInfo")}>내 정보</div>
          <div onClick={() => navigate("/mypage/view")}>회원 조회</div>
          <div onClick={() => navigate("/mypage/logout")}>로그아웃</div>
        </div>
        <div>회원이름</div>
      </header>
      <section css={sectionStyle}>
        <MyPageInput
          title="내 정보 수정하기"
          label="이름"
          value={name}
          btnTxt={"저장"}
        />
      </section>
    </div>
  );
};

export default Home;
