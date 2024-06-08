import React, { useEffect, useState } from "react";
import { formatDate } from "../../../utility/format.js";
import { useDispatch, useSelector } from "react-redux";
import { deleteOnePost, likePost } from "../../../redux/post/postSlice.js";
import { updateUserSuccess } from "../../../redux/user/userSlice.js";

// icons
import { MdDelete } from "react-icons/md";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { GiRapidshareArrow } from "react-icons/gi";
import { RiUserFollowLine, RiUserFollowFill } from "react-icons/ri";
import { useNavigate } from "react-router";

export const PostCard = ({ post }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [updatedPost, setUpdatedPost] = useState(post);
  const [bookmarked, setBookmarked] = useState(false);
  const [following, setFollowing] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeletePost = async (postId) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        const res = await fetch(`/api/post/delete/${postId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        dispatch(deleteOnePost(data));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLikePost = async (postId) => {
    if (currentUser === null) {
      navigate("/signin");
      return;
    }
    try {
      const res = await fetch(`/api/post/like/${postId}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      dispatch(likePost(data));
      setUpdatedPost(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBookmarkPost = async (postId) => {
    if (currentUser === null) {
      navigate("/signin");
      return;
    }
    try {
      const res = await fetch(`/api/user/bookmark/${postId}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setBookmarked(true);
      dispatch(updateUserSuccess(data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollowUser = async (userId) => {
    if (currentUser === null) {
      navigate("/signin");
      return;
    }
    try {
      const res = await fetch(`/api/user/follow/${userId}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFollowing((prev) => !prev);
      dispatch(updateUserSuccess(data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = (id) => {
    if (currentUser === null) {
      navigate("/signin");
      return;
    }
    navigate(`/post/${id}`);
  }

  useEffect(() => {
    if (currentUser !== null) {
      setBookmarked(currentUser.bookmarks.includes(post._id));
      setFollowing(currentUser.following.includes(post.user._id));
    }
  }, [currentUser, post._id]);

  return (
    post && (
      <div
        key={post._id}
        className="flex flex-col text-left gap-4 w-full shadow p-4 m-4 rounded-lg"
      >
        {/* user info */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img
              src={post.user.profilePicture}
              alt="profile"
              className="w-14 h-14 rounded-full object-cover hover:border-2 border-neutral-200"
            />
            <span className="text-2xl">{post.user.username}</span>
          </div>

          {/* actions */}
          <div className="text-xl my-auto">
            <button
              hidden={currentUser?._id === post.user._id}
              onClick={() => handleFollowUser(post.user._id)}
            >
              {following ? <RiUserFollowFill /> : <RiUserFollowLine />}
            </button>
            <button
              onClick={() => handleDeletePost(post._id)}
              hidden={!(currentUser?._id === post.user._id)}
            >
              <MdDelete />
            </button>
          </div>
        </div>

        {/* post content */}
        <div className="flex flex-col gap-3">
          <p className="text-xl">{post.content}</p>
          <p className="opacity-75">{formatDate(post.updatedAt)}</p>
        </div>

        {/* actions */}
        <div>
          {/* stats */}
          <div className="flex gap-8 border-y-2 py-3">
            <p className="flex items-center gap-1">
              <span className="font-semibold">{updatedPost.likes.length}</span>
              <span className="opacity-75">Likes</span>
            </p>
          </div>
          {/* cta */}
          <div className="flex justify-around text-xl mt-2">
            <button onClick={() => handleLikePost(post._id)}>
              {updatedPost.likes.includes(currentUser?._id) ? (
                <FcLike />
              ) : (
                <FcLikePlaceholder />
              )}
            </button>
            <button className="opacity-60" onClick={() => handleComment(post._id)}>
              <FaRegComment />
            </button>
            <button onClick={() => handleBookmarkPost(post._id)}>
              {!bookmarked ? <IoBookmarkOutline /> : <IoBookmark />}
            </button>
            <button>
              <GiRapidshareArrow />
            </button>
          </div>
        </div>
      </div>
    )
  );
};
