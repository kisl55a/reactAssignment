import React from 'react'

export default function Charging(props) {

  function startCharging(event)
  {
    event.preventDefault();
    props.startCharging(
      event.target['identifier'].value,
    );
  }

  return (

    <div>
      {(props.isCharging) 
      ? 
      <div> 
        <div> Station UUID: 
        { props.UUID } </div> 
        <div>The price:
        { props.currentCharge.cost } </div> EUR
        <div> Your time:
        { props.currentCharge.timeOfUsage } </div> min
        <button onClick = { props.stopCharging }> Stop charging</button>
      </div>
      
       
      : <form onSubmit={ startCharging }>
      <div>
        Enter the Identifier
      </div>
      <div> { props.noChargerNotification }</div>
      <input type="text" name="identifier" />
      <button type='submit'> Start charging</button>
    </form>
    
  }
  </div>
      
  )
}
