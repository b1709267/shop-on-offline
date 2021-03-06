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
                    status: "????n h??ng ???? ???????c kh???i t???o !",
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
                toast.success("Thanh to??n th??nh c??ng!")
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
                    <span >T???ng s???n ph???m thanh to??n:    <span className="pay-span">{totalCount === 0 ? "Ch??a c?? s???n ph???m ????? thanh to??n" : totalCount + `${'   (s???n ph???m)'}`}</span></span>
                    <hr />
                    Th??nh ti???n:<span className="pay-span"> {total} (VND)</span>
                </Col>
                <Col sm={2}><br />
                    {totalCount === 0 ?
                        <Button variant="danger"  disabled onClick={handleShow}>
                            Mua h??ng
                        </Button>
                        :
                        <Button variant="danger" onClick={handleShow}>
                            Mua h??ng
                        </Button>
                    }
                    <Offcanvas show={show} onHide={handleClose} placement='end' style={styleOffcanvas}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Th??ng tin thanh to??n</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <span className="pay-cart">?????a ch??? nh???n h??ng</span>
                            <span className="pay-info"> <br /> &ensp; T??n ng?????i nh???n: {info.name} <br />
                                &ensp; SDT: ({info.phone}) <br />
                                &ensp; ?????a ch??? giao h??ng: {info.address} &ensp;&ensp;&ensp;
                                <i
                                    className="fa fa-pencil btn btn-danger"
                                    aria-hidden="true"
                                ></i>
                            </span>
                            <hr className="pay-border" />
                            <span className="pay-cart">T???ng s??? s???n ph???m thanh to??n: <span className="pay-span">{totalCount === 0 ? 0 + `${'   (s???n ph???m)'}` : totalCount + `${'   (s???n ph???m)'}`}</span></span>
                            <hr className="pay-border" />
                            <span className="pay-cart">Th??ng tin s???n ph???m</span>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>H??nh ???nh</th>
                                        <th>S???n ph???m</th>
                                        <th>S??? l?????ng</th>
                                        <th>????n gi??</th>
                                        <th>Th??nh ti???n</th>
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
                                    &nbsp; Thanh to??n khi nh???n h??ng </label>
                            </span>
                            <hr />
                            <span className="pay-cart">T???ng ti???n: {total} (VND) </span>
                            <hr />
                           {check === true ? <center><Button variant="danger" onClick={handleAddPurcharse} > Thanh to??n</Button></center>:
                             <center><Button variant="danger" onClick={handleAddPurcharse}  disabled> Thanh to??n</Button></center>}
                        </Offcanvas.Body>
                    </Offcanvas>
                </Col>
            </Row>
        </Container>
    )
}
export default PayCart;