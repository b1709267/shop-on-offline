import React, { useState, useEffect } from 'react';
import { Table, Form, Col, Row } from 'react-bootstrap'
import { editPurchase, getPurchases, onPurchasesChange, removePurchase } from '../../API/Purcharse'
import Cookie from 'js-cookie'

function SellerPucharse() {
    const [purchases, setPurchases] = useState([])
    const refreshPurchases = () => getPurchases().then(setPurchases)
    useEffect(() => {
        refreshPurchases()
        const observer = onPurchasesChange(refreshPurchases)
        return () => {
            observer.cancel()
        }
    }, [])
    console.log(purchases)
    const styleTh = {
        backgroundColor: 'aqua',
        textAlign: 'center',
        fontSize:'14px'
    }
    const styleStatus = {
        backgroundColor: '#00FF7F',
        borderRadius: '50px 50px',
        height: '28px',
        padding: '1px 0px',
        paddingLeft: '13px'
    }
    const styleTd ={
        fontSize: '13px',textAlign: 'center',
    }
    const [status, setStatus] = useState("Đơn hàng đã được khởi tạo !")
    const handlePurCharse = (item) => {
        purchases.map(purchase => {
            if (item.idPurchurchase === purchase.idPurchurchase) {
                editPurchase({
                    _id: item._id,
                    _rev: item._rev,
                    idPurchurchase: item.idPurchurchase,
                    phone: item.phone,
                    name: item.name,
                    nameCart: item.name,
                    total: item.total,
                    price: item.price,
                    quantity: item.quantity,
                    buyer_id: item.buyer_id,
                    image: item.image,
                    dateUpdate: new Date().toLocaleString(),
                    shop: item.shop,
                    address: item.address,
                    datePay: item.datePay,
                    status: "Đơn hàng đã được khởi tạo !",
                    statusUpdate: status,
                })
            }
            return <div></div>
        })
    }
//    const handlePrintBill = (item) =>{
//           addBill({           
//                 idPurchurchase: item.idPurchurchase,
//                 phone: item.phone,
//                 name: item.name,
//                 nameCart: item.name,
//                 total: item.total,
//                 price: item.price,
//                 quantity: item.quantity,
//                 buyer_id: item.buyer_id,
//                 image: item.image,
//                 dateExport: new Date().toLocaleString(),
//                 shop: item.shop,
//                 address: item.address,
//                 datePay: item.datePay,
//                 status: "Đơn hàng đã được khởi tạo !",
//                 statusUpdate: status,

//             })
// }
    return (
        <React.Fragment>
            {purchases.map(item => {
                if (Cookie.get('id') === item.shop) {
                    return (
                        <Table striped bordered hover s>
                            <thead>
                                <tr>
                                    <th style={styleTh}>Thông tin khách hàng</th>
                                    <th style={styleTh}>Hình ảnh</th>
                                    <th style={styleTh}>Têm sản phẩm</th>
                                    <th style={styleTh}>Số lượng</th>
                                    <th style={styleTh}>Đơn giá</th>
                                    <th style={styleTh}>Thành tiền</th>
                                    <th style={styleTh}>Xử lý</th>
                                </tr>
                            </thead>
                            <tbody key={item._id}>
                                <td style={{ textAlign: 'center',fontSize:'13px',color:'#8B0000' }}><span>{item.name} <br /> {item.phone} <br /> {item.address}</span></td>
                                <td> <img src={item.image} alt="Ảnh##" style={{ width: '80px', height: '80px' }} /></td>
                                <td style={styleTd}>{item.nameCart}</td>
                                <td style={styleTd}>{item.quantity}</td>
                                <td style={styleTd}>{item.price}</td>
                                <td style={styleTd}>{item.total} (VND)</td>
                                <td  style={styleTd}>
                                    <Row>
                                        <Col sm={7}>
                                            <Form.Select size="sm" onChange={(e) => setStatus(e.target.value)} >
                                                <option selected value={item.status}>{item.statusUpdate === undefined ? `${item.status}` : `${item.statusUpdate}`}</option>
                                                <option>Người bán đã giao đến đơn vị vận chuyển</option>
                                                <option>Đang vận chuyển</option>
                                                <option>Đang giao hàng</option>
                                                <option>Giao hàng thành công</option>
                                            </Form.Select>
                                        </Col>
                                        <Col sm={5}>
                                            <button className="btn btn-success" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Duyệt đơn hàng" onClick={() => handlePurCharse(item)}><i className="fa fa-check" aria-hidden="true"></i></button> &nbsp;
                                            {item.statusUpdate === "Giao hàng thành công" ? <button className="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Xuất hóa đơn" ><i className="fa fa-print" aria-hidden="true"></i></button> :
                                                <button className="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Xuất hóa đơn" disabled><i className="fa fa-print" aria-hidden="true"></i></button>}&nbsp;
                                            <button className="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Xóa đơn hàng" onClick={() => removePurchase(item._id)}> <i className="fa fa-trash-o" aria-hidden="true"></i></button> &nbsp;

                                        </Col>
                                    </Row>
                                    <div style={styleStatus}>Trạng thái:  {item.statusUpdate}<br /></div>
                                </td>

                            </tbody>
                        </Table>
                    )
                }
                return null
            })}

        </React.Fragment>
    )
}
export default SellerPucharse;