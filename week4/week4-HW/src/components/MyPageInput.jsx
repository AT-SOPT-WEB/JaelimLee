/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  mainInputStyle,
  myPageInputArea,
} from "../pages/MyPage/MyPageStyles.style";
import { useState } from "react";
import { btnStyle } from "../pages/Login/LoginStyles.styles";
const MyPageInput = ({ title, label, onChange, btnTxt }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div css={myPageInputArea}>
      <h1>{title}</h1>
      <div>{label}</div>
      <input
        css={mainInputStyle}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={label}
        type="text"
      />
      <div css={btnStyle}>{btnTxt}</div>
    </div>
  );
};

export default MyPageInput;
