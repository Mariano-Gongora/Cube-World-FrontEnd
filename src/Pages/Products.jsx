import '../Styles.css'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart,FaSearch } from "react-icons/fa";
import ProductView from "../Components/ProductView.jsx";
import Cart from '../Components/Cart.jsx';
import React from "react"

export const Products = () => {
    const { search } = useParams();
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showingCart, setShowingCart] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const handle_login_signup_click = () => navigate('/login_signup');
    const handle_logo_click = () => navigate('/');

    useEffect(() => {
        if (search) {
            fetch(`http://localhost:8080/Products/${search}`)
                .then(response => response.json())
                .then(data => setProducts(data));
        } else {
            fetch(`http://localhost:8080/Products`)
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

    const onEnterPress = () => {
        navigate(`/products/${searchTerm}`);
    };

    const onSearchPress= () =>{
        navigate(`/products/${searchTerm}`);
    }

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSetState = () => {
        setSelectedProduct(null);
    }

    const clickCartButton = () => {
        setShowingCart((showingCart) => !showingCart);
    };

    return (
        <>
            <div className="header">
                <div className='search-bar-pair'>
                    <input type="text" onKeyDown={(event) => { if (event.key === "Enter") { onEnterPress() } }} value={searchTerm} onChange={handleInputChange} placeholder="Search" className='search-input' />
                    <button className='search-btn' onClick={onSearchPress}><FaSearch /></button>
                </div>
                <div>
                    <label className='Cube-World-Logo' onClick={handle_logo_click}>Cube World</label>
                </div>
                <div>
                {localStorage.getItem("user") ? <label className='login-signup-label' onClick={handle_login_signup_click}>View Profile</label> : <label className='login-signup-label' onClick={handle_login_signup_click}>Login/Sign Up</label> }
                </div>

            </div>
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
