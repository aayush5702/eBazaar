import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Success = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full mx-auto text-center">
         
          <p className="text-green-500 font-bold text-2xl mb-4">
            Payment Successful
          </p>
          <p className="text-gray-700 mb-8">
            Thank you for your purchase. Your order has been successfully
            processed.
          </p>
          <Link to="/order">
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
              View Orders
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;
