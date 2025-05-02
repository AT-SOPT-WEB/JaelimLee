import { useState, useEffect } from "react";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */
const searchAreaStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 17px;
  width: 100%;
`;

const mainStyle = css`
  background-color: rgb(235, 235, 235);
  width: 100%;
  height: calc(100vh - 200px);
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
`;

const inputGitStyle = css`
  border-radius: 10px;
  padding: 15px;
  width: 50%;
`;

const gitBtnStyle = css`
  border-radius: 10px;
  padding: 10px;
  width: 10%;
  background-color: black;
  color: white;
  font-weight: bold;
`;

const BaseballMain = () => {
  const [numInput, setNumInput] = useState(0);

  // 유저 입력 처리
  const handleUserInput = (e) => {
    setNumInput(e.target.value);
  };
  return (
    <div css={mainStyle}>
      <div css={searchAreaStyle}>
        <input
          css={inputGitStyle}
          type="text"
          placeholder="3자리 숫자를 입력해주세요."
          value={numInput}
          onChange={handleUserInput}
        />
      </div>
    </div>
  );
};

export default BaseballMain;
