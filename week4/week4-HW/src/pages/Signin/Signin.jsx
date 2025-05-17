/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import {
  mainStyle,
  formStyle,
  formInputStyle,
  btnStyle,
} from "./SigninStyles.styles";
import api from "../../services/api";

const Signin = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  const isUsernameValid = username.length > 0;
  const isPasswordValid = password.length > 0 && password === confirmPassword;
  const isNicknameValid = nickname.length > 0;

  const handleSignUp = async () => {
    try {
      const response = await api.post(`/api/v1/auth/signup`, {
        loginId: username,
        password: password,
        nickname: nickname,
      });

      alert(
        `${nickname}님, 회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.`
      );

      window.location.href = "/";
    } catch (error) {
      console.error("회원가입 실패", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div css={mainStyle}>
      <h2>회원가입</h2>
      <form css={formStyle}>
        {step === 1 && (
          <>
            <div css={formInputStyle}>
              <input
                placeholder="아이디"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div
              css={btnStyle}
              onClick={handleNextStep}
              style={{ opacity: isUsernameValid ? 1 : 0.5 }}
              disabled={!isUsernameValid}
            >
              다음
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div css={formInputStyle}>
              <input
                placeholder="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                placeholder="비밀번호 확인"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div
              css={btnStyle}
              onClick={handleNextStep}
              style={{
                opacity: isPasswordValid ? 1 : 0.5,
              }}
              disabled={!isPasswordValid}
            >
              다음
            </div>
            <div css={btnStyle} onClick={handleBackStep}>
              이전
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div css={formInputStyle}>
              <input
                placeholder="닉네임"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div
              css={btnStyle}
              onClick={handleSignUp}
              style={{ opacity: isNicknameValid ? 1 : 0.5 }}
              disabled={!isNicknameValid}
            >
              회원가입
            </div>
            <div css={btnStyle} onClick={handleBackStep}>
              이전
            </div>
            <div css={btnStyle} onClick={() => (window.location.href = "/")}>
              로그인
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Signin;
