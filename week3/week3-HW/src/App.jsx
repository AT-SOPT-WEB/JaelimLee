import { useState } from "react";
import Header from "./components/Header";
import BaseballMain from "./components/baseball/BaseballMain";
import GithubMain from "./components/github/GithubMain";

function App() {
  const [page, setPage] = useState("깃허브");
  const Pages = {
    ["깃허브"]: <GithubMain />,
    ["야구"]: <BaseballMain />,
  };
  console.log(page);
  return (
    <>
      <Header select={page} handlePage={setPage} />
      {Pages[page]}
    </>
  );
}

export default App;
