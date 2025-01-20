import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Routes/App.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PostList  from '../src/Components/PostList.jsx';
import CreatePost from '../src/Components/CreatePost.jsx';

const router = createBrowserRouter([
  {path:"/", 
  element:<App />,
  children:[
    {path: "/", element:<PostList/>},
    {path: "/create-post", element:<CreatePost/>},
  ],
},
]);

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
