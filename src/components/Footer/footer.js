import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaTwitch,
} from "react-icons/fa";
import SOA from "../../assets/Soa-logo.png"
const sections = [
  {
    title: "Front-End",
    items: ["React", "HTML", "CSS", "Tailwind", "React-icons"],
  },
  {
    title: "Back-End",
    items: ["Firebase", "Firebase Authenticator"],
  },
  {
    title: "BlockChain",
    items: ["Solidity", "Hardhat", "MetaMask", "Ethereum", "Sepolia"],
  },
  {
    title: "Our Team",
    items: ["Ayush Anand", "Priyam Jha", "Ankit Das", "Santosh Kumar Kar"],
  },
];

const items = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
  { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
  { name: "Twitch", icon: FaTwitch, link: "https://www.twitch.tv/" },
  { name: "Github", icon: FaGithub, link: "https://github.com/" },
];

const Footer = () => {
  return (
    <div className="w-full bg-slate-900 text-gray-300 py-y px-2">
      <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8">
        {sections.map((section, index) => (
          <div key={index}>
            <h6 className="font-bold uppercase pt-2">{section.title}</h6>
            <ul>
              {section.items.map((item, i) => (
                <li key={i} className="py-1 text-gray-500 hover:text-white">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 pt-8 md:pt-2 flex justify-end">
        <img src={SOA} alt="SOA-LOGO"/>
        </div>
      </div>

      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500">
        <p className="py-4">© SDP IS-18</p>
        {/* <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
          {items.map((x, index) => {
            return <x.icon key={index} className="hover:text-white" />;
          })}
        </div> */}
      </div>
    </div>
  );
};

export default Footer;