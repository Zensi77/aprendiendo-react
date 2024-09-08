import { useContext } from "react";
import { filtersContext } from "../context/filters";

export function useFilters() {
  // custom hook
  // const [filters, setFilters] = useState({
  //   category: "all",
  //   minPrice: 50,
  // });
  const { filters, setFilters } = useContext(filtersContext);

  const filterProducts = (products) => {
    return products.filter((product) => {
      return product.price >= filters.minPrice && filters.category === "all"
        ? true
        : product.category === filters.category;
    });
  };

  return { filters, filterProducts, setFilters };
}
