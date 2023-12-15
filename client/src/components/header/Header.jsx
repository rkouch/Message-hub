import LogInModal from "../navbar/LogInModal"
import RegisterModal from "../navbar/ResisterModal"
import "./Header.css"
import plane from '../../resources/plane.png'
import accountIcon from '../../resources/accounticon.png'
import LoginButton from "./LoginButton"
import RegisterButton from "./RegisterButton"
import { Link } from "react-router-dom";
import { AuthContext, AuthProvider } from "../../AuthProvider"
import React from "react"
import DropdownMenu from "./DropdownMenu"

export default function Header() {
    const {loggedIn, setLoggedIn} = React.useContext(AuthContext);
    const [openAccountIcon, setOpenAccountIcon] = React.useState(false);
    const accountIconRef = React.useRef(null);

    function handleAccountIcon() {
        setOpenAccountIcon(!openAccountIcon);
    }

    function handleClickOutside(event) {
        if (openAccountIcon && !accountIconRef.current.contains(event.target)) {
            setOpenAccountIcon(false);
        }
    }

    React.useEffect(() => {
        if (openAccountIcon) {
            document.addEventListener('click', handleClickOutside);
        } 
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [openAccountIcon])

    return <>
        <header className="header">
            <Link to="/" style={{textDecoration: "None"}}>
                <span className="title">Itinerary</span>
                <img src={plane} alt="logo" className="plane-img"></img>
            </Link>
            <div className="right-nav">
                {loggedIn 
                ? <>
                <div className="account-icon-circle">
                    <img src={accountIcon} alt="icon" className="account-icon" onClick={handleAccountIcon} ref={accountIconRef}></img>
                </div> </>
                : <>
                <LoginButton></LoginButton>
                <RegisterButton></RegisterButton> </>}
                {openAccountIcon && <DropdownMenu></DropdownMenu>}
            </div>
        </header>
    </>
}