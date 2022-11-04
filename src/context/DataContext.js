import { createContext, useState, useEffect } from 'react'
//import { useNavigate } from 'react-router-dom';
//import api from '../api/posts'
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';
//import { format } from 'date-fns';

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    // const [postTitle, setPostTitle] = useState('');
    // const [postBody, setPostBody] = useState('');
    // const [editTitle, setEditTitle] = useState('');
    // const [editBody, setEditBody] = useState('');
    // const navigate = useNavigate();
    const { width } = useWindowSize()
    // For development environment
    //const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')
    // For production environment 
    const { data, fetchError, isLoading } = useAxiosFetch('https://my-json-server.onrender.com/posts')
  
    // Initial load using custom hook 
    useEffect( () => {
      setPosts(data)
    }, [data] )
  
    // Search 
    useEffect(() => {
      const filteredResults = posts.filter((post) =>
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase()));
  
      setSearchResults(filteredResults.reverse());
    }, [posts, search])

    // // Add post 
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    //     const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    //     const newPost = { id, title: postTitle, datetime, body: postBody };

    //     try {
    //         const response = await api.post('/posts', newPost)
    //         // const allPosts = [...posts, newPost];
    //         const allPosts = [...posts, response.data];
    //         setPosts(allPosts);  
    //         setPostTitle('');
    //         setPostBody('');
    //         navigate('/');
    //     }
    //     catch (err) {
    //         console.log(`Error: ${err.message}`)
    //     }
    // }

    // // Update post
    // const handleEdit = async (id) => {
    //     const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    //     const updatePost = { id, title: editTitle, datetime, body: editBody };

    //     try {
    //         const response = await api.put(`/posts/${id}`, updatePost)
    //         setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
    //         setEditTitle('');
    //         setEditBody('');
    //         navigate('/');
    //     }
    //     catch (err) {
    //         console.log(`Error: ${err.message}`)
    //     }
    // }

    // // Delete post
    // const handleDelete = async (id) => {
    //     try {
    //         await api.delete(`/posts/${id}`)

    //         const postsList = posts.filter(post => post.id !== id);
    //         setPosts(postsList);
    //         navigate('/');
    //     }
    //     catch (err) {
    //         console.log(err.message)
    //     }
    // }
  
    return (
        <DataContext.Provider value={{
            width, search, setSearch, 
            searchResults, fetchError, isLoading, 
//            handleSubmit, postTitle, setPostTitle, postBody, setPostBody, 
            posts, setPosts, 
//            handleEdit, editTitle, setEditTitle, editBody, setEditBody, 
//            handleDelete
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext 