
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import { toast } from "react-toastify";

const Login = () => {

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const username = e.target.email.value;
        const password = e.target.pass.value;
        const data = { username, password }
        axiosSecure.post('/api/login', data)
            .then((response) => {
                if (response.data.success) {
                    toast.success("Welcome Admin!", { theme: "colored" })
                    navigate("/");
                }else{
                    toast.error("Invalid credentials!", { theme: "colored" })
                }
                
            })
            .catch((error) => {
                console.log(error);
                toast.error("Invalid credentials!", { theme: "colored" })
            });

    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border-2 border-purple-700">
                <h1 className="text-3xl font-bold text-center mt-10">Plaese Login!</h1>
                <form onSubmit={(e) => handleLogin(e)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input type="text" placeholder="username" name="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" name="pass" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-purple-700 hover:bg-purple-600 text-white text-lg font-bold">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;