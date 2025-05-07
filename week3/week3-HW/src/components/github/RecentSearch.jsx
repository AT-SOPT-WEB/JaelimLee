/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const recentSearchStyle = css`
  display: flex;
  gap: 10px;
  width: 80%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
  }
`;

const recentSearchItemStyle = css`
  display: flex;
  padding: 12px;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  background-color: rgba(187, 222, 251, 0.49);
  border-radius: 17px;
  cursor: pointer;
`;

const recentSearchTextStyle = css`
  font-size: 1rem;
  color: rgb(1, 36, 65);
`;

const githubCloseStyle = css`
  padding: 5px 10px;
  border-radius: 999px;
  cursor: pointer;
  color: white;
  background-color: black;
`;

const RecentSearch = ({ recentSearches, onSearchClick, onDeleteClick }) => {
  return (
    <div css={recentSearchStyle}>
      {recentSearches.reverse().map((searchTerm, index) => (
        <div key={index} css={recentSearchItemStyle}>
          <span
            css={recentSearchTextStyle}
            onClick={() => onSearchClick(searchTerm)}
          >
            {searchTerm}
          </span>
          <button
            css={githubCloseStyle}
            onClick={() => onDeleteClick(searchTerm)}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecentSearch;
