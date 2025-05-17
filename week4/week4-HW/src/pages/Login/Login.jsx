/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import api from "../../services/api";
import {
  mainStyle,
  formStyle,
  formInputStyle,
  btnStyle,
} from "./LoginStyles.styles";

const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId); // userId가 변경되면 localStorage에 저장
    }
  }, [userId]);
  const fetchDetailData = async () => {
    try {
      const res = await api.post("/api/v1/auth/signin", {
        loginId,
        password,
      });
      console.log(res.data.data.userId);
      setUserId(res.data.data.userId);
      localStorage.setItem("userId", userId);
      navigate("/mypage/myInfo");
    } catch (error) {
      console.log(error.code);
    }
  };
  const handleLogin = () => {
    if (loginId && password) {
      fetchDetailData();
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
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
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
        <div css={btnStyle} onClick={() => navigate("/sign")}>
          회원가입
        </div>
      </form>
    </div>
  );
};

export default Login;
