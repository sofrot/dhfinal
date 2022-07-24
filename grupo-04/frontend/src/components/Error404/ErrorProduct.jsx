import "./errorProduct.css";
import { Link } from "react-router-dom";
const ErrorProduct = () => {
  return (
    <section className="product-not-found">
      <h1>¡Upss! Lo sentimos mucho,</h1>
      <img className="not-found-GIF"
        src="https://c.tenor.com/lx2WSGRk8bcAAAAC/pulp-fiction-john-travolta.gif"
        alt="Lost"
      />
      <h1>este producto no se encuentra disponible 😔</h1>
      <div className="button-home">
      <button>
      <Link to={"/"} className="link_404">
        <p>Volver al inicio</p>
      </Link>
      </button>
      </div>
    </section>
  );
};

export default ErrorProduct;
