import { Square } from "./Square";

export function Winner({winner, resetGame}){
    if(winner === null) return null;

    const winnerText = winner === false ? 'Empate' : 'Ganó';
    return(
    /**Renderizado condicional*/
          
    //{
        //Si se cumple la condicion de que no es null, me renderizas lo siguiente:
        //winner !== null && (
        <section className='winner'>

            <div className='text'>
            <h2>
                {winnerText}
            </h2>

            <header className='win'>
                {winner && <Square>{winner}</Square>}
            </header>

            <footer>
                <button onClick={resetGame}>Empezar nueva partida</button>
            </footer>
            </div>
        </section>  
        )
    //} 
    //)
    
}