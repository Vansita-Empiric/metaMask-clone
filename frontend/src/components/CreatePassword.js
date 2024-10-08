import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [chBoxStatus, setChBoxStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

      if (password === confirmPassword) {
        if (chBoxStatus) {
          try {
            
            const apiCreate = "http://localhost:8008/create";
            const response = await axios.post(apiCreate, {password}, {
              headers: {
                "Content-Type": "application/json",
              },
            });            
            // console.log("all------",response);
            // console.log("phrase------",response.data.uWallet.seed_phrase);
            
            if (response.status === 201) {              
              navigate("/review-recovery-phase", {state:{seedPhrase:response.data.uWallet.seed_phrase}});
            } else {
              toast.error("Wallet creation failed");
            }
          } catch (error) {
            toast.error("Internal server error");
          }
        } else {
          toast.error("Please agree terms.");
        }
      } else {
        toast.error("Password does not match");
      }
    
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
            <div className="flex flex-col ">
              <h3 className="text-4xl mt-10 font-bold m-auto">
                Create Password
              </h3>
              <div className="text-lg font-light mt-3">
                <p>This password will unloack your wallet only on this</p>
                <p className="flex justify-center">
                  device. Wallet can not recover this password.
                </p>
              </div>
              <form>
                <div className="flex justify-start mt-9">
                  <label className="text-white text-lg">New Password:</label>
                </div>
                <input
                  type="password"
                  className="mt-2 px-5 py-2.5 text-black rounded-lg focus:ring-4 focus:ring-gray-200 bg-slate-100"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
                <p className="text-gray-400 text-md">
                  A strong password can improve the security of your
                </p>
                <p className="text-gray-400 text-md">
                  wallet should your device be stolen or compromised.
                </p>
                <div className="flex justify-start mt-5">
                  <label className="text-white text-lg">
                    Confirm Password:
                  </label>
                </div>
                <input
                  type="password"
                  className="mt-2 px-5 py-2.5 text-black rounded-lg focus:ring-4 focus:ring-gray-200 bg-slate-100"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  required
                />
                <div className="flex justify-start mt-4">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      className="w-4 h-4 mt-2 border border-gray-300 rounded focus:ring-3 focus:ring-slate-300 "
                      onChange={() => {
                        setChBoxStatus(!chBoxStatus);
                      }}
                    />
                  </div>
                  <p className="ms-2 text-md text-gray-400">
                    I understand that Wallet cannot recover this
                  </p>
                </div>
                <p className="ml-6 text-md text-gray-400">password for me.</p>
                <div className="mt-10">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="w-full mb-12 text-white focus:ring-4 focus:outline-none font-medium rounded-full text-lg px-5 py-2.5 text-center bg-sky-600 hover:bg-sky-700 focus:ring-sky-800"
                  >
                    Create a new Wallet
                  </button> 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
