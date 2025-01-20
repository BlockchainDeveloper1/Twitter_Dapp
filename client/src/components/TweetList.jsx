import React from "react";

function TweetList({ tweets, userAddress, likeTweet }) {
  return (
    <div className="tweet-list">
      {tweets.map((tweet, index) => (
        <div className="tweet" key={index}>
          <img
            className="user-icon"
            src={`https://avatars.dicebear.com/api/human/${tweet.author}.svg`}
            alt="User Icon"
          />
          <div className="tweet-inner">
            <div className="author">{tweet.author.slice(0, 6)}...</div>
            <div className="content">{tweet.content}</div>
            <button
              className="like-button"
              onClick={() => likeTweet(tweet.author, tweet.id)}
            >
              ❤️ {tweet.likes}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TweetList;
