import React from 'react'
import styles from './Main.module.css';
export default function Login(props) {
  function register(event)
  {
    event.preventDefault();
    if ( event.target['password'].value !==  event.target['password1'].value) {
        // TODO if the passwords don't match
    } else {
        props.register(
            event.target['username'].value,
            event.target['email'].value,
            event.target['password'].value,
          );
          props.history.goBack();
    }
    
  }
 

  function cancel(event)
  {
    event.preventDefault();
    props.history.goBack();
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
      <div id = "message" className ={ styles.hidden }> { props.message } </div>
        
    </div>
  )
}
