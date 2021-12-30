import  React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { addCategory } from '../../../../API/CategoryProductAPI';

function AddCategory ({onClick}) {
  const { register, reset, formState: { errors }, handleSubmit } = useForm(
    { mode: "onTouched" }
  );
  const onSubmit = (data) => {
      addUnit(data.codeCategory, data.nameCategory, data.status)
      toast.success("Thêm thành công !!")
      handlResetForm();
  
  };
  
  const handlResetForm = () => {
    reset()
  }

  const addUnit = (code, name, stt) => addCategory({
    codeCategory: code,
    nameCategory: name,
    status: stt,
    dateTime: new Date().toLocaleString(),
    dateUpdate:'No update !!',
  })

    return (
    <React.Fragment>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group row">
                  <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Mã loại sản phẩm</label>
                  <div className="col-sm-4">
                    <input type="text"
                      className="form-control form-control-sm"
                      id="codeCategory"
                      name="codeCategory"
                      {...register("codeCategory", { required: true })}
                    />
                    {errors.codeCategory?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng nhập mã loại sản phẩm </p>}
                  </div>
                  <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Tên loại sản phẩm</label>
                  <div className="col-sm-4">
                    <input type="text"
                      className="form-control form-control-sm"
                      id="nameCategory"
                      name="nameCategory"
                      {...register("nameCategory", { required: true })}
                    />
                    {errors.nameCategory?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng nhập tên loại sản phẩm </p>}
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
export default AddCategory;