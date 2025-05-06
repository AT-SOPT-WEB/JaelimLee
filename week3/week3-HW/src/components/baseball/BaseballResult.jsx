/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const resultStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
`;

const resultItemStyle = css`
  background-color: rgba(187, 222, 251, 0.49);
  border-radius: 17px;
`;

const gameResultTextStyle = css`
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  color: rgb(1, 36, 65);
`;

const BaseballResult = ({ gameResult }) => {
  return (
    <div css={resultStyle}>
      {gameResult.map((result, index) => (
        <div key={index} css={resultItemStyle}>
          <p css={gameResultTextStyle}>{result}</p>
        </div>
      ))}
    </div>
  );
};

export default BaseballResult;
