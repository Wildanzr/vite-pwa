import { useGlobal } from "../contexts/Global";

import { Input } from "antd";

const { Search } = Input;

export default function SearchElement() {
  // Global States
  const globalStates = useGlobal();
  const { setSearch, setFetch } = globalStates;

  const onSearch = (value) => {
    console.log(value);
    setSearch(value)
  };

  return (
    <div className="w-full flex flex-row space-x-4 items-center justify-center">
      <Search placeholder="input search text" onSearch={onSearch} enterButton/>
    </div>
  );
}
