import React, { useEffect, useState } from "react";
import { formatDate } from "../utility/format.js";

export const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(10);

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
    <section className="w-1/2 mx-auto text-center">
      <div className="flex flex-col items-center">
        {posts.map((post) => (
          <div
            key={post._id}
            className="flex flex-col text-left gap-4 w-full shadow-lg p-4 m-4 rounded-lg"
          >
            {/* user info */}
            <div className="flex items-center gap-2">
              <img
                src={post.user.profilePicture}
                alt="profile"
                className="w-14 h-14 rounded-full object-cover hover:border-2 border-neutral-200"
              />
              <span className="text-2xl">{post.user.username}</span>
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
                  <span className="font-semibold">{post.likes}</span>
                  <span className="opacity-75">Likes</span>
                </p>
              </div>
              {/* cta */}
              <div className="flex justify-around text-xl">
                <p>🩷</p>
                <p>🔃</p>
                <p>💬</p>
                <p>🔗</p>
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
