import React from "react";
import { Link, useLocation } from "react-router-dom";

const ReviewRecoveryPhase = () => {
  const location = useLocation();

  const seed = location.state.seedPhrase;
  const splitSeed = seed.split(" ");
  return (
    <div className="flex flex-col bg-zinc-800 text-white h-screen">
      <div className="flex items-start mt-10 ml-60 ">
        <img src="./wallet.png" alt="logo" className="h-12 w-12" />
        <p className="text-3xl font-mono mt-2">WALLET</p>
      </div>
      <div>
        <div className="flex justify-center mt-8">
          <div className="flex justify-center border border-gray-600 rounded-lg w-1/2">
            <div className="flex flex-col ">
              <h3 className="text-4xl mt-5 m-auto">Write down your Secret</h3>
              <h3 className="text-4xl m-auto">Recovery Phrase</h3>

              <div className="text-lg font-light mt-5">
                <p className="flex justify-center">
                  Write down this 12-word Secret Recovery Phrase and save it in
                  a
                </p>
                <p className="flex justify-center">
                  place that you trust and only you can access.
                </p>
              </div>
              <div className="text-md  mt-4 ml-7">
                <p className="font-bold text-lg">Tips:</p>
                <div className="ml-5 ">
                  <p>• Write down and store in multiple secret places.</p>
                  <p>• Store in a safe deposit box.</p>
                </div>
              </div>

              {/* seed phrase start */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                {splitSeed.map((word, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        flexBasis: "20%",
                        margin: "5px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="border border-gray-300 rounded-lg text-white"
                        style={{
                          width: "150px",
                          height: "50px",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "0.5rem",
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
              {/* seed phrase end */}

              <Link to="/completion">
                <div className="mt-4 flex justify-center">
                  <button
                    type="submit"
                    className="w-1/2 mb-12 text-white focus:ring-4 focus:outline-none font-medium rounded-full text-lg px-5 py-2.5 text-center bg-sky-600 hover:bg-sky-700 focus:ring-sky-800"
                  >
                    Next
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewRecoveryPhase;
