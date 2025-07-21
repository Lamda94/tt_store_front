"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { ICart } from "@/lib/features/cart/CartSlice";

interface ITotales {
  total: number;
  subtotal: number;
}

export default function CartPage() {
  const cartData = useAppSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState<ICart>(cartData);
  const [totales, setTotales] = useState<ITotales>({
    total: 0,
    subtotal: 0,
  });

  useEffect(() => {
    setTotales({
        total: cartItems.price*cartItems.quantity!,
        subtotal: cartItems.price*cartItems.quantity!
    })
  });

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
      {/* Breadcrumb */}
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

      {/* Shopping Cart */}
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
                                  handleQuantityChange(cartItems.article_id, -1)
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
                                  handleQuantityChange(cartItems.article_id, 1)
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
                {/* ... Resto de botones como Apply Coupon y Update Cart ... */}
              </div>
            </div>

            <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
              <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                <h4 className="mtext-109 cl2 p-b-30">Cart Totals</h4>

                <div className="flex-w flex-t bor12 p-b-13">
                  <div className="size-208">
                    <span className="stext-110 cl2">Subtotal:</span>
                  </div>
                  <div className="size-209">
                    <span className="mtext-110 cl2">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* ... Sección de Shipping ... */}

                <div className="flex-w flex-t p-t-27 p-b-33">
                  <div className="size-208">
                    <span className="mtext-101 cl2">Total:</span>
                  </div>
                  <div className="size-209 p-t-1">
                    <span className="mtext-110 cl2">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
