import React from 'react';
import cl from './MultiplayerModeChoiceModal.module.css';

const MultiplayerModeChoiceModal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.choiceModal]

    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.choiceContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MultiplayerModeChoiceModal;
