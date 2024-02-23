import { useContext } from "react";
import { useNavigate,Link, NavLink } from "react-router-dom";
import userContext from "../Context/UserContext";
export default function Header()
{

    const loggedData = useContext(userContext);
    const navigate = useNavigate();

    function logout()
    {
        localStorage.removeItem("nutrify");
        loggedData.setLoggedUser(null);
        navigate("/login");

    }

    return (
        <div className="header">

                <ul>
                    <li className="list" onClick={()=> navigate("/track") }>Track</li>

                    <li className="list" onClick={()=>navigate("/diet")}>Diet</li>

                    <li onClick={logout} className="list">Logout</li>
                </ul>


        </div>
    )
}