import Button from "react-bootstrap/Button";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <main className="container min-vh-100 d-flex flex-column align-items-center justify-content-center text-center gap-3 p-4">
      <h1>404 - Página no encontrada</h1>
      <p>La dirección que buscás no existe.</p>
      <Button as={Link} to="/" variant="primary">
        Volver al inicio
      </Button>
    </main>
  );
}
