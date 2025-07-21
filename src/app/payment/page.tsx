"use client";

import Link from "next/link";

export default function CartPage() {
  return (
    <>
      <div className="container">
        <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
          <Link href="/" className="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i
              className="fa fa-angle-right m-l-9 m-r-10"
              aria-hidden="true"
            ></i>
          </Link>
          <span className="stext-109 cl4">Shopping Cart</span>
        </div>
      </div>
      <div className="bg0 p-t-75 p-b-85">
        <div className="container text-center my-5 py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <i
                className="bi bi-check-circle-fill text-success"
                style={{ fontSize: "5rem" }}
              ></i>

              <h2 className="mt-4">¡Pago Realizado con Éxito!</h2>
              <p className="lead text-muted">Gracias por tu compra.</p>

              <div className="alert alert-success mt-4">
                Tu referencia de pago es:{" "}
                <strong className="fw-bold">#ABC-123456</strong><br />
                Tu número de pedido es:{" "}
                <strong className="fw-bold">#123456</strong>
              </div>
              
              <p className="mt-4">
                Hemos enviado un correo electrónico de confirmación con los
                detalles de tu pedido.
              </p>

              <a href="/" className="btn btn-primary mt-3">
                Volver al Inicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
