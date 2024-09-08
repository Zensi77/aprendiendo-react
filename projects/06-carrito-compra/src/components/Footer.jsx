import { useFilters } from "../hooks/useFilters";
import "./Footer.css";

export function Footer() {
  const { filters } = useFilters();
  return (
    <footer className="footer">
      <h3>
        Prueba tectica del curso de React de <span>@midudev</span>
      </h3>
      <h4>Shopping cart</h4>
      <p>{JSON.stringify(filters)}</p>
    </footer>
  );
}
