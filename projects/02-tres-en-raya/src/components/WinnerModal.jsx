import { Square } from "./square";
export function WinnerModal({ winner, resetGame }) {
    if (winner === null) return null;
    
    const winnerText = winner ? `El ganador es ${winner}` : 'Empate';
return (
          <section className="winner">
        <div className="text">
          <h2>
            {
              winnerText
            }
          </h2>

          <header className="win">
            {winner && <Square>{winner}</Square>}
              </header>
              
              <footer>
                <button onClick={resetGame}>Reiniciar</button>
              </footer>
            </div>
          </section>

    )
}
