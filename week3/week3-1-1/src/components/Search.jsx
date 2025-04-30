import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */
const Search = ({ search, handleSearchChange, handleClickBtn }) => {
  // const [value, setValue] = useState("");
  const divStyle = css`
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: center;
    text-align: center;
  `;
  const inputStyle = css`
    width: 50%;
    padding: 10px;
    border-radius: 5px;
  `;
  const buttonStyle = css`
    border-radius: 5px;
    background-color: black;
    color: white;
    padding: 5px 10px;
  `;
  return (
    <div css={divStyle}>
      <input
        css={inputStyle}
        placeholder="검색하시오"
        type="text"
        value={search}
        onChange={handleSearchChange}
      />
      <button css={buttonStyle} onClick={handleClickBtn}>
        검색
      </button>
    </div>
  );
};
export default Search;
