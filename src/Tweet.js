import React, { useEffect, useState } from "react";
import axios from "axios";
import './Tweet.css';
import { ReactComponent as Reply } from './assets/reply.svg';
import { ReactComponent as Retweet } from './assets/retweet.svg';
import { ReactComponent as Like } from './assets/like.svg';
import { ReactComponent as Bookmark } from './assets/bookmark.svg';
import { ReactComponent as Share } from './assets/share.svg';
import Card from 'react-bootstrap/Card';
import Fade from 'react-bootstrap/Fade';
import 'bootstrap/dist/css/bootstrap.min.css';

const TweetFetcher = ({ onTweetFetched }) => {
  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const response = await axios.get("https://api.giratina.net/v1/raika");
        onTweetFetched(response.data.text);
      } catch (error) {
        console.error("Error fetching tweet:", error);
      }
    };

    fetchTweet();
  }, [onTweetFetched]);

  return null; // No need to render anything in this component
};

const TweetDisplay = ({ tweet, time }) => {
  const iconStyle = { fill: '#858585', width: 35, height: 35 };
  const twitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${tweet}%20%0ahttps://raika.giratina.net`;
    window.open(url, '_blank');
  };

  const raika = () => {
    window.open("https://twitter.com/M_aaruaika", '_blank');
  };

  return (
    <Fade in={tweet ? true : false}>
      <Card className="tweet-card">
        <div className="tweet" style={{ visibility: tweet ? "visible" : "hidden" }}>
          <div className="user">
            <a href="https://denonbu.jp/character/harajuku/mimito" class="link-offset-2 link-underline link-underline-opacity-0">
              <img src="logo512.jpg" alt="icon" className="icon" />
            </a>
            <div className="user-info">
              <a href="https://twitter.com/aaruaika" class="link-offset-2 link-underline link-underline-opacity-0">
                <p className="username">Raika</p>
              </a>
              <a href="https://twitter.com/aaruaika" class="link-offset-2 link-underline link-underline-opacity-0">
                <p className="userid">@aaruaika</p>
              </a>
            </div>
          </div>
          <div className="tweet-text">{tweet}</div><br />
          <div className="time">{time}</div>
          <hr color="#858585" size="0.5" />
          <div className="tweet-actions">
            <Reply style={iconStyle} onClick={raika} />
            <Retweet style={iconStyle} />
            <Like style={iconStyle} />
            <Bookmark style={iconStyle} />
            <Share style={iconStyle} onClick={twitterShare} />
          </div>
        </div>
      </Card>
    </Fade>
  );
};

const Tweet = () => {
  const [tweet, setTweet] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;
    const date = currentTime.getDate();
    let hours = currentTime.getHours();
    const minutes = ('00' + currentTime.getMinutes()).slice(-2);
    const ampm = hours < 12 ? "午前" : "午後";
    if (hours >= 12) {
      hours -= 12;
    }
    const displayTime = `${ampm}${hours}:${minutes}・${year}年${month}月${date}日`;
    setTime(displayTime);
  }, []);

  return (
    <>
      <TweetFetcher onTweetFetched={setTweet} />
      <TweetDisplay tweet={tweet} time={time} />
    </>
  );
};

export default Tweet;
