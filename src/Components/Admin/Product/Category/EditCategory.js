import React ,{useState} from "react";
import {toast} from 'react-toastify';
import {editCategory} from '../../../../API/CategoryProductAPI'

function EditCategory({data,onClick,getId}) {
      const [name,setName] = useState(data.nameCategory)
      const [code,setCode] = useState(data.codeCategory)
      const [status,setStatus] = useState(data.status)
      const id =  data._id
      const rev = data._rev
      const dateTime = data.dateTime
      const handleEditCategory = () => {
         if(getId===id){
          editCategory({
            _id:id,
            _rev:rev,
            codeCategory:code,
            nameCategory:name,
            status:status,
            dateUpdate: new Date().toLocaleString(),
            dateTime: dateTime,
          })
         }
      }
        
      const handleSubmit = (e) =>{
        e.preventDefault()
        handleEditCategory()
        setCode(code)
        setName(name)
        setStatus(status)
        toast.success('Cập nhật thành công!')
      }
    
      return (
        <React.Fragment>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Mã loại sản phẩm</label>
                      <div className="col-sm-4">
                        <input type="text"
                          className="form-control form-control-sm"
                          id="codeCategory"
                          name="codeCategory"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                      <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Tên loại sản phẩm</label>
                      <div className="col-sm-4">
                        <input type="text"
                          className="form-control form-control-sm"
                          id="nameCategory"
                          name="nameCategory"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Trạng thái</label>
                      <div className="col-sm-4">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          name="status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value={'Kích hoạt'} >Kích hoạt</option>
                          <option value={'Ngừng kích hoạt'}>Ngừng kích hoạt</option>
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-success" id="btn-edit">Lưu lại</button>
                      <button type="button" className="btn btn-danger" onClick={onClick}>Thoát</button>
                    </div>
                  </form>
        </React.Fragment>
      )
    }
    export default EditCategory;