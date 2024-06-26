import React from "react";
import PaymentOptionSelected from "./paymentOptionSelected";

const PaymentOption = ({ selectedItem,user,art }) => {
  return (
    <>
    {selectedItem === "PAYMENT OPTION" && (
      <PaymentOptionSelected user={user} art={art}/>
    )}
  
    {(selectedItem === "ORDER SUMMARY" || selectedItem === "DELIVERY ADDRESS") && (
      <>
        <div className="flex justify-between">
          <div className="ml-4 p-2">
            <div className="font-bold text-2xl text-gray-500"> {/* Increased font size to text-2xl */}
              <div className="flex items-center">
                PAYMENT OPTION
              </div>
            </div>
          </div>
        </div>
      </>
    )}
  </>
  
  );
};

export default PaymentOption;
