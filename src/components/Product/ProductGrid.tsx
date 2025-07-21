"use client";

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchProducts, IProduct } from '@/lib/features/products/productSlice';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';


const ProductGrid = () => {
    const dispatch = useAppDispatch();
    
    const status = useAppSelector((state) => state.products.status);
    const allProducts = useAppSelector<IProduct[] | null>((state) => state.products.items);
    const [filter, setFilter] = useState('*');
    const [modal, setModal] = useState(false)
    const [dataModal, setDataModal ] = useState<IProduct | null>(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
        console.log(allProducts, "products");
        
    }, [status, dispatch]);

    const handleFilter = (category: string) => {
        setFilter(category);
    };

    const filterButtons = [
        { key: '*', label: 'All Products' },
    ];

    if (status === 'loading') {
        return <div className="container p-t-100 p-b-100">Cargando productos...</div>;
    }

    if (status === 'failed') {
        return <div className="container p-t-100 p-b-100">Error al cargar los productos.</div>;
    }

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
                    {allProducts?.map(product => (
                        <ProductCard key={product.article_id} product={product} modalState={setModal} dataModalState={setDataModal}/>
                    ))}
                </div>
            </div>
            {
                modal && <ProductModal modalState={setModal} data={dataModal!}/>
            }
            
        </div>
    );
}

export default ProductGrid;