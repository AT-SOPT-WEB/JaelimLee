import { useState, useEffect } from "react";
import Header from "./components/Header";
import BaseballMain from "./components/baseball/BaseballMain";
import GithubMain from "./components/github/GithubMain";

function App() {
  const [page, setPage] = useState("깃허브");

  // useEffect를 사용해 상태 변경 후 한 번만 출력되도록 처리
  useEffect(() => {
    console.log(page);
  }, [page]); // page 상태가 변경될 때마다 호출됨

  const Pages = {
    ["깃허브"]: <GithubMain />,
    ["야구"]: <BaseballMain />,
  };

  return (
    <>
      <Header select={page} handlePage={setPage} />
      {Pages[page]}
    </>
  );
}

export default App;
