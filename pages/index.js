import Image from 'next/image'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import Dashboard from './Dashboard'
import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {

  const getSessionInfo = () => {
    console.log('session', session);
  }

  const { data: session } = useSession();

  return (
    <>
    {!session && <> 
      Not signed in <br />
      <button onClick={ () => signIn()}>Sign In</button>
    </>}
    {session && <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign Out</button>
    </>
    }
    {getSessionInfo()}
    <Navbar />
    <Dashboard/>
    </>
  )
}
