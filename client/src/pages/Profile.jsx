import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firbase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice";
import {Link} from "react-router-dom"

const Profile = () => {
  const { currentUser,loading,error } = useSelector((state) => state.user);

  const inputRef = useRef(null);

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  const [fileUploadError, setFileUploadError] = useState(false);

  const [updateSuceess,setUpdateSuccess] = useState(false)

  const dispatch = useDispatch()
  

  




  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    },
    (error) => {
      setFileUploadError(true);
      console.log(error)
    },
  
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
      setFormData({ ...formData, avatar: downloadURL })
    );
  }
);

  };

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })

      const data = await res.json();
      if(data.success === false) {
        dispatch(updateUserFailure(data.message))
        return;
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
      
    } catch (error) {
      dispatch(updateUserFailure(error.message))
      
    }

  }

  const handleDeleteUser = async() => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE",
      });
      const data = await res.json()
      if(data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return;
      }
      dispatch(deleteUserSuccess(data))
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
      
    }

  }

  const handleLogout = async() => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout')

      const data = await res.json();
      if(data.success == false) {
        dispatch(signOutUserFailure(data.message))
        return
      }

      dispatch(signOutUserSuccess(data))
      
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
      
    }

  }
  
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={inputRef}
          hidden
          accept="image/*"
        />

        <img
          onClick={() => inputRef.current.click()}
          src={formData.avatar ||currentUser.avatar}
          alt=""
          className="w-24 h-24 rounded-full mt-2 object-cover self-center cursor-pointer"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
           Error in Image Upload (image must be less than 2 mb)
          </span>
          ) : 
            filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">Image Successfully uploaded</span>
            ) :(
              ''
            )
          
          }
        </p>
        <input
          type="text"
          placeholder="username"
          className="rounded-lg border p-3"
          id="username"
          defaultValue={currentUser.username} onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          className="rounded-lg border p-3"
          id="email"
          defaultValue={currentUser.email}
           onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="rounded-lg border p-3"
          id="password"
          defaultValue={currentUser.password} 
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 p-3 rounded-lg text-white font-semibold uppercase hover:opacity-95 disabled:opacity-80 ">
          {loading ? "Loading" : "Update"}
        </button>
        <Link className="rounded-lg bg-green-700 p-3 text-center text-white font-semibold uppercase hover:opacity-95" to={"/create-listing"}>
        Create Listing

        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleLogout} className="text-red-700 cursor-pointer">Logout</span>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error : ''}
      </p>

      <p className="text-green-700">
        {updateSuceess ? "User Update Succesfully" : ""}
      </p>
    </div>
  );
};

export default Profile;
