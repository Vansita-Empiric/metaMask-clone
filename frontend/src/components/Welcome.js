import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Welcome = () => {
  const navigate = useNavigate();
  const [chBoxStatus, setChBoxStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chBoxStatus) {
      navigate("/create-password");
    } else {
      toast.error("Please agree to the terms of use");
    }
  };

  return (
    <div className="flex flex-col bg-zinc-800 text-white h-auto min-h-screen p-4 md:p-10">
      <div className="flex items-start mt-10 mx-auto mb-6">
        <img src="./wallet.png" alt="logo" className="h-12 w-12" />
        <p className="text-3xl font-mono mt-2">WALLET</p>
      </div>

      <div className="flex justify-center mt-8">
        <div className="flex justify-center border border-gray-600 rounded-lg w-full md:w-1/2 lg:w-1/3 mb-8">
          <form className="w-full p-6">
            <div className="flex flex-col">
              <h3 className="text-4xl mt-5 text-center mb-4">Let's get started!</h3>
              <img src="./wallet.png" alt="logo" className="h-auto mx-auto mt-4 mb-4" />
              
              <div className="flex items-center justify-center mt-4 mb-4">
                <input
                  id="ch1"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-slate-300"
                  checked={chBoxStatus} // Ensure controlled input
                  onChange={() => setChBoxStatus(!chBoxStatus)} // Toggle the state
                />
                <label htmlFor="ch1" className="ms-2 text-lg text-gray-300">
                  I agree to the wallet's <span className="text-sky-600">Terms of use</span>
                </label>
              </div>
              
              <div className="mt-4">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-full text-lg px-5 py-2.5 text-center bg-sky-600 hover:bg-sky-700 focus:ring-sky-800 mb-4"
                >
                  Create New Wallet
                </button>

                <button
                  type="button"
                  className="w-full text-white border focus:ring-2 focus:outline-none font-medium rounded-full text-lg px-5 py-2.5 text-center hover:text-sky-600 hover:bg-white focus:ring-gray-200"
                >
                  Import Existing Wallet
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
