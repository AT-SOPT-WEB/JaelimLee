import { useState } from "react";

export function useSearch(data) {
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState(data);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = () => {
    const result = data.filter((member) => member.name.includes(search));
    setFilterData(result);
  };
  return { search, filterData, handleSearch, handleClick };
}
