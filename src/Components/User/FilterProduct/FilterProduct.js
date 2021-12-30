import React,{useState,useEffect} from "react";
import { Row, Col, Container ,Card} from 'react-bootstrap'
import { Link} from "react-router-dom"
import { getProduct, ondataChange } from '../../../API/ProductAPI'
import SlideSlow from "../Page/Carousel/Carousel";
import { NoProduct } from "./NoProduct";

export const SucKhoe = () => {
    const [product, setProduct] = useState([])
    const refreshGroup = () => getProduct().then(setProduct)
    useEffect(() => {
        refreshGroup();
        const observer = ondataChange(refreshGroup)
        return () => {
            observer.cancel()
        }
    }, [])
    console.log(product)
    const style = {
        marginTop: '115px',
        fontWeight: 700,
        textDecoration: 'none'
    }
    return (
        <Container className="list-item"style={style} >
            <Row><SlideSlow/></Row>
        <Row >
          <Col sm={12} className="title-product">Nhóm sản phẩm sức khỏe</Col>
        </Row>
        <Row className="product-item">
          {product.map((product, index) => (
              <React.Fragment>
              {product.status === "Kích hoạt" & product.groupProduct.label ==="Sức khỏe" ?
                  <Col sm={2} key={index} >
                      
                      <Link to={`/product/${product._id}`} style={style}  >
                          <Card style={{ width: '180px' }} className="card-item" >
                              <Card.Img variant="top" src={product.image.path} style={{ width: '180px', height: '140px' }} />
                              <Card.Body>
                                  <Card.Title  style={{fontSize:'16px'}}>{product.nameProduct}</Card.Title>
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
          ))}
        </Row>
        </Container>
    )
}
export const TheThao = () => {
    const [product, setProduct] = useState([])
    const refreshGroup = () => getProduct().then(setProduct)
    useEffect(() => {
        refreshGroup();
        const observer = ondataChange(refreshGroup)
        return () => {
            observer.cancel()
        }
    }, [])
    console.log(product)
    const style = {
        marginTop: '115px',
        fontWeight: 700,
        textDecoration: 'none'
    }
    return (
        <Container className="list-item"style={style} >
            <Row><SlideSlow/></Row>
        <Row >
          <Col sm={12} className="title-product">Nhóm sản phẩm thể thao</Col>
        </Row>
        <Row className="product-item">
          {product.map((product, index) => (
              <React.Fragment>
              {product.status === "Kích hoạt" & product.groupProduct.label ==="Thể thao"?
                  <Col sm={2} key={index} >
                      
                      <Link to={`/product/${product._id}`} style={style}  >
                          <Card style={{ width: '180px' }} className="card-item" >
                              <Card.Img variant="top" src={product.image.path} style={{ width: '180px', height: '140px' }} />
                              <Card.Body>
                                  <Card.Title  style={{fontSize:'16px'}}>{product.nameProduct}</Card.Title>
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
          ))}
        </Row>
        </Container>
    )
}
export const SacDep = () => {
    const [product, setProduct] = useState([])
    const refreshGroup = () => getProduct().then(setProduct)
    useEffect(() => {
        refreshGroup();
        const observer = ondataChange(refreshGroup)
        return () => {
            observer.cancel()
        }
    }, [])
    console.log(product)
    const style = {
        marginTop: '115px',
        fontWeight: 700,
        textDecoration: 'none'
    }
    return (
        <Container className="list-item"style={style} >
            <Row><SlideSlow/></Row>
        <Row >
          <Col sm={12} className="title-product">Nhóm sản phẩm sắc đẹp</Col>
        </Row>
        <Row className="product-item">
          {product.map((product, index) => (
              <React.Fragment>
              {product.status === "Kích hoạt" & product.groupProduct.label ==="Sắc đẹp"?
                  <Col sm={2} key={index} >
                      
                      <Link to={`/product/${product._id}`} style={style}  >
                          <Card style={{ width: '180px' }} className="card-item" >
                              <Card.Img variant="top" src={product.image.path} style={{ width: '180px', height: '140px' }} />
                              <Card.Body>
                                  <Card.Title  style={{fontSize:'16px'}}>{product.nameProduct}</Card.Title>
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
          ))}
        </Row>
        </Container>
    )
}
export const ThoiTrangNu = () => {
    const [product, setProduct] = useState([])
    const refreshGroup = () => getProduct().then(setProduct)
    useEffect(() => {
        refreshGroup();
        const observer = ondataChange(refreshGroup)
        return () => {
            observer.cancel()
        }
    }, [])
    console.log(product)
    const style = {
        marginTop: '115px',
        fontWeight: 700,
        textDecoration: 'none'
    }
    return (
        <Container className="list-item"style={style} >
            <Row><SlideSlow/></Row>
        <Row >
          <Col sm={12} className="title-product">Nhóm sản phẩm dành cho thời trang Nữ</Col>
        </Row>
        <Row className="product-item">
          {product.map((product, index) => (
              <React.Fragment>
              {product.status === "Kích hoạt" & product.groupProduct.label ==="Sắc đẹp"?
                  <Col sm={2} key={index} >
                      
                      <Link to={`/product/${product._id}`} style={style}  >
                          <Card style={{ width: '180px' }} className="card-item" >
                              <Card.Img variant="top" src={product.image.path} style={{ width: '180px', height: '140px' }} />
                              <Card.Body>
                                  <Card.Title  style={{fontSize:'16px'}}>{product.nameProduct}</Card.Title>
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
          ))}
        </Row>
        </Container>
    )
}
export const MeBe = () => {
    const [product, setProduct] = useState([])
    const refreshGroup = () => getProduct().then(setProduct)
    useEffect(() => {
        refreshGroup();
        const observer = ondataChange(refreshGroup)
        return () => {
            observer.cancel()
        }
    }, [])
    const style = {
        marginTop: '115px',
        fontWeight: 700,
        textDecoration: 'none'
    }
    return (
        <Container className="list-item"style={style} >
            <Row><SlideSlow/></Row>
        <Row >
          <Col sm={12} className="title-product">Nhóm sản phẩm Mẹ & bé</Col>
        </Row>
        <Row className="product-item">
          {product.map((product, index) => (
              <React.Fragment>
              {product.status === "Kích hoạt" & !product.groupProduct.label ==="Mẹ & Bé"?
                  <Col sm={2} key={index} >
                      
                      <Link to={`/product/${product._id}`} style={style}  >
                          <Card style={{ width: '180px' }} className="card-item" >
                              <Card.Img variant="top" src={product.image.path} style={{ width: '180px', height: '140px' }} />
                              <Card.Body>
                                  <Card.Title  style={{fontSize:'16px'}}>{product.nameProduct}</Card.Title>
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
          ))}
        </Row>
        </Container>
    )
}
export const ThoiTrangNam = () => {
    const [product, setProduct] = useState([])
    const refreshGroup = () => getProduct().then(setProduct)
    useEffect(() => {
        refreshGroup();
        const observer = ondataChange(refreshGroup)
        return () => {
            observer.cancel()
        }
    }, [])
    console.log(product)
    const style = {
        marginTop: '115px',
        fontWeight: 700,
        textDecoration: 'none'
    }
    return (
        <Container className="list-item"style={style} >
            <Row><SlideSlow/></Row>
        <Row >
          <Col sm={12} className="title-product">Nhóm sản phẩm thời trang dành cho Nam</Col>
        </Row>
        <Row className="product-item">
          {product.map((product, index) => (
              <React.Fragment>
              {product.status === "Kích hoạt" & product.groupProduct.label ==="Thời trang nam"?
                  <Col sm={2} key={index} >
                      
                      <Link to={`/product/${product._id}`} style={style}  >
                          <Card style={{ width: '180px' }} className="card-item" >
                              <Card.Img variant="top" src={product.image.path} style={{ width: '180px', height: '140px' }} />
                              <Card.Body>
                                  <Card.Title  style={{fontSize:'16px'}}>{product.nameProduct}</Card.Title>
                                  <Card.Text>
                                      Giá: {product.price}
                                  </Card.Text>
                                  <i className="fa fa-thumbs-o-up" aria-hidden="true">&ensp; </i>
                              </Card.Body>
                          </Card>
                      </Link>
                  </Col>
              :<NoProduct/>}
          </React.Fragment>
          ))}
        </Row>
        </Container>
    )
}