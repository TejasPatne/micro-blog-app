import React, { useEffect, useState } from "react";
import { formatDate } from "../utility/format.js";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export const Feed = () => {
  const [newPost, setNewPost] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(10);

  const navigate = useNavigate();


  const handleCreatePost = async () => {
    if(currentUser === null){
      navigate('/signin');
      return;
    }
    try {
      const res = await fetch("/api/post/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: newPost,
          user: currentUser._id
        })
      });
      const data = await res.json();
      console.log(data);
      setNewPost("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async (postId) => {
    if(confirm('Are you sure you want to delete this post?')){
      try {
        const res = await fetch(`/api/post/delete/${postId}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        console.log(data);
        setPosts(posts.filter((post) => post._id !== postId));
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
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/post/?page=${page}&limit=${limit}`);
      const data = await response.json();
      const extendedPosts = [...posts, ...data];
      setPosts(extendedPosts);
      if (data.length < limit) {
        setHasMore(false);
      } else {
        setPage(page + 1);
      }
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();  
  }, []);

  return (
    <section className="w-1/2 mx-auto text-center my-4">

      {/* create post */}
      <div>
        <form className="flex justify-between gap-3 w-full">
          <input
            type="text"
            placeholder="What's on your mind?"
            className="w-full p-2 rounded-lg shadow outline-none"
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleCreatePost}
            className="bg-yellow-500 text-white p-2 rounded-lg shadow"
          >
            Post
          </button>
        </form>
      </div>

      {/* posts listing */}
      <div className="flex flex-col items-center">
        {posts.map((post) => (
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
              <button onClick={() => handleDeletePost(post._id)} hidden={!(currentUser._id === post.user._id)}>🗑️</button>
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
                  <span className="font-semibold">{post.likes.length}</span>
                  <span className="opacity-75">Likes</span>
                </p>
              </div>
              {/* cta */}
              <div className="flex justify-around text-xl">
                <button onClick={() => handleLikePost(post._id)}>
                  {post.likes.includes(currentUser._id) ? "❤️" : "🤍"}
                </button>
                <button>🔃</button>
                <button>💬</button>
                <button>🔗</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        disabled={loading}
        hidden={!hasMore}
        type="button"
        onClick={fetchPosts}
        className="bg-neutral-800 m-4 text-white px-4 py-2 rounded-lg hover:opacity-75 disabled:opacity-75"
      >
        {loading? "Loading...": "More Posts"}
      </button>

      <div className="mb-4">
        {error && <p className="text-red-500">{error}</p>}
        {!hasMore && <p className="text-neutral-500">No more posts in the feed! May be your network is small</p>}
      </div>
    </section>
  );
};
