import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { PostCard } from '../feed/components/PostCard';
import { Comments } from './components/Comments';

export const Post = () => {
    const { id } = useParams();
    const { currentUser } = useSelector((state) => state.user);
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    const fetchPost = async () => { 
        try {
            const res = await fetch(`/api/post/${id}`);
            const data = await res.json();
            setPost(data);
        } catch (err) {
            console.log(err);
            setError(err);
        }
    }

    useEffect(() => {
        fetchPost();
    }, [id, currentUser]); // Only fetch post when id or currentUser changes

    return (
        <section className="w-1/2 mx-auto text-center my-4">
          {
            post ? (
                <div className='flex flex-col'>
                    <PostCard post={post} />
                    <Comments postId={id} />
                </div>
            ) : (
                <p>Loading...</p>
            )
          }
          {
            error && (
                <p className="text-red-500">{error.message}</p>
            )
          }
        </section>
    )
}
