import React from "react";

const Search = ({
  img,
  currentImageIndex,
  name,
  handleSearch,
  searchQuery,
}) => {
  return (
    <div>
      <div
        style={{
          background: `linear-gradient(to bottom right, #030637, #3C0753, #720455, #910A67)`,
        }}
      ></div>
      <div className="relative rounded-xl p-10 mb-[150px]">
        <div className="absolute inset-0 z-0 h-[500px] overflow-hidden bg-black">
          <img
            className="absolute object-cover w-full h-full opacity-40 bottom-0"
            src={img[currentImageIndex]}
            alt="A beautiful landscape"
          />
        </div>

        <div className="relative z-10 text-white">
          <div className="container mx-auto py-8">
            <div className="text-center">
              <h1 className="mb-5 mt-5 text-4xl font-bold lg:text-5xl text-white">
                Discover Art That Speaks to Your Soul
              </h1>
              <p className="text-lg opacity-75 px-[150px] mb-3">
                Welcome, {name} Journey into a world where creativity knows no
                bounds. Explore breathtaking masterpieces that ignite your
                imagination and stir your emotions. Find your muse among our
                vast collection of captivating artworks.
              </p>
              <input
                type="text"
                className="form-input w-2/3 rounded-lg px-4 py-3 text-black mt-5 "
                placeholder="Try search 'Art Name or Artist Name'"
                onChange={handleSearch}
                value={searchQuery}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
