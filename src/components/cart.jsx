import React from 'react';
import trash from '../assets/img/trash.svg'
const ShoppingCart = ({ cartItems, setCartItems, totalPrice, incrementQuantity, removeFromCart }) => {
    return (
        <div className="modal fade" id="cartModal" tabIndex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header" id='cart-top'>
                    <h5 className="modal-title" id="cartModalLabel">Carrito de Compras</h5>
                    <button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close">Seguir comprando</button>
                </div>
                <div className="modal-body">
                    <ul className="list-unstyled">
                        {cartItems.map((item, index) => (
                            <li key={index} className="d-flex align-items-center mb-3">
                                <img src={item.img} alt={item.name} width={60} />
                                <div className="ms-3">
                                    <div>{item.name} ${item.price}</div>
                                    <div>cantidad: {item.quantity}</div>
                                    <button className='btn cartbtn' onClick={() => incrementQuantity(item.id)}>+</button>
                                    <button className='btn cartbtn' onClick={() => removeFromCart(item.id)}>-</button>
                                    <button className="btn cartbtn" onClick={() => setCartItems(cartItems.filter((_, i) => i !== index))}><img src={trash} width={20}/></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="modal-footer">
                    <div>Total: ${totalPrice()}</div>
                </div>
                <div className="modal-footer" id='cart-footer'>
                    <button type="button" className="btn trash-btn" onClick={() => setCartItems([])}>Vaciar carrito</button>
                    <button type="button" className="btn btn-danger" onClick={() => setCartItems([])}>comprar</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ShoppingCart;
