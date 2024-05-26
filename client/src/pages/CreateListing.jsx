const CreateListing = () => {
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
                <input type="file" id="images" accept="image/*" multiple className="p-3 border border-gray-300 rounded w-full" />

                <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                    Upload
                </button>
            </div>
            <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-85">Create Listing</button>
        </div>

       
      </form>
    </main>
  );
};

export default CreateListing;
