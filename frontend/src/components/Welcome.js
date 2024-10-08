import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Welcome = () => {
  const navigate = useNavigate();

  const [chBoxStatus, setChBoxStatus] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    chBoxStatus
      ? navigate("/create-password")
      : toast.error("please agree terms of use");
  };
  return (
    <div className="flex flex-col bg-zinc-800 text-white h-screen">
      <div className="flex items-start mt-10 ml-60 ">
        <img src="./wallet.png" alt="logo" className="h-12 w-12" />
        <p className="text-3xl font-mono mt-2">WALLET</p>
      </div>

      <div>
        <div className="flex justify-center mt-8">
          <div className="flex justify-center border border-gray-600 rounded-lg w-1/2">
            <form>
              <div className="flex flex-col ">
                <h3 className="text-4xl mt-5 m-auto">Let's get started !!</h3>
                <img src="./wallet.png" alt="logo" className="h-auto" />
                <div class="flex justify-center">
                  <div class="flex items-center h-5">
                    <input
                      id="ch1"
                      type="checkbox"
                      class="w-4 h-4 mt-2 border border-gray-300 rounded focus:ring-3 focus:ring-slate-300 "
                      onChange={() => {
                        setChBoxStatus(!chBoxStatus);
                      }}
                    />
                  </div>
                  <label class="ms-2 text-lg text-gray-300">
                    I agree to the wallet's
                  </label>
                  <label class="ms-1 text-lg text-sky-600">Terms of use</label>
                </div>
                <div className="mt-4">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-full text-lg px-5 py-2.5 text-center bg-sky-600 hover:bg-sky-700 focus:ring-sky-800"
                  >
                    Create new Wallet
                  </button>

                  <button
                    type="submit"
                    className="w-full mt-4 mb-4 text-white border focus:ring-2 focus:outline-none font-medium rounded-full text-lg px-5 py-2.5 text-center hover:text-sky-600 hover:bg-white focus:ring-gray-200"
                  >
                    Import existing wallet
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
