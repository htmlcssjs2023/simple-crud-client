
import './App.css'

function App() {
  const handleForm = (event)=>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email};
    console.log(user);

    fetch('http://localhost:5000/users',{
      method:'POST',
      headers:{
        'content-type':'application/json',
      },
      body:JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })

  }

  return (
    <>
      <h1>Simple Crud Client</h1>
      <form onSubmit={handleForm}>
        <input type="text"  name='name' placeholder=' User Name' /> <br />
        <input type="email" name='email' placeholder=' User Email' /> <br />
        <input type="submit" value="Add User"/> <br />

      </form>
    </>
  )
}

export default App
