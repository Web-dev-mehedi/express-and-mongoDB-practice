import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";


const Users = () => {

    const totalUsers = useLoaderData();

    const [reaminingUsers , setRemainingUsers ] = useState(totalUsers)
    console.log(reaminingUsers)

    const handleDelete =(_id)=>{

        console.log(_id)
         fetch(`http://localhost:5000/users/${_id}`,{
            method: 'DELETE'
         })
         .then(res => res.json())
         .then(data => {
            console.log(data)
            if(data.deletedCount === 1){
                  alert("deleted item from database successfully")
                  const reamining = reaminingUsers.filter(user => user._id !== _id);
                  setRemainingUsers(reamining)
            }else{
                alert("no itme find")
            }
         })
    }

    return (
        <div>
            <h1>users {reaminingUsers.length}</h1>
            {
               reaminingUsers.map( item =>(
                    <li key={item._id}>
                    

                       <Link>{item.name}</Link>
                       <span><button onClick={()=>handleDelete(item._id)} className="btn">X</button></span>
                       <Link to={`/update/${item._id}`}>
                            Update
                       </Link>
                   </li>
                )
                    
                )
            }
        </div>
    );
};

export default Users;