"use client";

import { ICart } from "@/lib/features/cart/CartSlice";
import { IProduct, addProduct } from "@/lib/features/products/productSlice";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
interface Props {
    modalState: (value: boolean)=>void,
    data:  IProduct
}

const ProductModal = ({modalState, data}: Props) => {
    const cartData = useAppSelector((state) => state.cart);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const closeModal = ()=>modalState(false);
    const handleAddToCart = () => {
        dispatch(addProduct(data));
        console.log(`${data.name} añadido al carrito.`);
        //router.push('/cart');
    };

    return (
        <div className="wrap-modal1 js-modal1 p-t-60 p-b-20 show-modal1">
            <div className="overlay-modal1 js-hide-modal1"></div>

            <div className="container">
                <div className="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
                    <button className="how-pos3 hov3 trans-04 js-hide-modal1" onClick={closeModal}>
                        <Image src="/images/icons/icon-close.png" alt="CLOSE" width={20} height={20}/>
                    </button>

                    <div className="row">
                        <div className="col-md-6 col-lg-7 p-b-30">
                            <div className="p-l-25 p-r-30 p-lr-0-lg">
                                <div className="wrap-slick3 flex-sb flex-w">
                                    <div className="slick3 gallery-lb">
                                        <div className="item-slick3">
                                            <div className="wrap-pic-w pos-relative">
                                                <Image src={data!.image} alt="IMG-PRODUCT" width={500} height={600} className="img-fluid"/>
                                                <a className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href={data!.image}>
                                                    <i className="fa fa-expand"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-6 col-lg-5 p-b-30">
                            <div className="p-r-50 p-t-5 p-lr-0-lg">
                                <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                                    {data!.name}
                                </h4>

                                <span className="mtext-106 cl2">
                                    {data!.price}
                                </span>

                                <p className="stext-102 cl3 p-t-23">
                                    {data!.descriptions}
                                </p>
                                
                                <div className="p-t-33">
                                    <div className="flex-w flex-r-m p-b-10">
                                        <div className="size-204 flex-w flex-m respon6-next">
                                            <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                                                <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                                    <i className="fs-16 zmdi zmdi-minus"></i>
                                                </div>
                                                <input className="mtext-104 cl3 txt-center num-product" type="number" name="num-product" defaultValue="1" />
                                                <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                                                    <i className="fs-16 zmdi zmdi-plus"></i>
                                                </div>
                                            </div>
                                                <button className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
                                                    Add to cart
                                                </button>
                                        </div>
                                    </div>	
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;