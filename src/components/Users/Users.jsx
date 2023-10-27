import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const users = () => {
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
    return (
        <div>
            <h2>User</h2>
            <h3>User collection length: {users.length}</h3>
            {
                users.map(user => <div key={user._id}>
                    <p>User Name: {user.name}</p>
                    <p>Email: {user.email} {user._id}</p>
                    <Link to={`/update/${user._id}`}> <button>update</button></Link> 
                    <button onClick={()=> handleDelete(user._id)}>X</button>
                    <hr />
                </div>)
            }
        </div>
    );
};

export default users;