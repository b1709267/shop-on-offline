import React, { useState,useEffect } from "react";
import { removeProduct } from "../../../../API/ProductAPI"
import { toast } from "react-toastify"
import { Modal } from "react-bootstrap";
import EditProduct from "./EditProduct";
import { getData, onDataChange } from '../../../../API/AccountAPI'

function ListProductAdmin({ data, styleProps }) {
    const deleteProduct = (data) => {
        removeProduct(data._id)
        toast.success("Xóa thành công!")
    }
    const [info] = useState({ name: "" })
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
        if (data.shop === user._id) {
            info._id = user._id
            info.name = user.username
        }
        return (<div></div>)
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const id = data._id;
    const handleShow = () => setShow(true);
    return (
        <React.Fragment>
            <tr style={styleProps} className="productItem">
                <td><img src={data.image.path} alt="ImageProduct" style={{ width: '50px',height:'50px' }} /></td>
                <td>{data.shop === info._id ? info.name :null}</td>
                {/* <td>{data.codeProduct}</td> */}
                <td>{data.nameProduct}</td>
                <td> {data.groupProduct.label}</td>
                <td> {data.categoryProduct.label}</td>
                <td> {data.unitProduct.label}</td>
                <td> {data.price}</td>
                <td> {data.quantity}</td>
                <td> {data.dateTime}</td>
                <td>{data.status}</td>
                <td >{data.dateUpdate}</td>
                {/* <th> {data.description}</th> */}
                <th>
                    <i
                        className="fa fa-pencil btn btn-primary"
                        aria-hidden="true"
                        onClick={handleShow}></i>
                    &nbsp;
                    <i
                        className="fa fa-trash btn btn-danger"
                        aria-hidden="true"
                        onClick={() => { deleteProduct(data) }}
                    ></i>
                </th>
            </tr>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditProduct
                        data={data}
                        onClick={handleClose}
                        getId={id}
                    />
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default ListProductAdmin;