import { Link, useMatch, useResolvedPath, useRouteError } from "react-router-dom";

export default function Navbar() {
    const path = window.location.pathname;
    return <nav className="nav">
        <Link to="/" className="site-title">
            Message Hub
        </Link>
        <ul>
            <CustomLink to="/register">Register</CustomLink>
            <CustomLink to="/login">Login</CustomLink>
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