import { createContext, useState } from "react";

/*
    El contexto es una forma de compartir información entre componentes sin tener que pasarla a través de las props.
    Para crear un contexto, se utiliza la función createContext() de React.
    createContext() recibe un valor por defecto que se utilizará cuando no haya un proveedor que proporcione un valor.
    Para crear un proveedor, se utiliza el componente Provider que se obtiene del contexto creado.
    El proveedor recibe un prop value con el valor que se quiere compartir.
    Para consumir el contexto, se utiliza el hook useContext() de React.
    useContext() recibe el contexto creado y devuelve el valor que se ha compartido.
*/

// 1. Crear el contexto, este hay que consumirlo en el componente principal
export const filtersContext = createContext();

// 2. Crear el provider, este nos provee el acceso al contexto
export function FiltersProviders({ children }) {
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 50,
  });

  return (
    <filtersContext.Provider value={{ filters, setFilters }}>
      {children}
    </filtersContext.Provider>
  );
}
