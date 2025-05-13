/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { btnStyle } from "../pages/Login/LoginStyles.styles";
import {
  mainInputStyle,
  myPageInputArea,
} from "../pages/MyPage/MyPageStyles.style";
import api from "../services/api";

const MyPageInput = ({ title, label, btnTxt, name }) => {
  const [inputValue, setInputValue] = useState("");
  const [nicknameList, setNicknameList] = useState([]);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);
  const handleUpdateNickname = async () => {
    if (inputValue.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }
    if (name === "myInfo") {
      try {
        const response = await api.patch(
          "/api/v1/users",
          { nickname: inputValue },
          { headers: { userId } }
        );
        console.log("Nickname updated successfully", response.data);
      } catch (error) {
        console.error("Error updating nickname", error);
        alert("닉네임을 변경하는 데 실패했습니다.");
      }
    } else if (name === "view") {
      try {
        const response = await api.get(`/api/v1/users?keyword=${inputValue}`);

        const nicknameList = response.data.data.nicknameList || [];
        if (nicknameList.length === 0) {
          alert("닉네임이 없습니다.");
        } else {
          console.log("User details fetched successfully", response.data);
          setNicknameList(nicknameList);
        }
      } catch (error) {
        console.error("Error fetching user details", error);
        alert("닉네임을 조회하는 데 실패했습니다.");
      }
    } else {
      alert("회원 정보 보기 페이지에서는 닉네임을 변경할 수 없습니다.");
    }
  };

  return (
    <div css={myPageInputArea}>
      <h1>{title}</h1>
      <div>{label}</div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={label}
        type="text"
        css={mainInputStyle}
      />
      <div css={btnStyle} onClick={handleUpdateNickname}>
        {btnTxt}
      </div>

      {name === "view" && nicknameList.length > 0 && (
        <div>
          <h3>검색된 닉네임 목록</h3>
          <ul>
            {nicknameList.map((nickname, index) => (
              <li key={index}>{nickname}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyPageInput;
