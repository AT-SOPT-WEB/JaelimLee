import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
const getUsers = async () => {
  const response = await axios.get(
    "https://api.atsopt-seminar4.site/api/v1/users"
  );

  return response.data.data;
};
const userId = 100;
const getMyNickname = async (userId) => {
  const response = await axios.get(
    "https://api.atsopt-seminar4.site/api/v1/users/me",
    {
      headers: {
        userId: userId,
      },
    }
  );
  return response.data.data;
};

const updateNickname = async (newNickname) => {
  const response = await axios.patch(
    "https://api.atsopt-seminar4.site/api/v1/users",
    { nickname: newNickname },
    {
      headers: {
        userId: userId,
      },
    }
  );
  return response.data.data;
};
function App() {
  const [isShow, setIsShow] = useState(false);
  const [inputTxt, setInputText] = useState("");
  const queryClient = useQueryClient();

  // 이거 위에 useState 대신에!
  // useQuery로 enabled 속성 사용해서 제어 가능 -> enabled : true하게 되면, true일때만 데이터 fetch 하도록!
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    enabled: isShow, // isShow가 true일 때만 데이터 fetch
  });

  const { data: nicknameData, isLoading } = useQuery({
    queryKey: ["myNickname", userId],
    queryFn: () => getMyNickname(userId),
  });
  console.log("nicknameData", nicknameData);
  if (isLoading) return <div>Loading...</div>;

  const { mutate } = useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      // 쿼리 데이터 무효화를 통한 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["myNickname", userId] });
      setInputText("");
    },
  });

  return (
    <div>
      <div>
        <div>
          내정보 : {nicknameData && <span>{nicknameData.nickname}</span>}
        </div>
        <input
          type="text"
          placeholder="닉네임"
          value={inputTxt}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <button
        onClick={() => updateNickname(inputTxt)}
        style={{ backgroundColor: "black", color: "white" }}
      >
        닉네임 수정
      </button>
      <button
        onClick={() => setIsShow(true)}
        style={{ backgroundColor: "black", color: "white" }}
      >
        회원 리스트
      </button>
      {/* <ul style={{ display: isShow ? "block" : "none" }}></ul> */}
      <ul style={{ display: isShow ? "block" : "none" }}>
        {data?.nicknameList.map((nickname, index) => (
          <li key={index}>{nickname}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;
