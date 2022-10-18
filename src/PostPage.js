import { useParams, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
//import api from './api/posts'

//import { useContext } from 'react'
//import DataContext from './context/DataContext'
import { useStoreState, useStoreActions } from 'easy-peasy'

const PostPage = () => {
    const navigate = useNavigate();
    //const { posts, setPosts } = useContext(DataContext)

    const { id } = useParams();
    const deletePost = useStoreActions((actions) => actions.deletePost)
    //const post = posts.find(post => (post.id).toString() === id);
    const getPostById = useStoreState((state) => state.getPostById)    
    const post = getPostById(id)

    // Delete post
    const handleDelete = (id) => {
        // try {
        //     await api.delete(`/posts/${id}`)

        //     const postsList = posts.filter(post => post.id !== id);
        //     setPosts(postsList);
        //     navigate('/');
        // }
        // catch (err) {
        //     console.log(err.message)
        // }
        deletePost(id)
        navigate('/');
    }

    return (
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>

                        <Link to={ `/edit/${post.id}` }><button className='editButton'>Edit Post</button></Link>
                        <button className='deleteButton' onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage
