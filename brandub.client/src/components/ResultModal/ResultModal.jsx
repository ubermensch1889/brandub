import React from 'react';
import classes from './ResultModal.module.css'

const ResultModal = ({children, visible}) => {
    const rootClasses = [classes.resultModal]
    
    if (visible) {
        rootClasses.push(classes.active)
    }
    
    return (
        <div className={rootClasses.join(' ')}>
            <div className={classes.resultModalContent}>
                {children}
            </div>
        </div>
    );
};

export default ResultModal;