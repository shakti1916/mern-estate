import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../conponents/OAuth";

const Signup = () => {
    const [formData,setFormaData] = useState({})

    const [error,setError] = useState(null)

    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormaData({
            ...formData,
            [e.target.id]:e.target.value,
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const res = await fetch('/api/auth/signup',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            })
            const data = await res.json();
            console.log(data)
    
            if(data.success === false) {
                setLoading(false)
                setError(data.message)
                return
            }
    
            setLoading(false)
            setError(null)
            navigate("/sign-in")
    
        
            
        } catch (error) {
            setLoading(false)
            setError(error.message)
            
        }

    }

       
    
    
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="p-3 border rounded-lg" onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="p-3 border rounded-lg" onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="p-3 border rounded-lg" onChange={handleChange}
        />
        <button className="uppercase bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
         {loading ? 'Loading' :"Sign up"}
        </button>
        <OAuth/>
      </form>

      <div className="flex gap-2 mt-5">
        <p>have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500 mt-5">Sign in</span>
        </Link>
      </div>
      {error && <p className="
      text-red-500 mt-5">
        {error}
      </p>}
    </div>
  );
};

export default Signup;
