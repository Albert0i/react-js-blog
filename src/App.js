import Layout from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import EditPost from './EditPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
// import api from './api/posts'
// import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';
import { DataProvider } from './context/DataContext';
//import { Route, Routes, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
//import { useState, useEffect } from 'react';
import { useEffect } from 'react';
// import { format } from 'date-fns';
import { useStoreActions } from 'easy-peasy'

function App() {
  // const [posts, setPosts] = useState([])
  // const [search, setSearch] = useState('');
  // const [searchResults, setSearchResults] = useState([]);
  // const [postTitle, setPostTitle] = useState('');
  // const [postBody, setPostBody] = useState('');
  // const [editTitle, setEditTitle] = useState('');
  // const [editBody, setEditBody] = useState('');
  // const navigate = useNavigate();
  // const { width } = useWindowSize()
  const setPosts = useStoreActions((actions) => actions.setPosts)
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')

  // Initial load
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/posts')        
  //       //console.log(response)
  //       setPosts(response.data)
  //     }
  //     catch (err) {
  //       if (err.response) {
  //         // Not in the 200 response range
  //         console.log(err.response.data)
  //         console.log(err.response.status)
  //         console.log(err.response.header)
  //       }
  //       else {
  //         console.log(`Error: ${err.message}`)
  //       }
  //     }
  //   }

  // //   fetchPosts()
  // // }, [])
  // Initial load using custom hook 
  useEffect( () => {
    setPosts(data)
  }, [data, setPosts] )

  // // Search 
  // useEffect(() => {
  //   const filteredResults = posts.filter((post) =>
  //     ((post.body).toLowerCase()).includes(search.toLowerCase())
  //     || ((post.title).toLowerCase()).includes(search.toLowerCase()));

  //   setSearchResults(filteredResults.reverse());
  // }, [posts, search])

  // // Add post 
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
  //   const datetime = format(new Date(), 'MMMM dd, yyyy pp');
  //   const newPost = { id, title: postTitle, datetime, body: postBody };

  //   try {
  //     const response = await api.post('/posts', newPost)
  //     // const allPosts = [...posts, newPost];
  //     const allPosts = [...posts, response.data];
  //     setPosts(allPosts);  
  //     setPostTitle('');
  //     setPostBody('');
  //     navigate('/');
  //   }
  //   catch (err) {
  //       console.log(`Error: ${err.message}`)
  //   }
  // }

  // // Update post
  // const handleEdit = async (id) => {
  //   const datetime = format(new Date(), 'MMMM dd, yyyy pp');
  //   const updatePost = { id, title: editTitle, datetime, body: editBody };

  //   try {
  //     const response = await api.put(`/posts/${id}`, updatePost)
  //     setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
  //     setEditTitle('');
  //     setEditBody('');
  //     navigate('/');
  //   }
  //   catch (err) {
  //     console.log(`Error: ${err.message}`)
  //   }
  // }

  // // Delete post
  // const handleDelete = async (id) => {
  //   try {
  //     await api.delete(`/posts/${id}`)

  //     const postsList = posts.filter(post => post.id !== id);
  //     setPosts(postsList);
  //     navigate('/');
  //   }
  //   catch (err) {
  //     console.log(err.message)
  //   }
  // }
  
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Layout title="React JS Blog" />} >
          
            <Route index element={<Home 
                isLoading = {isLoading} 
                fetchError = {fetchError}
            />} />
            
            <Route path="post">
                <Route index element={<NewPost />} />
                <Route path=":id" element={<PostPage />} />
            </Route>

            <Route path="/edit/:id" element={<EditPost />} />

            <Route path="about" element={<About />} />
            <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;

/*
   React JS Full Course for Beginners | Complete All-in-One Tutorial | 9 Hours
   https://youtu.be/RVFAyFWO4go
   gitdagray/react_resources
   https://github.com/gitdagray/react_resources

   React Router v6 in 20 Minutes | RRv6 Upgrade & Refactor Tutorial
   https://youtu.be/XBRLVRjZ3CQ
   gitdagray/react_router_v6
   https://github.com/gitdagray/react_router_v6

   How to Upgrade to React 18
   https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis 

   CSS Flexbox Intro | Flex CSS Tutorial for Beginners
   https://youtu.be/B8BFVzbKmPI

*/
/*
   Using properties to pass parameters: 

   return (
    <Routes>
      <Route path="/" element={<Layout
        search={search}
        setSearch={setSearch}
        width={width}
      />}>
          <Route index element={<Home 
            posts={searchResults} 
            fetchError={fetchError}
            isLoading={isLoading}
          />} />
          
          <Route path="post">
              <Route index element={<NewPost
                handleSubmit={handleSubmit}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
              />} />

              <Route path=":id" element={<PostPage
                posts={posts}
                handleDelete={handleDelete}
              />} />
          </Route>

          <Route path="/edit/:id" element={<EditPost
                posts={posts}
                handleEdit={handleEdit}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editBody={editBody}
                setEditBody={setEditBody}
          />} />

          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
 */
/*
   Using DataProvider to pass parameters: 

   return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Layout title="React JS Blog" />} >
          
            <Route index element={<Home />} />
            
            <Route path="post">
                <Route index element={<NewPost />} />
                <Route path=":id" element={<PostPage />} />
            </Route>

            <Route path="/edit/:id" element={<EditPost />} />

            <Route path="about" element={<About />} />
            <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </DataProvider>
  );
*/