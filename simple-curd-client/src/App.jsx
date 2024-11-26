
import { Link } from 'react-router-dom';
import './App.css'

function App() {




  const handleSubmit=(e)=>{
   e.preventDefault()
   const form = e.target;
   const name = form.name.value;
   const email = form.email.value;
   const user = { name , email};
   console.log(user)

   fetch("http://localhost:5000/users",{
    method:"POST",
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(user) 
   } )

   .then(res=> res.json())
   .then( data =>
    {
      console.log(data)
      // 
      if(data.insertedId){
        alert("Users added succecfully");
        form.reset()
      }

    } )
  }




  return (
    <>
        <div>
            <h1>Simple CRUD</h1>
                <Link to="/users">All users</Link>
            <form onSubmit={handleSubmit}>
                 <input type="text" name='name' />
                 <input type="email" name="email" id="" />
                  <input type="submit" value="Add user" />
            </form>
        </div>
    </>
  )
}

export default App
