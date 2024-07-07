// Creamos un componente Square que recibe como propiedades children, updateBoard, index y isSelected
export const Square = ({ children, updateBoard, index, isSelected }) => { // children es el contenido del componente, updateBoard es la función que actualiza el tablero y index es la posición del tablero
  const className = `square ${isSelected ? 'is-selected' : ''}` // Si isSelected es true, añadimos la clase 'selected

  const handleClick = () => {
    updateBoard(index);
  }

  return (
    <div onClick={handleClick} className={className}> {/* Añadimos un evento onClick que ejecuta la función updateBoard */}
        {children}
    </div>
  )
}
