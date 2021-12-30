
import React from 'react';
import { useForm } from 'react-hook-form';
import { adddata } from '../../../../API/UnitProductAPI';
import { toast } from 'react-toastify';

function AddUnit({onClick}) {
  const { register, reset, formState: { errors }, handleSubmit } = useForm(
    { mode: "onTouched" }
  );
  const onSubmit = (data) => {
      addUnit(data.codeunit, data.nameunit, data.status)
      toast.success("Thêm thành công !!")
      handlResetForm();
  
  };
  
  const handlResetForm = () => {
    reset()
  }

  const addUnit = (code, name, stt) => adddata({
    codeunit: code,
    nameunit: name,
    status: stt, 
    dateTime: new Date().toLocaleString(),
    dateUpdate:'No update !!',
  })



  return (
    <React.Fragment>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group row">
                  <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Mã đơn vị tính sản phẩm</label>
                  <div className="col-sm-4">
                    <input type="text"
                      className="form-control form-control-sm"
                      id="codeunit"
                      name="codeUnit"
                      {...register("codeunit", { required: true })}
                    />
                    {errors.codeunit?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng nhập mã đơn vị tính</p>}
                  </div>
                  <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Tên đơn vị tính sản phẩm</label>
                  <div className="col-sm-4">
                    <input type="text"
                      className="form-control form-control-sm"
                      id="nameunit"
                      name="nameunit"
                      {...register("nameunit", { required: true })}
                    />
                    {errors.nameunit?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng nhập mã đơn vị tính</p>}
                  </div>
                  <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Trạng thái</label>
                  <div className="col-sm-4">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="status"
                      {...register("status")}
                    >
                      <option value={'Kích hoạt'} >Kích hoạt</option>
                      <option value={'Ngừng kích hoạt'}>Ngừng kích hoạt</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success" id="btn-save">Lưu và tiếp tục</button>
                  <button type="button" className="btn btn-danger" onClick={onClick}>Thoát</button>
                </div>
              </form>
    </React.Fragment>
  )
}
export default AddUnit;