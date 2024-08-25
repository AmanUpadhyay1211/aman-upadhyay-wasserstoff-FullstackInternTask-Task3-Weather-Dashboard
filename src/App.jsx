import {ThemeToggler,VerticalNavbar,SearchBar } from './components/index';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="body">
        <VerticalNavbar/>
        <SearchBar/>
        <Outlet/>
        <ThemeToggler/>
      </div>
    </>
  );
}

export default App;
