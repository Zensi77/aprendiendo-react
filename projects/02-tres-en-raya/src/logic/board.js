import { WINNER_COMBOS } from '../components/constants';  
export const checkWinner = (newBoard) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo; // Destructuramos el array combo en tres variables a, b y c
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) { // Si las tres celdas son iguales y no son null
        return newBoard[a]; // Devolvemos el valor de la celda a
      }
    }
    return null; // Si no hay ganador, devolvemos null
}
  
  // Función para comprobar si el juego ha terminado en empate (todas las celdas tienen un valor distinto de null)
  export const checkEndGame = (newBoard) => {
    return newBoard.every(cell => cell !== null); // Devolvemos true si todas las celdas tienen un valor distinto de null
  }

