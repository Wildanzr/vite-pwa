import "./App.css";

import { Table, SearchElement, AddElement } from "./components";

function App() {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center">
      <p className="text-4xl font-bold text-blue-500">PWA Apps</p>
      <SearchElement />
      <AddElement />
      <Table />
    </div>
  );
}

export default App;
