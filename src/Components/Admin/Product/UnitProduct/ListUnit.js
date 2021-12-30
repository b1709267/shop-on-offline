import React  ,{useState}  from "react";
import { removedata } from "../../../../API/UnitProductAPI";
import { toast } from 'react-toastify';
import { Modal } from "react-bootstrap";
import EditUnit from "./EditUnit";


function ListItemUnit({ data,styleProps}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const id   = data._id;
    const handleShow = () => setShow(true);

    const deleteUnit = (data) =>{
        removedata(data._id)
        toast.success("Xóa thành công!")
    }
    return (
        <React.Fragment>
            <tr style={styleProps}>
                <th>{data.codeunit}</th>
                <th>{data.nameunit}</th>
                <th>{data.dateTime}</th>
                <th>{data.dateUpdate}</th>
                <th>{data.status}</th>
                <th>
                    <i 
                        className="fa fa-pencil btn btn-primary" 
                        aria-hidden="true"
                        onClick={handleShow}></i>
                     &nbsp;
                     <i 
                        className="fa fa-trash btn btn-danger" 
                        aria-hidden="true"
                        onClick={() => {deleteUnit(data)}}></i>
                </th>
            </tr>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa đơn vị tính</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <EditUnit 
                   data={data} 
                   onClick={handleClose}
                   getId={id}
                   />
                </Modal.Body>
            </Modal>
       </React.Fragment>
    )
}
export default ListItemUnit;