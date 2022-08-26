import Image from "next/image";
import metamask from "../public/icons/metamask.svg";
import portis from "../public/icons/portis.svg";
import binance from "../public/icons/binance.svg";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import tooltip from "../public/icons/tooltip.svg"
import providerOptionsObject from '../providerOptions';
import { useState } from "react";
import Portis from "@portis/web3";
import React from "react";
import twitter from "../public/icons/twitter.svg";
import discord from "../public/icons/discord.svg";
import telegram from "../public/icons/telegram.svg";
import logo from "../public/icons/metag_logo.svg";
import logo_footer from "../public/icons/logo_footer.svg";
import Gradient from "../components/Gradient";
import { MdOutlineContentCopy } from "react-icons/md";
import { BsThreeDots, BsFillPlusCircleFill } from "react-icons/bs";
// import { Switch } from "@chakra-ui/switch";

function Dashboard() {

  const [metamaskAccount, setMetamaskAccount] = useState("");
  const [binanceAccount, setBinanceAccount] = useState("");
  const [portisAccount, setPortisAccount] = useState("");
  const [userMetadata, setUserMetadata] = useState(null);

  const connectWallet = async (event) => {
    
    let injectedProvider;
    let providerOptions;
    if (event.target.name == 'metamask') {
      providerOptions = providerOptionsObject.metamask;
      injectedProvider = false;
    }
    if (event.target.name == 'portis') {
      providerOptions = {
        portis: {
          package: Portis, // required
          registerPageByDefault: false,
          options: {
            id: process.env.NEXT_PUBLIC_PORTIS_ID
          }
        }
      };
      injectedProvider = true;
    }
    if (event.target.name == 'binance') {
     providerOptions = providerOptionsObject.binance;
     injectedProvider = true;
    }

    const web3Modal = new Web3Modal({
      cacheProvider: false, // optional
      disableInjectedProvider: injectedProvider,
      providerOptions
    });

    await web3Modal.clearCachedProvider();

    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      console.log('accounts[0]', accounts[0]);
      if (event.target.name == 'metamask') {
        setMetamaskAccount(accounts[0]);
      }
      if (event.target.name == 'binance') {
        setBinanceAccount(accounts[0]);
      }
      if (event.target.name == 'portis') {
        setPortisAccount(accounts[0]);
      }

      provider.on("accountsChanged", (accounts) => {
        if (event.target.name == 'metamask') {
          setMetamaskAccount(accounts[0]);
         }
         if (event.target.name == 'binance') {
          setBinanceAccount(accounts[0]);
         }
         if (event.target.name == 'portis') {
          setPortisAccount(accounts[0]);
         }
      });
    }
      catch (error) {
        console.log('error', error);
    }
  }

  return (
    <>
      <Gradient />
      <div className="text-[#F8FAFC] text-[24px] px-24 pb-6 pt-10 font-roboto font-bold relative">
        Admin Dashboard
      </div>
      <div className="flex flex-col px-24 relative">
        <div className=" bg-[#0f172a4d] rounded-3xl p-7">
          <div className="flex flex-col ">
            <h4>Crypto Accounts</h4>
            <h5 className="text-[#94A3B8] font-normal">
              Attach your wallet address
            </h5>
            <div className="flex  items-center mt-8 justify-between">
              <div className="flex">
                <Image src={metamask} alt="wallet_logo" />
                <h6 className="pl-3 pr-2 font-medium">Metamask</h6>
                <Image src={tooltip} alt="info" />
              </div>
              <input
                type="text"
                placeholder="Press Connect..."
                className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 w-[600px]"
                value={metamaskAccount}
              />
              <button
                className=" font-roboto  border-2 px-[60px] py-2 border-[#6633FF] hover:bg-[#6633FF]"
                onClick={connectWallet}
                name="metamask"
              >
                Connect
              </button>
            </div>
            <div className="flex  items-center justify-between mt-10">
              <div className="flex">
                <Image src={portis} alt="wallet_logo" />
                <h6 className="pl-3 pr-2 font-medium">Portis Wallet</h6>
                <Image src={tooltip} alt="info" />
              </div>
              <input
                type="text"
                placeholder="Press Connect..."
                className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 w-[600px]"
                value={portisAccount}
              />
              <button
                className="font-roboto  border-2 px-[60px] py-2 border-[#6633FF] hover:bg-[#6633FF]"
                onClick={connectWallet}
                name="portis"
              >
                Connect
              </button>
            </div>
            <div className="flex  items-center justify-between mt-10 mb-10">
              <div className="flex">
                <Image src={binance} alt="wallet_logo" />
                <h6 className="pl-3 pr-2 font-medium">Binance Wallet</h6>
                <Image src={tooltip} alt="info" />
              </div>
              <input
                type="text"
                placeholder="Press Connect..."
                className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 w-[600px]"
                value={binanceAccount}
              />
              <button
                className="font-roboto  border-2 px-[60px] py-2 border-[#6633FF] hover:bg-[#6633FF]"
                onClick={connectWallet}
                name="binance"
              >
                Connect
              </button>
            </div>
          </div>
          <button className="font-roboto  border-2 px-[60px] py-2 border-[#6633FF] hover:bg-[#6633FF]">
            Add New Wallet
          </button>
        </div>
        <div className=" bg-[#0f172a4d] rounded-3xl p-7 mt-6">
          <div className="flex flex-col">
            <h4>Social Media Accounts</h4>
            <h5 className="text-[#94A3B8]">Link Your Social Accounts</h5>
            <div className="flex  items-center mt-8">
              <h6 className="pl-3 pr-2">Twitter</h6>
              <Image src={tooltip} alt="info" />
              <input
                type="text"
                placeholder="Press Connect..."
                className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 ml-28 mr-6 w-[600px]"
              />
            </div>
            <div className="flex  items-center mt-10">
              <h6 className="pl-3 pr-2">Discord</h6>
              <Image src={tooltip} alt="info" />
              <input
                type="text"
                placeholder="Press Connect..."
                className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 ml-28 mr-6 w-[600px]"
                />
            <h5>
              Link Your Social Accounts
            </h5>
            <div className="flex  items-center justify-between mt-8">
              <div className="flex">
                <Image src={twitter} alt="wallet_logo" />
                <h6 className="pl-3 pr-2 font-medium">Twitter</h6>
                <Image src={tooltip} alt="info" />
              </div>
              <input
                type="text"
                placeholder="Press Connect..."
                className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 w-[600px]"
                //   value={metamaskAccount}
                //   onChange={(e) => setMetamaskAccount(e.target.value)}
              />
              <button className="font-roboto  border-2 px-[60px] py-2 border-[#6633FF] hover:bg-[#6633FF]">
                Connect
              </button>
            </div>
            <div className="flex  items-center justify-between mt-10">
              <div className="flex">
                <Image src={discord} alt="wallet_logo" />
                <h6 className="pl-3 pr-2 font-medium">Discord</h6>
                <Image src={tooltip} alt="info" />
              </div>
              <input
                type="text"
                placeholder="Press Connect..."
                className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 w-[600px]"
                //   value={metamaskAccount}
                //   onChange={(e) => setMetamaskAccount(e.target.value)}
              />
              <button className="font-roboto  border-2 px-[60px] py-2 border-[#6633FF] hover:bg-[#6633FF]">
                Connect
              </button>
            </div>
            <div className="flex  items-center mt-10 mb-10">
              <h6 className="pl-3 pr-2">Instagram</h6>
              <Image src={tooltip} alt="info" />
              <input
                type="text"
                placeholder="Press Connect..."
                className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 ml-28 mr-6 w-[600px]"
                />
              <div className="flex">
                <Image src={telegram} alt="wallet_logo" />
                <h6 className="pl-3 pr-2 font-medium">Telegram</h6>
                <Image src={tooltip} alt="info" />
              </div>
              <input
                type="text"
                placeholder="Press Connect..."
                className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 w-[600px]"
                //   value={metamaskAccount}
                //   onChange={(e) => setMetamaskAccount(e.target.value)}
              />
              <button className="font-roboto border-2 px-[60px] py-2 border-[#6633FF] hover:bg-[#6633FF]">
                Connect
              </button>
            </div>
          </div>

          <button className="font-roboto  border-2 px-[60px] py-2 border-[#6633FF] hover:bg-[#6633FF]">
            Add New Wallet
          </button>
        </div>
        <div className=" bg-[#0f172a4d] rounded-3xl p-7 mt-6">
          <div className="flex flex-col">
            <h4>Join Private Community</h4>
            <h5 className="text-[#94A3B8] font-normal">
              Invite or share information about your channels or webpages
            </h5>
            <div className="flex space-x-6 items-center mt-8">
              <input
                type="text"
                placeholder="https://discord.gg/8wFar7sQ"
                className="border-[#334155] border bg-[#1E293B] rounded-lg text-[#DBEAFE] py-2 px-10 w-[700px]"
                //   value={metamaskAccount}
                //   onChange={(e) => setMetamaskAccount(e.target.value)}
              />
              {/* <button className="font-roboto  border px-[60px] py-2 border-[#6633FF] hover:bg-[#6633FF]">
                Connect
              </button> */}
              <button className="border-2 px-3 py-3 border-[#6633FF] hover:bg-[#6633FF]">
                <MdOutlineContentCopy />
              </button>
              <button className="border-2 px-3 py-3 border-[#6633FF] hover:bg-[#6633FF]">
                <BsThreeDots />
              </button>
              <button className="border-2 px-2 py-2 border-[#6633FF] ">
            <div className="flex justify-center">
  <div className="form-check form-switch">
    <input className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-purple-200 bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
  </div>
</div>
              </button>
            </div>
          </div>
          <div className="flex mt-10 mb-10 space-x-4">
            <button className="font-roboto  border-2 px-[40px] py-2 border-[#6633FF] hover:bg-[#6633FF]">
            <BsFillPlusCircleFill/>&nbsp;  Add New Link
            </button>
            <button className="font-roboto  border-2 px-[40px] py-2 border-[#6633FF] hover:bg-[#6633FF] ">
              Add Discord Invite
            </button>
            <button className="font-roboto  border-2 px-[40px] py-2 border-[#6633FF] hover:bg-[#6633FF] ">
              Add Phone
            </button>
            <button className="font-roboto  border-2 px-[40px] py-2 border-[#6633FF] hover:bg-[#6633FF] ">
              Add Website
            </button>
          </div>
        </div>
        </div>
      </div>
      <div className="flex bg-[#0f172a4d] justify-between rounded-t-3xl py-14 px-20 mt-28 rounded-r-3xl relative">
        <Image src={logo_footer} alt="metag_logo" />
        <div className="flex space-x-5">
          <h6>Help</h6>
          <h6>Contact</h6>
          <h6>Privacy and Legal</h6>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
