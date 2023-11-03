import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import './Sidebar.css'
import { IconContext } from 'react-icons';
import LogInModal from "../navbar/LogInModal";
import RegisterModal from "../navbar/ResisterModal";
import Grid from '@mui/material/Grid';

export default function Sidebar() {
    const [sidebar, setSidebar] = React.useState(false);
    
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
        <IconContext.Provider value={{color:"white"}}>
            <div className='navbar'>
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar}></FaIcons.FaBars>
                </Link>
                <div className='left-nav'>
                    <Link to="/" className="site-title">
                        Messagehub
                    </Link>
                </div>
                
                <div className='right-nav'>
                    <ul>
                        <li>
                            <LogInModal></LogInModal>
                        </li>
                        <li>
                            <RegisterModal></RegisterModal>
                        </li>
                    </ul>
                </div>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.className}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
        </>
    )
}