import React from 'react'

export default function Charging(props) {

  function startCharging(event)
  {
    event.preventDefault();
    props.startCharging(
      event.target['identifier'].value,
    );
    
  }

//   function cancel(event)
//   {
//     event.preventDefault();
//     props.history.goBack();
//   }

  return (
    <div>
      <form onSubmit={ startCharging }>
        <div>
          Enter the Identifier
        </div>
        <input type="text" name="identifier" />
        <button type='submit'> Start charging</button>
      </form>
    </div>
  )
}
