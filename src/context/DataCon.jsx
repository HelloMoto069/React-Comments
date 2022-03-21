import { createContext, useState } from "react";

export const DataContext = createContext('');

let initData = [{
    id: "001",
    author: "albert",
    body: "Whats the status?",
    timestamp: "Sun Aug 02 2020 18:08:45 GMT+0530",
    points: "2",
    replies: [
        {
            id: "003",
            author: "haren",
            body: "Wrote the test suites, waiting for approval?",
            timestamp: "Sun Aug 02 2020 18:12:45 GMT+0530",
            points: "3",
            replies: [
                {
                    id: "004",
                    author: "albert",
                    body: "Thanks for the update!",
                    timestamp: "Sun Aug 02 2020 18:15:45 GMT+0530",
                    points: "8"
                }
            ]
        },
        {
            id: "002",
            author: "Nrupul",
            body: "looking forward for the demo!",
            timestamp: "Sun Aug 02 2020 18:10:45 GMT+0530",
            points: "2"
        }
    ]
}];

export const DataContextProvider = ({ children }) => {

    const [data, setData] = useState(initData);


    const addReply = (id, payload, newData = [...data]) => {
        for (let i = 0; i < newData.length; i++) {
            if (traverseReplies(newData[i], id, payload)) break;
        }
        setData(newData);
        localStorage.setItem('comments', JSON.stringify(newData));
    }

    const traverseReplies = (comment, id, payload) => {
        if (comment.id === id) {
            if (comment.replies) {
                comment.replies.push(payload);
            } else {
                comment.replies = [payload];
            }
            return true;
        }
        if (!comment.replies) {
            return false;
        } else {
            comment.replies.forEach(c => traverseReplies(c, id, payload));
        }
    }


    return <DataContext.Provider value={{ data, addReply }}>{children}</DataContext.Provider>

}