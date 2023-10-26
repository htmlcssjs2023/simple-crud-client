# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Get the form value and send to the server side

```JavaScript
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
```
