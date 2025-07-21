import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IProduct } from '@/lib/features/products/productSlice'

interface Props {
    modalState: (value: boolean)=>void,
    dataModalState: (value: IProduct)=>void,
    product: IProduct
}
export default function ProductCard({ modalState, product, dataModalState }:Props) {
    const showModal = () => {
        modalState(true);
        dataModalState(product)
    }
    console.log(product, "Product");
    
  return (
    <div className={`col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item`}>
            <div className="block2">
                <div className="block2-pic hov-img0" onClick={showModal}>
                    <Image src={product.article_image} alt={product.article_name} width={270} height={334} className='img-fluid'/>
                    <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                        Ver Detalle
                    </a>
                </div>
                <div className="block2-txt flex-w flex-t p-t-14">
                    <div className="block2-txt-child1 flex-col-l">
                        <Link href="#" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">{product.article_name}</Link>
                        <span className="stext-105 cl3">${product.article_price.toFixed(2)}</span>
                    </div>
                    <div className="block2-txt-child2 flex-r p-t-3">
                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <Image className="icon-heart1 dis-block trans-04" src="/images/icons/icon-heart-01.png" alt="ICON" width={15} height={13} />
                            <Image className="icon-heart2 dis-block trans-04 ab-t-l" src="/images/icons/icon-heart-02.png" alt="ICON" width={15} height={13} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
  )
}
