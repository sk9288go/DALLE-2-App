import Header from "../components/header";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Sidebar from "../components/Sidebar";


export default function Home() {

  return (

  <div className={styles.container}>
    <Header />
    <div style={{background:"transparent"}}>
      <Sidebar />          
    </div>
  </div>
  )
}

