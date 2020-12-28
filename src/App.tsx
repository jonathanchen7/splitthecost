import React from 'react';
import './App.css';
import './main.css';
import { Header } from './components/header/Header';
import { Entries } from './components/Entries';

function App() {
  return (
    <div>
      <Header />
      <Entries />
    </div>
  );
}

export default App;
