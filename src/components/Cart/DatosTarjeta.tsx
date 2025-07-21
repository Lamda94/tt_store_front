import React from "react";

interface Props {
  total: number;
}

export default function DatosTarjeta({ total }: Props) {
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
                  name="state"
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
                  type="text"
                  name="state"
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
                  name="state"
                  placeholder="Fecha"
                />
              </div>
            </span>
          </div>
        </div>
        <button className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
          Pagar
        </button>
      </div>
    </div>
  );
}
