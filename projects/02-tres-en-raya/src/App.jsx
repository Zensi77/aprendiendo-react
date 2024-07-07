import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti' // Importamos la librería de confetti npm install canvas-confetti
import { Square } from './components/square'
import { TURNS } from './components/constants'
import { checkWinner, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'

function App() {
  const [board, setBoard] = useState(() => {
    const board = window.localStorage.getItem('board'); // Obtenemos el tablero del localStorage
    return board ? JSON.parse(board) : Array(9).fill(null); // Si el tablero existe, lo devolvemos, si no, devolvemos un array de 9 celdas vacías
  
  }); 

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn'); // Obtenemos el turno del localStorage
    return turnFromStorage ?? TURNS.X; // Si el turno existe, lo devolvemos, si no, devolvemos X
  }) // Creamos el estado del turno actual, por defecto es X
  
  const [winner, setWinner] = useState(null) // Creamos el estado del ganador, por defecto es null

  const resetGame = () => { // Función para reiniciar el juego reestableciendo los estados
    setBoard(Array(9).fill(null)); // Reiniciamos el tablero
    setTurn(TURNS.X); // Reiniciamos el turno
    setWinner(null); // Reiniciamos el ganador
  }

  
  const updateBoard = (index) => {
    if (board[index]) return; // Si la celda ya tiene un valor o ganador, no hacemos nada

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X; // Cambiamos el turno
    setTurn(newTurn); // Actualizamos el turno

    // Copio el tablero y no lo modifico directamente para evitar mutaciones
    const newBoard = [...board]; // Creamos una copia del tablero
    /* spread operator: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Spread_operator
    El operador de propagación (spread operator) permite que una expresión sea expandida en situaciones donde se esperan múltiples argumentos (llamadas a funciones) o múltiples elementos (arrays literales).
    rest operator: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Rest_parameters
    El parámetro rest (rest parameter) sintaxis ...nombreArray, permite a una función aceptar un número indefinido de argumentos como un array, proporcionando una manera de representar argumentos de función de longitud variable.*/
    
    newBoard[index] = turn; // Actualizamos la celda del tablero con el valor del turno actual
    setBoard(newBoard); // Actualizamos el tablero

    // Guardamos el ganador en una variable
    window.localStorage.setItem('board', JSON.stringify(newBoard)); // Guardamos el tablero en el localStorage
    window.localStorage.setItem('turn', newTurn); // Guardamos el turno en el localStorage

    const winner = checkWinner(newBoard);
    if (winner) {
      confetti(); // Lanzamos los confettis
      setWinner(winner); // La actualizacion de estado es asincrona y no se puede confiar en el valor de winner en la misma funcion
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // false
    }
  }

  return (
    <main className="board">
      <h1>3 en raya</h1>
      <button onClick={resetGame}>Resetear el Juego</button>
      <section className="game">
        {
          board.map((cell, index) => ( // Recorremos el array de celdas
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          ))
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn===TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn===TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
