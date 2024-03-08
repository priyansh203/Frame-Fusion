import React from "react";

const OrderSummarySelected = ({ art, changeSelected }) => {

    return (
        <div>
         <div className="">
      <h3 className="text-2xl font-bold mb-2 text-gray-50 bg-blue-500 py-2 px-6 "> 
        ORDER SUMMARY
      </h3>
    </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-5">
            <img src={art.artPath} alt={art.title} className="w-full rounded-lg" />
          </div>
          <div className="w-full md:w-1/2 px-4 py-2 pt-5">
            <h3 className="text-2xl font-bold mb-4">{art.title}</h3> {/* Increased font size to text-2xl */}
            <p className="text-lg mb-4">{art.description}</p> {/* Increased font size to text-lg */}
            <p className="text-base font-bold mb-4 overflow-auto"> {/* Increased font size to text-base */}
              Artist: {art.artistUserId}
            </p>
          </div>
        </div>
        <div className="pb-4 flex justify-center">
          <button
            className="bg-orange-500 shadow-lg rounded text-white font-medium py-3 px-10 focus:outline-none focus:shadow-outline"
            onClick={() => changeSelected("PAYMENT OPTION")}
          >
            CONFIRM ORDER {/* Corrected spelling from "CONFORM" to "CONFIRM" */}
          </button>
        </div>
      </div>
      
    );
};

export default OrderSummarySelected;
