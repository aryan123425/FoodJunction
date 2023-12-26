import React,{useState} from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {

    const [credential, setcredential] = useState({name:"",email:"",passwors:"",geolocation:""})

    const handleSubmit = async(e)=> {
            e.preventDefault()  //synthetic event
            const response = await fetch("http://localhost:5000/api/createuser",{
                method: 'POST',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({name:credential.name,password:credential.password,email:credential.email,location:credential.geolocation})
            });
            const json = await response.json()
            console.log(json);

            if(!json.success)
            alert("Invalid Credentials")
    }

    const onChange=(event)=>{
        setcredential({...credential,[event.target.name]:event.target.value})
    }
    return (
        <>
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={credential.name} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credential.email}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onChange={onChange} className="form-control" id="exampleInputPassword1" name='password' value={credential.password}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                    <input type="text" className="form-control" onChange={onChange} id="exampleInputPassword2" name='geolocation' value={credential.geolocation}/>
                </div>
                
                <button type="submit" className="m-3 btn btn-success">Submit</button>
                <Link to='/login' className='m-3 btn btn-danger'>Already a user!</Link>
            </form>
            </div>
        </>
    )
}
