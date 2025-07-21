import {
  fetchTransaction,
  ITransactionData,
} from "@/lib/features/payment/paymentSlice";
import { useAppDispatch } from "@/lib/hooks";
import React, { useState } from "react";

interface Props {
  paymentData: ITransactionData;
}

export default function DatosTarjeta({ paymentData }: Props) {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<ITransactionData>(paymentData);
  const luhnCheck = (cardNumber: string): boolean => {
    let sum = 0;
    let shouldDouble = false;
    // Itera sobre los dígitos en orden inverso
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };
  const getCreditCardType = (
    cardNumber: string
  ): { brand: string; isValid: boolean } => {
    const cleanedNumber = cardNumber.replace(/[\s-]/g, "");

    if (!/^\d+$/.test(cleanedNumber)) {
      return { brand: "Desconocido", isValid: false };
    }

    const isValid = luhnCheck(cleanedNumber);
    if (!isValid) {
      return { brand: "Desconocido", isValid: false };
    }

    const cardPatterns = {
      Visa: /^4\d{12}(?:\d{3}|\d{6})?$/,
      Mastercard:
        /^(?:5[1-5]\d{2}|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)\d{12}$/,
      Amex: /^3[47]\d{13}$/,
      Discover: /^6(?:011|5\d{2}|4[4-9]\d|22\d)\d{12}$/,
      Diners: /^3(?:0[0-5]|[689]\d)\d{11}$/,
      JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
    };

    for (const [brand, pattern] of Object.entries(cardPatterns)) {
      if (pattern.test(cleanedNumber)) {
        return { brand, isValid: true };
      }
    }

    return { brand: "Desconocido", isValid: true };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name == "tarjeta_number") {
      const type = getCreditCardType(value);
      console.log(type, "type");
    }
    setForm({ ...form, tarjeta: { ...form.tarjeta, [name]: value } });
  };

  interface HandleSubmitEvent
    extends React.MouseEvent<HTMLButtonElement, MouseEvent> {}
  const handleSubmit = async (e: HandleSubmitEvent) => {
    e.preventDefault();
    try {
      await dispatch(fetchTransaction(form));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
      <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
        <h4 className="mtext-109 cl2 p-b-30">Datos pago</h4>
        <div className="flex-w flex-t  p-b-13">
          <div className="size-209">
            <span className="mtext-110 cl2">
              <div className="bor8 bg0 m-b-12">
                <input
                  className="stext-111 cl8 plh3 size-111 p-lr-15"
                  type="text"
                  name="titular"
                  value={form.tarjeta.titular}
                  onChange={handleChange}
                  placeholder="Nombre del titular"
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
                  type="number"
                  maxLength={16}
                  name="tarjeta_number"
                  value={form.tarjeta.tarjeta_number}
                  onChange={handleChange}
                  placeholder="Numero tarjeta"
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
                  type="number"
                  maxLength={3}
                  name="verify_code"
                  value={form.tarjeta.verify_code}
                  onChange={handleChange}
                  placeholder="CCV"
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
                  name="expired_date"
                  value={form.tarjeta.expired_date}
                  onChange={handleChange}
                  placeholder="Fecha"
                />
              </div>
            </span>
          </div>
        </div>
        <button
          className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
          onClick={handleSubmit}
        >
          Pagar
        </button>
      </div>
    </div>
  );
}
