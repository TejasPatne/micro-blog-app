import React, { useEffect, useState } from "react";
import { CreateComment } from "./CreateComment";
import { formatDate } from "../../../utility/format";

export const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [hasMore, setHasMore] = useState(true);

  const fetchComments = async () => {
    if (hasMore) {
      try {
        const response = await fetch(
          `/api/comment/${postId}/?page=${page}&limit=${limit}`
        );
        const data = await response.json();

        if (data.length === 0 && data.success === false) {
          setError(data.message);
          return;
        }

        if (data.length < limit) {
          setHasMore(false);
        }

        if (data.length > 0) {
          const extendedComments = [...comments, ...data];
          setComments(extendedComments);
        }
      } catch (err) {
        console.log(err);
        setError(err);
      }
    }
  };

  const addNewComment = (comment) => {
    setComments([comment, ...comments]);
  };

  useEffect(() => {
    fetchComments();
  }, [page]);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return (
    <div>
      {error && <p className="text-red-500">{error.message}</p>}
      {postId && (
        <CreateComment postId={postId} addNewComment={addNewComment} />
      )}
      {comments.length === 0 && <p>No comments yet</p>}
      <div className="flex flex-wrap justify-around gap-2 w-full m-4">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex flex-col grow text-left w-fit shadow p-2 rounded-lg"
          >
            {/* user info */}
            <div className="flex items-center gap-2">
              <img
                src={comment.user.profilePicture}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover hover:border-2 border-neutral-200"
              />
              <div>
                <p className="opacity-80">{comment.user.username}</p>
                <p className="text-sm opacity-75">
                  {formatDate(comment.updatedAt)}
                </p>
              </div>
            </div>

            {/* post content */}
            <div className="flex flex-col p-1">
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      {hasMore && <button onClick={() => setPage(page + 1)}>Load more</button>}
    </div>
  );
};
