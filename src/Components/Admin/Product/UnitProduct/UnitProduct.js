import React, { useEffect, useState } from "react";
import AddUnit from "./AddUnit";
import { ondataUnitChange, getdata } from '../../../../API/UnitProductAPI';
import ListItemUnit from "./ListUnit";
import { Modal } from "react-bootstrap";

function UnitProduct({style,styleProps}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [unitProduct, setUnit] = useState([])
    const refreshUnit = () => getdata().then(setUnit)
    useEffect(() => {
        refreshUnit();
        const observer = ondataUnitChange(refreshUnit)
        return () => {
            observer.cancel()
        }
    }, [])
   
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                    <center> <h3 className="title-product" style={{color: 'darkblue',paddingTop:'10px'}}>Quản lý tất cả đơn vị tính</h3></center>
                    </div>
                    <div className="ant-btn">
                        <button type="button" className="btn btn-info" onClick={handleShow} >Thêm mới</button>
                    </div>
                    <div className="card">
                        <table className="table">
                            <thead className="table table-success table-striped">
                                <tr style={style}>
                                    <th scope="col">Mã đơn vị tính</th>
                                    <th scope="col">Tên đơn vị tính</th>
                                    <th scope="col">Ngày tạo</th>
                                    <th scope="col">Ngày update</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col" colSpan="4">Xử lí</th>
                                </tr>
                            </thead>
                            <tbody >
                                {unitProduct.map(unit => (
                                    <ListItemUnit
                                        key={unit._id}
                                        data={unit}
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
                    <Modal.Title>Thêm mới đơn vị tính</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddUnit onClick={handleClose} />
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default UnitProduct;
