import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const CreateComment = ({ postId, addNewComment }) => {
  const [newComment, setNewComment] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleCreateComment = async (e) => {
    e.preventDefault();
    if (currentUser === null) {
      navigate("/signin");
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment,
          post: postId,
          user: currentUser._id,
        }),
      });
      const data = await res.json();
      console.log(data);
      addNewComment(data);
    } catch (err) {
      console.log(err);
    }
    setNewComment(" ");
  };

  return (
    <div className="flex flex-col text-left gap-4 w-full mx-4 my-2 rounded-lg">
      <form className="flex justify-between gap-3 w-full">
        <input
          type="text"
          value={newComment}
          placeholder="What's on your mind?"
          className="w-full p-2 rounded-lg shadow outline-none"
          onChange={(e) => setNewComment(e.target.value)}
          required
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent default behavior of form submission
            }
          }}
        />
        <button
          type="submit"
          onClick={handleCreateComment}
          className="bg-yellow-500 text-white p-2 rounded-lg shadow"
        >
          Comment
        </button>
      </form>
    </div>
  );
};
