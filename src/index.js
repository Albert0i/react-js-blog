import React from 'react';

// Before
//import ReactDOM from 'react-dom';
// After 
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy'
import store from './store'

// Before 
// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <Routes>
//         <Route path="/*" element={<App />} />
//       </Routes>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// After 
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <React.StrictMode>
      <StoreProvider store={store}>
        <Router>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Router>
      </StoreProvider>
    </React.StrictMode>
   );

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

*/
