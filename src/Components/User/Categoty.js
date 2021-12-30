import React, { useState, useEffect } from 'react';
import { Row, Col, Container ,Card} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import SlideSlow from './Page/Carousel/Carousel'
// import { getCategory, ondataChangeCategory } from '../../API/CategoryProductAPI'
import { getProduct, ondataChange } from '../../API/ProductAPI'
import CardItem from './CardItem';
import '../CSS/ProductDetail.css'


function Category() {

  const styles = {
    marginTop: '100px',
    textAlign: 'center'
  }
  const [product, setProduct] = useState([])
  const refreshGroup = () => getProduct().then(setProduct)
  useEffect(() => {
    refreshGroup();
    const observer = ondataChange(refreshGroup)
    return () => {
      observer.cancel()
    }
  }, [])

  const styleTitle = {
    fontSize: '15px'
  }
  
  const styleCard = {
    width: '142px',
    padding: '14px 0px 5px 10px',
    textDecoration: 'none',
    color:'black',
  }
  return (
    <React.Fragment>
      <Container style={{ marginTop: '115px', width: '100%', height: '300px' }}>
          <Row >
              <SlideSlow />
          </Row>
        </Container>
        <Container style={styles}>
          <Row >
            <Col sm={12} className="title-product">Danh mục sản phẩm</Col>
          </Row>
          <Row>
            <Link to ="/product-suckhoe" style={styleCard} >
              <Card  className='card-category' >
                <Card.Img variant="top" src="suckhoe.png" />
                <Card.Body>
                  <Card.Title style={styleTitle}>Sức khỏe</Card.Title>
                </Card.Body>
              </Card>
              </Link>
              <Link to ="/product-thethao" style={styleCard} >
              <Card   className='card-category'>
                <Card.Img variant="top" src="thethao.png" />
                <Card.Body>
                  <Card.Title style={styleTitle}>Thể Thao</Card.Title>
                </Card.Body>
              </Card>
              </Link>
              <Link to ="/product-sacdep" style={styleCard} >
              <Card  className='card-category'>
                <Card.Img variant="top" src="sacdep.png" />
                <Card.Body>
                  <Card.Title style={styleTitle}>Sắc đẹp</Card.Title>
                </Card.Body>
              </Card>
             </Link>
             <Link to ="/product-mebe" style={styleCard} >
              <Card className='card-category'>
                <Card.Img variant="top" src="mebe.png" />
                <Card.Body>
                  <Card.Title style={styleTitle}>Mẹ và Bé</Card.Title>
                </Card.Body>
              </Card>
              </Link>
              <Link to ="/product-computer"  style={styleCard} >
              <Card  className='card-category' >
                <Card.Img variant="top" src="laptop.png" />
                <Card.Body>
                  <Card.Title style={styleTitle}>Máy tính & Laptop</Card.Title>
                </Card.Body>
              </Card>
              </Link>
              <Link to ="/product-dientu" style={styleCard} >
              <Card className='card-category' >
                <Card.Img variant="top" src="dientu.png" />
                <Card.Body>
                  <Card.Title style={styleTitle}>Thiết bị điện tử</Card.Title>
                </Card.Body>
              </Card>
              </Link>
              <Link to ="/product-ttnam"  style={styleCard} >
              <Card  className='card-category'> 
                <Card.Img variant="top" src="ttnam.png" />
                <Card.Body>
                  <Card.Title style={styleTitle}>Thời trang Nam</Card.Title>
                </Card.Body>
              </Card>
              </Link>
              <Link to ="/product-ttnu" style={styleCard} >
              <Card className='card-category' >
                <Card.Img variant="top" src="ttnu.png" />
                <Card.Body>
                  <Card.Title style={styleTitle}>Thời trang Nữ</Card.Title>
                </Card.Body>
              </Card>
              </Link>
              <Link to ="/product-dongho" style={styleCard}  >
              <Card  className='card-category'>
                <Card.Img variant="top" src="dongho.png" />
                <Card.Body>
                  <Card.Title style={styleTitle}>Trang sức</Card.Title>
                </Card.Body>
              </Card>
              </Link>
          </Row>
        </Container>
      <Container className="list-item">
        <Row >
          <Col sm={12} className="title-product">Tất cả sản phẩm</Col>
        </Row>
        <Row className="product-item">
          {product.map((productItem, index) => (
            <CardItem
              key={index}
              product={productItem}
            />
          ))}
        </Row>
      </Container>
    </React.Fragment>
  )
}


export default Category;