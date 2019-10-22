import React from 'react'
export default function Register(props) {
  function register(event)
  {
    event.preventDefault();
    if ( event.target['password'].value !==  event.target['password1'].value) {
    } else {
        props.register(
            event.target['username'].value,
            event.target['email'].value,
            event.target['password'].value,
          );
          if ( props.message != "")
          props.history.goBack();
    }
    
  }
 

  function cancel(event)
  {
    event.preventDefault();
    props.history.goBack();
    props.setMessageToNull();  
  }

  return (
    <div>
      <form  onSubmit={ register }>
        <div>
          Username
        </div>
        <input type="text" name="username" />
        <div>
          Email
        </div>
        <input type="text" name="email" />
        <div>
          Password
        </div>
        <input type="password" name="password" />
        <div>
          Password
        </div>
        <input type="password" name="password1" />

        <button onClick={ cancel }>Cancel</button>
        <button type="submit">Register</button>
      </form>
      <div id = "message" > { props.message } </div>
        
    </div>
  )
}
