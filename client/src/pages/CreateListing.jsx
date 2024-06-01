import { useState } from "react";

import { ref, getStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {app} from '../firbase'

const CreateListing = () => {
    const [files,setFiles] = useState([])

    const [formData,setFormData] = useState({
      imageUrls:[]
    })

    const [uploading, setUploading] = useState(false)

    const [imageUploadError, setImageUploadError] = useState(false)
    console.log(files)

    console.log(formData)

    const handleSubmit = () => {
      if(files.length > 0 && files.length + formData.imageUrls.length < 7) {
        setUploading(true)
        setImageUploadError(false)
        const promises = []

        for(let i =0; i < files.length; i++) {
          promises.push(storeImage(files[i]))
        }
        Promise.all(promises).then((urls)=>{
          setFormData({
            ...formData,imageUrls:formData.imageUrls.concat(urls)
          })
          setImageUploadError(false)
          setUploading(false)
        }).catch((err)=> {
          setImageUploadError('Image upload failed 2 mb max per image',err)
          setUploading(false)
        })

      } else {
        setImageUploadError('You can only upoad 6 images per listing')
        setUploading(false)
      }

    }

   const handleRemoveImage = (index) => {
setFormData({
  ...formData,imageUrls:formData.imageUrls.filter((_,i)=> i !== index)
})
   }

    const storeImage = async (file) => {
      return new Promise((resolve,reject)=> {
        const storage = getStorage(app)
        const fileName =  new Date().getTime() + file.name;
        const storageRef = ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef,file);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);

          },
          (error) => {
            reject(error)
          },
          ()=> {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=> {
              resolve(downloadUrl)

            })
          }
        )
      })

    }
  return (
    <main className="max-w-4xl mx-auto p-3">
      <h1 className="text-center my-7 font-semibold text-3xl">
        Create a Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="rounde-lg p-3 border"
            maxLength={62}
            minLength={10}
            required
            id="name"
          />
          <textarea
            type="text"
            placeholder="Description"
            className="rounde-lg p-3 border"
            required
            id="description"
          />
          <input
            type="text"
            placeholder="Address"
            className="rounde-lg p-3 border"
            required
            id="address"
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" className="w-5 cursor-pointer" id="sell" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5 cursor-pointer" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5 cursor-pointer"
                id="parking"
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5 cursor-pointer"
                id="furnished"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5 cursor-pointer"
                id="offer"
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <input
                type="number"
                id="bedrooms"
                className="border border-gray-200 rounded-lg p-3"
                min="1"
                max="10"
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                id="bathrooms"
                className="border border-gray-200 rounded-lg p-3"
                min="1"
                max="10"
                required
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                id="regularPrice"
                className="border border-gray-200 rounded-lg p-3"
                min="500"
                max="1000000"
                required
              />
              <div className="flex items-center flex-col">
                <p>Regular Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                id="disCountPrice"
                className="border border-gray-200 rounded-lg p-3"
                min="0"
                max="100000"
                required
              />
              <div className="flex items-center flex-col">
                <p>Discount Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
            <p className="font-semibold">
                Images: <span className="font-normal ml-2 text-gray-600">
                    The first image will be the cover (max 6)
                </span>
            </p>

            <div className="flex gap-4">
                <input onChange={(e)=> setFiles(e.target.files)} type="file" id="images" accept="image/*" multiple className="p-3 border border-gray-300 rounded w-full" />

                <button disabled={uploading} type="button" onClick={handleSubmit} className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                   {uploading ? 'Uploading' :'Upload'} 
                </button>
            </div>
            <p className="text-red-700 text-sm">
          {imageUploadError && imageUploadError}
        </p>
        {formData.imageUrls.length > 0 && formData.imageUrls.map((url,index)=> (
        <div className="flex justify-between border items-center p-3" key={url}>
          <img  src={url} alt="" className="w-20 h-20 object-cover rounded-lg" />
          <button onClick={()=>handleRemoveImage(index)} type="button" className="text-red-700 p-3 hover:opacity-95 rounded-lg disabled:opacity-80 uppercase">
            Delete
          </button>
          </div>
        ))}
            <button  className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-85">Create Listing</button>
        </div>

       

       
      </form>
    </main>
  );
};

export default CreateListing;
