import RoundButton from "../round-button/RoundButton";
import { Link } from 'react-router-dom';

export default function LoginButton() {
    return <Link to="/login">
        <RoundButton name={"Login"} ></RoundButton>
    </Link> 
    
}