// 'use client'

// import React, { useState } from 'react'
// import classes from "./page.module.css"
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// function page() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     console.log("button pressed")
//     try {
//       const res = await fetch('http://localhost:8000/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!res.ok) {
//         // throw new Error('Signup failed');
//         setError("Signup failed");
//       }

//       // const data = await res.json();
//       // localStorage.setItem('token', data.token);
//       router.push('/login'); // Redirect to homepage after successful signup
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <section className={classes.contain}>
//       <div className={classes.container}>
//       <form className={classes.loginform} onSubmit={handleSignup}>
//         <span className={classes.logintitle}>Sign up</span>
//         <input type="text" name="email" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
//         <input type="password" name="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
//         <button id="submit" type="submit" className={classes.loginbutton} >Submit</button>

//         <div className={classes.separator}>or</div>
    
//         <span id="last" className={classes.signuptext}>Don't have an account ? <Link href="/signup"><span id="signUp" className={classes.signuplink}>Sign Up</span></Link></span>
//       </form>
//       {error && <div id="err" className={classes.errormessage}>{error}</div>}
//       </div>
//       {/* <div id="err" className={classes.errormessage} value={error}></div> */}
//     </section>
//   )
// }

// export default page

'use client'

import React, { useState } from 'react';
import classes from "./page.module.css";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("button pressed");
    try {
      const res = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email, password:password }),
      });

      if (!res.ok) {
        setError("Signup failed");
        return; // Ensure to exit the function if signup failed
      }

      router.push('/login'); // Redirect to login page after successful signup
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch');
    }
  };

  return (
    <section className={classes.contain}>
      <div className={classes.container}>
        <form className={classes.loginform} onSubmit={handleSignup}>
          <span className={classes.logintitle}>Sign up</span>
          <input 
            type="text" 
            name="email" 
            placeholder="Email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button id="submit" type="submit" className={classes.loginbutton}>
            Submit
          </button>

          <div className={classes.separator}>or</div>

          <span id="last" className={classes.signuptext}>
            Don't have an account? <Link href="/signup"><span id="signUp" className={classes.signuplink}>Sign Up</span></Link>
          </span>
        </form>
        {error && <div id="err" className={classes.errormessage}>{error}</div>}
      </div>
    </section>
  );
}

export default Page;

