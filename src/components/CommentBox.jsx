import { useContext, useState } from "react";
import { DataContext } from "../context/DataCon";
import { Comment } from "./Comment"
import "./CommentBox.css";

export const CommentBox = () => {

    let dataContext = useContext(DataContext);

    let [data, setData] = useState(dataContext.data);
    

    return <div className="comment-box-wrapper">
        {
            data.map(comment => <Comment key={comment.id} {...comment} />)
        }
    </div>
}