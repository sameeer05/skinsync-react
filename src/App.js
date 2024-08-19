// src/App.js
import React from 'react';
import Survey from './Survey';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='container d-flex justify-content-between'>
          <img src='https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-1024.png' width={'150px'}/>
          {/* <img src='https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-1024.png' width={'100px'}/> */}
        </div>
        <Survey />
      </header>
    </div>
  );
}

export default App;
