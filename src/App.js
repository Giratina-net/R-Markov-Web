import React, { useState, useEffect, useCallback } from "react";
import Tweet from "./Tweet";
import "./App.css";

const App = () => {
    const [bottom, setBottom] = useState(25);
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        // 初期ツイートの設定
        const initialTweets = Array.from({ length: 5 }, (_, index) => ({
            id: index + 1,
            content: `Tweet ${index + 1}`
        }));
        setTweets(initialTweets);

        // スクロールイベントリスナーの追加と削除
        const changeBottom = () => {
            const bottomPosition = document.body.offsetHeight - (window.scrollY + window.innerHeight);
            if (bottomPosition < 55) {
                setBottom(25 + 55 - bottomPosition);
                for (let i = 0; i < 3; i++){
                    loadNewTweet();
                }

            }
        };

        window.addEventListener('scroll', changeBottom);
        return () => {
            window.removeEventListener('scroll', changeBottom);
        };
    }, []); // 初回のみ実行するため空の依存リストを渡す

    const loadNewTweet = () => {
        const newTweet = { id: tweets.length + 1, content: `New Tweet ${tweets.length + 1}` };
        setTweets(prevTweets => [...prevTweets, newTweet]); // 現在のツイート状態を更新
    };

    return (
        <div className="tweet-timeline">
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} />
            ))}
        </div>
    );
};

export default App;
