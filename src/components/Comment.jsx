import React from "react";
import { Link } from "react-router-dom";
import "./Comment.css";

function Comment(props) {

  const firstTwoWords = (text) => {
    const newText = text.split(" ").slice(0, 4).join(" ");
    return newText
  };

  return (
    <div className="col">
      <Link  to={`/comments/${props.id}`}>
        <div>
          <div className="text-over">
            <Link className="title-link" to={`/comments/${props.id}`}>
              {firstTwoWords(props.name)+' ...'}
            </Link>
            <p className="desc">{props.body + "..."}</p>
            <p>...</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Comment;
