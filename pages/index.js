import Head from "next/head";
import { useState } from "react";

//import Image1 from 'next/image'
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const [token, setToken] = useState("");
  const [prompt, setPrompt] = useState("");
  const [style, setstyle] = useState("");
  const [number, setNumber] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function getImages(e) {
    e.preventDefault();
    if (token != "" && prompt != "") {
      setError(false);
      setLoading(true);
      axios
        .post(`/api/images?t=${token}&p=${prompt+","+style}&n=${number}`)
        .then((res) => {
          setResults(res.data.result);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
        });
    } else {
      setError(true);
    }
  }

  const [type, setType] = useState("webp");

  function download(url) {
    axios
      .post(`/api/download`, { url: url, type: type })
      .then((res) => {
        const link = document.createElement("a");
        link.href = res.data.result;
        link.download = `${prompt+","+style}.${type.toLowerCase()}`;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (

    <div className={styles.container}>
      <Head>
      <title>Create Junglim AI image DALLE 2 App</title>
      </Head>
      <img src ="/jl_logo.png" height="110px"/>

      <main className={styles.main}>
       
        <h1 className={styles.title}>
          Create images with  <span className={styles.titleColor}>Junglim Innovation</span>
        </h1>
        <p className={styles.description}>
          <a>Bearer Token</a><br></br>
          {/* <div className ={styles.smalltext}>토큰을 입력해주세요 없어질예정</div> */}
          <input         
            id="token"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Bearer Token"
            
          />
          <br></br>
          <a>Prompt</a>
          {/* <div className ={styles.smalltext}>이미지의 주체가 되는 요소를 명사와 목적어 위주로 작성해주세요</div> */}
          <br></br>
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Prompt"
            
          />
          <br></br>
          <a>Style</a>
          {/* <div className ={styles.smalltext}>스타일을 선택하거나 원하시는 스타일을 입력해주세요</div> */}
          <br></br>
          <input
            id="Style"
            type="text"
            value={style}
            onChange={(e) => setstyle(e.target.value)}
            placeholder="style"
            
          />
          <br></br>
          <a>Image count</a>
          {/* <div className ={styles.smalltext}>생성할 이미지 개수를 지정해주세요</div> */}
          <br></br>
          <input
            id="number"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Number of images"
            max="10"
          />
          <a>Image size</a>
          {/* <div className ={styles.smalltext}>생성할 이미지 개수를 지정해주세요</div> */}
          <br></br>

          <input
            id="size"
            type="size"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Number of images"
            max="10"
          />
          </p>
          <br></br>
          {"  "}
          <button onClick={getImages}> {number}장 생성</button>
          
      <div className={styles.smalltext}>
          Download as:{" "}
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}>
          
          <option value="webp">Webp</option>
          <option value="png">Png</option>
          <option value="jpg">Jpg</option>
          <option value="gif">Gif</option>
          <option value="avif">Avif</option>
          </select>

          {" "}
          <br></br>
          Click the image below and save.
      </div>

        {error ? (<div className={styles.error}>Something went wrong. Try again.</div> ) : ( <></> )}
        {loading && <p>Loading...</p>}
          
    </main>

    <div className={styles.grid}>
      {results.map((result) => {
        return (
            <div className={styles.card}>
            <img className={styles.imgPreview}
            src={result.url}
            onClick={() => download(result.url)}/>
            </div>)}
      )
      }
    </div>
    </div>
  )
}

