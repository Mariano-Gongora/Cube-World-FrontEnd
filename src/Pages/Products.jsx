import '../Styles.css'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart,FaSearch } from "react-icons/fa";
import ProductView from "../Components/ProductView.jsx";
import Cart from '../Components/Cart.jsx';
import React from "react"
import Homebar from '../Components/Homebar.jsx';

export const Products = () => {
    const { search } = useParams();
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showingCart, setShowingCart] = useState(false);

    useEffect(() => {
        if (search) {
            fetch(`https://cube-world-api-3a55a0cf69a0.herokuapp.com/Products/${search}`)
                .then(response => response.json())
                .then(data => setProducts(data));
        } else {
            fetch(`https://cube-world-api-3a55a0cf69a0.herokuapp.com/Products`)
                .then(response => response.json())
                .then(data => setProducts(data));
        }
    }, [search]);

    const handleViewClick = (product) => {
        if (product) {
            setSelectedProduct(null);
        }
        setSelectedProduct(product);
    };

    const handleSetState = () => {
        setSelectedProduct(null);
    }

    const clickCartButton = () => {
        setShowingCart((showingCart) => !showingCart);
    };

    return (
        <>
            <Homebar/>
            <section className='products-page'>
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
            {showingCart && <Cart />}
            <button className='cart-button' onClick={clickCartButton}><FaShoppingCart className="shopping-cart-icon" /></button>
            {selectedProduct && <ProductView selectedProduct={selectedProduct} handleSetState={handleSetState} />}
        </>
    );
};

export default Products;
