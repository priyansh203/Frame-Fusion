import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDetails } from "../../store";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import DeliveryAddressSelected from "./deliveryAddressSelected";

const DeliveryAddress = ({ user, selectedItem, changeSelected }) => {
    const [edit, setEdit] = useState(false);
    const [address, setAddress] = useState(user.address);
    const dispatch = useDispatch();

    const handleDeliverHere = async () => {

        if (address.length < 10) {
            toast.error("Address should be at least 10 characters long.");
            return; // Don't proceed further if address is less than 10 characters
        }

        try {
            const updatedUser = { ...user, address: address }; // Create a new object with updated address
            await axios.put(
                "http://localhost:5001/user/updateUserDetails",
                updatedUser
            );
            dispatch(updateDetails(updatedUser));
            changeSelected("ORDER SUMMARY");
        } catch (error) {
            console.error("Error updating user details:", error);
        }
    };

    const handleEdit = () => {
        setEdit(true);
    };
    const handleChange = (e) => {
        const { value } = e.target;
        setAddress(value);
    };

    return (
        <>
            <ToastContainer />
            {selectedItem === "DELIVERY ADDRESS" && (
                <DeliveryAddressSelected
                    user={user}
                    edit={edit}
                    address={address}
                    onChangeDeliverHere={handleDeliverHere}
                    onChangeEdit={handleEdit}
                    onChangeChange={handleChange}
                />
            )}
            {selectedItem !== "DELIVERY ADDRESS" && (
                <>
                    <div className="flex justify-between">
                        <div className="ml-4 p-2">
                            <div className="font-bold text-2xl text-gray-600">
                                {/* Increased font size to text-2xl */}
                                <div className="flex items-center">
                                    DELIVERY ADDRESS
                                    <svg
                                        height="20"
                                        width="20"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-1 h-6 w-6 text-blue-500"
                                    >
                                        <path
                                            d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                                            stroke="#2974f0"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex mb-2">
                                <div className="font-bold text-lg mr-2">
                                    {/* Increased font size to text-lg */}
                                    {user.name}
                                </div>
                                <div className="text-lg">
                                    {/* Increased font size to text-lg */}
                                    {user.address}
                                </div>
                            </div>
                        </div>
                        <div className="mt-1">
                            <button
                                className="m-4 text-blue-500 px-7 py-2 rounded text-lg border border-gray-300"
                                onClick={() =>
                                    changeSelected("DELIVERY ADDRESS")
                                }
                            >
                                Change
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default DeliveryAddress;
