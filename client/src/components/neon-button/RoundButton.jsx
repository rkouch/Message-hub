import React from 'react';
import './RoundButton.css';

export default function RoundButton(props) {
    const name = props.name;
    return <div>
        <button class="round-button" onClick={props.onClick}>{name}</button>
    </div>
}