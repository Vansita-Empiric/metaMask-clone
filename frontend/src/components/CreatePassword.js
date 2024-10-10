import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [chBoxStatus, setChBoxStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      if (chBoxStatus) {
        try {
          const apiCreate = "http://localhost:8008/create";
          const response = await axios.post(
            apiCreate,
            { password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const walletId = response.data.uWallet._id;
          const seed_phrase = response.data.uWallet.seed_phrase;

          if (response.status === 201) {
            navigate("/review-recovery-phase", {
              state: { id: walletId, seedPhrase: seed_phrase },
            });
          } else {
            toast.error("Wallet creation failed");
          }
        } catch (error) {
          toast.error("Internal server error");
        }
      } else {
        toast.error("Please agree to the terms.");
      }
    } else {
      toast.error("Password does not match");
    }
  };

  return (
    <div className="flex flex-col bg-zinc-800 text-white h-auto min-h-screen p-4 md:p-10">
      <div className="flex items-start mt-10 mx-auto mb-6">
        <img src="./wallet.png" alt="logo" className="h-12 w-12" />
        <p className="text-3xl font-mono mt-2">WALLET</p>
      </div>
      <div className="flex justify-center mt-8">
        <div className="flex justify-center border border-gray-600 rounded-lg w-full md:w-1/2 lg:w-1/3 mb-6">
          <div className="flex flex-col w-full p-6"> {/* Added padding here */}
            <h3 className="text-4xl mt-4 font-bold text-center">Create Password</h3>
            <div className="text-lg font-light mt-3 text-center mb-4">
              <p>This password will unlock your wallet only on this device. Wallet cannot recover this password.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mt-4">
                <label className="text-white text-lg mb-2">New Password:</label>
                <input
                  type="password"
                  className="mt-2 px-5 py-2.5 text-black rounded-lg focus:ring-4 focus:ring-gray-200 bg-slate-100 mb-4"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-gray-400 text-md mb-2">
                  A strong password can improve the security of your wallet should your device be stolen or compromised.
                </p>
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-white text-lg mb-2">Confirm Password:</label>
                <input
                  type="password"
                  className="mt-2 px-5 py-2.5 text-black rounded-lg focus:ring-4 focus:ring-gray-200 bg-slate-100 mb-4"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center mt-4 mb-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-slate-300"
                  onChange={() => setChBoxStatus(!chBoxStatus)}
                />
                <p className="ms-2 text-md text-gray-400">
                  I understand that Wallet cannot recover this password for me.
                </p>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full mb-12 text-white focus:ring-4 focus:outline-none font-medium rounded-full text-lg px-5 py-2.5 text-center bg-sky-600 hover:bg-sky-700 focus:ring-sky-800"
                >
                  Create a New Wallet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
