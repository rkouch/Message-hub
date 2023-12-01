import LogInModal from "../navbar/LogInModal"
import RegisterModal from "../navbar/ResisterModal"
import "./Header.css"
import plane from '../../resources/plane.png'
import LoginButton from "./LoginButton"
import RegisterButton from "./RegisterButton"
import { Link } from "react-router-dom";

export default function Header() {
    return <>
        <header className="header">
            <Link to="/" style={{textDecoration: "None"}}>
                <span className="title">Itinerary</span>
                <img src={plane} alt="logo" className="plane-img"></img>
            </Link>
            <div className="right-nav">
                <LoginButton></LoginButton>
                <RegisterButton></RegisterButton>
            </div>
        </header>
    </>
}