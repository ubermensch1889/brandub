import React, { useRef } from 'react';
import classes from './CopyableText.module.css'
const CopyableText = ({children}) => {
    // Создаем реф для текстового поля
    const textRef = useRef(null);

    return (
        <div className={classes.overlay}>
            <div className={classes.copyContent}>
                <input className={classes.copyInput} ref={textRef} value={children} readOnly />
                <button className={classes.copyButton} onClick={() => {navigator.clipboard.writeText(children)}}>Копировать текст</button>
            </div>
        </div>
    );
};

export default CopyableText;
