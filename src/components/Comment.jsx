import { useContext, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { DataContext } from "../context/DataCon";
import './Comment.css';

export const Comment = ({ id, author, body, timestamp, points, level = 0, replies = [], displayValue = 'flex' }) => {

    let timeElapsed = new Date(timestamp);
    let [showReplies, setShowReplies] = useState(false);
    let [reply, setReply] = useState('');
    let [showReplyInput, setShowReplyInput] = useState(false);
    let dataContext = useContext(DataContext);

    const handleNewReply = () => {
        if (reply.trim() === '') {
            alert('Please enter reply.');
            return;
        }
        let payload = {
            id: Math.floor(Math.random() * 1000000),
            author: "anonymous",
            body: reply,
            points: 0,
            'timestamp': `${new Date(Date.now()).toUTCString()}`
        }
        // console.log(payload)
        dataContext.addReply(id, payload);
        setShowReplies(true)
        setReply('');

    }




    return <div className="comment-wrapper" style={{ display: `${displayValue ? 'flex' : 'none'}`, borderLeft: `${(showReplies && replies.length !== 0) ? '4px solid black' : 'none'}` }}>
        <div className="comment-info">{author} {points} points {<ReactTimeAgo date={timeElapsed} />}
        </div>
        {
            replies.length !== 0 &&
            <div onClick={() => setShowReplies((prev) => !prev)} className="comment-show-replies-btn">{(showReplies) ? '-' : '+'}</div>
        }
        <div className="comment-body">{body}</div>
        <div className="comment-options"><span onClick={() => setShowReplyInput((prev) => !prev)} >Reply</span> <span>Give Award</span> <span>Share</span> <span>Report</span> <span>Save</span></div>

        <div hidden={!showReplyInput}>
            <input placeholder="New reply" value={reply} onChange={(e) => setReply(e.target.value)} />
            <button onClick={handleNewReply}>Add Comment</button>
        </div>

        {
            replies.length !== 0 && replies.map(comment => <Comment key={comment.id} {...comment} displayValue={showReplies} />)
        }

    </div>
}