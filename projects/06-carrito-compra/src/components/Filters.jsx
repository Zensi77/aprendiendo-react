import { useId } from "react";
import "./Filters.css";
import { useFilters } from "../hooks/useFilters";

export function Filters() {
  const { filters, setFilters } = useFilters();
  const minPriceFilterId = useId("min-price");
  const categoryFilterId = useId("category");

  const handleChangeMinPrice = (event) => {
    // Esta es la forma correcta de actualizar el estado en React cuando el nuevo estado depende del anterior
    setFilters((prevState) => ({
      ...prevState,
      minPrice: event.target.value,
    }));
  };

  const handleChangeCategory = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  return (
    <section className="filters">
      <div>
        <label htmlFor="price">Precio minimo</label>
        <input
          type="range"
          id={minPriceFilterId}
          min="0"
          max="1000"
          onChange={handleChangeMinPrice}
        />
        <span>{filters.minPrice}$</span>
      </div>

      <div>
        <label htmlFor="category">Categoría</label>
        <select
          name="category"
          id={categoryFilterId}
          onChange={handleChangeCategory}
        >
          <option value="all" defaultChecked>
            Todas
          </option>
          <option value="laptops">Portatiles</option>
          <option value="smartphones">Smartphones</option>
        </select>
      </div>
    </section>
  );
}

// min 57:00
