import React, { useState, useEffect } from "react";
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify'
import { addProduct } from "../../../../API/ProductAPI"
import { getGroup, ondataChange } from "../../../../API/GroupProductAPI";
import { getCategory, ondataChangeCategory } from '../../../../API/CategoryProductAPI'
import { getdata, ondataUnitChange } from '../../../../API/UnitProductAPI';
import Select from 'react-select'
import Cookies from "js-cookie";


function AddProductItem({ onClick }) {
    const id  = Cookies.get('id')
    const { register , formState: { errors }, handleSubmit, control } = useForm(
        { mode: "onTouched" }
    );
    const onSubmit = (data) => {
        addProductItem(data.codeProduct,
            data.nameProduct,
            data.groupProduct,
            data.categoryProduct,
            data.unitProduct,
            data.price,
            data.description,
            data.status,
            data.quantity,
            data.dateTime)
        toast.success("Thêm thành công !!")
       onClick();


    };
      const [file,setFile] = useState();
      const handleUpload = (event) =>{
        const  image = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
           setFile({name: image.name, type:image.type, size:image.size,path: reader.result })
          }
        }
        reader.readAsDataURL(event.target.files[0])
      }
    const addProductItem = (code, nameProduct, groupProduct, categoryProduct, unitProduct, price, description, stt,quantity) => addProduct({
        codeProduct: code,
        nameProduct: nameProduct,
        groupProduct: groupProduct,
        categoryProduct: categoryProduct,
        unitProduct: unitProduct,
        price: price,
        quantity: quantity,
        image: {
            name:file.name,
            type: file.type, 
            size: file.size, 
            path: file.path},
        description: description,
        dateTime: new Date().toLocaleString(),
        dateUpdate:'No update !!',
        status: stt,
        shop:id
    })
    //  Start Map groupProduct
    const [group, setGroup] = useState([])
    const refreshGroup = () => getGroup().then(setGroup)
    useEffect(() => {
        refreshGroup();
        const observer = ondataChange(refreshGroup)
        return () => {
            observer.cancel()
        }
    }, [])

    let options = group.map(function (group) {
        return { key: group._id, value: group.nameGroup, label: group.nameGroup, disabled: group.status === "Ngừng kích hoạt" };
    })
    // End map Product

    // Start map categoryProduct
    const [categoryProduct, setCategoryProduct] = useState([])
    const refreshCategory = () => getCategory().then(setCategoryProduct)
    useEffect(() => {
        refreshCategory();
        const observer = ondataChangeCategory(refreshCategory)
        return () => {
            observer.cancel()
        }
    }, [])
    let category = categoryProduct.map(function (category) {
        return { key: category._id, value: category.nameCategory, label: category.nameCategory, disabled: category.status === "Ngừng kích hoạt" };
    })

    // End map categoryProduct
    //Start map unit Product
    const [unitProduct, setUnit] = useState([])
    const refreshUnit = () => getdata().then(setUnit)
    useEffect(() => {
        refreshUnit();
        const observer = ondataUnitChange(refreshUnit)
        return () => {
            observer.cancel()
        }
    }, [])

    let unit = unitProduct.map(function (unit) {
        return { key: unit._id, value: unit.nameunit, label: unit.nameunit, disabled: unit.status === "Ngừng kích hoạt" };
    })

    // End map unit Product

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group row">
                    <label htmlFor="codeProduct" className="col-sm-2 col-form-label col-form-label-sm">Mã sản phẩm</label>
                    <div className="col-sm-4">
                        <input type="text"
                            className="form-control form-control-sm"
                            id="codeProduct"
                            name="codeProduct"
                            {...register("codeProduct", { required: true })}
                        />
                        {errors.codeProduct?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng nhập mã  sản phẩm </p>}
                    </div>
                    <label htmlFor="nameProduct" className="col-sm-2 col-form-label col-form-label-sm">Tên sản phẩm</label>
                    <div className="col-sm-4">
                        <input type="text"
                            className="form-control form-control-sm"
                            id="nameProduct"
                            name="nameProduct"
                            {...register("nameProduct", { required: true })}
                        />
                        {errors.nameProduct?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng nhập tên sản phẩm </p>}
                    </div>
                    <label htmlFor="nameCategory" className="col-sm-2 col-form-label col-form-label-sm"> Loại sản phẩm</label>
                    <div className="col-sm-4">
                        <Controller
                            name="categoryProduct"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    value={value}
                                    onChange={onChange}
                                    placeholder=""
                                    options={category}
                                    isOptionDisabled={(option) => option.disabled}
                                />
                            )}
                        />
                        {errors.categoryProduct?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng chọn loại sản phẩm </p>}
                    </div>
                    <label htmlFor="nameGroup" className="col-sm-2 col-form-label col-form-label-sm">Nhóm sản phẩm</label>
                    <div className="col-sm-4">
                        <Controller
                            name="groupProduct"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    value={value}
                                    onChange={onChange}
                                    placeholder=""
                                    options={options}
                                    isOptionDisabled={(option) => option.disabled}
                                />
                            )}
                        />
                        {errors.groupProduct?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng chọn nhóm sản phẩm </p>}
                    </div>
                    <label htmlFor="nameUnit" className="col-sm-2 col-form-label col-form-label-sm">Đon vị tính </label>
                    <div className="col-sm-4">
                        <Controller
                            name="unitProduct"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    value={value}
                                    onChange={onChange}
                                    placeholder=""
                                    options={unit}
                                    isOptionDisabled={(option) => option.disabled}
                                />
                            )}
                        />
                        {errors.unitProduct?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng chọn đơn vị tính</p>}
                    </div>
                    <label htmlFor="price" className="col-sm-2 col-form-label col-form-label-sm">Giá bán</label>
                    <div className="col-sm-4">
                        <input type="text"
                            className="form-control form-control-sm"
                            id="price"
                            name="price"
                            {...register("price", { required: true })}
                        />
                        {errors.price?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng nhập giá sản phẩm</p>}
                    </div>
                    <label htmlFor="quantity" className="col-sm-2 col-form-label col-form-label-sm">Số lượng</label>
                    <div className="col-sm-4">
                        <input type="number"
                            className="form-control form-control-sm"
                            id="quantity"
                            name="quantity"
                            {...register("quantity", { required: true })}
                        />
                        {errors.quantity?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng số lượng sản phẩm</p>}
                    </div>
                    <label htmlFor="picture" className="col-sm-2 col-form-label col-form-label-sm">Hình ảnh</label>
                    <div className="col-sm-4">
                    <input onChange={handleUpload} type="file"  required/>
                        {/* {errors.imageProduct?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng chọn ảnh</p>} */}
                    </div>
                    <label htmlFor="status" className="col-sm-2 col-form-label col-form-label-sm">Trạng thái</label>
                    <div className="col-sm-4">
                        <select
                            className="form-select"
                            name="status"
                            {...register("status", { required: true })}
                        >
                            <option value={'Kích hoạt'} >Kích hoạt</option>
                            <option value={'Ngừng kích hoạt'}>Ngừng kích hoạt</option>
                        </select>
                    </div>
                    <label htmlFor="description" className="col-sm-2 col-form-label col-form-label-sm">Mô tả</label>
                    <div className="col-sm-4">
                        <textarea {...register("description")}  id="description" name="description" style={{width:"100%"}} />
                        {/* {errors.imageProduct?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng chọn ảnh</p>} */}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-success" id="btn-save">Lưu và đóng</button>
                    <button type="button" className="btn btn-danger" onClick={onClick}>Thoát</button>
                </div>
            </form>
        </React.Fragment>
    )
}
export default AddProductItem;