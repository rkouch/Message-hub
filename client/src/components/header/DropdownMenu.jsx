export default function DropdownMenu() {
    return <>
        <div className="dropdown-container">
            <ul>
                <li className="dropdown-profile">Profile</li>
                <li className="dropdown-friends">Friends</li>
                <div className="dropdown-divider"></div>
                <li className="dropdown-logout">Logout</li>
            </ul>
        </div>
    </>
}