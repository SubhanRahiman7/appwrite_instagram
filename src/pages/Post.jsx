import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPost, setLoading, setError } from "../store/postSlice";

export default function Post() {
    const [imageError, setImageError] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth.userData);
    const { currentPost: post, loading, error } = useSelector((state) => state.post);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        async function loadPost() {
            if (slug) {
                dispatch(setLoading(true));
                try {
                    const post = await appwriteService.getPost(slug);
                    if (post) {
                        dispatch(setCurrentPost(post));
                    } else {
                        navigate("/");
                    }
                } catch (error) {
                    console.error("Error loading post:", error);
                    dispatch(setError(error.message));
                } finally {
                    dispatch(setLoading(false));
                }
            } else {
                navigate("/");
            }
        }
        
        loadPost();
    }, [slug, navigate, dispatch]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

    // Show loading state
    if (loading) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <p className="text-2xl font-bold text-gray-600">Loading post...</p>
                </Container>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <p className="text-2xl font-bold text-red-500">{error}</p>
                </Container>
            </div>
        );
    }

    // Show post content
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <div className="w-full max-h-[500px] overflow-hidden">
                        {post.featuredimage && !imageError ? (
                            <img
                                src={appwriteService.getFilePreview(post.featuredimage)}
                                alt={post.title}
                                className="w-full h-full object-cover rounded-xl"
                                onError={() => setImageError(true)}
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                                <p className="text-gray-500 text-lg">
                                    {post.featuredimage ? 'Error loading image' : 'No image available'}
                                </p>
                            </div>
                        )}
                    </div>

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}