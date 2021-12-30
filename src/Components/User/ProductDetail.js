import React, { useState, useEffect } from "react";
import '../CSS/ProductDetail.css'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom"
import { getProduct, ondataChange } from "../../API/ProductAPI"
import { getData, onDataChange } from '../../API/AccountAPI'
import { toast } from 'react-toastify'
import Cookie from 'js-cookie'
import { addCart, getCart, onCartChange, editCart } from '../../API/Cart'

function ProductDetail() {

    const style = {
        marginTop: '115px',
        padding: '10px 10px',
        backgroundColor: '#fff',
        textDecoration: 'none'
    }
    // Fetch produtct 
    const [product, setProduct] = useState([])
    const refreshProduct = () => getProduct().then(setProduct)
    useEffect(() => {
        refreshProduct();
        const observer = ondataChange(refreshProduct)
        return () => {
            observer.cancel()
        }
    }, [])
    // Fetch cart 

    const [cart, setCart] = useState([])
    const refreshCart = () => getCart().then(setCart)
    useEffect(() => {
        refreshCart()
        const observer = onCartChange(refreshCart)
        return () => {
            observer.cancel()
        }
    }, [])

    const [info] = useState({ nameProduct: '', price: 0, unitProduct: "", quantity: 0, description: '', image: '', shop: "" })
    const { productId } = useParams()
    const thisProduct = product.find(prod => prod._id === productId)
    if (thisProduct !== undefined) {
        info.nameProduct = thisProduct.nameProduct
        info.price = thisProduct.price
        info.description = thisProduct.description
        info.quantity = thisProduct.quantity
        info.unitProduct = thisProduct.unitProduct.value
        info.image = thisProduct.image.path
        info.shop = thisProduct.shop
    }

    const [account, setAccount] = useState([])
    const refreshAccount = () => getData().then(setAccount)
    useEffect(() => {
        refreshAccount();
        const observer = onDataChange(refreshAccount)
        return () => {
            observer.cancel()
        }
    }, [])
    account.map(user => {
        if (info.shop === user._id) {
            info._id = user._id
            info.name = user.username
        }
        return (<div></div>)
    })

    const [quantity, setQuantity] = useState(1)
    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
    const incrementQuantity = () => {
        if (quantity < info.quantity) {
            setQuantity(quantity + 1);
        }
    };
    const changeQuantity = (e) => {
        if (parseInt(e.target.value) > info.quantity) {
            setQuantity(info.quantity)
            toast.error('Số lượng vượt quá tổng sản phẩm hiện có !')
        } else {
            setQuantity(e.target.value)
        }
    }
    const AddToCart = () => addCart(
        {
            buyer_id: Cookie.get('id'),
            prdouct_id: thisProduct._id,
            shop_id: thisProduct.shop,
            name: thisProduct.nameProduct,
            price: thisProduct.price,
            quantity: quantity,
            check:false,
            maxQuantity:info.quantity,
            image: thisProduct.image.path, 
            total: (parseInt(quantity * parseInt(thisProduct.price)))
        }
    )
    const handleAddToCart = () => {
        let check = 1;
        cart.map(mycart => {
            if (mycart.prdouct_id === thisProduct._id && mycart.buyer_id === Cookie.get('id')) {
                let soluong = parseInt(quantity) + parseInt(mycart.quantity)
                if (soluong > info.quantity) {
                    soluong = parseInt(info.quantity)
                }
                check = 2;
                editCart({
                    _id: mycart._id,
                    _rev: mycart._rev,
                    buyer_id: Cookie.get('id'),
                    prdouct_id: thisProduct._id,
                    shop_id: thisProduct.shop,
                    name: thisProduct.nameProduct,
                    price: thisProduct.price,
                    quantity: soluong,
                    check:false,
                    maxQuantity:info.quantity,
                    image: thisProduct.image.path,
                    total: (parseInt(soluong * parseInt(thisProduct.price)))
                })
                toast.success("Thêm thành công")
            }
            return <div></div>
        })
        if (check === 1) {
            AddToCart()
            toast.success("Thêm thành công")
        }
    }
    return (
        <React.Fragment>
            <Container style={style}>
                <Row>
                    <Col sm={6}>
                        <div className="img-product-detail" >
                            <img src={info.image} alt={info.image.name} style={{ width: '450px', height: '450px' }} />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <h3>Shop: <Link to="/shopdetail" >{info.name} </Link></h3><hr />
                        <h5>Sản phẩm: {info.nameProduct}</h5>
                        <hr />
                        <label>Giá  bán:{info.price} VND </label>
                        <hr />
                        <label>Đơn vị tính: {info.unitProduct}</label>
                        <hr />
                        <Row>
                            <Col sm={2}><label>Số lượng</label></Col>
                            <Col sm={4}>
                                <div className="buttons_added">
                                    <input className="minus is-form" type="button" value="-" onClick={decrementQuantity} />
                                    <input aria-label="quantity"
                                        className="input-qty"
                                        max={info.quantity}
                                        min='1' type="number"
                                        value={quantity}
                                        onChange={changeQuantity} />
                                    <input className="plus is-form" type="button" value="+" onClick={incrementQuantity} />
                                </div>
                            </Col>
                            <Col sm={6}>Tổng sản phẩm hiện có: {info.quantity}</Col><hr />
                            <label>Mô tả sản phẩm {info.description}</label> <hr />
                            <label>Lượt xem </label>

                            <Row style={{ marginTop: '55px' }}>
                                <center>
                                    <div className="detail-footer" >
                                        {Cookie.get('id') ?
                                            <Button variant="primary"  onClick={() => handleAddToCart()}><i className="fa fa-cart-arrow-down">&nbsp;Thêm vào giỏ</i></Button> :
                                            <Link style={style} to="/signin">  <Button variant="primary" ><i className="fa fa-cart-arrow-down">&nbsp;Thêm vào giỏ</i></Button> &ensp;</Link>
                                        }
                                    </div>
                                </center>
                            </Row>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
export default ProductDetail;