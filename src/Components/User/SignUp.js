import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { addData } from '../../API/AccountAPI';
import '../CSS/Form.css'
import {toast} from 'react-toastify'

function SignUp() {
  const { register, watch,reset, formState: { errors }, handleSubmit } = useForm(
    { mode: "onTouched" }
  );
  const password = useRef;
  password.current = watch('password');

  const onSubmit = (data) => {
    if(data.checkSeller){
      them(data.username, data.email, data.phone, data.password, data.repassword, data.address,"seller")
    }else{
      them(data.username, data.email, data.phone, data.password, data.repassword, data.address,"buyer")
    }  
    toast.success('Đăng ký tài khoản thành công')
    reset()

  };

  const them = (username, email, phone, password, repassword, address, level) => addData({
    username: username,
    email: email,
    phone: phone,
    password: password,
    repassword: repassword,
    address: address,
    level: level,
  })
  const style = {
    marginTop: '120px'
  }
  
  return (
    <React.Fragment>
      <div className="container login" style={style}>
        <div className="row">
          <div className="col-md-6">
            <div className="rigthCtn">
              <div className="box"><header>SHOP ON-OFFLINE   </header>
                <i className="fa fa-plug" aria-hidden="true">&ensp;Hoạt động online - offline </i> <br />
                <i className="fa fa-handshake-o" aria-hidden="true">&ensp; Hổ trợ tận tình</i> <br />
                <i className="fa fa-truck" aria-hidden="true">&ensp; Giao hàng nhanh chóng</i><br />
                <i className="fa fa-credit-card-alt" aria-hidden="true">&ensp; Thanh toán tiện lợi</i><br />
                <i className="fa fa-check-circle" aria-hidden="true">&ensp; Uy tín chất lượng</i><br />
                <h5 className="contact">Liên hệ với chúng tôi:</h5>
                <i className="fa fa-phone" aria-hidden="true">&ensp; 0326747791</i><br />
                <i className="fa fa-envelope" aria-hidden="true">&ensp; Nhutlinh0312@gmail.com</i><br />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="leftCtn">
              <form className="myForm text-center" onSubmit={handleSubmit(onSubmit)}>
                <header>Đăng ký tài khoản</header>
                <div className="form-group">
                  <i className="fa fa-user" style={{ fontSize: '25px' }}></i>&ensp;
                  <input className="myInput" type="text" id="username" placeholder="Họ và tên" {...register("username", { required: true })} />
                  {errors.username?.type === 'required' && <p className="error">&nbsp; Vui lòng nhập tên đầy đủ !!!</p>}
                </div>
                <div className="form-group">
                  <i className="fa fa-envelope" style={{ fontSize: '25px' }}></i> &ensp;
                  <input className="myInput" type="email" id="email" placeholder="Email"  {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                  {errors.email?.type === 'required' && <p className="error">&nbsp; Vui lòng nhập email !!!</p>}
                  {errors.email?.type === 'pattern' && <p className="error">&nbsp; Email không hợp lệ !!!</p>}
                </div>
                <div className="form-group">
                  <i className="fa fa-phone" style={{ fontSize: '25px' }}></i>&ensp;
                  <input className="myInput" type="text" id="phone" placeholder="Số điện thoại" {...register("phone", { required: true, pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g })} />
                  {errors.phone?.type === 'required' && <p className="error">&nbsp; Vui lòng nhập số điện thoại !!!</p>}
                  {errors.phone?.type === 'pattern' && <p className="error"> &nbsp; Số điện thoại không hợp lệ !!!</p>}
                </div>
                <div className="form-group">
                  <i className="fa fa-lock" style={{ fontSize: '25px' }}></i>&ensp;
                  <input className="myInput" type="password" id="password" name="password" placeholder="Mật khẩu" {...register("password", { required: true, minLength: 6 })} />
                  {errors.password?.type === 'required' && <p className="error">&nbsp; Vui lòng nhập mật khẩu !!!</p>}
                  {errors.password?.type === 'minLength' && <p className="error">&nbsp; Mật khẩu ít nhất 6 ký tự !!!</p>}
                </div>
                <div className="form-group">
                  <i className="fa fa-lock" style={{ fontSize: '25px' }}></i>&ensp;
                  <input className="myInput" type="password" id="repassword" placeholder="Nhập lại mật khẩu" {...register("repassword", { required: true, validate: (value) => value === password.current })} />
                  {errors.repassword?.type === 'required' && <p className="error">&nbsp; Vui lòng nhập nhập lại mật khẩu !!!</p>}
                  {errors.repassword?.type === 'validate' && <p className="error">&nbsp; Mật khẩu không khớp !!! </p>}
                </div>
                <div className="form-group">
                  <i className="fa fa-address-book" style={{ fontSize: '25px' }}></i>&ensp;
                  <input className="myInput" type="text" id="address" placeholder="Địa chỉ" {...register("address", { required: true })} />
                  {errors.adress?.type === 'required' && <p className="error">&nbsp; Vui lòng nhập nhập địa chỉ !!!</p>}
                </div>
                <div className="check-seller">
                <div className="form-group" >
                    <input className="form-check-input" type="checkbox" id="check" {...register("checkSeller")}/>
                    <label className="form-check-label" htmlFor='check'>
                     &nbsp; Trở thành người bán
                    </label>
                </div>
                </div>
               
                <button type="submit" className="btn btn-success" style={{ marginTop: '10px', width: '150px', borderRadius: '25px', marginLeft: '30px' }}>Đăng ký</button>
                <br /> <br />
                <span> Nếu đã có tài khoản đăng nhập <Link to="/signin" >tại đây.</Link></span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default SignUp;