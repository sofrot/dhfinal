import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState, useRef } from "react"

const Schedule = (props) => {
    const [optionsRefs, setOptionsRefs] = useState(null);

    const [selectCurrent, setSelectCurrent] = useState('')
    const [selectValue, setSelectValue] = useState('')
    const selectRef = useRef(null);
    const exitEventRef = props.exitEventRef;
    const [isFirstRender, setFirstRender] = useState(true)
    const [optionsActive, setOptionsActive] = useState(props.optionsActive)
    const checkAvailable = {
        checkTimeStart: props.checkTimeStart,
        checkTimeEnd: props.checkTimeEnd + 1
    }
    let format = {
        index: checkAvailable.checkTimeStart,
        indicator: 'AM'
    }
    const mySelect = {
        handleSelectInput: (e) => {
            optionsActive.class === '' ? setOptionsActive({ class: 'booking-schedule-active', active: true }) : setOptionsActive({ class: '', active: false });
        },
        handleOptions: (e) => {
            setSelectCurrent(e.target.innerHTML)
            setSelectValue(e.target.innerHTML);
        }
    }

    useEffect(() => {
        setOptionsActive(props.optionsActive)
    }, [props.optionsActive])

    useEffect(() => {
        if (isFirstRender) {
            setOptionsRefs(Array(checkAvailable.checkTimeEnd - checkAvailable.checkTimeStart).fill().map((_, i) => {
                return React.createRef();
            }))
            setFirstRender(false)
        }
    }, [optionsRefs, isFirstRender, checkAvailable.checkTimeEnd, checkAvailable.checkTimeStart])
    
    return (
        <div className="booking-schedule-container">
            <div className={`booking-schedule-select ${props.alert}`} tabIndex={5} ref={selectRef} onClick={mySelect.handleSelectInput}>{props.messageArrival ? props.messageArrival : selectValue === "" ? "Seleccione la hora de llegada" : selectValue}</div>
            <div className={`booking-schedule-options ${optionsActive.class}`} >
                {optionsRefs && (
                    Array(checkAvailable.checkTimeEnd - checkAvailable.checkTimeStart).fill().map((_, i) => {
                        if(i>=1){
                            format.index += 1;
                        }
                        if (format.index > 11) {
                            format.indicator = 'PM'
                            if (format.index > 12) {
                                format.index = 1;
                            }
                        }
                        return <div key={'option:' + i} ref={ele => optionsRefs[i].current = ele}
                            className={`schedule-options-time-container schedule-options-time ${optionsRefs[i].current && optionsRefs[i].current.innerHTML === selectCurrent ? 'options-time-active' : ''}`}
                            onClick={mySelect.handleOptions} onChange={props.arrival(selectValue.slice(0, 5))}>{`${format.index < 10 ? '0' : ''}${format.index}:00 ${format.indicator}`}</div>
                    }))}
            </div>
        </div>
    )
}

export default Schedule;
