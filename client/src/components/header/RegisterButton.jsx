import RoundButton from "../round-button/RoundButton";
import { Link } from "react-router-dom";

export default function RegisterButton() {
    return <Link to="/register">
        <RoundButton name={"Register"}></RoundButton>
    </Link>
}