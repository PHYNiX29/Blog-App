"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import classes from "./main-header.module.css"
import logoImg from "@/assets/blog.png"
import Image from 'next/image'
import Mainheaderbackground from './main-header-background'
import styles from "./nav-link.module.css";
import Navlink from './nav-link'

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by looking for a token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Remove the token from localStorage and update the state
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <>
      <Mainheaderbackground/>
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg.src} alt='a plate with a food on it' height={300} width={500} priority/>
        </Link>

        <nav className={classes.nav}>
          <ul>
            {isLoggedIn ? (
              <>
                <li>
                  <Navlink href="/dashboard">Dashboard</Navlink>
                </li>
                <li>
                  <Link href={"/"} className={styles.link} onClick={handleLogout}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Navlink href="/signup">Sign Up</Navlink>
                </li>
                <li>
                  <Navlink href="/login">Login</Navlink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header
