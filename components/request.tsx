import axios from 'axios';
import React, { useState } from 'react';

const Request: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [height, setHeight] = useState('256');
  const [width, setWidth] = useState('512');
  const [numInferenceSteps, setNumInferenceSteps] = useState('100');
  const [image, setImage] = useState('');

  const handleSubmit = async () => {
    const data = {
      prompt,
      height,
      width,
      num_inference_steps: numInferenceSteps,
    };

    try {
      const res = await axios.post('http://59.15.62.198:10002/txt2img', data, {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      });

      const base64Image = new Buffer(res.data, 'binary').toString('base64');
      setImage(`data:image/jpeg;base64,${base64Image}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
          style={{ padding: '0.5em', margin: '0.5em', fontSize: '1em' }}
        />
        <input
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter height"
          style={{ padding: '0.5em', margin: '0.5em', fontSize: '1em' }}
        />
        <input
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          placeholder="Enter width"
          style={{ padding: '0.5em', margin: '0.5em', fontSize: '1em' }}
        />
        <input
          value={numInferenceSteps}
          onChange={(e) => setNumInferenceSteps(e.target.value)}
          placeholder="Enter number of inference steps"
          style={{ padding: '0.5em', margin: '0.5em', fontSize: '1em' }}
        />
        <button
          onClick={handleSubmit}
          style={{ padding: '0.5em', margin: '0.5em', fontSize: '1em' }}
        >
          Submit
        </button>
      </div>
      {image && (
        <img src={image} alt="Generated Image" />
      )}
    </div>)}
