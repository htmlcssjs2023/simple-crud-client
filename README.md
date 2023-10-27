# C, Create
## INSERT DATA TO THE SERVER / CREATE DATA / C 
- Need POST API to send data to the server
```JavaScript
// 1. CREATE FORM
      <form onSubmit={handleForm}>
        <input type="text"  name='name' placeholder=' User Name' /> <br />
        <input type="email" name='email' placeholder=' User Email' /> <br />
        <input type="submit" value="Add User"/> <br />
      </form>
// 3. CLIENT SIDE CODE ...
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
      if(data.insertedId){
        alert('User is successfully created !')
        form.reset();
      }
    })
  }

// 2. SERVER SIDE CODE ... CREATE POST API
    app.post('/users', async(req, res)=>{
// 4. SAVE / INSERT DATA INTO THE DATABASE
  const user = req.body;
  const result = await userCollection.insertOne(user);
        res.send(result);
    })
```
# R, Read
## Read data from database and show data in client side 

### 1. create Users component where is you want to users
### 2. create users route in main.jsx "/users",
### 3. create get api in server side to get data from database.
```JavaScript
   app.get('/users', async(req, res)=>{
        const cursor = userCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })
```
### 4. Load data from client side
```JavaScript
  {
    path:"/users",
    element:<Users></Users>,
    loader: ()=> fetch('http://localhost:5000/users')
  }
```
### 5. Show data in client side
```JavaScript
import React, { useState } from 'react';
import {useLoaderData } from 'react-router-dom';

const users = () => {
    const loadedUsers = useLoaderData();
    const [users, setUser] = useState(loadedUsers);
    return (
        <div>
            <h2>User</h2>
            <h3>User collection length: {users.length}</h3>
            {
                users.map(user => <div key={user._id}>
                    <p>User Name: {user.name}</p>
                    <p>Email: {user.email} {user._id}</p>
                </div>)
            }
        </div>
    );
};
export default users;
```

# DELETE , D
## Delete data from client side and server side

### 1. create delete button
```JavaScript
  <button>Delete</button>
```
#### 2. create deleteHandler(id) to delete specific user.
```JavaScript
    import React, { useState } from 'react';
    import {useLoaderData } from 'react-router-dom';

    const loadedUsers = useLoaderData();
    const [users, setUser] = useState(loadedUsers);

      const handleDelete = (id)=>{
        // console.log('User Id :', id);
        fetch(`http://localhost:5000/users/${id}`,{
            method:'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.deletedCount > 0){
                alert('User is successfully deleted');
                // remove from UI
                const reaminingUser = users.filter(user => user._id !== id);
                setUser(reaminingUser);

            }
        })
    }
```
### 3. call deleteHandler in button onClick = {}
```JavaScript
 <button onClick={()=> handleDelete(user._id)}>X</button>
```
### 4. create server side delete API
```JavaScript
    // Delete data from database
    app.delete('/users/:id', async(req, res)=>{
        const id = req.params.id;
        console.log(id);
        const query = {_id: new ObjectId(id)}
        const result = await userCollection.deleteOne(query);
        res.send(result);
    })
```

# Update , U
## Update data from database and client side.

### 1. Create update component , Update.jsx
### 2. create get api to get data from database and load client side
### 3. Hold defaultValue={loadedUser?.name}
### 4. Send updated value in server side
```JavaScript
// Server side code
    app.get('/users/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const user = await userCollection.findOne(query);
      res.send(user);
    })

// Client side code

import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const loadedUser = useLoaderData();
    const hadnleUpdate = (event)=>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const updateUser = {name, email};
        console.log(updateUser);

        fetch(`http://localhost:5000/users/${loadedUser._id}`,{
            method:'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(updateUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount > 0){
                alert('User is updated successfully !');
                form.reset();
            }
        })


    }
    return (
        <div>
            <h2>Update User: {loadedUser.name}</h2>
            <form onSubmit={hadnleUpdate}>
                <input type="text" defaultValue={loadedUser?.name}  name='name' id='' /> <br />
                <input type="email" defaultValue={loadedUser?.email} name='email' id='' /> <br />
                <input type="submit" value="Update User"/> <br />

             </form>
        </div>
    );
};

export default Update;

```
### 5. Received updated value and insert into database
```JavaScript
      // update information
    app.put('/users/:id', async(req, res)=>{
      const id = req.params.id;
      const user = req.body;
      // console.log(user);

      // Save data into database
      const filter ={_id: new ObjectId(id)}
      const options = {upsert:true};
      const updatedUser = {
        $set:{
          name:user.name,
          email:user.email
        }
      }

      const result = await userCollection.updateOne(filter, updatedUser, options);
      res.send(result);
    })
```
