import React, { useState,useEffect } from "react";
import { Modal} from "react-bootstrap";
import AddProductItem from "./AddProduct";
import { getProduct,ondataChange } from "../../../../API/ProductAPI";
import ListProduct from "./ListProduct";


function ProductItemSeller({style,styleProps}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [product, setProduct] = useState([])
    const refreshProduct= () => getProduct().then(setProduct)
    useEffect(() => {
        refreshProduct();
        const observer = ondataChange(refreshProduct)
        return () => {
            observer.cancel()
        }
    }, [])
    // const style = {
    //     fontFamily:'Arial',
    //     color: "#080808",
    //     fontSize:11,
    //     textAlign: 'center'    
    // }
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                    <center> <h3 className="title-product" style={{color: 'darkblue',paddingTop:'10px'}}>Quản lý tất sản phẩm của shop</h3></center>
                    </div>
                    <div className="ant-btn">
                        <button type="button" className="btn btn-info" onClick={handleShow} >Thêm mới</button>
                    </div>
                    <div className="card">
                        <table >
                            <thead className="table table-success table-striped">
                                <tr className="table" style={style}>
                                    <th scope="col">Hình ảnh</th>
                                    <th scope="col">Mã sản phẩm</th>
                                    <th scope="col">Tên sản phẩm</th>
                                    <th scope="col">Nhóm sản phẩm</th>
                                    <th scope="col">Loại sản phẩm</th>
                                    <th scope="col">Đơn vị tính</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Ngày đăng</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col">Ngày Update</th>
                                    <th scope="col" colSpan="4">Xử lý</th>
                                </tr>
                            </thead>
                            <tbody >
                                {product.map(productItem =>(
                                    <ListProduct
                                        key ={productItem._id}
                                        data = {productItem}
                                        styleProps = {styleProps}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddProductItem onClick={handleClose} />
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default ProductItemSeller;
