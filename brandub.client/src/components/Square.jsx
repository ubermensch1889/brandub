﻿import React from 'react';
import '../index.css';

export default function Square(props) {
    return (
        <button className={"square"}
                onClick={props.onClick}
                style={props.style}
            >
        </button>
    );

}