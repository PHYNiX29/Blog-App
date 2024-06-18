'use client'

import React, { useState } from 'react'
import classes from "./page.module.css"
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email, password:password }),
      });

      if (!res.ok) {
        // throw new Error('Signup failed');
        setError("login failed");
      }

      const data = await res.json();
      localStorage.setItem('token', data.accessToken);
      router.push('/dashboard'); // Redirect to homepage after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className={classes.contain}>
      <div className={classes.container}>
      <form className={classes.loginform} onSubmit={handleLogin}>
        <span className={classes.logintitle}>Login</span>
        <input type="text" name="email" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" name="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <input id="submit" type="submit" className={classes.loginbutton} />

        <div className={classes.separator}>or</div>
    
        <span id="last" className={classes.signuptext}>Don't have an account ? <Link href="/signup"><span id="signUp" className={classes.signuplink}>Sign Up</span></Link></span>
      </form>
      </div>
      <div id="err" className={classes.errormessage}>{error}</div>
    </section>
  )
}

export default page
