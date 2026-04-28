import { Tabs } from "antd";
import MovieList from "./MovieList";
import TheatreTable from "./TheatreTable";

const Admin = () => {
  const tableItems = [
    {
      key: "1",
      label: "Movies",
      children: <MovieList />,
    },
    {
      key: "2",
      label: "Theatres",
      children: <TheatreTable />,
    },
  ];
  return (
    <div>
      <header className="App-header_base">
        <h1>Admin page</h1>
        <Tabs items={tableItems} />
      </header>
    </div>
  );
};

export default Admin;
