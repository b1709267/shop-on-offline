import React, { useState,useEffect } from "react";
import { Modal } from "react-bootstrap";
import { getGroup,ondataChange } from "../../../../API/GroupProductAPI";
import AddGroup from "./AddGroup";
import ListItemGroup from "./ListGroup";

function GroupProduct({style,styleProps}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [group, setGroup] = useState([])
    const refreshGroup = () => getGroup().then(setGroup)
    useEffect(() => {
        refreshGroup();
        const observer = ondataChange(refreshGroup)
        return () => {
            observer.cancel()
        }
    }, [])

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                    <center> <h3 className="title-product" style={{color: 'darkblue',paddingTop:'10px'}}>Quản lý tất cả nhóm sản phẩm</h3></center>
                    </div>
                    <div className="ant-btn">
                        <button type="button" className="btn btn-info" onClick={handleShow} >Thêm mới</button>
                    </div>
                    <div className="card">
                        <table className="table">
                            <thead className="table table-success table-striped">
                                <tr style={style}>
                                    <th scope="col">Mã nhóm</th>
                                    <th scope="col">Tên nhóm</th>
                                    <th scope="col">Ngày tạo</th>
                                    <th scope="col">Ngày update</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col" colSpan="4">Xử lý</th>
                                </tr>
                            </thead>
                            <tbody >
                              {group.map(group =>(
                                  <ListItemGroup 
                                    key= {group._id}
                                    data = {group}
                                    styleProps={styleProps}
                                  />
                              ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới nhóm sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddGroup onClick={handleClose} />
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default GroupProduct;
