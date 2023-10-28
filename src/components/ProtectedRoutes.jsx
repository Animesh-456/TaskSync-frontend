import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    //Check the user if logged in or not
    const local = localStorage.getItem("empdetails")
    const user = { loggedin: local ? true : false }
    return user.loggedin
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to={"/login"} />
}

export default ProtectedRoutes