import React from 'react';
import './App.css';
import Formcontent from './components/Formcontent';

function App() {
  return (
    <section className="section">
         <div className="container">
            <div className="intro">
               <h1 className="title">Hello</h1>
               <p className="subtitle">
                  Welcome to <strong>Contacts</strong>!
               </p>
            </div>
            <hr />
            <Formcontent />
         </div>
      </section>
  );
}

export default App;
