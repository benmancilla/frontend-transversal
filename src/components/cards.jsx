import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShoppingCart from './cart'


const CreateCard = ({ idProduct, img, name, alt, url1, price, onAddToCart }) => {
    return (
        <div className="col">
            <div className="card">
                <div style={{ backgroundImage: `url(${img})` }} className="card-img-top" id="card-paint" alt={alt} onClick={() => window.open(img, '_blank')} target="_blank"></div>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <h5 className="card-title">${price}</h5>
                    <button className="btn btn-primary" id="add-cart" onClick={() => onAddToCart({ id: idProduct, img, name, price }) }>Agregar al Carrito</button>
                </div>
            </div>
        </div>
    );
}

const CreateCardGroup = () => {
    const [reacts, setReacts] = useState([]);
    const [chunkedReacts, setChunkedReacts] = useState([]);
    const [mode, setMode] = useState('md');
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchReactData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/drawings/');
                setReacts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchReactData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 426) {
                setMode('sm');
            } else {
                setMode('md');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const chunkArray = (array, size) => {
            return array.reduce((acc, _, index) => {
                if (index % size === 0) {
                    acc.push(array.slice(index, index + size));
                }
                return acc;
            }, []);
        };

        const chunkSize = mode === 'sm' ? 1 : 3;
        setChunkedReacts(chunkArray(reacts, chunkSize));
    }, [reacts, mode]);

    const addToCart = (product) => {
        const existingProduct = cartItems.find(item => item.id === product.id);
        if (existingProduct) {
            const updatedCart = cartItems.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.map(item =>
            item.id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
        );

        if (updatedCart.find(item => item.id === productId && item.quantity === 0)) {
            const filteredCart = updatedCart.filter(item => item.id !== productId);
            setCartItems(filteredCart);
        } else {
            setCartItems(updatedCart);
        }
    };

    const calculateQuantity = (productId) => {
        const product = cartItems.find(item => item.id === productId);
        return product ? product.quantity : 0;
    };

    const incrementQuantity = (productId) => {
        const updatedCart = cartItems.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCart);
    };

    const totalPrice = () => {
        let total = 0;
        cartItems.forEach((product) => {
            total += parseFloat(product.price) * product.quantity;
        });
        return total.toFixed(2);
    };

    return (
        <React.Fragment>
            <div id="card-carousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="7000">
                <div className="carousel-inner">
                    {chunkedReacts.map((chunk, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <div className="row row-cols-1 row-cols-md-3 g-4" id="info">
                                {chunk.map((react) => (
                                    <CreateCard
                                        key={react.id}
                                        idProduct={react.id}
                                        img={react.image}
                                        name={react.title}
                                        alt={react.title}
                                        url1={react.link}
                                        price={react.price}
                                        onAddToCart={addToCart}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev carousel-btn" type="button" data-bs-target="#card-carousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next carousel-btn" type="button" data-bs-target="#card-carousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            
            <div>
                <ShoppingCart
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    totalPrice={totalPrice}
                    incrementQuantity={incrementQuantity}
                    removeFromCart={removeFromCart}
                />
            </div>

        </React.Fragment>
    );
};

export default CreateCardGroup;