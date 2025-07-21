"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ICart } from "@/lib/features/cart/CartSlice";
import { fetchTokens, IAcceptanceUrl } from "@/lib/features/tokens/TokenSlice";
import DatosClientes from "@/components/Cart/DatosClientes";
import DatosTarjeta from "@/components/Cart/DatosTarjeta";
import { ITransactionData } from "@/lib/features/payment/paymentSlice";

interface ITotales {
  total: number;
  subtotal: number;
}

export default function CartPage() {
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.tokens.status);
  const tokens = useAppSelector<IAcceptanceUrl | null>(
    (state) => state.tokens.items
  );

  const statusPayment = useAppSelector((state) => state.payment.status);
  const payment = useAppSelector<ITransactionData>(
    (state) => state.payment.items
  );

  const cartData = useAppSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState<ICart>(cartData);
  const [totales, setTotales] = useState<ITotales>({
    total: 0,
    subtotal: 0,
  });
  const [step, setStep] = useState(1)
  const [paymentData, setPaymentData] = useState<ITransactionData | null>(null)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTokens());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setTotales({
      total: cartItems.price * cartItems.quantity!,
      subtotal: cartItems.price * cartItems.quantity!,
    });
    
    if(paymentData){
      const tmp = {...paymentData};
      tmp.order.order_article_id = cartItems.article_id
      tmp.order.order_amount = cartItems.quantity!
      tmp.order.order_article_price = cartItems.price
      tmp.order.order_total = total;
      setPaymentData(tmp);
    }
  },[statusPayment, payment]);

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems((currentItems) => {
      currentItems.quantity = Math.max(1, currentItems.quantity! + delta);

      return currentItems;
    });
  };

  const subtotal = cartItems.price * cartItems.quantity!;
  const total = subtotal;

  return (
    <>
      <div className="container">
        <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
          <Link href="/" className="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
          </Link>
          <span className="stext-109 cl4">Shopping Cart</span>
        </div>
      </div>
      <div className="bg0 p-t-75 p-b-85">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
              <div className="m-l-25 m-r--38 m-lr-0-xl">
                <div className="wrap-table-shopping-cart">
                  <table className="table-shopping-cart">
                    <thead>
                      <tr className="table_head">
                        <th className="column-1">Product</th>
                        <th className="column-2"></th>
                        <th className="column-3">Price</th>
                        <th className="column-4">Quantity</th>
                        <th className="column-5">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        <tr className="table_row" key={cartItems.article_id}>
                          <td className="column-1">
                            <div className="how-itemcart1">
                              <Image
                                src={cartItems.image}
                                alt={cartItems.name}
                                width={80}
                                height={100}
                              />
                            </div>
                          </td>
                          <td className="column-2">{cartItems.name}</td>
                          <td className="column-3">
                            $ {cartItems.price.toFixed(2)}
                          </td>
                          <td className="column-4">
                            <div className="wrap-num-product flex-w m-l-auto m-r-0">
                              <div
                                className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                onClick={() =>
                                  handleQuantityChange(cartItems.quantity!, -1)
                                }
                              >
                              <i className="fs-16 zmdi zmdi-minus"></i>
                              </div>
                              <input
                                className="mtext-104 cl3 txt-center num-product"
                                type="number"
                                value={cartItems.quantity}
                                readOnly
                              />
                              <div
                                className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                onClick={() =>
                                  handleQuantityChange(cartItems.quantity!, 1)
                                }
                              >
                                <i className="fs-16 zmdi zmdi-plus"></i>
                              </div>
                            </div>
                          </td>
                          <td className="column-5">
                            ${" "}
                            {(cartItems.price * cartItems.quantity!).toFixed(2)}
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {
              step == 1 ? (
                <DatosClientes stepState={setStep} total={total} tokens={tokens!}/>
              ) :(
                <DatosTarjeta total={total} />
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}
