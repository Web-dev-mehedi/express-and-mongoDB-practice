import { useLoaderData } from "react-router-dom";

const Update = () => {

    const loadedUser = useLoaderData();
   


    const handleSubmit= (e)=>{
      e.preventDefault();
      const form = e.target
      const name = form.name.value
      const email = form.email.value

      const userUpdateInfo = { name , email }
      console.log(userUpdateInfo);
      fetch(`http://localhost:5000/users/${loadedUser._id}` , {
        method: 'PUT',
        headers: {'content-type' : 'application/json'},
         body : JSON.stringify(userUpdateInfo)

      })
      .then(res => res.json())
      .then(data => {
        if(  data.modifiedCount === 1){
           alert("this user is updated")
        }
        console.log(data)
      })
    
    }

    // 
    return (
        <div>
             <h1>upate information of {loadedUser.name}</h1>

             <form onSubmit={handleSubmit}>
                 <input type="text" name="name"  defaultValue="mehedi" />
                 <input type="email" name="email" defaultValue={`${name}@gmail.com`} />
                 <input type="submit" value="Update" />
             </form>
        </div>
    );
};

export default Update;