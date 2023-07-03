import React, {useState, useEffect} from 'react';
import './dropdown.scss'
// import downArrow from '../../assets/icons/downArrow.svg'

const Dropdown = ({placeholder, options, onSelect, theme}) => {

    const [showMenu, setShowMenu] = useState(false)
    const [selectedPlaceholder, setSelectedPlaceholder] = useState(placeholder)

    console.log("Running", showMenu)
    const clickOutside = (e) => {
        // if(e.target.classList.contains("dropdown")){            
        //     setShowMenu(false)          
        // }
        if(e.target.className !== "title"){
            setShowMenu(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', clickOutside)

        return () => {
            document.removeEventListener('click', clickOutside)
        }
    }, [])
    
    return (
        <div className='dropdown'>
            <div className={`title-container ${theme}`} onClick={()=>setShowMenu(true)}>
                <div className={`title`}>{selectedPlaceholder}</div>
            </div>
            <div className={`menu ${showMenu ? "active" : ""} ${theme}`}>
                {options.map((option, index) => (
                    <div 
                        key={index} 
                        className='option-bar' 
                        onClick={()=>{
                            onSelect(option.value)
                            setSelectedPlaceholder(option.value)
                        }}
                    >
                        {option.icon ? <img alt='icon' src={option.icon}/> : null}
                        <div>{option.value}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Dropdown;