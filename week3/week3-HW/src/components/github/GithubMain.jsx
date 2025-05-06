import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import GithubInput from "./GithubInput";
import RecentSearch from "./RecentSearch";
/** @jsxImportSource @emotion/react */

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

const gitBoxCloseStyle = css`
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
  const [githubUser, setGithubUser] = useState("");
  const [showGitBox, setShowGitBox] = useState(true);
  const [recentSearches, setRecentSearches] = useState([]);

  // 사용자 정보를 가져오는 함수
  const getUserInfo = async (user) => {
    setShowGitBox(true);
    setUserInfo({ status: "pending", data: null });
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log(data);
      setUserInfo({ status: "resolved", data });

      const updatedSearches = [
        ...recentSearches.filter((item) => item !== user),
        user, // 최신 검색어를 맨 뒤에 추가
      ];

      // 심화 과제 조건 : 최근 검색어는 최대 3개까지 저장
      if (updatedSearches.length > 3) updatedSearches.shift();

      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    } catch {
      setUserInfo({ status: "rejected", data: null });
    }
  };

  const handleInputChange = (e) => {
    setGithubUser(e.target.value);
  };

  const handleCloseClick = () => {
    setShowGitBox(false); // gitBox 숨기기
    setGithubUser(""); // input 창 내용 초기화
  };

  const handleDeleteSearch = (searchTerm) => {
    const updatedSearches = recentSearches.filter(
      (item) => item !== searchTerm
    );
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches)); // localStorage에서 삭제
  };

  // 심화 과제 조건 : 검색어 클릭 시 해당 아이디로 검색
  const handleRecentSearchClick = (searchTerm) => {
    setGithubUser(searchTerm);
    getUserInfo(searchTerm);
  };

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches"));
    if (storedSearches) {
      setRecentSearches(storedSearches);
    }
  }, []);

  return (
    <div css={mainStyle}>
      <GithubInput
        githubUser={githubUser}
        onChange={handleInputChange}
        onSearch={() => getUserInfo(githubUser)}
      />

      {/* 최근 검색어 */}
      {recentSearches.length > 0 && (
        <RecentSearch
          recentSearches={recentSearches}
          onSearchClick={handleRecentSearchClick}
          onDeleteClick={handleDeleteSearch}
        />
      )}

      {userInfo.status === "resolved" && showGitBox && (
        <div css={gitBoxStyle}>
          <div css={gitBoxCloseStyle} onClick={handleCloseClick}>
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
