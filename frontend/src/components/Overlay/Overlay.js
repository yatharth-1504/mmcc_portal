import React, { useEffect } from 'react';
import './Overlay.scss'
import close from "../../assets/close.svg"
import { useSelector } from 'react-redux';

function Overlay({title, closeFunction, children}) {

    const {device} = useSelector((state) => state.windowSize)

    const clickOutside = (e) => {
        if(e.target.classList.contains("overlay-container")){            
            closeFunction()            
        }
    }

    useEffect(() => {
        document.addEventListener('click', clickOutside)

        return () => {
            document.removeEventListener('click', clickOutside)
        }
    }, [])

    
    return(
        <div className='overlay-container'>
            <div className={`overlay-box ${device}`}>
                <div className='header'>
                    <div className='title'>{title}</div>
                    <div className='close-btn-container'>
                        <img className='close-icon' onClick={closeFunction} alt='Close' src={close}/>
                    </div>
                </div>
                <div className='children'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Overlay;
