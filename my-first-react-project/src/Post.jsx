import React, { useState } from 'react';

function App() {
  const [postId, setPostId] = useState('');
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const handleInput = (e) => {
    setPostId(e.target.value);
  }

  const handleButton = () => {
    if (!postId) {
      return;
    }

    let fetchPost = 'https://jsonplaceholder.typicode.com/posts/' + postId;
    let fetchPostId = 'https://jsonplaceholder.typicode.com/comments?postId=' + postId;

    fetch(fetchPost)
      .then(response => response.json())
      .then(post => {
        if (!post.id) {
          throw new Error('Nothing found');
        }
        setPost(post);
        return fetch(fetchPostId);
      })
      .then(response => response.json())
      .then(comments => {
        setComments(comments);
      })
      .catch(error => {
        console.error(error);
        setPost(null);
        setComments([]);
      });
  }

  const handleCommentsButton = () => {
    setShowComments(!showComments);
  }

  return (
    <div className="main">
      <input type="number" value={postId} onChange={handleInput} className="input" />
      <button onClick={handleButton} className="button">Search</button>
      {post && (
        <div className="post">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={handleCommentsButton} className="button">{showComments ? 'Hide' : 'Show'} Comments</button>
          {showComments && comments.map(comment => (
            <div key={comment.id} className="comments">
              <h4>{comment.email}</h4>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;