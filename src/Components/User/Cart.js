import React, { useState, useEffect } from "react"
import { getCart, onCartChange, removeCart , editCart } from '../../API/Cart'
import { Container, Table } from 'react-bootstrap'
import Cookie from "js-cookie"
import '../CSS/ProductDetail.css'
import { toast } from 'react-toastify'
import PayCart from "./PayCart";
import { Redirect } from 'react-router'


function Cart() {
    const style = { marginTop: '115px', marginBottom: '85px' }

    const [cart, setCart] = useState([])
    const refreshCart = () => getCart().then(setCart)
    useEffect(() => {
        refreshCart()
        const observer = onCartChange(refreshCart)
        return () => {
            observer.cancel()
        }
    }, [])

    const deleteProduct = (cart => {
        removeCart(cart._id)
        toast.success("Xóa thành công!")
    })





    const decrement = (cart) => {
        if (cart.quantity <= 1) {
            deleteProduct(cart)
        } else {
            cart.quantity = cart.quantity - 1
            editCart({
                _id: cart._id,
                _rev: cart._rev,
                buyer_id: cart.buyer_id,
                prdouct_id: cart.prdouct_id,
                shop_id: cart.shop_id,
                name: cart.name,
                check: false,
                price: cart.price,
                quantity: cart.quantity,
                maxQuantity: cart.maxQuantity,
                image: cart.image,
                total: parseInt(cart.price * cart.quantity)
            })
        }

    }
    const increment = (cart) => {
        if (cart.quantity < cart.maxQuantity) {
            cart.quantity = cart.quantity + 1
            editCart({
                _id: cart._id,
                _rev: cart._rev,
                buyer_id: cart.buyer_id,
                prdouct_id: cart.prdouct_id,
                shop_id: cart.shop_id,
                name: cart.name,
                check: false,
                price: cart.price,
                quantity: cart.quantity,
                maxQuantity: cart.maxQuantity,
                image: cart.image,
                total: parseInt(cart.price *cart.quantity)
            })

        } else {
            cart.quantity = cart.maxQuantity
            toast.error("Vượt quá số lượng cho phép !")

        }

    }
    // const onChange = (e,cart) => {
    //     console.log(cart)
    //     if (parseInt(e.target.value) > cart.maxQuantity) {
    //         cart.quantity = cart.maxQuantity
    //         toast.error("Vượt quá số lượng cho phép !")
    //         editCart({
    //             _id: cart._id,
    //             _rev: cart._rev,
    //             buyer_id: cart.buyer_id,
    //             prdouct_id: cart.prdouct_id,
    //             shop_id: cart.shop_id,
    //             name: cart.name,
    //             check: false,
    //             price: cart.price,
    //             quantity:  cart.quantity,
    //             maxQuantity: cart.maxQuantity,
    //             image: cart.image,
    //             total: parseInt(cart.price *  cart.quantity)
    //         })
    //     } else if (e.target.value < 1) {
    //         cart.quantity = 1
    //     } else {
    //         cart.quantity = parseInt(e.target.value)
    //         editCart({
    //             _id: cart._id,
    //             _rev: cart._rev,
    //             buyer_id: cart.buyer_id,
    //             prdouct_id: cart.prdouct_id,
    //             shop_id: cart.shop_id,
    //             name: cart.name,
    //             price: cart.price,
    //             check: false,
    //             quantity:  cart.quantity,
    //             maxQuantity: cart.maxQuantity,
    //             image: cart.image,
    //             total: parseInt(cart.price *  cart.quantity)
    //         })
    //     }
    // }

    //Tinh tong tien
    let length = cart.length;
    console.log("Lenght: ", length);
    let Arr = new Array(cart.length).fill(false);
    const [checkedState, setCheckedState] = useState([]);
    if(checkedState.length === 0){
        Arr.map((arr, index) => checkedState[index]=arr);
    }
    console.log("checkedState: ", checkedState);
    console.log("Arr: ", Arr);
    console.log("Database: ", cart);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);
    const [id, setId] = useState([]);

    const handleOnChange = (position) => {
        console.log("Position: ", position);
        const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    console.log("updatedCheckedState: ", updatedCheckedState);
   
    setCheckedState(updatedCheckedState);
    const totalCount = updatedCheckedState.reduce(
        (count, currentState, index) => {
          if (currentState === true) {
            return count + 1;
          }
          return count;
        },
        0
      );
     
     
      const totalPrice = updatedCheckedState.reduce(
        (sum, currentState, index) => {
            if (currentState === true) {
                if (!id.includes(cart[index])) {
                    id.push(cart[index]);
                }//Nếu id chưa tồn tại thì thêm vào
                return sum + cart[index].price * cart[index].quantity;
            }
            return sum;
        }, 0);

    setTotal(totalPrice);
    setCount(totalCount);

    //Xóa id nếu checked = false
    updatedCheckedState.map((currentState, index) => {
        console.log("Value id: ",id.includes(cart[index]._id));
        if (currentState === false) {
            setId(id.filter(item => item !== cart[index]));
        }
        return <div></div>
    })
};

  
  console.log("Total: ", total,count);
  console.log("Id: ", id);


    if (!Cookie.get("id")) {
        return (<Redirect to="/signin" />)
    } else {
        return (
            <React.Fragment>

                <Container style={style}>
                    <center><h4 style={{ fontWeight: 500, color: 'red' }}>Giỏ hàng của bạn</h4></center>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Shop</th>
                                <th>Hình ảnh</th>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                                <th>Xử lý</th>

                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((cart, index) => (
                                <React.Fragment key={index}>
                                    {Cookie.get('id') === cart.buyer_id ?
                                        <tr>
                                            <td><input
                                                type='checkbox'
                                                id={`custom-checkbox-${index}`}
                                                name={cart.name}
                                                value={cart.name}
                                                checked={checkedState[index]}
                                                onChange={() => handleOnChange(index)} /></td>
                                            <td> <img src={cart.image} alt={cart.image.name} style={{ width: '50px', height: '50px' }} /></td>
                                            <td>{cart.name}</td>
                                            <td><div className="buttons_added">
                                                <input className="minus is-form" type="button" value="-" onClick={()=>decrement(cart)} />
                                                <input aria-label="quantity"
                                                    className="input-qty"
                                                    // max={info.quantity}
                                                    min='1' type="number"
                                                    value={cart.quantity}
                                                    // onChange={(e) => onChange(cart)}
                                                />
                                                <input className="plus is-form" type="button" value="+" onClick={() =>increment(cart)} />
                                            </div></td>
                                            {/* <td>{cart.quantity}</td> */}
                                            <td>{cart.price}</td>
                                            <td>{cart.total}</td>
                                            <td><i
                                                className="fa fa-trash btn btn-danger"
                                                aria-hidden="true"
                                                onClick={() => { deleteProduct(cart) }}
                                            ></i></td>
                                        </tr>
                                        : null}
                                    {/* <span>{check === true ? cart._id + cart.name : 'off'}</span> */}
                                    <PayCart
                                        // check={check}
                                        cart={cart}
                                        total={total}
                                        totalCount = {count}
                                        idCart = {id}
                                    />
                                </React.Fragment>
                            ))}

                        </tbody>
                    </Table>
                </Container>

            </React.Fragment>

        )
    }
}
export default Cart;