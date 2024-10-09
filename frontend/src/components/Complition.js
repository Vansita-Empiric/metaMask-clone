import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Complition = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const walletId = location.state.id;

  const handleSubmit = async () => {
    navigate("/home", {
      state: { id: walletId },
    });
  }
  return (
    <div className="flex flex-col bg-zinc-800 text-white h-screen">
      <div className="flex items-start mt-10 ml-60 ">
        <img src="./wallet.png" alt="logo" className="h-12 w-12" />
        <p className="text-3xl font-mono mt-2">WALLET</p>
      </div>

      <div>
        <div className="flex justify-center mt-8">
          <div className="flex justify-center border border-gray-600 rounded-lg w-1/2">
            <div className="flex flex-col">
              <div className="flex justify-center mt-10">
                <img
                  src="celebration.png"
                  alt="celebration icon"
                  className="h-10 w-10"
                />
              </div>
              <h3 className="text-4xl mt-5 m-auto">
                Wallet creation successful
              </h3>

              <div className="text-lg font-light mt-5">
                <p className="flex justify-center">
                  You've successfully protected your wallet. Keep your Secret
                </p>
                <p className="flex justify-center">
                  Recovery Phrase safe and secret -- it's your responsibility!
                </p>
              </div>
              <div className="text-md  mt-4 ml-7">
                <p className="flex font-bold justify-center">Remember:</p>
                <div>
                  <p className="flex justify-center">
                    • Wallet can't recover your Secret Recovery Phrase.
                  </p>
                  <p className="flex justify-center">
                    • Wallet will never ask you for your Secret Recovery Phrase.
                  </p>
                  <p className="flex justify-center">
                    • Never share your Secret Recovery Phrase with anyone or
                    risk your funds being stolen.
                  </p>
                </div>
              </div>

              
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="w-2/3 mb-12 text-white focus:ring-4 focus:outline-none font-medium rounded-full text-lg px-5 py-2.5 text-center bg-sky-600 hover:bg-sky-700 focus:ring-sky-800"
                  >
                    Next
                  </button>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complition;
