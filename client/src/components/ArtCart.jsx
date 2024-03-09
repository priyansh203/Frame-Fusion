import React from "react";
import { Link, useLocation } from "react-router-dom";

const ArtCard = ({ price, title, artistId, artistUserId, imageUrl, isAvailable, _id }) => {
  const location = useLocation();
  const isOrdersPage = location.pathname === '/orders';

  return (
    <>
      <Link to={`/art/${_id}`}>
        <div className="hover:scale-105 relative m-4 p-4 w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition duration-300">
          <div className="relative h-48 overflow-hidden rounded-xl">
            <Link to={`/art/${_id}`}>
              <img
                className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
                src={imageUrl}
                alt="Product"
              />
            </Link>
          </div>

          <div className="mt-4">
            <Link to={`/art/${_id}`} className="block">
              <h5 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h5>
            </Link>
            {!isAvailable && !isOrdersPage && (
              <p className="text-red-500 font-semibold">Sold</p>
            )}
            <Link
              to={`/profile/artist/${artistId}`}
              className="italic hover:underline text-gray-400 text-sm"
            >
              {artistUserId}
            </Link>
            <div className="mt-2 flex justify-between items-center">
              <p className="text-lg font-bold text-gray-800">₹{price}</p>
              {/* Your rating icons */}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ArtCard;
