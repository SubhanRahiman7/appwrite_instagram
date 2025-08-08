import { useState } from 'react'
import appwriteService from "../appwrite/config"
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from './index'
import { deletePost as removePost } from '../store/postSlice'

function PostCard({$id, title, featuredimage, userid}) {
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = userData && userid && userData.$id ? userid === userData.$id : false;
    




    const handleDelete = async (e) => {
        e.preventDefault(); // Prevent navigation
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                // Delete the post from database
                const deleteResult = await appwriteService.deletePost($id);
                
                if (deleteResult) {
                    // Also delete the associated image if it exists
                    if (featuredimage) {
                        try {
                            await appwriteService.deleteFile(featuredimage);
                        } catch (imageError) {
                            console.error('Error deleting image:', imageError);
                        }
                    }
                    
                    // Remove from Redux store and navigate to home
                    dispatch(removePost($id));
                    navigate('/');
                } else {
                    alert('Failed to delete post. Please try again.');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('Error deleting post: ' + error.message);
            }
        }
    };

    return (
        <div className='w-full bg-gray-100 rounded-xl p-4 relative'>
            <Link to={`/post/${$id}`}>
                <div className='w-full justify-center mb-4'>
                    {featuredimage && !imageError ? (
                        <img
                            src={appwriteService.getFilePreview(featuredimage)}
                            alt={title}
                            className="w-full h-40 object-cover rounded-xl"
                            onError={() => {
                                console.log(`Image failed to load for ${title}`);
                                setImageError(true);
                            }}
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center">
                            <p className="text-gray-500">
                                {featuredimage ? 'Error loading image' : 'No image available'}
                            </p>
                        </div>
                    )}
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </Link>
            
            {/* Edit and Delete buttons - only show for post author */}
            {isAuthor && (
                <div className="absolute top-2 right-2 flex gap-2">
                    <Button 
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/edit-post/${$id}`);
                        }}
                        className="bg-green-500 text-white px-3 py-1 text-sm"
                    >
                        Edit
                    </Button>
                    <Button 
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-3 py-1 text-sm"
                    >
                        Delete
                    </Button>
                </div>
            )}
        </div>
    )
}


export default PostCard