import { addPayment, ITransactionData } from "@/lib/features/payment/paymentSlice";
import { IAcceptanceUrl } from "@/lib/features/tokens/TokenSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";

interface Props {
  total: number;
  stepState: (value: number) => void;
  tokens: IAcceptanceUrl;
}

const initialState = {
  customer: {
    customer_first_name: "",
    customer_last_name: "",
    customer_email: "",
    customer_phone_number: "",
    customer_address: "",
  },
  order: {
    order_article_id: "",
    order_amount: 0,
    order_article_price: 0,
    order_total: 0,
  },
  tarjeta: {
    titular: "",
    tarjeta_number: 0,
    verify_code: 0,
    expired_date: "",
  },
  tokens: {
    acceptance_token: "",
    personal_data_token: "",
  },
};

export default function DatosClientes({ total, stepState, tokens }: Props) {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, customer: { ...form.customer, [name]: value } });
  };

  interface HandleSubmitEvent extends React.MouseEvent<HTMLButtonElement, MouseEvent> {}
  const handleStep = () => stepState(2);

  const handleSubmit = (e: HandleSubmitEvent) => {
    e.preventDefault();
    console.log(form, "form");
    
    dispatch(
      addPayment(form)
    );
    handleStep()
  };

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
                  name="customer_first_name"
                  value={form.customer.customer_first_name}
                  onChange={handleChange}
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
                   name="customer_last_name"
                  value={form.customer.customer_last_name}
                  onChange={handleChange}
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
                  name="customer_email"
                  value={form.customer.customer_email}
                  onChange={handleChange}
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
                  name="customer_phone_number"
                  value={form.customer.customer_phone_number}
                  onChange={handleChange}
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
                   name="customer_address"
                  value={form.customer.customer_address}
                  onChange={handleChange}
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
          onClick={handleSubmit}
        >
          Ir a pagar
        </button>
      </div>
    </div>
  );
}
