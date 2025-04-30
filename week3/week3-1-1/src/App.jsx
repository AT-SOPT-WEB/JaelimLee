// App.jsx

import Card from "./components/Card";
import Header from "./components/Header";
import { members } from "./assets/data";
import Search from "./components/Search";
import { useSearch } from "./hooks/useSearch";
function App() {
  const { search, filterData, handleSearch, handleClick } = useSearch(members);

  return (
    <>
      <Header />
      <section style={{ paddingTop: "100px" }}>
        <Search
          search={search}
          handleSearchChange={handleSearch}
          handleClickBtn={handleClick}
        />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {filterData.map((member) => (
            <Card
              key={member.id}
              name={member.name}
              github={member.github}
              englishName={member.englishName}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default App;
