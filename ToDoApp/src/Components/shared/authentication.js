import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../Memory/Auth";

function Authenticate() {
    const [auth] = useContext(AuthContext);

    if (!auth.authenticated) {
        return <Navigate to='/login'/>
    }

    return (
        <Outlet></Outlet>
    );
}

export default Authenticate;