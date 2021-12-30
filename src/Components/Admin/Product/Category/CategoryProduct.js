import React, { useState,useEffect } from 'react';
import AddCategory from './AddCategory';
import { Modal } from "react-bootstrap";
import {getCategory,ondataChangeCategory } from '../../../../API/CategoryProductAPI'
import ListItemCategory from './ListCategory';


function CategoryProduct({style,styleProps}) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categoryProduct, setCategoryProduct] = useState([])
    const refreshCategory = () => getCategory().then(setCategoryProduct)
    useEffect(() => {
        refreshCategory();
        const observer = ondataChangeCategory (refreshCategory)
        return () => {
            observer.cancel()
        }
    }, [])
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
              <div className="card">
              <center> <h3 className="title-product" style={{color: 'darkblue',paddingTop:'10px'}}>Quản lý tất cả loại sản phẩm</h3></center>
              </div>
              <div className="ant-btn">
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={handleShow}
                >Thêm mới
                </button>
              </div>
              <div className="card">
                <table className="table">
                  <thead className="table table-success table-striped">
                    <tr style={style}>
                      <th scope="col">Mã sản loại phẩm</th>
                      <th scope="col">Tên loại sản phẩm</th>
                      <th scope="col">Ngày tạo</th>
                      <th scope="col">Ngày update</th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col">Xử lý</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categoryProduct.map(category =>(
                        <ListItemCategory 
                          key ={category._id}
                         data ={category}   
                         styleProps={styleProps}                
                        />
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
        </div>
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Thêm  mới loại sản phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddCategory onClick={handleClose} />
          </Modal.Body>
        </Modal>
    </React.Fragment>
  );
}

export default CategoryProduct;