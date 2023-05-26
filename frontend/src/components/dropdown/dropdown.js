import React, { useState, useEffect } from 'react'
import './dropdown.scss'

function Dropdown ({placeholder, options, onChange}) {

    // const [value, setValue] = useState(placeholder)
    // const [visible, setVisible] = useState(false)

    const [showMenu, setShowMenu] = useState(false)
    const [selectedValue, SetSelectedValue] = useState(null)

    useEffect(() => {

        const handler = () => setShowMenu(false)

        window.addEventListener("click", handler)

        return () => {
            window.removeEventListener("click", handler)
        }
    })

    const handleInputClick = (e) => {
        e.stopPropagation()
        setShowMenu(!showMenu)
    }

    const getDisplay = () => {
        if(selectedValue) {
            return selectedValue
        }

        return placeholder
    }

    const onItemClick = (option) => {
        SetSelectedValue(option)
    }

    const isSelected = (option) => {
        if(!selectedValue) {
            return false
        }

        return selectedValue === option
    }

    return (

        <div className='dropdown-container'>
            <div onClick={handleInputClick} className='dropdown-input'>
                <div className='dropdown-selected-value'>{getDisplay()}</div>
            </div>
            {showMenu && (
                <div className='dropdown-menu'>
                    {options.map((option, id) => (
                        <div
                            onClick={()=>{onItemClick(option)}}
                            key={id}
                            className={`dropdown-item ${isSelected(option) && 'selected'}`}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>

        // <div className='dropdown'>
        //     <div className='placeholder' onClick={()=>{setVisible(!visible)}}>{value}</div>
        //     <div className={`options ${visible ? "visible" : ""}`}>
        //         {options.map(option => {
        //             return (
        //                 <div className='option' onClick={()=>{setValue(option)}}>{option}</div>
        //             )
        //         })}
        //     </div>
        // </div>
    )
}

export default Dropdown;
