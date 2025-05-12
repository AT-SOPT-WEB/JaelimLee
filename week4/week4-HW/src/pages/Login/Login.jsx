/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  mainStyle,
  formStyle,
  formInputStyle,
  btnStyle,
} from "./LoginStyles.styles";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (id && password) {
      localStorage.setItem("userId", id);
      console.log(id);
      navigate("/");
    } else {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
    }
  };

  return (
    <div css={mainStyle}>
      <h2>로그인</h2>
      <form css={formStyle}>
        <h3>비밀번호</h3>
        <div css={formInputStyle}>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디"
            type="text"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            type="password"
          />
        </div>
        <div css={btnStyle} onClick={handleLogin}>
          로그인
        </div>
        <div css={btnStyle}>회원가입</div>
      </form>
    </div>
  );
};

export default Login;
