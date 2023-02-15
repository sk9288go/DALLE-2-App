import axios from 'axios';
import React, { useState } from 'react';

const Request: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [height, setHeight] = useState('256');
  const [width, setWidth] = useState('512');
  const [numInferenceSteps, setNumInferenceSteps] = useState('100');
  const [image, setImage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://59.15.62.198:10002/txt2img', {
        prompt: encodeURIComponent(prompt),
        height,
        width,
        num_inference_steps: numInferenceSteps,
      });
      const imageUrl = `data:image/jpeg;base64,${response.data}`;
      setImage(imageUrl);
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
        />
        <input
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter height"
        />
        <input
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          placeholder="Enter width"
        />
        <input
          value={numInferenceSteps}
          onChange={(e) => setNumInferenceSteps(e.target.value)}
          placeholder="Enter number of inference steps"
        />
        <button onClick={handleSubmit}>Submit</
