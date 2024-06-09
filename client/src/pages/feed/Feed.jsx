import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "./components/PostCard.jsx";
import { createPostStart, getPostsFailure, getPostsStart, getPostsSuccess } from "../../redux/post/postSlice.js";

export const Feed = () => {
  const [newPost, setNewPost] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  // const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [hasMore, setHasMore] = useState(true);

  const textLimit = 140;

  const { posts, loading, error, page } = useSelector((state) => state.post);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleCreatePost = async (e) => {
    e.preventDefault();
    if(currentUser === null){
      navigate('/signin');
      return;
    }
    try {
      dispatch(createPostStart());
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
      const extendedPosts = [data, ...posts];
      dispatch(getPostsSuccess(extendedPosts));
    } catch (err) {
      console.log(err);
    }
    setNewPost(" ");
  };


  const fetchPosts = async () => {
    if(hasMore){
      try {
        dispatch(getPostsStart());
        const response = await fetch(`/api/post/?page=${page}`);
        const data = await response.json();
        const extendedPosts = [...posts, ...data];

        if(data.length === 0 && data.success === false){
          dispatch(getPostsFailure(data.message));
          return;
        }
  
        dispatch(getPostsSuccess(extendedPosts));
  
        if (data.length < limit) {
          setHasMore(false);
        } 
      } catch (err) {
        dispatch(getPostsFailure(err));
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="w-1/2 mx-auto text-center my-4">

      {/* create post */}
      <div>
        <form className="flex justify-between gap-3 w-full relative">
          <textarea
            type="text"
            value={newPost}
            placeholder="What's on your mind?"
            className="w-full p-2 rounded-lg shadow outline-none"
            onChange={(e) => setNewPost(e.target.value)}
            required
            maxLength={textLimit}
          />
          <p className="absolute bottom-1 right-16 text-slate-500">{newPost.length}/{textLimit}</p>
          <button
            type="submit"
            onClick={handleCreatePost}
            className="bg-yellow-500 h-fit my-auto text-white p-2 rounded-lg shadow"
          >
            Post
          </button>
        </form>
      </div>

      {/* posts listing */}
      <div className="flex flex-col items-center">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {/* load more button */}
      <button
        disabled={loading}
        hidden={!hasMore}
        type="button"
        onClick={fetchPosts}
        className="bg-neutral-800 m-4 outline-none text-white px-4 py-2 rounded-lg hover:opacity-75 disabled:opacity-75"
      >
        {loading? "Loading...": "More Posts"}
      </button>

      <div className="mb-4">
        {error && <p className="text-red-500">{error.message}</p>}
        {!hasMore && <p className="text-neutral-500">No more posts in the feed! May be your network is small</p>}
      </div>

    </section>
  );
};
