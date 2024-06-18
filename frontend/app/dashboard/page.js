'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import classes from "./page.module.css"
function page() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect to login if not authenticated
    } else {
      fetchDashboardPosts(token);
    }
  }, [router]);

  
  const fetchDashboardPosts = async (token) => {
    try {
      const res = await fetch('http://localhost:8000/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect to login if not authenticated
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        throw new Error('Failed to create post');
      }

      const newPost = await res.json();
      setPosts([...posts, newPost]);
      setTitle('');
      setContent('');
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <section className={classes.section}>
      <div className={classes.div1}>
        <form className={classes.form} onSubmit={handleCreatePost}>
          <h3 className={classes.formTitle}>Post a new Blog</h3>
          <div className={classes.formDiv}>
            <label className={classes.label}>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={classes.input} type="text" name="title" placeholder="Title" id="title" required/>
            <label className={classes.label}>Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} className={classes.textarea} placeholder='Write here' cols={50} rows={15} required></textarea>
            <button type="submit" className={classes.submitButton}>Create Post</button>  {/* Added submit button */}
          </div>
        </form>
      </div>
      {error && <p>{error}</p>}
      <div className={classes.div2}>
        <h3 className={classes.formTitle}>Your Previous Blogs</h3>
        {/* <div>
        <li className={classes.post}>
          <h3 className={classes.title}>Kya duniya khatam hone waali h?</h3>
          <p>sdfdbfh dsmfbdjbfhf kdsjfnjjjjjjjjjjjjjjjjjjjjjs dmnfmsdf</p>
          <div className={classes.author}>
            <p><small>By:Vaibhavsundriyal@gmail.com</small></p>
            <p><small>10/5/2024</small></p>
          </div>
        </li>
        <li className={classes.post}>
          <h3 className={classes.title}>Kya duniya khatam hone waali h?</h3>
          <p>sdfdbfh dsmfbdjbfhf kdsjfnjjjjjjjjjjjjjjjjjjjjjs dmnfmsdf</p>
          <div className={classes.author}>
            <p><small>By:Vaibhavsundriyal@gmail.com</small></p>
            <p><small>10/5/2024</small></p>
          </div>
        </li>
        <li className={classes.post}>
          <h3 className={classes.title}>Kya duniya khatam hone waali h?</h3>
          <p>sdfdbfh dsmfbdjbfhf kdsjfnjjjjjjjjjjjjjjjjjjjjjs dmnfmsdf</p>
          <div className={classes.author}>
            <p><small>By:Vaibhavsundriyal@gmail.com</small></p>
            <p><small>10/5/2024</small></p>
          </div>
        </li>
        <li className={classes.post}>
          <h3 className={classes.title}>Kya duniya khatam hone waali h?</h3>
          <p>sdfdbfh dsmfbdjbfhf kdsjfnjjjjjjjjjjjjjjjjjjjjjs dmnfmsdf</p>
          <div className={classes.author}>
            <p><small>By:Vaibhavsundriyal@gmail.com</small></p>
            <p><small>10/5/2024</small></p>
          </div>
        </li>
        <li className={classes.post}>
          <h3 className={classes.title}>Kya duniya khatam hone waali h?</h3>
          <p>sdfdbfh dsmfbdjbfhf kdsjfnjjjjjjjjjjjjjjjjjjjjjs dmnfmsdf</p>
          <div className={classes.author}>
            <p><small>By:Vaibhavsundriyal@gmail.com</small></p>
            <p><small>10/5/2024</small></p>
          </div>
        </li>
        <li className={classes.post}>
          <h3 className={classes.title}>Kya duniya khatam hone waali h?</h3>
          <p>sdfdbfh dsmfbdjbfhf kdsjfnjjjjjjjjjjjjjjjjjjjjjs dmnfmsdf</p>
          <div className={classes.author}>
            <p><small>By:Vaibhavsundriyal@gmail.com</small></p>
            <p><small>10/5/2024</small></p>
          </div>
        </li>
        </div> */}
        <ul>
        {posts.map((post) => (
          <li key={post._id} className={classes.post}>
            <h3 className={classes.title}>{post.title}</h3>
            <p>{post.content}</p>
            <div className={classes.author}>
              <p><small>By: {post.authorId}</small></p>
              <p><small>{new Date(post.createdAt).toLocaleString()}</small></p>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </section>
  )
}

export default page
