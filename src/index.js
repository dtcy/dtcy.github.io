import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css'
const root = createRoot(document.getElementById('root'));

const Index = () => {
  return (
    <div>
      <div id="cv">
        <i>seyoit@gmail.com</i><br />
        <br />
        <h1>Hi, I am Matias!<i class="far fa-smile"></i></h1>
        <p>who is,</p>
        <h2>Frontend Developer</h2>
        <br />
        <i>Since 2020 Dec~</i>
        <p>Frontend Engineer at NextRunner, South Korea</p>
        <br />
        <p>looking for remote frontend role</p>
        <p>with HTML/CSS/JS/REACT/ReactNative</p>
        <br />
      <strong>Contact me if you have amazing vibe team :)</strong><i class="fas fa-exclamation"></i>
      </div>
    </div>
  );
};

root.render(<Index />);
