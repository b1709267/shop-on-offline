import React from "react";
import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import ProductDetail from "./ProductDetail";

function CardItem({ product, index }) {
    const style = {
        fontWeight: 700,
        textDecoration: 'none',
    }
    return (

        <React.Fragment>
            {product.status === "Kích hoạt" ?
                <Col sm={2} key={index} >
                    <Link to={`/product/${product._id}`} style={style}  >
                        <Card style={{ width: '180px' }} className="card-item" >
                            <Card.Img variant="top" src={product.image.path} style={{ width: '180px', height: '140px' }} />
                            <Card.Body>
                                <Card.Title style={{fontSize:'16px'}}>{product.nameProduct}</Card.Title>
                                <Card.Text>
                                    Giá: {product.price}
                                </Card.Text>
                                <i className="fa fa-thumbs-o-up" aria-hidden="true">&ensp; </i>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            :null}
        </React.Fragment>
    )
}
export default CardItem;