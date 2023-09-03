import { WINNER_COMBOS } from "../constantes";

//Gestionamos el ganador, esto lo tendremos que hacer cuando actualizamos el board
export const checkWinnerFrom = (boardToCheck) =>{
    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo;
      console.log(boardToCheck[a]);
      console.log(boardToCheck[b]);
      console.log(boardToCheck[c]);

      if(
        boardToCheck[a] && //si en el 0 hay una x o O
        boardToCheck[a] === boardToCheck[b] && //si coinciden
        boardToCheck[a] === boardToCheck[c]){//si se cumplen las 3 condiciones tendriamos un ganador

          return boardToCheck[a]; //nos devuelve X u O, que sera el que haya ganado
        } 
                
    }
    return null;
  }


  //Para saber si hay empate, revisamos el tablero y vemos que no hay ganador
  //si no quedan posiciones null y no hay ganadores es que hay empate newBoard = [x,o,o,x,o, null , ...]

  export const checkEndGame = (newBoard) => {
    /*Si todas las square del array newBoard, tiene que el square es diferente a null, devolvera true, juego terminado*/
    return newBoard.every((square) => square!==null);

  }