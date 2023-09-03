import { useState } from 'react';
import './App.css';
import confetti from 'canvas-confetti';

//Importamos constantes
import { TURNS } from './constantes';

//Importamos componentes
import { Square } from './components/Square';
import { checkWinnerFrom, checkEndGame } from './logic/board';
import { Winner } from './components/Winner';

//Para guardar partida
import { saveGameToStorage, resetGameStorage } from './logic/storage/storage';



//tablero
//const board = Array(9).fill(null); //creo un array de 9 y lo lleno con null, tambien lo podria llenar con bucle for y push
//al final lo cambio, ya que lo necesito como hook, cambiara su estado



function App() {

  //const [board, serBoard] = useState(['X','X','O','X','O','O','X','O','O']);

  //estado inicial del tablero es vacio
  //const [board, setBoard] = useState(Array(9).fill(null));

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  //Estado de si hay un ganador
  const [winner, setWinner] = useState(null); //null no hay ganador, false es empate, true hay un ganador


  //Resetear juego cuando ha finalizado
  const resetGame = () =>{
    //nos tenemos que asegurar de setear los valores a sus valores iniciales
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage()
  }

  //Importante la funcion updateBoard
  //Cuando el usuario hace click, le vamos a pasar el indice para saber en que cuadradito ha hecho click
  const updateBoard = (index) => {
    //para evitar que se sobreescriba, si en el square ya hay algo, no me dejaria sobreescribir, y si hay un ganador tampoco
    if(board[index] || winner){
      return;
    }else{

    
    //Vamos a tener un nuevo board, con una X o un O nuevo

    /**
     * const newBoard = [...board];: Aquí se crea una nueva matriz llamada newBoard utilizando la sintaxis de propagación ([...board]). 
     * Lo que hace es crear una copia superficial de la matriz board. Esto es importante porque garantiza que no estamos modificando 
     * directamente el estado anterior del tablero. En lugar de eso, estamos trabajando con una copia.
     * 
     * imp: ENTENDER EL SPREAD Y EL REST OPERATOR
     */
    const newBoard = [...board];//no hay que mutar nunca las props ni el stado, HAY QUE HACER UNA COPIA

    //se actualiza la casilla en el newBoard con el valor actual de turn. 
    newBoard[index] = turn; //x u o

    //Lo actualizamos
    setBoard(newBoard);

    //Primero cambiamos el turno
    const newTurn = turn===TURNS.X ? TURNS.O : TURNS.X; 
    //Llamamos a setTurn y le pasamos el nuevo valor
    setTurn(newTurn);

    // guardar aqui partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    });

    //Usaremos un estado para saber si hay un ganador
    const newWinner = checkWinnerFrom(newBoard);

    if(newWinner){
      setWinner(newWinner); //Asincrono, actualiza el estado, pero no bloquea la ejecucion del codigo que viene despues
      console.log("Genial, ya hay un ganador: " + turn);
      confetti();
    } else if(checkEndGame(newBoard)){
      setWinner(false);
    }

    }
  }
  

  return (
    <main className='board'>
       <h1>Tic-Tac-Toe</h1>
       <button onClick={resetGame}>Empezar nueva partida</button>
        <section className='game'>

          {
            board.map((square,index) => {
              /**Se utiliza board.map para generar dinámicamente las casillas del tablero. 
               * Cada elemento de la matriz board se asigna a un componente Square, y se le pasa el índice y el valor ({board[index]}) como propiedades. */
              return(
                //Para renderizar una lista de elementos necesitamos utilizar la key - identificador unico de ese elemento que renderizamos en una lista

                //updateBoard={updateBoard} - Aqui le pasamos la funcion, no la ejecucion de la funcion (updateBoard()), para que cuando queramos, desde dentro del square lo usemos cuando queramos
                //Si le pasasemos la ejecucion de la funcion, se renderizaria 9 veces al iniciar, yo solo quiero que se ejecute cuando el usuario haga click
                <Square 
                  key={index}
                  index={index}
                  updateBoard={updateBoard}> 
                    {square}
                </Square>
              );
            })
          }
          
        </section>

        <section className='turn'>

           {/*vamos a mostrar un square que tenga el turno, aqui usamos props, isSelected para saber cual esta seleccionado  */}

            <Square isSelected={turn === TURNS.X}>
              {TURNS.X}
            </Square>

            <Square isSelected={turn === TURNS.O}>
              {TURNS.O}
            </Square>

        </section>

        <Winner resetGame={resetGame} winner={winner}/>
          {/**Renderizado condicional --> LO HE HECHO EN EL COMPONENTE WINNER
          
          {
            //Si se cumple la condicion de que no es null, me renderizas lo siguiente:
            winner !== null && (
              <section className='winner'>

                <div className='text'>
                  <h2>
                    {
                      winner === false ? 'Empate' : 'Ganó'
                    }
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
          } */}

        
    </main>
  );
}

export default App;
//Añadimos confeti: npm install canvas-confetti -E