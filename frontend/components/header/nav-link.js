'use client'
import React from 'react'
import classes from "./nav-link.module.css"
import { usePathname } from 'next/navigation'
import Link from 'next/link';

function Navlink({href,children}) {
    const path = usePathname();

  return (
    <Link href={href} className={`${classes.link} ${path.startsWith(href) ? classes.active : ''}`} >
  {children}
</Link>

  )
}

export default Navlink
