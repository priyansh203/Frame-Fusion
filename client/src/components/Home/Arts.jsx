import React from "react";
import ArtCard from "../ArtCart";

const Arts = ({ filteredArts }) => {
  return (
    <div>
      {filteredArts.length === 0 ? (
        <div className="text-center text-gray-600 mt-4">No art found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {filteredArts
            .slice()
            .sort((a, b) => (a.isAvailable === b.isAvailable ? 0 : a.isAvailable ? -1 : 1))
            .map((art) => (
              <div key={art._id}>
                <ArtCard
                  price={art.price}
                  title={art.title}
                  artistId={art.artistId}
                  imageUrl={art.artPath}
                  isAvailable={art.isAvailable}
                  artistUserId={art.artistUserId}
                  _id={art._id}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Arts;
