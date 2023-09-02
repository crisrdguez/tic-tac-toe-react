import { useState } from 'react';
import './App.css';

const TURNS = {
  X: 'x',
  O: 'o'
}

//Para saber si hay un ganador, una de las maneras es guardar todos los combos ganadores en un array
const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

//tablero
//const board = Array(9).fill(null); //creo un array de 9 y lo lleno con null, tambien lo podria llenar con bucle for y push
//al final lo cambio, ya que lo necesito como hook, cambiara su estado

//cuadrado de tablero
//el children sera lo que tenga dentro del cuadrado, la X o la O
//updateBoard sera una forma de actualizar el tablero
//index - para saber ese cuadradito, cual es
const Square = ({children, isSelected, updateBoard, index}) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`; //le añado la clase square, y ademas si isSelected es true, le añado la className 'is-selected'

  const handleClick = () =>{
    updateBoard(index);//Le pasamos el index para saber en que cuadradito ha hecho click
  }

  return(
    <div onClick={handleClick} className={className}> {/**Uso el className aqui : square y/o is-selected */}
      {children}
    </div>
  )
}

function App() {

  //const [board, serBoard] = useState(['X','X','O','X','O','O','X','O','O']);

  //estado inicial del tablero es vacio
  const [board, setBoard] = useState(Array(9).fill(null));

  //necesito saber en que turno estoy, empieza la X
  const [turn, setTurn] = useState(TURNS.X);

  //Estado de si hay un ganador
  const [winner, setWinner] = useState(null); //null no hay ganador, false es empate, true hay un ganador

  //Gestionamos el ganador, esto lo tendremos que hacer cuando actualizamos el board
  const checkWinner = (boardToCheck) =>{
    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo;
      if(
        boardToCheck[a] && //si en el 0 hay una x o O
        boardToCheck[a] === boardToCheck[b] && //si coinciden
        boardToCheck[a] === boardToCheck[c]){//si se cumplen las 3 condiciones tendriamos un ganador

          return boardToCheck[a]; //nos devuelve X u O, que sera el que haya ganado
        } else{
          return null;
        }
    }
  }

  //Importante la funcion updateBoard
  //Cuando el usuario hace click, le vamos a pasar el indice para saber en que cuadradito ha hecho click
  const updateBoard = (index) => {
    //para evitar que se sobreescriva, si en el square ya hay algo, no me dejaria sobreescribir, y si hay un ganador tampoco
    if(board[index] || winner) return;

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
    newBoard[index] = turn //x u o

    //Lo actualizamos
    setBoard(newBoard);

    //Primero cambiamos el turno
    const newTurn = turn===TURNS.X ? TURNS.O : TURNS.X; 
    //Llamamos a setTurn y le pasamos el nuevo valor
    setTurn(newTurn);

    //todo Usaremos un estado para saber si hay un ganador
    const newWinner = checkWinner(newBoard);

    if(newWinner){
      setWinner(newWinner);
    }


    //todo cuando se acabe la partida y ninguno gane

  }

  

  return (
    <main className='board'>
       <h1>Tic-Tac-Toe</h1>
        <section className='game'>

          {
            board.map((_,index) => {
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
                    {board[index]}
                </Square>
              );
            })
          }
          
        </section>

        <section className='turn'>

           {/*vamos a mostrar un square que tenga el turno, aui usamos props, isSelected para saber cual esta seleccionado  */}

            <Square isSelected={turn === TURNS.X}>
              {TURNS.X}
            </Square>

            <Square isSelected={turn === TURNS.O}>
              {TURNS.O}
            </Square>

        </section>
    </main>
  );
}

export default App;
