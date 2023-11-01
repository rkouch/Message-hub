import { Link, useMatch, useResolvedPath, useRouteError } from "react-router-dom";
import RoundButton from "../neon-button/RoundButton";
import './Navbar.css';
import LogInModal from "./LogInModal";
import RegisterModal from "./ResisterModal";

export default function Navbar() {
    return <nav className="nav">
        <Link to="/" className="site-title">
            Messagehub
        </Link>
        <ul>
            <li>
            <LogInModal></LogInModal>
            </li>
            <li>
            <RegisterModal></RegisterModal>
            </li>
            {/* <CustomLink to="/register">Register</CustomLink>
            <CustomLink to="/login">Login</CustomLink> */}
        </ul>
    </nav>
}

function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end:true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}