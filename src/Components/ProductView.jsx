import '../Styles.css'
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useCart, useUser } from '../main';

export const ProductView = ({ selectedProduct, handleSetState }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const [showModal, setShowModal] = useState(true);

    const {user}=useUser();

    const { updateCart } = useCart();

    const { cart } = useCart();

    const handleAddToCartClick = async(selectedProduct) => {
        let data
        if(localStorage.getItem("user") && localStorage.getItem("cart").length<1){
            
            localStorage.setItem("cart",selectedProduct.id)
            updateCart(localStorage.getItem("cart").split(','))
            let response1= await fetch(`http://localhost:8080/getUser/${user}`)
            data=await response1.json();
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    FirstName: data.FirstName,
                    LastName: data.LastName,
                    Email: data.Email,
                    Password: data.Password,
                    CartList: JSON.parse("[" + localStorage.getItem("cart") + "]")

                })
            };
            const response2 = await fetch(`http://localhost:8080/updateUser/${user}`, requestOptions);
            const data2 = await response2.json();
            
            
        }
        else if(localStorage.getItem("user")){
            const prevCart=localStorage.getItem("cart")
            const fullList=prevCart+","+selectedProduct.id
            localStorage.setItem("cart",fullList)
            updateCart(localStorage.getItem("cart").split(','))
            let response= await fetch(`http://localhost:8080/getUser/${user}`)
            data=await response.json();
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    FirstName: data.FirstName,
                    LastName: data.LastName,
                    Email: data.Email,
                    Password: data.Password,
                    CartList: JSON.parse("[" + localStorage.getItem("cart") + "]")

                })
            };
            const response2 = await fetch(`http://localhost:8080/updateUser/${user}`, requestOptions);
            const data2 = await response2.json();
            

        }
        else if(localStorage.getItem("cart").length<1){
            localStorage.setItem("cart",selectedProduct.id)
            updateCart(localStorage.getItem("cart").split(','))
        }else{
            const prevCart=localStorage.getItem("cart")
            const fullList=prevCart+","+selectedProduct.id
            localStorage.setItem("cart",fullList)
            updateCart(localStorage.getItem("cart").split(','))
        }

    };

    useEffect(() => {
        if (selectedProduct) {
            setShowModal(true);
            const dialog = document.getElementById('selected-item-dialog')
            dialog.showModal();

        } else {
            setShowModal(false);
            const dialog = document.getElementById('selected-item-dialog')
            handleSetState();
            dialog.close();
        }
    }, [selectedProduct]);

    const handleCloseClick = () => {
        setImageIndex(0);
        handleSetState();
        const dialog = document.getElementById('selected-item-dialog')
        dialog.close();
    };

    const handleLeftClick = () => {
        const isFirstImage = imageIndex === 0;
        const newIndex = isFirstImage ? selectedProduct.Images.length - 1 : imageIndex - 1;
        setImageIndex(newIndex);
    };

    const handleRightClick = () => {
        const isLastImage = imageIndex === selectedProduct.Images.length - 1;
        const newIndex = isLastImage ? 0 : imageIndex + 1;
        setImageIndex(newIndex);
    };



    return (
        <>
            <dialog id="selected-item-dialog" onKeyDown={(event) => { if (event.key === "Escape") { handleSetState() } }}>
                {showModal && (
                    <>
                        <IoClose style={{ paddingTop: "0px" }} onClick={handleCloseClick} />
                        {selectedProduct && (
                            <>
                                <div className='image-slider'>
                                    <img className='image-modal' src={selectedProduct.Images[imageIndex]} />
                                    <button className='next-image-btn' onClick={handleLeftClick}>←</button>
                                    <button className='next-image-btn' onClick={handleRightClick}>→</button>
                                </div>
                                <span className='info-modal'>
                                    <h1 className='product-title-modal'>{selectedProduct.ProductName}</h1>
                                    <section className='product-description-modal'>{selectedProduct.description}</section>
                                    <h2 className='product-price-modal'>${selectedProduct.price}</h2>
                                    <button className='add-to-cart-button' onClick={() => handleAddToCartClick(selectedProduct)}>Add to cart</button>
                                </span>
                            </>
                        )}
                    </>
                )}

            </dialog>
        </>
    );
};

export default ProductView;

