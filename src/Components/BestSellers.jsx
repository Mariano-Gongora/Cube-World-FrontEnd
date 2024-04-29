import { useEffect, useState } from "react";
import '../Styles.css'


import React from "react";
import ProductView from "./ProductView.jsx";

export const BestSellers = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    

    useEffect(() => {
        fetch(`http://localhost:8080/bestSellers`)
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const handleViewClick = (product) => {
        setSelectedProduct(product);
    };

    const handleSetState = () => {
        setSelectedProduct(null);
    }

    return (
        <>
            {ProductView}
            <section className='best-seller-items'>
                {products.length === 0 ? (
                    <div>No products found</div>
                ) : (
                    products.map((product, index) => (
                        <div className='product' key={index}>
                            <div>
                                <img className='image' src={product.Images[0]} />
                            </div>
                            <div className='info'>
                                <h1>{product.ProductName}</h1>
                                <h1>${product.price}</h1>
                            </div>
                            <button className='view-btn' onClick={() => handleViewClick(product)}>View</button>
                        </div>
                    ))
                )}
            </section>

            {selectedProduct && <ProductView selectedProduct={selectedProduct} handleSetState={handleSetState} />}
        </>
    );
};

export default BestSellers;