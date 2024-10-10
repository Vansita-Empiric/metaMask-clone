import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Completion = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const walletId = location.state.id;

  const handleSubmit = async () => {
    navigate("/home", {
      state: { id: walletId },
    });
  };

  return (
    <div className="flex flex-col bg-zinc-800 text-white min-h-screen h-auto p-4 md:p-10"> {/* Container padding */}
      <div className="flex items-start mt-10 mb-6 mx-auto"> {/* Top margin and bottom margin */}
        <img src="./wallet.png" alt="logo" className="h-12 w-12" />
        <p className="text-3xl font-mono mt-2">WALLET</p>
      </div>

      <div className="flex justify-center">
        <div className="flex justify-center border border-gray-600 rounded-lg w-full md:w-2/3 lg:w-1/2 mb-6"> {/* Added bottom margin */}
          <div className="flex flex-col p-6"> {/* Inner padding */}
            <div className="flex justify-center mt-6">
              <img
                src="celebration.png"
                alt="celebration icon"
                className="h-10 w-10"
              />
            </div>
            <h3 className="text-4xl text-center mt-5 mb-4">Wallet creation successful</h3> {/* Bottom margin */}
            
            <div className="text-lg font-light mt-5 text-center mb-4"> {/* Bottom margin */}
              <p>You've successfully protected your wallet. Keep your Secret</p>
              <p>Recovery Phrase safe and secret -- it's your responsibility!</p>
            </div>
            <div className="text-md mt-4 mb-4"> {/* Bottom margin */}
              <p className="font-bold text-lg text-center mb-2">Remember:</p> {/* Bottom margin */}
              <div className="mt-2 text-center">
                <p>• Wallet can't recover your Secret Recovery Phrase.</p>
                <p>• Wallet will never ask you for your Secret Recovery Phrase.</p>
                <p>• Never share your Secret Recovery Phrase with anyone or risk your funds being stolen.</p>
              </div>
            </div>

            <div className="mt-6 flex justify-center mb-4"> {/* Bottom margin */}
              <button
                onClick={handleSubmit}
                type="button" // Changed to type="button" to prevent default form submission
                className="w-full sm:w-2/3 mb-12 text-white focus:ring-4 focus:outline-none font-medium rounded-full text-lg px-5 py-2.5 text-center bg-sky-600 hover:bg-sky-700 focus:ring-sky-800"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Completion;
