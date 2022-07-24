import './styleSelectCities.css';

const SelectCities=(props)=>{
    return (
        
        <ul >
            <div className='listSelectCites'>
            {props.options?
            props.options.map((op, i)=>{
                return (
                    <li key={op.name+i} onClick={()=>props.election(op)}>
                        <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                        <div className='cityText'>
                            <p  className='cityName'>{op.name}</p>
                            <p>{op.country}</p>
                        </div>
                    </li>
                )
            })
            :
            <h1>Nada</h1>
            }
            </div>
        </ul>
    )
}

export default SelectCities;