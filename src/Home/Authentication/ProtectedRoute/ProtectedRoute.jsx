import { Navigate } from "react-router-dom";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import PropTypes from 'prop-types';
import { useState } from "react";
import Loading from "../../Shared/Loading/Loading";


const ProtectedRoute = ({ children }) => {

    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false);

    axiosSecure.get('/api/protected')
        .then(res => {
            if(res.data.message){
                setLoading(false);
                setUser(true)
            }
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })



    if (loading ) {
        return <Loading></Loading>
    }

    if (user) {

        return children;
    }


    return <Navigate to="/log-in" state={location?.pathname} ></Navigate>

};

export default ProtectedRoute;
ProtectedRoute.propTypes = {
    children: PropTypes.any,
}

