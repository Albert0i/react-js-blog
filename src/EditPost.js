//import { useState, useEffect } from 'react'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
//import api from './api/posts'
import { format } from 'date-fns';

//import { useContext } from 'react'
//import DataContext from './context/DataContext'
import { useStoreState, useStoreActions } from 'easy-peasy'

const EditPost = () => {
    const navigate = useNavigate();
    // const { 
    //     posts, setPosts } = useContext(DataContext)
    // const [editTitle, setEditTitle] = useState('');
    // const [editBody, setEditBody] = useState('');        

    const { id } = useParams()
    
    const editTitle = useStoreState((state)=>state.editTitle)
    const editBody = useStoreState((state)=>state.editBody)

    const editPost = useStoreActions((actions)=>actions.editPost)
    const setEditTitle = useStoreActions((actions)=>actions.setEditTitle)
    const setEditBody = useStoreActions((actions)=>actions.setEditBody)
    
    //const post = posts.find( post => (post.id).toString() === id)
    const getPostById = useStoreState((state) => state.getPostById)    
    const post = getPostById(id)

    useEffect(()=> {
        if (post) {
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    }, [post, setEditTitle, setEditBody])

    // Update post
    const handleEdit = (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatePost = { id, title: editTitle, datetime, body: editBody };

        // try {
        //     const response = await api.put(`/posts/${id}`, updatePost)
        //     setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
        //     setEditTitle('');
        //     setEditBody('');
        //     navigate('/');
        // }
        // catch (err) {
        //     console.log(`Error: ${err.message}`)
        // }
        editPost(updatePost)        
        navigate(`/post/${id}`);
        //navigate('/');        
    }

    return ( 
        <main className="NewPost">
            { editTitle && 
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={ (e) => e.preventDefault() }>
                        <label htmlFor="editTitle">Title:</label>
                        <input
                            id="editTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="editBody">Post:</label>
                        <textarea
                            id="editBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="button" onClick={ () => handleEdit(post.id) } >Submit</button>
                    </form>
                </>

            }
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
        </main>
     );
}
 
export default EditPost;