import React, {useState} from 'react';
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './styleSelectDate.css'
const SelectDate = (props) => {
    const [activeDate, setActiveDate] = useState({ current: new Date() })
    return (

        <div className='calendar-home'>
            <Calendar className='calendarDouble' onChange={props.onChange} value={props.value ? props.value : null}
                selectRange={true} /*showDoubleView={window.matchMedia("(max-width: 414px)").matches? false: true}*/
                activeStartDate={activeDate.current}
                minDate={new Date()}
                showDoubleView={true}
                returnValue={'range'} navigationLabel={({ date }) => date.toLocaleString('es-ES', { year: 'numeric', month: 'long' }).toUpperCase().split('DE')} //Traduce los meses
                navigationButton={true} next2Label={null}
                defaultActiveStartDate={new Date()}
                locale={"es-ES"} //Esta traduce los dias de la semana
                onActiveStartDateChange={({ action, activeStartDate, value, view }) => {
                    if (action === 'next' || action === 'prev') {
                        setActiveDate(prev => ({
                            ...prev,
                            current: activeDate.current === activeStartDate ? activeDate.current : activeStartDate
                        }))
                    }
                }}
            />
            <hr className="calendar-line"></hr>
            <div className='calendarButton'>
                <button onClick={props.onClick} >{props.isAcceptDate ? 'Cancelar' : 'Aplicar'}</button>
            </div>
        </div>
    )
}

export default SelectDate;