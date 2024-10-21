import { Outlet } from "react-router-dom";
import Navbar from "./Shared/Navbar";


const Home = () => {
    return (
        <div className="min-w-screen min-h-screen">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;