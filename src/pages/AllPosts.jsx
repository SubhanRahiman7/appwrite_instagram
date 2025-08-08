import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"
import { setPosts, setLoading, setError } from '../store/postSlice'

function AllPosts() {
    // Get the dispatch function to send actions
    const dispatch = useDispatch()
    
    // Get data from our store
    const { posts, loading, error } = useSelector(state => state.post)

    // When component loads, fetch posts
    useEffect(() => {
        // Show loading spinner
        dispatch(setLoading(true))

        // Get posts from server
        appwriteService.getPosts()
            .then(data => {
                if (data) {
                    // Save posts to store
                    dispatch(setPosts(data.documents))
                }
            })
            .catch(error => {
                // If something goes wrong, save error
                dispatch(setError(error.message))
            })
    }, [dispatch])

    // Show loading message
    if (loading) {
        return <div className="text-center py-8">Loading posts...</div>
    }

    // Show error if something went wrong
    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>
    }

    // Show message if no posts
    if (posts.length === 0) {
        return <div className="text-center py-8">No posts found</div>
    }

    // Show all posts
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts