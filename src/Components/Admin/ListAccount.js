import React, { useState,useEffect} from 'react'
import {getData,onDataChange,removeData} from '../../API/AccountAPI'

 function AccountSeller(){
  const [account, setAccount] = useState([])
  const refreshAccount = () => getData().then(setAccount)
  useEffect(() => {
    refreshAccount();
    const observer = onDataChange(refreshAccount)
    return () => {
      observer.cancel()
    }
  }, [])
  console.log(account)
   
    return (
        <React.Fragment>
            <div className="row" style={{marginTop:"115px"}}>
                <div className="col-12">
                    <div className="card">
                       <center> <h3 className="title-product" style={{color: 'darkblue',paddingTop:'10px'}}>Quản lý tất cả tài khoản của ứng dụng</h3></center>
                       <hr/>
                    </div>
                    <div className="card">
                        <center>
                        <table className="table" style={{width: '90%'}}>
                            <thead className="table table-success table-striped">
                                <tr>
                                    <th scope="col">Tên tài khoản</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Địa chỉ</th>
                                    <th scope="col">Email</th>
                                    <th scope="col" colSpan="4">Xử lí</th>
                                </tr>
                            </thead>
                            <tbody >
                                {account.map(account=> (
                                   <tr  key = {account._id}>
                                   <td>{account.level === "seller" ? `Tên shop: ${account.username}`: `${account.username}`}</td>
                                   <td>{account.phone}</td>
                                   <td>{account.address}</td>
                                   <td>{account.email}</td>
                                   <td>
                                   <button className="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Xóa tài khoản" onClick={() => removeData(account._id)}> <i className="fa fa-trash-o" aria-hidden="true"></i></button> &nbsp;
                                   </td>
                                   </tr>
                                ))}
                            </tbody>
                        </table>
                        </center>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AccountSeller;
