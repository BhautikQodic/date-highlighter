import React, { ReactNode, useEffect, useLayoutEffect } from 'react';
import styled from "styled-components";

const PopWrapper = styled.div<{ isOpen: boolean }>`
    display: ${props => (props.isOpen ? 'block' : 'none')};
    position: absolute;
    background-color: #333;
    color: white;
    padding: 15px;
    border-radius: 6px;
    font-size: 14px;
    z-index: 1;
    width: 200px;
    /* Position above the button by default */
    bottom: 120%;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

    ::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -10px;
        border-width: 10px;
        border-style: solid;
        border-color: #333 transparent transparent transparent;
    }

`

const PopUpContent = styled.div`
    text-align: center;
`

interface PopOverProps {
    isOpen: boolean;
    children: ReactNode;
}

export const PopOver: React.FC<PopOverProps> = ({ isOpen, children }) => {
    return (
        <PopWrapper isOpen={isOpen}>
            {children}
            <PopUpContent>
                <h3>Tooltip 1</h3>
                <p>This is helpful information for tooltip 1!</p>
            </PopUpContent>
        </PopWrapper>
    )
}