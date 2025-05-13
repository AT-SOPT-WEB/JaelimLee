/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  mainStyle,
  formStyle,
  formInputStyle,
  btnStyle,
} from "./SigninStyles.styles";
const Signin = () => {
  return (
    <div css={mainStyle}>
      <h2>회원가입</h2>
      <form css={formStyle}>
        <div css={formInputStyle}>
          <input placeholder="아이디" type="text" />
          <input placeholder="비밀번호" type="password" />
        </div>
        <div css={btnStyle}>로그인</div>
        <div css={btnStyle}>회원가입</div>
      </form>
    </div>
  );
};
export default Signin;
