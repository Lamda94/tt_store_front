import { IAcceptanceUrl } from "@/lib/features/tokens/TokenSlice";
import React from "react";

interface Props {
  total: number;
  stepState: (value: number) => void;
  tokens: IAcceptanceUrl;
}

export default function DatosClientes({ total, stepState, tokens }: Props) {
  const handleStep = () => stepState(2);
  return (
    <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
      <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
        <h4 className="mtext-109 cl2 p-b-30">Datos del cliente</h4>
        <div className="flex-w flex-t  p-b-13">
          <div className="size-209">
            <span className="mtext-110 cl2">
              <div className="bor8 bg0 m-b-12">
                <input
                  className="stext-111 cl8 plh3 size-111 p-lr-15"
                  type="text"
                  name="state"
                  placeholder="Nombre"
                />
              </div>
            </span>
          </div>
        </div>
        <div className="flex-w flex-t  p-b-13">
          <div className="size-209">
            <span className="mtext-110 cl2">
              <div className="bor8 bg0 m-b-12">
                <input
                  className="stext-111 cl8 plh3 size-111 p-lr-15"
                  type="text"
                  name="state"
                  placeholder="Apellido"
                />
              </div>
            </span>
          </div>
        </div>
        <div className="flex-w flex-t  p-b-13">
          <div className="size-209">
            <span className="mtext-110 cl2">
              <div className="bor8 bg0 m-b-12">
                <input
                  className="stext-111 cl8 plh3 size-111 p-lr-15"
                  type="text"
                  name="state"
                  placeholder="Correo"
                />
              </div>
            </span>
          </div>
        </div>
        <div className="flex-w flex-t  p-b-13">
          <div className="size-209">
            <span className="mtext-110 cl2">
              <div className="bor8 bg0 m-b-12">
                <input
                  className="stext-111 cl8 plh3 size-111 p-lr-15"
                  type="text"
                  name="state"
                  placeholder="Telefono"
                />
              </div>
            </span>
          </div>
        </div>
        <div className="flex-w flex-t  p-b-13">
          <div className="size-209">
            <span className="mtext-110 cl2">
              <div className="bor8 bg0 m-b-12">
                <input
                  className="stext-111 cl8 plh3 size-111 p-lr-15"
                  type="text"
                  name="state"
                  placeholder="Direccion"
                />
              </div>
            </span>
          </div>
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="checkTerminos"
            required
          />
          <label className="form-check-label" htmlFor="checkTerminos">
            He leído y acepto los{" "}
            <a
              href={tokens.presigned_acceptance.url}
              target="_blank"
              className="text-decoration-underline"
            >
              Términos y Condiciones
            </a>
            .
          </label>
          <div className="invalid-feedback">
            Debes aceptar los términos para continuar.
          </div>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="checkDatos"
            required
          />
          <label className="form-check-label" htmlFor="checkDatos">
            Autorizo el{" "}
            <a
              href={tokens.presigned_personal_data_auth.url}
              target="_blank"
              className="text-decoration-underline"
            >
              Tratamiento de mis Datos Personales
            </a>
            .
          </label>
          <div className="invalid-feedback">
            Debes autorizar el tratamiento de datos para continuar.
          </div>
        </div>
        <div className="flex-w flex-t p-t-27 p-b-33">
          <div className="size-208">
            <span className="mtext-101 cl2">Total:</span>
          </div>
          <div className="size-209 p-t-1">
            <span className="mtext-110 cl2">${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
          onClick={handleStep}
        >
          Ir a pagar
        </button>
      </div>
    </div>
  );
}
