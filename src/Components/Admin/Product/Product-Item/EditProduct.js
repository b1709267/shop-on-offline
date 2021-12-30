import React, { useState, useEffect } from "react";
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify'
import { getGroup, ondataChange } from "../../../../API/GroupProductAPI";
import { getCategory, ondataChangeCategory } from '../../../../API/CategoryProductAPI'
import { getdata, ondataUnitChange } from '../../../../API/UnitProductAPI';
import {editProduct} from '../../../../API/ProductAPI'
import Select from 'react-select'
import Cookie from 'js-cookie'
import { editCart,getCart,onCartChange } from "../../../../API/Cart";



function EditProduct({ onClick, data, getId }) {

    const [cart, setCart] = useState([])
    const refreshCart = () => getCart().then(setCart)
    useEffect(() => {
        refreshCart()
        const observer = onCartChange(refreshCart)
        return () => {
            observer.cancel()
        }
    }, [])
    
    const { formState: { errors }, handleSubmit, control } = useForm(
        { mode: "onTouched" }
    );
    const id =  data._id
    const rev = data._rev

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
    const dateTime = data.dateTime
    const onSubmit = (data) => {
        if(getId===id){
           editProduct({
                _id:id,
                _rev:rev,
                shop:Cookie.get('id'),
                codeProduct:data.codeProduct,
                nameProduct:data.nameProduct,
                categoryProduct:data.categoryProduct,
                groupProduct:data.groupProduct,
                unitProduct:data.unitProduct,
                price: data.price,
                quantity:data.quantity,
                image:{
                    name:file.name,
                    type:file.type,
                    size:file.size,
                    path:file.path,
                     },
                description:data.description,
                status:data.status,
                dateUpdate: new Date().toLocaleString(),
                dateTime: dateTime,

            })
                cart.map((cart)=>{
                    if(id===cart.prdouct_id){
                        editCart({
                            _id: cart._id,
                            _rev: cart._rev,
                            buyer_id: cart.buyer_id,
                            prdouct_id: cart.prdouct_id,
                            shop_id: cart.shop_id,
                            name: data.nameProduct,
                            check: false,
                            price: data.price,
                            quantity: cart.quantity,
                            maxQuantity: data.quantity,
                            image: file.path,
                            total: parseInt(data.price * cart.quantity)
                        })
                    }
                    return <div></div>
                })
            toast.success("Cập nhật thành công")
        }

    }
    // console.log(dateTime)

    // const EditProductItem = (code, nameProduct, groupProduct, categoryProduct, unitProduct, price, description, stt) => editProduct({
    //     _id:id,
    //     _rev:rev,
    //     codeProduct: code,
    //     nameProduct: nameProduct,
    //     groupProduct: groupProduct,
    //     categoryProduct: categoryProduct,
    //     unitProduct: unitProduct,
    //     price: price,
    //     image: {
    //         name:file.name,
    //         type: file.type, 
    //         size: file.size, 
    //         path: file.path},
    //     description: description,
    //     dateTime: new Date().toLocaleString(),
    //     status: stt
    // })
     
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
                    <Controller
                            name="codeProduct"
                            className="form-select"
                            defaultValue={data.codeProduct}
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <input type="text"
                                    className="form-control form-control-sm"
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                         {errors.codeProduct?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng nhập giá </p>}
                    </div>
                    <label htmlFor="nameProduct" className="col-sm-2 col-form-label col-form-label-sm">Tên sản phẩm</label>
                    <div className="col-sm-4">
                    <Controller
                            name="nameProduct"
                            className="form-select"
                            defaultValue={data.nameProduct}
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <input type="text"
                                    className="form-control form-control-sm"
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                         {errors.nameProduct?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng nhập giá </p>}
                    </div>
                    <label htmlFor="nameCategory" className="col-sm-2 col-form-label col-form-label-sm"> Loại sản phẩm</label>
                    <div className="col-sm-4">
                        <Controller
                            name="categoryProduct"
                            defaultValue={data.categoryProduct}
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
                            defaultValue={data.groupProduct}
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
                            defaultValue={data.unitProduct}
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
                        <Controller
                            name="price"
                            className="form-select"
                            defaultValue={data.price}
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <input type="text"
                                    className="form-control form-control-sm"
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                         {errors.price?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng nhập giá </p>}
                    </div>
                    <label htmlFor="quantity" className="col-sm-2 col-form-label col-form-label-sm">Số lượng</label>
                    <div className="col-sm-4">
                        <Controller
                            name="quantity"
                            className="form-select"
                            defaultValue={data.quantity}
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <input type="number"
                                    className="form-control form-control-sm"
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                         {errors.quantity?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng nhập số lượng </p>}
                    </div>
                    <label htmlFor="picture" className="col-sm-2 col-form-label col-form-label-sm">Hình ảnh</label>
                    <div className="col-sm-4">
                        <input type="file" onChange={handleUpload} required/>
                        {/* {errors.imageProduct?.type === 'required' && <p className="errorSignIn">&nbsp; Vui lòng chọn ảnh</p>} */}
                    </div>
                    <label htmlFor="status" className="col-sm-2 col-form-label col-form-label-sm">Trạng thái</label>
                    <div className="col-sm-4">
                        <Controller
                            name="status"
                            defaultValue={data.status}
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <select
                                    className="form-select"
                                    value={value}
                                    onChange={onChange}
                                >
                                    <option value={'Kích hoạt'} >Kích hoạt</option>
                                    <option value={'Ngừng kích hoạt'}>Ngừng kích hoạt</option>
                                </select>
                            )}
                        />
                    </div>
                    <label htmlFor="description" className="col-sm-2 col-form-label col-form-label-sm">Mô tả</label>
                    <div className="col-sm-4">
                        <Controller
                            name="description"
                            defaultValue={data.description}
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <textarea value={value} onChange={onChange} style={{ width: "100%" }} />
                            )}
                        />
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
export default EditProduct;