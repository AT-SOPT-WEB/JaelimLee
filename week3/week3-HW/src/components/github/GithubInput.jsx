/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const searchAreaStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 17px;
  width: 100%;
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

const GithubInput = ({ githubUser, onChange, onSearch }) => {
  return (
    <div css={searchAreaStyle}>
      <input
        css={inputGitStyle}
        type="text"
        placeholder="Github 프로필을 검색합니다"
        value={githubUser}
        onChange={onChange}
      />
      <button css={gitBtnStyle} onClick={onSearch}>
        검색
      </button>
    </div>
  );
};

export default GithubInput;
