import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt=""
          className="w-24 h-24 rounded-full mt-2 object-cover self-center cursor-pointer"
        />
        <input
          type="text"
          placeholder="username"
          className="rounded-lg border p-3"
          id="username"
        />
        <input
          type="text"
          placeholder="email"
          className="rounded-lg border p-3"
          id="email"
        />
        <input
          type="text"
          placeholder="password"
          className="rounded-lg border p-3"
          id="password"
        />
        <button className="bg-slate-700 p-3 rounded-lg text-white font-semibold uppercase hover:opacity-95 disabled:opacity-80 ">
          Update
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer">
          Logout
        </span>
      </div>
    </div>
  );
};

export default Profile;
