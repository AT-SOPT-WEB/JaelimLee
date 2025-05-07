/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const inputComponentStyle = css`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const inputBaseBallStyle = css`
  border-radius: 10px;
  padding: 15px;
  width: 50%;
`;

const BaseballInput = ({ numInput, handleUserInput, handleKeyPress }) => {
  return (
    <div css={inputComponentStyle}>
      <input
        css={inputBaseBallStyle}
        type="text"
        placeholder="3자리 숫자를 입력해주세요."
        value={numInput}
        onChange={handleUserInput}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default BaseballInput;
