import React from 'react'

export default function Login(props) {

  function startCharging(event)
  {
    event.preventDefault();
    props.login(
      event.target['name'].value,
    );
    props.history.goBack();
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
