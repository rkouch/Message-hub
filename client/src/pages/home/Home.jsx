import InitialHome from "../../components/home/InitialHome";
import React, { useContext } from 'react';
import { AuthContext } from "../../AuthProvider";
import LoggedInHome from "../../components/home/LoggedInHome";

export default function Home() {
    const {loggedIn, setLoggedIn} = useContext(AuthContext);

    return <>
        {loggedIn 
        ? <LoggedInHome></LoggedInHome>
        : <InitialHome></InitialHome>}
    </> 
    
}