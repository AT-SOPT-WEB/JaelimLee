import { useState } from "react";
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
  background-color: rgb(225, 228, 231);
  width: 100%;
  height: 100dvh;
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
`;

const gitBoxStyle = css`
  border-radius: 10px;
  background-color: white;
  padding: 26px 5px;
  text-align: center;
  width: 80%;
  border: 5px solid #bbdefb;
`;

const gitBoxNameStyle = css`
  display: block;
  text-decoration: none;
  color: rgb(1, 36, 65);
  font-weight: bold;
  line-height: 3rem;
  font-size: 1.5rem;
`;

const gitBoxImgStyle = css`
  border-radius: 999px;
  width: 200px;
`;

const gitFollowStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const gitCloseStyle = css`
  width: 30px;
  height: 30px;
  border-radius: 999px;
  margin-left: auto;
  margin-right: 20px;
  background-color: #bbdefb;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  line-height: 1px;
  cursor: pointer;
`;

const GithubMain = () => {
  const [userInfo, setUserInfo] = useState({ status: "idle", data: null });
  const [githubUser, setGithubUser] = useState(""); // input
  const [showGitBox, setShowGitBox] = useState(true); // gitBox 쪽

  // 사용자 정보 가져오기
  const getUserInfo = async (user) => {
    setShowGitBox(true);
    setUserInfo({ status: "pending", data: null });
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log(data);
      setUserInfo({ status: "resolved", data });
    } catch {
      setUserInfo({ status: "rejected", data: null });
    }
  };

  const handleInputChange = (e) => {
    setGithubUser(e.target.value);
  };

  const handleCloseClick = () => {
    setShowGitBox(false);
    setGithubUser(""); // input 초기화
  };

  return (
    <div css={mainStyle}>
      <div css={searchAreaStyle}>
        <input
          css={inputGitStyle}
          type="text"
          placeholder="Github 프로필을 검색합니다"
          value={githubUser}
          onChange={handleInputChange}
        />
        <button css={gitBtnStyle} onClick={() => getUserInfo(githubUser)}>
          검색
        </button>
      </div>

      {userInfo.status === "resolved" && showGitBox && (
        <div css={gitBoxStyle}>
          <div css={gitCloseStyle} onClick={handleCloseClick}>
            x
          </div>
          <a href={userInfo.data.html_url} target="_blank">
            <img
              css={gitBoxImgStyle}
              src={userInfo.data.avatar_url}
              alt="User Avatar"
            />
          </a>

          <a
            css={gitBoxNameStyle}
            href={userInfo.data.html_url}
            target="_blank"
          >
            {userInfo.data.name}
          </a>
          <p>{userInfo.data.bio}</p>
          <div css={gitFollowStyle}>
            <p>팔로워: {userInfo.data.followers}</p>
            <p>팔로잉: {userInfo.data.following}</p>
          </div>
          <p>
            <a href={userInfo.data.html_url}>{userInfo.data.html_url}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default GithubMain;
