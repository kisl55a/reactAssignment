import React from 'react'
export default function Login(props) {

  function login(event)
  {
    event.preventDefault();
    props.login(
      event.target['name'].value,
      event.target['password'].value,
    );
    props.history.goBack();
  }

  function cancel(event)
  {
    event.preventDefault();
    props.history.goBack();
  }

  return (
    <div>
      <form onSubmit={ login }>
        <div>
          Nickname
        </div>
        <input type="text" name="name" />

        <div>
          Password
        </div>
        <input type="password" name="password" />

        <button onClick={ cancel }>Cancel</button>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
