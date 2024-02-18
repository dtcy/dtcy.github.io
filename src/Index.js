import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css'
import GoogleAuth from './comps/GoogleAuth';

const root = createRoot(document.getElementById('root'));

const App = () => {
  return (
    <GoogleAuth></GoogleAuth>
  )
}
root.render(<App />);
