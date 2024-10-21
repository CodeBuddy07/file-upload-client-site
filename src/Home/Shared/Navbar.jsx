import { NavLink, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Authentication/AxiosSecure/useAxiosSecure";

const Navbar = () => {

    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const logout = () => {
        axiosSecure.post('/api/logout')
            .catch((error) => {
                console.log(error)
            });
        navigate('/log-in')
    }
    return (

        <div className="navbar absolute top-0 min-w-screen bg-white lg:px-20 px-5 py-3 border-b">
            <div className="navbar-start" >
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="lg:hidden mr-2 md:mr-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                        </svg>

                    </div>
                    <ul
                        tabIndex={0}
                        className="font-semibold space-y-2 dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-40 p-2 shadow">
                        <li><NavLink to={'/'} className={({ isActive }) => [isActive ? "border-b-2 border-[#9B27AF] text-[#9B27AF]" : "text-[#6474A9]"].join("")}>Add File</NavLink></li>
                        <li><NavLink to={'/text'} className={({ isActive }) => [isActive ? "border-b-2 border-[#9B27AF] text-[#9B27AF]" : "text-[#6474A9]"].join("")}>Add Text</NavLink></li>
                        <li><NavLink to={'/uploads'} className={({ isActive }) => [isActive ? "border-b-2 border-[#9B27AF] text-[#9B27AF]" : "text-[#6474A9]"].join("")}>Added Files</NavLink></li>
                    </ul>
                </div>
                <h1 className="text-[#9B27AF] text-xl font-bold">ProttoyonKarnafuli</h1>
            </div >
            <div className="navbar-center hidden lg:flex">
                <ul className="flex justify-center items-center gap-5 font-semibold">
                    <li><NavLink to={'/'} className={({ isActive }) => [isActive ? "border-b-2 border-[#9B27AF] text-[#9B27AF]" : "text-[#6474A9]"].join("")}>Add File</NavLink></li>
                    <li><NavLink to={'/text'} className={({ isActive }) => [isActive ? "border-b-2 border-[#9B27AF] text-[#9B27AF]" : "text-[#6474A9]"].join("")}>Add Text</NavLink></li>
                    <li><NavLink to={'/uploads'} className={({ isActive }) => [isActive ? "border-b-2 border-[#9B27AF] text-[#9B27AF]" : "text-[#6474A9]"].join("")}>Added Files</NavLink></li>
                </ul>
            </div>

            <div className="navbar-end flex justify-end items-center gap-2">
                <button onClick={logout} className="btn lg:btn-sm btn-xs rounded-full border border-black ">Logout</button>

                <div className="border rounded-full w-10 h-10 flex justify-center items-center bg-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>

                </div>
            </div>

        </div >

    );
};

export default Navbar;