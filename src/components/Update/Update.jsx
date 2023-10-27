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