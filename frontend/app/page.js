'use client';
import Link from "next/link";
import classes from "./page.module.css";
import logoImg from "@/assets/blog.png"
import Image from "next/image";
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:8000/posts');

        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, []);
  return (
    <>
      <header className={classes.header}>
        <div>
          <Image src={logoImg} height={300} width={300} alt="brand logo"/>
        </div>
        <div className={classes.titleDiv}>
          <div className={classes.hero}>
            <h1>Blogify</h1>
            <p>Stay updated with the latest blogs</p>
          </div>
          <div className={classes.cta}>
            <Link href="/signup">Join the Community</Link>
          </div>
        </div>
        </header>
        <main>
          <section className={classes.section}>
          <div>
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
        </main>
    </>
  );
}
