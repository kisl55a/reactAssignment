import React from 'react'

export default function Login(props) {

  function register(event)
  {
    event.preventDefault();
    // props.storeInfo(
    // //   event.target['name'].value,
    // //   event.target['streetAddress'].value,
    // //   event.target['city'].value,
    // //   event.target['email'].value,
    // );
    props.history.goBack();
  }

  function cancel(event)
  {
    event.preventDefault();
    props.history.goBack();
  }

  return (
    <div>
      <form onSubmit={ register }>
        <div>
          Nickname
        </div>
        <input type="text" name="name" />

        <div>
          Password
        </div>
        <input type="password" name="email" />

        <button onClick={ cancel }>Cancel</button>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
