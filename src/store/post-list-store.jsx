import { createContext, useEffect, useReducer, useState } from "react";

export const PostList = createContext({
    postList : [],
    addPost: () => {},
    fetching: false,
    deletePost: () => {},
});

const PostListReducer = (CurrPostList, action) =>{
    let newPostList = CurrPostList;
    if (action.type === "DELETE_POST"){ 
        newPostList = CurrPostList.filter(post => 
            post.id !== action.payload.id);
    }else if(action.type === "ADD_INITIAL_POSTS"){
        newPostList = action.payload.posts;  
    }else if(action.type === "ADD_POST"){
        newPostList = [action.payload, ...CurrPostList]; 
    }
    return newPostList;
};
 
const PostListProvider = ({children}) =>{
    const [postList, dispatchPostList] = useReducer(PostListReducer, []);
    
    const [fetching, setFetching] = useState(false);

    const addPost = (post) => {
        console.log(post);
        dispatchPostList({
            type: "ADD_POST",
            payload: post,
    })
    };

    const addInitialPosts = (posts) => {
        console.log(posts);
        dispatchPostList({
            type: "ADD_INITIAL_POSTS",
            payload:{posts},
        })
    };

    const deletePost = (id) => {
        dispatchPostList({
            type: "DELETE_POST",
            payload:{id},
        })
    };

    useEffect(()=>{
        const controller = new AbortController();
        const signal = controller.signal;
  
        setFetching(true);
        fetch('https://dummyjson.com/posts', { signal })
        .then(res => res.json())
        .then(data => {
          addInitialPosts(data.posts);
          setFetching(false);
        });
  
        return() =>{
          controller.abort();
        } 
      }, []);

    return(
        <PostList.Provider value={{postList, addPost, fetching, deletePost}}>
            {children}
        </PostList.Provider>
    );
};


export default PostListProvider;