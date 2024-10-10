import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReviewRecoveryPhase = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const walletId = location.state.id;
  const seed = location.state.seedPhrase;
  const splitSeed = seed.split(" ");

  const handleSubmit = async () => {
    navigate("/completion", {
      state: { id: walletId },
    });
  };

  return (
    <div className="flex flex-col bg-zinc-800 text-white h-auto min-h-screen p-4 sm:p-1 md:p-10">
      <div className="flex items-start mt-10 mb-6 mx-auto">
        <img src="./wallet.png" alt="logo" className="h-12 w-12" />
        <p className="text-3xl font-mono mt-2">WALLET</p>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center border border-gray-600 rounded-lg w-full md:w-2/3 lg:w-1/2 m-4"> {/* Added margin */}
          <div className="flex flex-col p-6">
            <h3 className="text-4xl text-center mb-4">Write down your Secret Recovery Phrase</h3>

            <div className="text-lg font-light mt-5 text-center">
              <p>Write down this 12-word Secret Recovery Phrase and save it in a place that you trust and only you can access.</p>
            </div>

            <div className="text-md mt-4">
              <p className="font-bold text-lg text-center">Tips:</p>
              <div className="mt-2 text-center">
                <p>• Write down and store in multiple secret places.</p>
                <p>• Store in a safe deposit box.</p>
              </div>
            </div>

            {/* Seed phrase display */}
            <div className="flex flex-wrap justify-center mt-5">
              {splitSeed.map((word, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-center p-2"
                    style={{ flexBasis: "calc(25% - 10px)" }} // Responsive width
                  >
                    <div
                      className="border border-gray-300 rounded-lg text-white flex justify-center items-center gap-2 m-1" // Added margin
                      style={{
                        width: "150px",
                        height: "50px",
                        padding: "0.5rem",
                      }}
                    >
                      <p>{index + 1}.</p>
                      <p>{word}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmit}
                type="button"
                className="w-full sm:w-1/2 mb-12 text-white focus:ring-4 focus:outline-none font-medium rounded-full text-lg px-5 py-2.5 text-center bg-sky-600 hover:bg-sky-700 focus:ring-sky-800"
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

export default ReviewRecoveryPhase;
