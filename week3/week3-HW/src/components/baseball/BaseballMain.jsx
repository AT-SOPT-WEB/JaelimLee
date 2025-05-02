import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */
const mainStyle = css`
  background-color: rgb(1, 36, 65);
  width: 100%;
  height: 100dvh;
  paddin-top: 158px;
`;
const BaseballMain = () => {
  <div css={mainStyle}>
    <div>
      <input type="text" placeholder="3자리 숫자를 입력해주세요" />
    </div>
  </div>;
};

export default BaseballMain;
