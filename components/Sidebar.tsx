import { useState } from 'react';
import styles from "./Sidebar.module.css";


const Txt2Img = () => {
    const [prompt, setPrompt] = useState('');
    const [image_width, setimage_Width] = useState('512');
    const [image_height, setHeight] = useState('512');
    const [Steps, setSteps] = useState('50');
    const [image, setImage] = useState('');
    const [seed, setseed] = useState('');


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {

        //const seed = useState(Math.random());
        const randomSeed = Math.floor(Math.random()*100000).toString();
        setseed(randomSeed);
                
        const response = await fetch('https://sad-pugs-help-34-87-136-216.loca.lt/text2img', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: prompt, //encodeURIComponent(prompt),
            image_height,
            image_width,
            num_inference_steps: Steps,
            seed: randomSeed //encodeURIComponent(randomSeed)
        })
    });
    
    
    const imageData = await response.json();
    const imageData1 = imageData.images[0];
    const imageUrl = 'data:image/png;base64,' + imageData1;
    setImage(imageUrl);


    } catch (error) {
    console.error(error);
    }

};
const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = 'image.jpg';
    link.click();
};


return (    
    <div className={styles.Container1}>
        <div className ={styles.Rectangle8}>
            <span className={styles.Browser}>Browser</span>
        </div>
        
    <div style={{ width: '100%', padding: '20px'}}>
        <form onSubmit={handleSubmit}>
            <div className ={styles.inside_box}>
                <label htmlFor="prompt">Prompt:</label>
                    <div className ={styles.help}>
                        <img src ="/Vector.png"/>            
                        <span className ={styles.helptext}>이미지의 주체가 되는 요소를 명사와 목적어 위주로 작성해주세요</span>
                    </div>
                <textarea className ={styles.inputPrompt}  id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            </div>


            <div className ={styles.inside_box}>           
                <label htmlFor="image_width">image_Width:</label>
                    <div className ={styles.help}>
                        <img src ="/Vector.png"/>            
                        <span className ={styles.helptext}>이미지의 가로 사이즈를 선택해주세요</span>
                    </div>
                        <select className={styles.selectNom} id="image_width" value={image_width} onChange={(e) => setimage_Width(e.target.value)}>
                        <option value="256">256</option>
                        <option value="512">512</option>
                        <option value="1024">1024</option>
                        </select>                    
                    </div>
            <div className ={styles.inside_box}>
                <label htmlFor="image_height">Height:</label>
                    <div className ={styles.help}>
                        <img src ="/Vector.png"/>            
                        <span className ={styles.helptext}>이미지의 세로 사이즈를 선택해주세요</span>
                    </div>
                        <select className={styles.selectNom} id="image_height" value={image_height} onChange={(e) => setHeight(e.target.value)}>
                        <option value="256">256</option>
                        <option value="512">512</option>
                        <option value="1024">1024</option>
                        </select>                    
            </div>
            

            <div className ={styles.inside_box}>
            <label htmlFor="numInferenceSteps">Number of Inference Steps:</label>
                <div className ={styles.help}>
                    <img src ="/Vector.png"/>            
                    <span className ={styles.helptext}>이미지의 퀄리티에 영향을 미치는 inference step 입니다 <br/> 1부터 999까지 세팅가능하나 권장 범위는 200~600입니다.</span>
                </div>
                <input className ={styles.input} id="numInferenceSteps" value={Steps} onChange={(e) => setSteps(e.target.value)} />
            </div>        
    
        <button className={styles.button1}type="submit" >Generate</button>
        </form>
        </div>

        
        
    <div className = {styles.node}>
        {image ? (<div>
            <img src={image} alt="Generated Image" onError={(e) => console.error(e)} />
            <br />
            <button onClick={handleDownload}>Download</button>
        </div>
        ) : null}
    </div>
    </div>
    );
};

export default Txt2Img;