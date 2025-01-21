import React, { useState, useEffect } from "react";
import Web3 from "web3";
import contractABI from "./abi.json";
import Header from "./components/Header";
import TweetForm from "./components/TweetForm";
import TweetList from "./components/TweetList";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractABI, contractAddress);

function App() {
  const [userAddress, setUserAddress] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    if (userAddress) {
      fetchTweets();
    }
  }, [userAddress]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAddress(accounts[0]);
      } catch (err) {
        console.error("Connection error:", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const fetchTweets = async () => {
    try {
      const userTweets = await contract.methods.getAllTweets(userAddress).call();
      setTweets(userTweets.sort((a, b) => b.timestamp - a.timestamp));
    } catch (err) {
      console.error("Error fetching tweets:", err);
    }
  };

  const createTweet = async (content) => {
    try {
      await contract.methods
        .createTweet(content)
        .send({ from: userAddress });
      fetchTweets();
    } catch (err) {
      console.error("Error creating tweet:", err);
    }
  };

  const likeTweet = async (author, id) => {
    try {
      await contract.methods
        .likeTweet(author, id)
        .send({ from: userAddress });
      fetchTweets();
    } catch (err) {
      console.error("Error liking tweet:", err);
    }
  };

  return (
    <div className="container">
      <Header connectWallet={connectWallet} userAddress={userAddress} />
      {userAddress ? (
        <>
          <TweetForm createTweet={createTweet} />
          <TweetList tweets={tweets} userAddress={userAddress} likeTweet={likeTweet} />
        </>
      ) : (
        <p>Please connect your wallet to tweet.</p>
      )}
    </div>
  );
}

export default App;






