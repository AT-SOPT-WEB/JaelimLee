import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */
const headerStyle = css`
  position: fixed;
  top: 0;
  background-color: #bbdefb;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: 20px 0;
`;
const h1Style = css`
  margin: 0;
  padding-bottom: 20px;
`;
const navStyle = css`
  display: flex;
  width: 50%;
  justify-content: center;
  margin: 0 auto;
  background-color: black;
  border-radius: 10px;
  cursor: pointer;
`;
const navTab = css`
  padding: 15px;
  flex: 1;
  color: white;
  &:first-child {
    border-right: solid #bbdefb 5px;
    border-radius: 10px 0 0 10px;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
  }
  &:hover {
    background-color: rgb(34, 77, 120);
    font-weight: bold;
  }
`;
// 1976D2
const Header = () => {
  return (
    <div css={headerStyle}>
      <h1 css={h1Style}>무엇을 하시겠습니까</h1>
      <nav css={navStyle}>
        <div css={navTab}>깃허브 검색</div>
        <div css={navTab}>숫자 야구</div>
      </nav>
    </div>
  );
};

export default Header;
