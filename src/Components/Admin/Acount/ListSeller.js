import React, { useState,useEffect} from 'react'
import {getData,onDataChange} from  '../../../API/AccountAPI'
 function Account(){
  const [account, setAccount] = useState([])
  const refreshAccount = () => getData().then(setAccount)
  useEffect(() => {
    refreshAccount();
    const observer = onDataChange(refreshAccount)
    return () => {
      observer.cancel()
    }
  }, [])
   
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <h5 className="title-product">Quản lý đơn vị tính  sản phẩm</h5>
                    </div>
                    <div className="ant-btn">
                        <button type="button" className="btn btn-info"  >Thêm mới</button>
                       
                    </div>
                    <div className="card">
                        <table className="table">
                            <thead className="table table-success table-striped">
                                <tr>
                                    <th scope="col">Mã đơn vị tính</th>
                                    <th scope="col">Tên đơn vị tính</th>
                                    <th scope="col">Ngày tạo</th>
                                    <th scope="col">Ngày update</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col" colSpan="4">Xử lí</th>
                                </tr>
                            </thead>
                            <tbody >
                                {account.map(account=> (
                                    account.checkSeller === true ?(
                                   <tr >
                                   <th>{account.username}</th>
                                   <th>{account.phone}</th>
                                   <th>{account.address}</th>
                                   <th>{account.email}</th>
                                   </tr>
                                ):null
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Account;
