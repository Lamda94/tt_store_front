    "use client";

import { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { IProduct } from '@/lib/features/products/productSlice';
import ProductCard from './ProductCard';
import ProductModal from '../ProductModal';


const ProductGrid = () => {
    const allProducts = useAppSelector((state) => state.products);
    const [filter, setFilter] = useState('*');
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const [modal, setModal] = useState(false)
    const [dataModal, setDataModal ] = useState<IProduct>(allProducts[0]) 

    useEffect(() => {
        if (filter === '*') {
            setFilteredProducts(allProducts);
        } else {
            setFilteredProducts(allProducts.filter(p => p.category === filter));
        }
    }, [filter]);

    const handleFilter = (category: string) => {
        setFilter(category);
    };

    const filterButtons = [
        { key: '*', label: 'All Products' },
    ];

    return (
        <div className="bg0 m-t-23 p-b-140">
            <div className="container">
                <div className="flex-w flex-sb-m p-b-52">
                    <div className="flex-w flex-l-m filter-tope-group m-tb-10">
                        {filterButtons.map(btn => (
                             <button 
                                key={btn.key}
                                className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${filter === btn.key ? 'how-active1' : ''}`}
                                onClick={() => handleFilter(btn.key)}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="row">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} modalState={setModal} dataModalState={setDataModal}/>
                    ))}
                </div>

                <div className="flex-c-m flex-w w-full p-t-45">
                    <a href="#" className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04">
                        Load More
                    </a>
                </div>
            </div>
            {
                modal && <ProductModal modalState={setModal} data={dataModal}/>
            }
            
        </div>
    );
}

export default ProductGrid;