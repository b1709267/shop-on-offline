import React, { useState, useEffect } from "react";
import { Container, Table, Col, Row, Button, Offcanvas } from 'react-bootstrap'
import '../CSS/ProductDetail.css';
import { getData, onDataChange } from '../../API/AccountAPI'
import Cookie from "js-cookie";
import { addPurchase, getPurchases, onPurchasesChange } from '../../API/Purcharse'
import { getCart, onCartChange, removeCart } from '../../API/Cart'

import { toast  } from "react-toastify";

function PayCart({ total, totalCount, idCart }) {
    const [info] = useState({ name: "" })
    const [account, setAccount] = useState([])
    const id = Cookie.get('id')
    const refreshAccount = () => getData().then(setAccount)
    useEffect(() => {
        refreshAccount();
        const observer = onDataChange(refreshAccount)
        return () => {
            observer.cancel()
        }
    }, [])
    const [cart, setCart] = useState([])
    const refreshCart = () => getCart().then(setCart)
    useEffect(() => {
        refreshCart()
        const observer = onCartChange(refreshCart)
        return () => {
            observer.cancel()
        }
    }, [])
    const RemoveCart = () => {
        cart.map(mmcart => {
            if (mmcart.buyer_id === Cookie.get("id")) {
                removeCart(mmcart._id, mmcart._rev)
                refreshCart()
            }
            return <div></div>
        })
    }
    const [purchases, setPurchases] = useState([])
    const refreshPurchases = () => getPurchases().then(setPurchases)
    useEffect(() => {
        refreshPurchases()
        const observer = onPurchasesChange(refreshPurchases)
        return () => {
            observer.cancel()
        }
    }, [])
    const IdDonHang = function () {
        let ID = 0
        purchases.map(purchase => {
            if (parseInt(purchase.idPurchurchase) > ID) {
                ID = parseInt(purchase.idPurchurchase)
            }
            return <div></div>
        })
        return ID + 1
    }

    console.log(idCart)
    const handleAddPurcharse = () => {
        idCart.map(myCart => {
            if (myCart.buyer_id === Cookie.get('id')) {
                addPurchase({
                    idPurchurchase: IdDonHang(),
                    status: "Đơn hàng đã được khởi tạo !",
                    phone: info.phone,
                    name: info.name,
                    nameCart: myCart.name,
                    total: myCart.total,
                    price: myCart.price,
                    quantity: myCart.quantity,
                    buyer_id: myCart.buyer_id,
                    image: myCart.image,
                    datePay: new Date().toLocaleString(),
                    shop: myCart.shop_id,
                    address: info.address,

                })
                toast.success("Thanh toán thành công!")
                RemoveCart()
            }
            return <div></div>
        })
    }


    account.map(user => {
        if (id === user._id) {
            info.name = user.username
            info.email = user.email
            info.phone = user.phone
            info.address = user.address
        }
        return (<div></div>)
    })
    const stylePay = {
        position: 'fixed',
        bottom: '5px',
        right: 0,
        left: 0,
        zIndex: 1,
        backgroundColor: '#ccc',
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const styleOffcanvas = {
        width: '550px'
    }
    const [check,setCheck] = useState(false)
    console.log(check)
    return (
        <Container style={stylePay} >
            <Row >
                {/* <Col sm={4}> </Col> */}
                <Col sm={10}>
                    <span >Tổng sản phẩm thanh toán:    <span className="pay-span">{totalCount === 0 ? "Chưa có sản phẩm để thanh toán" : totalCount + `${'   (sản phẩm)'}`}</span></span>
                    <hr />
                    Thành tiền:<span className="pay-span"> {total} (VND)</span>
                </Col>
                <Col sm={2}><br />
                    {totalCount === 0 ?
                        <Button variant="danger"  disabled onClick={handleShow}>
                            Mua hàng
                        </Button>
                        :
                        <Button variant="danger" onClick={handleShow}>
                            Mua hàng
                        </Button>
                    }
                    <Offcanvas show={show} onHide={handleClose} placement='end' style={styleOffcanvas}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Thông tin thanh toán</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <span className="pay-cart">Địa chỉ nhận hàng</span>
                            <span className="pay-info"> <br /> &ensp; Tên người nhận: {info.name} <br />
                                &ensp; SDT: ({info.phone}) <br />
                                &ensp; Địa chỉ giao hàng: {info.address} &ensp;&ensp;&ensp;
                                <i
                                    className="fa fa-pencil btn btn-danger"
                                    aria-hidden="true"
                                ></i>
                            </span>
                            <hr className="pay-border" />
                            <span className="pay-cart">Tổng số sản phẩm thanh toán: <span className="pay-span">{totalCount === 0 ? 0 + `${'   (sản phẩm)'}` : totalCount + `${'   (sản phẩm)'}`}</span></span>
                            <hr className="pay-border" />
                            <span className="pay-cart">Thông tin sản phẩm</span>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Hình ảnh</th>
                                        <th>Sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>
                                {idCart.map(idCart => {
                                    return (
                                        <tbody key={idCart._id}>
                                            <td> <img src={idCart.image} alt={idCart.image.name} style={{ width: '50px', height: '50px' }} /></td>
                                            <td>{idCart.name}</td>
                                            <td>{idCart.quantity}</td>
                                            <td>{idCart.price}</td>
                                            <td>{idCart.total}</td>
                                        </tbody>

                                    )
                                })}


                            </Table>
                            <span className="pay-cart">
                                <input className="form-check-input" type="checkbox"  onChange={(e) => setCheck(e.target.checked)}/>
                                <label className="form-check-label" htmlFor='check'>
                                    &nbsp; Thanh toán khi nhận hàng </label>
                            </span>
                            <hr />
                            <span className="pay-cart">Tổng tiền: {total} (VND) </span>
                            <hr />
                           {check === true ? <center><Button variant="danger" onClick={handleAddPurcharse} > Thanh toán</Button></center>:
                             <center><Button variant="danger" onClick={handleAddPurcharse}  disabled> Thanh toán</Button></center>}
                        </Offcanvas.Body>
                    </Offcanvas>
                </Col>
            </Row>
        </Container>
    )
}
export default PayCart;