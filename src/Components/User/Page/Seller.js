import React, { useState, useEffect } from "react";
import { Nav, Col, Tab, Row } from 'react-bootstrap'
import { Redirect } from 'react-router'
import Cookies from 'js-cookie'
import ProductItemSeller from "../../Admin/Product/Product-Item/ProductItemSeller";
import SellerPucharse from "../../Seller/SellerPurchase";
function Seller() {

    const [title, setTitle] = useState('Kênh người bán')
    useEffect(() => {
        document.title = title;
    })
    const style = {
        fontFamily: 'Verdana',
        color: "#282828",
        fontSize: 11,
        textAlign: 'center'
    }
    const styleProps = {
        fontFamily: 'Arial',
        color: "#696969",
        fontSize: 11,
        textAlign: 'center'
    }
    const margin = {
        marginTop: '115px'
    }

    if (!Cookies.get("id")) {
        return (<Redirect to="/signin" />)
    } else {
        return (
            <React.Fragment>
                <Tab.Container id="product" defaultActiveKey="first" >
                    <Row style={margin} >
                        <Col sm={3} >
                            <Nav variant="product" className="flex-column" >
                                <Nav.Item onClick={() => setTitle('Sản phẩm')}>
                                    <Nav.Link eventKey="first"><i className="fa fa-snowflake-o" aria-hidden="true" />   Sản phẩm</Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick={() => setTitle(' Quản lý đơn hàng')} >
                                    <Nav.Link eventKey="group"><i className="fa fa-object-group" aria-hidden="true" />  Quản lý đơn hàng</Nav.Link>
                                </Nav.Item>
                                {/* <Nav.Item onClick={() => setTitle(' Quản ý hóa đơn')}>
                                    <Nav.Link eventKey="category"><i className="fa  fa-cubes" aria-hidden="true" />   Quản lý hóa đơn</Nav.Link>
                                </Nav.Item> */}
                                <Nav.Item onClick={() => setTitle('Thống kê')}>
                                    <Nav.Link eventKey="unit"><i className="fa fa-list-alt" aria-hidden="true" />   Thống kê</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <ProductItemSeller
                                        style={style}
                                        styleProps={styleProps}
                                    />
                                </Tab.Pane>
                                <Tab.Pane eventKey="group">
                                    <SellerPucharse />  
                                </Tab.Pane>
                                <Tab.Pane eventKey="category">

                                </Tab.Pane>
                                <Tab.Pane eventKey="unit">

                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </React.Fragment>
        )
    }
}
export default Seller;