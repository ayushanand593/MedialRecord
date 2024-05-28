//import React from "react";
import "./navbar.css";
import healthReport from "../../assets/health-report.png"
import { loadAccount } from "../../store/interactions.js";
import { useDispatch, useSelector } from "react-redux";
import Blockies from "react-blockies";
import config from "../../config.json";

import { useFirebase } from "../../firebaseconfig.js";
// import { Link } from "react-router-dom";
const Navbar = () =>{
  const {LogOut,removeUserDocRef}=useFirebase();
  const handleLogOut= ()=>{
    LogOut();
    removeUserDocRef();
    window.location.href="/"
  }
  
    const dispatch = useDispatch();
    const provider = useSelector((state) => state.provider.connection);
    const account = useSelector((state) => state.provider.account);
    const balance = useSelector((state) => state.provider.balance);
    const chainId = useSelector((state) => state.provider.chainId);
    const connectHandler = async (e) => {
        await loadAccount(provider, dispatch);
      };
    const networkHandler = async (e) => {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: e.target.value,
            },
          ],
        });
      };
    return(
      <div class="flex flex-row h-16 bg-gray-800">
      <div class="flex flex-1 items-center justify-center text-white">
          <img src={healthReport} width="40" height="40" alt="healthReport" class="mr-2" />
          <h2 class="text-xl">Medical Record</h2>
      </div>
      <div class="flex flex-1 items-center">
          <select name="network" id="network" onChange={networkHandler} value={config[chainId]} class="border-2 border-white py-2 px-6 rounded-lg mx-8 bg-gray-800 text-white w-full">
              <option value="0" disabled>Select Network</option>
              <option value="11155111">Localhost</option>
              <option value="11155111">Sepolia</option>
          </select>
      </div>
      <div class="flex flex-1 items-center justify-center">
          {balance ? (
              <p class="text-white mr-3">
                  <small>My Balance :</small>
                  {Number(balance).toFixed(4)}
              </p>
          ) : (
              <p class="text-white">
                  <small>My Balance :</small>
                  0ETH
              </p>
          )}
          {account ? (
              <a href="#" class="text-white flex items-center p-2">
                  {account.slice(0, 5) + "...." + account.slice(38, 42)}
                  <Blockies
                      seed={account}
                      size={10}
                      scale={3}
                      color="#2187D0"
                      bgColor="#F1F2F9"
                      spotColor="#767F92"
                      class="identicon ml-2"
                  />
              </a>
          ) : (
              <>
                  <button class="border-2 text-white border-white rounded-full py-2 px-6 mx-8 cursor-pointer" onClick={connectHandler}>Connect</button>
              </>
          )}
          <button onClick={handleLogOut} class="border-2 text-white border-white rounded-full py-2 px-6 mx-8 cursor-pointer">Logout</button>
        
      </div>
  </div>
  
    );
}
export default Navbar