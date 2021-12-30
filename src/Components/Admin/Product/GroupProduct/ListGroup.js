import React  ,{useState}  from "react";
import { toast } from 'react-toastify';
import { Modal } from "react-bootstrap";
import { removeGroup } from "../../../../API/GroupProductAPI";
import EditGroup from "./EditGroup";


function ListItemGroup({ data,styleProps}) {

    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const id   = data._id;
    const handleShow = () => setShow(true);

    const deleteGroup = (data) =>{
        removeGroup(data._id)
        toast.success("Xóa thành công!")
    }
    return (
        <React.Fragment>
            <tr style={styleProps}>
                <th>{data.codeGroup}</th>
                <th>{data.nameGroup}</th>
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
                        onClick={() => {deleteGroup(data)}}></i>
                </th>
            </tr>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa nhóm sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <EditGroup
                    data={data} 
                    onClick={handleClose}
                    getId={id}
                   />
                </Modal.Body>
            </Modal>
       </React.Fragment>
    )
}
export default  ListItemGroup;