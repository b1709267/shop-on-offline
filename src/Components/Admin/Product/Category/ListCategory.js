import React  ,{useState}  from "react";
import { toast } from 'react-toastify';
import { Modal } from "react-bootstrap";
import {removeCategory} from "../../../../API/CategoryProductAPI"
import EditCategory from "./EditCategory";




function ListItemCategory({ data,styleProps}) {

    const id   = data._id;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteUnit = (data) =>{
        removeCategory(data._id)
        toast.success("Xóa thành công!")

    }
    return (
        <React.Fragment>
            <tr style={styleProps}>
                <th>{data.codeCategory}</th>
                <th>{data.nameCategory}</th>
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
                    <Modal.Title>Chỉnh sủa đơn vị tính</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <EditCategory 
                        data={data}   
                        onClick={handleClose}
                        getId={id}                
                   />
                </Modal.Body>
            </Modal>
       </React.Fragment>
    )
}
export default ListItemCategory;