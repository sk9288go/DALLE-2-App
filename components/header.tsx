import styles from "../components/header.module.css";

const Header = () => {
    return (
    <div>
        <div className = {styles.H_Container}>
            <title> Create Junglim AI image DALLE 2 App</title>
            <a href = "http://junglim.com/">
            <img className="logo" src ="/jl_logo.png"/>   
            </a> 
            <div className ={styles.help}>
                <h1>AI Image generater V1.0</h1>    
                <span className ={styles.helptext}>
                AI-IMAGE GENERATOR V.1 JL_AI 에 오신 것을 환영합니다.<br/>
                JL_AI는 정림건축의 이미지 데이터를 토대로 Diffusion algorithm을 활용해 건축 AI 이미지를 생성하는 웹 서비스입니다. <br/>
                이곳에서 AI로 생성되는 건축 레퍼런스 이미지, 디자인 아이디어를 자유롭게 탐구해보세요.
                </span>                   
            </div>
            <p>JungLim X</p>         
        </div>           
    </div>
    );
};

export default Header;
