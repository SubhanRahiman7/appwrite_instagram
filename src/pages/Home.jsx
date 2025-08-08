import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { setPosts, setLoading, setError } from '../store/postSlice'
import conf from '../conf/conf.js'

function Home() {
    const dispatch = useDispatch()
    const { posts, loading, error } = useSelector(state => state.post)


    useEffect(() => {
        async function loadPosts() {
            dispatch(setLoading(true));
            try {
                // Check if Appwrite is configured
                if (!conf.appwriteUrl || !conf.appwriteProjectId) {
                    throw new Error('Appwrite is not configured. Please check your environment variables.');
                }
                
                const data = await appwriteService.getPosts();
                if (data && data.documents) {
                    dispatch(setPosts(data.documents));
                }
            } catch (error) {
                console.error("Error loading posts:", error);
                dispatch(setError(error.message));
            } finally {
                dispatch(setLoading(false));
            }
        }

        loadPosts();
    }, [dispatch])


  
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold">Loading...</h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-red-500">{error}</h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts found
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

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

export default Home