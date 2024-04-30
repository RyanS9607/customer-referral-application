import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Layout  from './Routes';

function App() {
  return (
    <div className="App">
      <Header/>
      <br/>
        <Layout/>
      <br/>
      <Footer/>
    <br/>
    </div>
  );
}

export default App;
