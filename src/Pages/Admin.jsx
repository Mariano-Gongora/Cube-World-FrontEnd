import '../Styles.css'

import React, { useState, useEffect } from "react";
import { useUser } from '../main';
import { useNavigate } from 'react-router-dom';
import Homebar from '../Components/Homebar.jsx';

export const Admin = () => {

    const { user } = useUser();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [NewImage, setNewImage] = useState();
    const [ImageSelected, setImageSelected] = useState(false);

    useEffect(() => {
        async function apiCall() {
            if (!user) {
                navigate('/')
            }
            const response = await fetch(`http://localhost:8080/getUser/${user}`)
            const data = await response;
            if (data.admin === false) {
                navigate('/')
            }
        }
        apiCall();

        fetch(`http://localhost:8080/Products`)
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const handleSaveClick = async (product, ProductName, Price, description, Images, sales) => {
        const newList = Images
        if (ImageSelected) {
            newList.push(NewImage)
        }
        const Options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ProductName: ProductName,
                description: description,
                price: Price,
                sales: sales,
                Images: newList
            })
        };
        await fetch(`http://localhost:8080/updateProduct/${product.id}`, Options);
    };

    const handleChange = (e) => {
        const data = new FileReader()
        data.addEventListener('load', () => {
            setNewImage(data.result)
        })
        data.readAsDataURL(e.target.files[0])
        setImageSelected(true)
    }

    const handleDeleteClick = async (id) => {
        await fetch(`http://localhost:8080/deleteProduct/${id}`, {
            method: 'DELETE',
        }).then(response => response.json())
    }

    const imgDelete = async (product, imgIndex) => {
        const newList = product.Images
        newList.splice(imgIndex, 1)
        const Options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ProductName: product.ProductName,
                description: product.description,
                price: product.price,
                sales: product.sales,
                Images: newList
            })
        };
        await fetch(`http://localhost:8080/updateProduct/${product.id}`, Options);
    }

    const handleAddProductClick = async (ProductName, Price, description, newImage) => {
        var list= new Array();
        list.push(NewImage)
        if (ProductName === "" || Price === "" || description === "" || newImage === "") {
            alert("Missing a field for new item")
        }
        else {
            const Options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ProductName: ProductName,
                    description: description,
                    price: Price,
                    sales: 0,
                    Images: list
                })
            };
            await fetch(`http://localhost:8080/setProduct`, Options);
        }
    }

    return (
        <>
        <Homebar/>
        <div>
            <section className='products-page'>
                {products.length === 0 ? (
                    <div>No products found</div>
                ) : (
                    products.map((product, index) => (
                        <div className='product' key={index}>
                            <div className='info'>
                                {product.Images.map((image, imgIndex) => (
                                    <>
                                        <img className="image" src={image}></img>
                                        <button onClick={() => { imgDelete(product, imgIndex) }}>Delete</button>
                                    </>
                                ))}
                                <div><input type='file' id={'newImage' + index} onChange={handleChange}></input></div>

                                <h1 >ID: {product.id}</h1>
                                <label>Name:</label>
                                <input id={'ProductName' + index} defaultValue={product.ProductName}></input>
                                <label>Price:</label>
                                <input id={'Price' + index} defaultValue={product.price}></input>
                                <label>Description:</label>
                                <input id={'description' + index} defaultValue={product.description}></input>
                            </div>
                            <button className='view-btn' onClick={() => handleSaveClick(product, document.getElementById('ProductName' + index).value, document.getElementById('Price' + index).value, document.getElementById('description' + index).value, product.Images, product.sales)}>Save</button>
                            <button className='view-btn' onClick={() => handleDeleteClick(product.id)}>Delete</button>
                        </div>
                    ))
                )}
                <div className='best-seller-items'>
                    <div className='info'>
                        <div><input type='file' id={'newImage'} onChange={handleChange}></input></div>
                        <label>Name:</label>
                        <input id={'ProductName'} placeholder="ProductName"></input>
                        <label>Price:</label>
                        <input id={'Price'} placeholder="Price"></input>
                        <label>Description:</label>
                        <input id={'description'} placeholder="Description"></input>
                        <button className='view-btn' onClick={() => handleAddProductClick(document.getElementById('ProductName').value, document.getElementById('Price').value, document.getElementById('description').value, document.getElementById('newImage').value)}>Add Product</button>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
};

export default Admin;