import React, { useState, useEffect } from "react";
import { Nav, Col, Tab, Row } from 'react-bootstrap'
import CategoryProduct from "./Category/CategoryProduct";
import UnitProduct from "./UnitProduct/UnitProduct";
import GroupProduct from "./GroupProduct/GroupProduct";
import ProductItem from "./Product-Item/ProductItem";


function Product() {

    const [title, setTitle] = useState('Sản phẩm')
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
        textAlign: 'center',
        marginTop:'115px'
    }
    const margin ={
        marginTop: '110px'
    }

    return (
        <React.Fragment>
            <Tab.Container id="product" defaultActiveKey="first" >
                <Row style={margin} >
                    <Col sm={3} >
                        <Nav variant="product" className="flex-column" >
                            <Nav.Item onClick={() => setTitle('Sản phẩm')}>
                                <Nav.Link eventKey="first"><i className="fa fa-snowflake-o" aria-hidden="true" />   Sản phẩm</Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={() => setTitle('Nhóm sản phẩm')} >
                                <Nav.Link eventKey="group"><i className="fa fa-object-group" aria-hidden="true" />   Nhóm sản phẩm</Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={() => setTitle('Loại sản phẩm')}>
                                <Nav.Link eventKey="category"><i className="fa  fa-cubes" aria-hidden="true" />   Loại sản phẩm</Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={() => setTitle('Đơn vị tính')}>
                                <Nav.Link eventKey="unit"><i className="fa fa-list-alt" aria-hidden="true" />   Đơn vị tính</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <ProductItem
                                    style={style}
                                    styleProps={styleProps}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="group">
                                <GroupProduct
                                    style={style}
                                    styleProps={styleProps}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="category">
                                <CategoryProduct
                                    style={style}
                                    styleProps={styleProps}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="unit">
                                <UnitProduct
                                    style={style}
                                    styleProps={styleProps}
                                />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </React.Fragment>
    )
}
export default Product;