import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { AuthContext } from "../Authentication/AuthProvider";



const axiosSecure = axios.create({
    baseURL: 'https://file-upload-server-site.vercel.app',
    withCredentials: true,
});


const useAxiosSecure = () => {
    
    const navigate = useNavigate();
   // const {logOut} = useContext(AuthContext);

    useEffect(()=>{
        axiosSecure.interceptors.response.use(function (response) {
            return response;
        }, async (error) =>{
            const status = error.response.status;
            if(status === 401 || status === 403){
                await axios.post('/api/logout')
                .then((response)=>{
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error)
                });
                navigate('/log-in')
            }
            return Promise.reject(error)
        });
    },[])

    return axiosSecure;
};

export default useAxiosSecure;

