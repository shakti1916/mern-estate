import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold">Sign Up</h1>

      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="p-3 border rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="p-3 border rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="p-3 border rounded-lg"
        />
        <button className="uppercase bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          Sign up
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500 mt-5">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
