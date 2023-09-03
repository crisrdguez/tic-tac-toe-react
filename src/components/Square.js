//cuadrado de tablero
//el children sera lo que tenga dentro del cuadrado, la X o la O
//updateBoard sera una forma de actualizar el tablero
//index - para saber ese cuadradito, cual es
export const Square = ({children, isSelected, updateBoard, index}) => {

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