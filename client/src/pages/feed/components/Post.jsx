import React, { useState } from 'react'
import { formatDate } from '../../../utility/format.js';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOnePost, likePost } from '../../../redux/post/postSlice.js';

export const Post = ({post}) => {

  const {currentUser} = useSelector((state) => state.user);
  const [updatedPost, setUpdatedPost] = useState(post);
  
  const dispatch = useDispatch();

  const handleDeletePost = async (postId) => {
        if(confirm('Are you sure you want to delete this post?')){
          try {
            const res = await fetch(`/api/post/delete/${postId}`, {
              method: 'DELETE'
            });
            const data = await res.json();
            dispatch(deleteOnePost(data));
          } catch (err) {
            console.log(err);
          }
        }
    };

    const handleLikePost = async (postId) => {
        if(currentUser === null){
            navigate('/signin');
            return;
        }
        try {
            const res = await fetch(`/api/post/like/${postId}`, {
            method: 'PUT'
            });
            const data = await res.json();
            if(data.success === false){
                console.log(data.message);
                return;
            }
            dispatch(likePost(data));
            setUpdatedPost(data);
        } catch (err) {
            console.log(err);
        }
    };

  return (
    
    post &&
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
              <button onClick={() => handleDeletePost(post._id)} hidden={!(currentUser?._id === post.user._id)}>🗑️</button>
            </div>
            {/* post content */}
            <div className="flex flex-col gap-3">
              <p className="text-xl">{post.content}</p>
              <p className="opacity-75">
                {formatDate(post.updatedAt)}
              </p>
            </div>
            {/* actions */}
            <div>
              {/* stats */}
              <div className="flex gap-8 border-y-2 py-2">
                <p className="flex items-center gap-1">
                  <span className="font-semibold">{updatedPost.likes.length}</span>
                  <span className="opacity-75">Likes</span>
                </p>
              </div>
              {/* cta */}
              <div className="flex justify-around text-xl">
                <button onClick={() => handleLikePost(post._id)}>
                  {updatedPost.likes.includes(currentUser?._id) ? "❤️" : "🤍"}
                </button>
                <button>🔃</button>
                <button>💬</button>
                <button>🔗</button>
              </div>
            </div>
          </div>
  )
}
