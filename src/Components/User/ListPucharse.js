import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap'
import { getPurchases, onPurchasesChange, removePurchase } from '../../API/Purcharse'
import Cookie from 'js-cookie'

function ListPucharse() {
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
        backgroundColor:'aqua',
        textAlign:'center',
    }

    return (
        <React.Fragment>
            {purchases.map(item => {
                if(Cookie.get('id') === item.buyer_id) {
                    return(
                    <Table striped bordered hover s>
                        <thead>
                            <tr>
                                 <th style={styleTh}>Hình ảnh</th>
                                 <th style={styleTh}>Têm sản phẩm</th>
                                 <th style={styleTh}>Số lượng</th>
                                 <th style={styleTh}>Đơn giá</th>
                                 <th style={styleTh}>Thành tiền</th>
                                 <th style={styleTh}>Trạng thái - Thời gian</th>
                            </tr>
                        </thead>
                        <tbody key={item._id}>
                            <td> <img src={item.image} alt="aa" style={{ width: '50px', height: '50px' }} /></td>
                            <td>{item.nameCart}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.total}</td>
                            <td><span>{item.dateUpdate !=="" ? `${item.status}` :null} --- {item.datePay} </span> <br/> 
                                <span>{item.dateUpdate === "" ? '' :`${item.statusUpdate} --- ${item.dateUpdate}`}  </span>
                            </td>
                            <button onClick={() => removePurchase(item._id)}>Delete</button>
                        </tbody>
                    </Table>
                )}
                    return null
            })}

        </React.Fragment>
    )
}
export default ListPucharse;