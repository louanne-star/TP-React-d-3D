import React, { useState, useEffect } from 'react';
import './App.css';
import Dice from './components/Dice';
import { Suspense } from 'react';


function App() {
  const [currentRoll, setCurrentRoll] = useState(null);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('diceHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('diceHistory', JSON.stringify(history));
  }, [history]);

  function rollDice() {
    const result = Math.floor(Math.random() * 6) + 1;
    setCurrentRoll(result);
    setHistory((prev) => [result, ...prev]);
  }

  function clearHistory() {
    setHistory([]);
    setCurrentRoll(null);
  }

  return (
    <div className="App">
      <h1>Jeu de dé</h1>

  <div className="dice-area">
    {currentRoll ? (
      <Suspense fallback={<p className="placeholder">Chargement...</p>}>
        <Dice value={currentRoll} />
      </Suspense>
    ) : (
      <p className="placeholder">Lancez le dé !</p>
    )}
  </div>

      <button className="roll-btn" onClick={rollDice}>
        Lancer le dé
      </button>
      {history.length > 0 && (
        <div className="history">
          <h2>Historique</h2>
          <ul>
            {history.map((roll, index) => (
              <li key={index}>Lancer {history.length - index} : {roll}</li>
            ))}
          </ul>
          <button className="clear-btn" onClick={clearHistory}>
            Effacer l'historique
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
