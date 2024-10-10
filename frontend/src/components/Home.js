import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FaEthereum } from "react-icons/fa";
import {
  BiSolidCopy,
  BiDotsVerticalRounded,
  BiSolidCheckShield,
  BiSolidMessageError,
} from "react-icons/bi";
import { FaBell } from "react-icons/fa6";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import {
  PiArrowSquareOut,
  PiArrowArcRightFill,
  PiTreePalm,
} from "react-icons/pi";
import { AiOutlineArrowsAlt, AiFillLock } from "react-icons/ai";
import { IoIosCube } from "react-icons/io";
import { RiSettings4Fill } from "react-icons/ri";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { MdAddCircle, MdAdd } from "react-icons/md";
import {
  TbArrowsLeftRight,
  TbRefresh,
  TbMessageReportFilled,
} from "react-icons/tb";
import { GoGraph } from "react-icons/go";
import { SlArrowLeft } from "react-icons/sl";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const location = useLocation();

  const walletId = location.state.id;

  // console.log("id:--------------", walletId);

  const [showModal, setShowModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [newContent, setNewContent] = useState();
  const [receiver, setReceiver] = useState();
  const [amount, setAmount] = useState();
  const [data, setData] = useState([0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(data[0]?.name || 'Select Account');
  const [publicKey, setPublicKey] = useState(data[0]?.publicKey || '');
  const [balance, setBalance] = useState(data[0]?.balance || 0);
  const [accountId, setAccountId] = useState();

  const handleAccountChange = async (e) => {
    setSelectedAccount(e.name);
    setPublicKey(e.publicKey);
    setBalance(e.balance);
    setAccountId(e._id);
  };

  const copyPublicKey = async () => {
    if (publicKey) {
      try {
        await navigator.clipboard.writeText(publicKey);
        toast.success('Public key copied to clipboard!'); 
      } catch (error) {
        toast.error('Failed to copy public key: ', error); 
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiAddAccount = `http://localhost:8008/createAccount/${walletId}`;

      const response = await axios.post(
        apiAddAccount,
        { name: newContent },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response-----------------", response);

      if (response.status === 201) {
        setShowModal(false);
        toast.success("Account created successfully.");
      } else {
        toast.error("Account creation failed");
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  const handleSendETH = async (e) => {
    e.preventDefault();
    try {
      const apiSendETH = `http://localhost:8008/transaction/${accountId}`;

      const response = await axios.post(
        apiSendETH,
        { receiver: receiver, amount: amount },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Transaction successful");
      } else {
        toast.error("Transaction failed");
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  const getAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiGetAccount = `http://localhost:8008/getConnectedAccounts/${walletId}`;

      const response = await axios.get(apiGetAccount);

      setData(response.data.findById);
      console.log("setData--------------------------------------------", data);

      // console.log("in get accounts---------------------", response.data.findById[0].name);
      // console.log("in get accounts---------------------", response.data.findById[0].publicKey);
    } catch (error) {
      console.error("Error fetching data", error);
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false); // Set loading to false when API call finishes
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          {data.length > 0 ? (
            
              <div className="flex flex-col bg-zinc-900 text-white min-h-screen w-auto h-auto px-4 sm:px-6 md:px-8 lg:px-10 overflow-x-hidden overflow-y-hidden">
                <div className="flex items-center mt-10 mx-auto mb-6">
                  <img src="./wallet.png" alt="logo" className="h-12 w-12" />
                  <p className="text-3xl font-mono mt-2">WALLET</p>
                </div>

                <div className="flex items-center flex-col mt-8 px-4 sm:px-6 md:px-8 lg:px-10">
                  <div className="py-3 px-3 bg-zinc-800 shadow-md shadow-black border-b-2 border-zinc-900 w-full md:w-1/2 mx-auto">
                    <div className="flex flex-wrap justify-between items-center">
                      {/* Dropdown for Network */}
                      <Menu
                        as="div"
                        className="relative inline-block text-left w-auto sm:w-auto "
                      >
                        <div className="flex justify-start w-auto">
                          <MenuButton className="inline-flex bg-zinc-900 px-3 py-2 text-sm text-white shadow-sm rounded-full hover:bg-black sm:px-2 sm:py-1">
                            <FaEthereum className="text-white mt-0.5 h-4 w-4" />
                            <span className="hidden sm:block">
                              Ethereum Mainnet
                            </span>{" "}
                            {/* Text hidden on smaller screens */}
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="-mr-1 h-5 w-5 text-gray-300"
                            />
                          </MenuButton>
                        </div>

                        <MenuItems
                          transition
                          className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-zinc-900 shadow-lg ring-1 ring-white ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <button className="block px-4 py-2 text-sm text-white data-[focus]:text-sky-500">
                                Linea Mainnet
                              </button>
                            </MenuItem>
                            <form action="#" method="POST">
                              <MenuItem>
                                <button
                                  type="submit"
                                  className="w-full mt-2 px-4 py-2 text-center text-sm text-sky-500 data-[focus]:bg-sky-500 data-[focus]:text-zinc-900 border-2 border-sky-500 rounded-full"
                                >
                                  + Add Network
                                </button>
                              </MenuItem>
                            </form>
                          </div>
                        </MenuItems>
                      </Menu>

                      {/* Account Dropdown */}
                      <Menu
                        as="div"
                        className="relative inline-block text-left w-auto md:w-auto"
                      >
                        <div className="flex justify-start">
                          <MenuButton className="inline-flex w-auto gap-x-1.5 bg-transparent text-sm font-semibold text-white shadow-sm rounded-full">
                            <img
                              alt="account"
                              src="./account.png"
                              className="text-white mt-0.5 h-4 w-4"
                            />
                            {selectedAccount}
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="-mr-1 h-5 w-5 text-gray-300"
                            />
                          </MenuButton>
                        </div>
                        <p className="ml-3 text-sm inline-flex gap-0.5 text-white">
                          {publicKey.slice(0,6)}...{publicKey.slice(-4)}
                          <BiSolidCopy className="text-white mt-0.5 h-3.5 w-3.5" onClick={copyPublicKey} />
                        </p>

                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-zinc-900 shadow-lg ring-1 ring-white ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          <div className="py-1">
                          {data.map((account, index) => (
                            <MenuItem>
                            <div key={index}>
                              <button className="block px-4 py-2 text-sm text-white data-[focus]:text-sky-500"
                                onClick={() => handleAccountChange(account)}
                              >
                                {account.name}
                              </button>
                              </div>
                            </MenuItem>
                            ))}

                            <form>
                              <MenuItem>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShowModal(true);
                                  }}
                                  className="w-full mt-2 px-4 py-2 text-center text-sm text-sky-500 data-[focus]:bg-sky-500 data-[focus]:text-zinc-900 border-2 border-sky-500 rounded-full"
                                >
                                  + Add Account
                                </button>
                              </MenuItem>
                            </form>
                          </div>
                        </MenuItems>
                      </Menu>

                      {/* Last Dropdown */}
                      <Menu
                        as="div"
                        className="relative inline-block text-left w-auto md:w-auto"
                      >
                        <div className="flex justify-start">
                          <MenuButton className="inline-flex w-auto gap-x-1.5 bg-transparent px-3 py-2 text-lg text-white shadow-sm rounded-full">
                            <BiDotsVerticalRounded className="text-white mt-0.5 h-7 w-6" />
                          </MenuButton>
                        </div>

                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-zinc-900 shadow-lg ring-1 ring-white ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <button className="flex gap-1.5 px-4 py-2 text-sm text-white data-[focus]:text-sky-500">
                                <FaBell className="text-white h-3 w-3 mt-1" />
                                Notifications
                              </button>
                            </MenuItem>
                            <hr className="bg-gray-200 ml-2 mr-2" />
                            <MenuItem>
                              <button className="flex gap-1.5 px-4 py-2 text-sm text-white data-[focus]:text-sky-500">
                                <HiMiniSquares2X2 className="text-white h-3 w-3 mt-1" />
                                Account Details
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button className="flex gap-1.5 px-4 py-2 text-sm text-white data-[focus]:text-sky-500">
                                <PiArrowSquareOut className="text-white h-3 w-3 mt-1" />
                                View on explorer
                              </button>
                            </MenuItem>
                            <hr className="bg-gray-200 ml-2 mr-2" />
                            <MenuItem>
                              <button className="flex gap-1.5 px-4 py-2 text-sm text-white data-[focus]:text-sky-500">
                                <BiSolidCheckShield className="text-white h-3 w-3 mt-1" />
                                All permissions
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button className="flex gap-1.5 px-4 py-2 text-sm text-white data-[focus]:text-sky-500">
                                <AiOutlineArrowsAlt className="text-white h-3 w-3 mt-1" />
                                Expand view
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button className="flex gap-1.5 px-4 py-2 text-sm text-white data-[focus]:text-sky-500">
                                <IoIosCube className="text-white h-3 w-3 mt-1" />
                                Snaps
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button className="flex gap-1.5 px-4 py-2 text-sm text-white data-[focus]:text-sky-500">
                                <BiSolidMessageError className="text-white h-3 w-3 mt-1" />
                                Support
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button className="flex gap-1.5 px-4 py-2 text-sm text-white data-[focus]:text-sky-500">
                                <RiSettings4Fill className="text-white h-3 w-3 mt-1" />
                                Settings
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button className="flex gap-1.5 px-4 py-2 text-sm text-white data-[focus]:text-sky-500">
                                <AiFillLock className="text-white h-3 w-3 mt-1" />
                                Lock Wallet
                              </button>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </Menu>
                    </div>
                  </div>

                  <div className="py-6 px-3 bg-zinc-800 shadow-md w-full md:w-1/2 mx-auto">
                    <p className="flex justify-center text-3xl">{balance} ETH</p>
                    <p className="flex justify-center">$0.00 USD</p>
                    <p className="flex justify-center mb-9">+$0.00 (+0.00%)</p>

                    <div className="flex flex-wrap justify-center mt-5 gap-4 text-sky-500">
                      <MdAddCircle className="h-10 w-10" />
                      <BsArrowUpRightCircleFill
                        onClick={(e) => {
                          e.preventDefault();
                          setShowSendModal(true);
                        }}
                        className="h-9 w-9"
                      />
                      <TbArrowsLeftRight className="h-9 w-9 px-1 py-0.5 bg-sky-500 text-zinc-800 rounded-full" />
                      <PiArrowArcRightFill className="h-9 w-9 px-1 py-0.5 bg-sky-500 text-zinc-800 rounded-full" />
                      <GoGraph className="h-9 w-9 px-1 py-0.5 bg-sky-500 text-zinc-800 rounded-full" />
                    </div>

                    <div className="flex flex-wrap justify-center ml-1 text-sm gap-4 text-white">
                      <p>Buy / Sell</p>
                      <p>Send</p>
                      <p>Swap</p>
                      <p>Bridge</p>
                      <p>Portfolio</p>
                    </div>
                  </div>

                  <div className="py-6 px-3 bg-zinc-800 shadow-md w-full md:w-1/2 mx-auto">
                    <div className="flex flex-wrap font-semibold justify-between text-md">
                      <button className="flex-1 py-3 text-sky-500 border-b-2 border-b-sky-500">
                        Tokens
                      </button>
                      <button className="flex-1 py-3 border-b-2 border-b-white">
                        NFTs
                      </button>
                      <button className="flex-1 py-3 border-b-2 border-b-white">
                        Activity
                      </button>
                    </div>
                  </div>

                  <div className="-mt-3 px-3 bg-zinc-800 shadow-md w-full md:w-1/2 mx-auto">
                    <div className="bg-gradient-to-r from-sky-600 to-purple-500 rounded-md">
                      <p className="font-semibold py-3 px-3 text-left">
                        Fund your wallet
                      </p>
                      <p className="px-3 text-left">
                        Get started by adding some ETH to your wallet.
                      </p>
                      <button className="bg-white text-black rounded-full px-6 py-2 m-3 text-md">
                        Buy ETH
                      </button>
                    </div>
                  </div>

                  <div className="py-6 px-3 bg-zinc-800 shadow-md w-full md:w-1/2 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex gap-3">
                        <FaEthereum className="text-gray-600 bg-white rounded-full h-8 w-8 py-0.5" />
                        <div className="text-sm -mt-1">
                          <p className="flex flex-row gap-1">
                            Ethereum•
                            <span className="flex flex-row text-sky-500 gap-1">
                              Stake
                              <PiTreePalm className="text-sky-500 h-4 w-4" />
                            </span>
                          </p>
                          <p className="text-green-500">+2.99%</p>
                        </div>
                      </div>
                      <div className="text-sm -mt-1">
                        <p className="flex flex-row gap-1 justify-end">0 ETH</p>
                        <p className="text-gray-400 text-right">$0.00 USD</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col py-3 px-3 gap-3 bg-zinc-800 shadow-md w-full md:w-1/2 mx-auto">
                    <div className="flex gap-2 text-sky-500 items-center">
                      <MdAdd className="h-4 w-4" />
                      <button className="text-left">Receive Tokens</button>
                    </div>
                    <div className="flex gap-2 text-sky-500 items-center">
                      <MdAdd className="h-4 w-4" />
                      <button className="text-left">Import Tokens</button>
                    </div>
                    <div className="flex gap-2 text-sky-500 items-center">
                      <TbRefresh className="h-4 w-4" />
                      <button className="text-left">Refresh List</button>
                    </div>
                    <div className="flex gap-2 text-sky-500 items-center">
                      <TbMessageReportFilled className="h-4 w-4" />
                      <button className="text-left">Wallet Support</button>
                    </div>
                  </div>
                </div>
              </div>
            
          ) : (
            <div>No accounts found</div>
          )}
        </div>
      )}

      {showModal ? (
        <>
          <div className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-full sm:max-w-4xl">
              {" "}
              {/* Changed max-w-4xl to max-w-full for smaller screens */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-zinc-800 outline-none focus:outline-none">
                <div className="flex items-center justify-between p-5">
                  <SlArrowLeft className="text-white h-4 w-4" />
                  <h3 className="text-xl text-white font-semibold truncate">
                    {" "}
                    {/* Added truncate for long titles */}
                    Add account
                  </h3>
                  <button
                    className="bg-transparent text-3xl font-mono text-gray-300"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    x
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col w-full">
                  <div className="px-8 pb-4 w-full">
                    <label className="block text-white text-md font-normal mb-1">
                      Account name
                    </label>
                    <input
                      onChange={(e) => setNewContent(e.target.value)}
                      className="shadow border-2 border-white bg-zinc-800 rounded w-full py-2 px-2 text-white" // Increased padding for better touch targets
                      required // Added required for better form validation
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-6 rounded-b md:flex-row">
                    {" "}
                    {/* Stacked buttons on smaller screens */}
                    <button
                      className="text-sky-500 border-2 border-sky-500 rounded-full px-6 py-2 text-sm flex-1" // flex-1 for equal width on flex containers
                      type="button" // Changed to type="button" to avoid form submission
                      onClick={() => {
                        setShowModal(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="text-zinc-800 border-2 border-sky-500 rounded-full bg-sky-500 px-6 py-2 text-sm flex-1" // flex-1 for equal width
                      type="submit"
                    >
                      Add account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {showSendModal ? (
        <>
          <div className="flex overflow-x-hidden justify-center overflow-y-auto fixed inset-52 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-full sm:max-w-4xl">
              {" "}
              {/* Changed max-w-4xl to max-w-full for smaller screens */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-zinc-800 outline-none focus:outline-none">
                <div className="flex items-center justify-between p-5">
                  <SlArrowLeft className="text-white h-4 w-4" />
                  <h3 className="text-xl text-white font-semibold truncate">
                    {" "}
                    {/* Added truncate for long titles */}
                    Send ETH
                  </h3>
                  <button
                    className="bg-transparent text-3xl font-mono text-gray-300"
                    onClick={() => {
                      setShowSendModal(false);
                    }}
                  >
                    x
                  </button>
                </div>

                <form onSubmit={handleSendETH} className="flex flex-col w-full">
                  <div className="px-8 pb-4 w-full">
                    <label className="block text-white text-md font-normal mb-1">
                      Receiver address
                    </label>
                    <input
                      onChange={(e) => setReceiver(e.target.value)}
                      className="shadow border-2 border-white bg-zinc-800 rounded w-full py-2 px-2 text-white" // Increased padding for better touch targets
                      required // Added required for better form validation
                    />
                  </div>

                  <div className="px-8 pb-4 w-full">
                    <label className="block text-white text-md font-normal mb-1">
                      Amount
                    </label>
                    <input
                      onChange={(e) => setAmount(e.target.value)}
                      className="shadow border-2 border-white bg-zinc-800 rounded w-full py-2 px-2 text-white" // Increased padding for better touch targets
                      required // Added required for better form validation
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-6 rounded-b md:flex-row">
                    {" "}
                    {/* Stacked buttons on smaller screens */}
                    <button
                      className="text-sky-500 border-2 border-sky-500 rounded-full px-6 py-2 text-sm flex-1" // flex-1 for equal width on flex containers
                      type="button" // Changed to type="button" to avoid form submission
                      onClick={() => {
                        setShowSendModal(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="text-zinc-800 border-2 border-sky-500 rounded-full bg-sky-500 px-6 py-2 text-sm flex-1" // flex-1 for equal width
                      type="submit"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Home;
