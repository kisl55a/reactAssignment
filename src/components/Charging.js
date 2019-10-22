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
         { props.UUID.toUpperCase() } </div> 
        <div>The price:
        { props.currentCharge.cost } <sup>EUR</sup> </div> 
        <div> Your time:
        { props.currentCharge.timeOfUsage } <sup>min</sup> </div> 
        <div> Your energy:
        { props.currentCharge.energy } <sup>kWh</sup> </div> 
        <br></br>
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
