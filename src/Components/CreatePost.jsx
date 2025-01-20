import { useContext, useRef } from "react";
import '../Routes/App.css';
import {PostList} from "../store/post-list-store";
import { useNavigate } from "react-router-dom";


const CreatePost = () => {
  const {addPost} = useContext(PostList);
  const navigate = useNavigate();

  const userIDElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIDElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");
    
    userIDElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";
    
    fetch('https://dummyjson.com/posts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: postTitle,
        userId: userId,
        body: postBody,
        reactions: reactions,
        tags: tags,
      })
    })
    .then(res => res.json())
    .then(post => {addPost(post);
      navigate("/")
    });
  }



  return (
     <form className="createpost" onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="userID" className="form-label">User ID</label>
    <input type="text" ref={userIDElement} className="form-control" id="userID" placeholder="Enter your User Id here..."/>
  </div>

  <div className="mb-3">
    <label htmlFor="title" className="form-label">Post Title</label>
    <input type="text" ref={postTitleElement} className="form-control" id="title" placeholder="How was your day..."/>
  </div>
  
  <div className="mb-3">
    <label htmlFor="body" className="form-label">Post Content</label>
    <textarea type="text" ref={postBodyElement} rows="4" className="form-control" id="body" placeholder="Tell us more about it..."/>
  </div>
  
  <div className="mb-3">
    <label htmlFor="reactions" className="form-label">Reactions</label>
    <input type="text" ref={reactionsElement} className="form-control" id="title" placeholder="Enter the number of reactions"/>
  </div>  

  <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your hashtags here
        </label>
        <input
          type="text"
          className="form-control"
          id="tags"
          ref={tagsElement}
          placeholder="Please enter tags using space"
        />
      </div>

  <button type="submit" className="btn btn-primary">Post</button>
</form>
  );
};

export default CreatePost;