import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as LiaIcons from "react-icons/lia";
import * as GrIcons from "react-icons/gr";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        className: 'nav-text'
    },
    {
        title: 'Channels',
        path: '/channels',
        icon: <AiIcons.AiOutlinePhone />,
        className: 'nav-text'
    },
    {
        title: 'Friends',
        path: '/friends',
        icon: <LiaIcons.LiaUserFriendsSolid/>,
        className: 'nav-text'
    }
]