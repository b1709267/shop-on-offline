import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom'
import { Link } from "react-router-dom"
import Cookie from 'js-cookie'
import AuthApi from './SignIn/AuthApi'
import { getData, onDataChange } from '../../API/AccountAPI'
import { toast } from 'react-toastify'
// import Menu from './Menu'
import RouteMenu from './SignIn/RouteMenu'
import Cookies from "js-cookie"


function SignIn() {
  const [auth, setAuth] = React.useState(false);
  const readCookie = () => {
    const user = Cookie.get("id")
    if (user) {
      setAuth(true)
    }else{
      setAuth(false)
    }
  }
  React.useEffect(() => {
    readCookie()

  }, [])
  return (
    <div style={{ marginTop: "150px" }}>
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>
          <Routes />
        </Router>
      </AuthApi.Provider>
    </div>
  )
}
const Login = () => {
  const Auth = React.useContext(AuthApi)
  const handleSubmit = (event) => {
    if (checkInput()) {
      users.map(user => {
        if (details.phone === user.phone && details.password === user.password) {
          Auth.setAuth(true)
          Cookies.set("id", user._id)
          Cookies.set("level", user.level)
          refresh()
          if (user.level === "admin") {
            refresh()
          }
        }
        return (<div></div>)
      })
      if (!Cookie.get("id")) {
        toast.error("Bạn đã nhập sai số điện thoại hoặc mật khẩu !!")
      }
    } else {
      event.preventDefault()
      toast.error("Vui lòng nhập lại !!")
    }

  }
  const [details, setDetails] = useState({ phone: "", password: "" })
  const [errors, setErrors] = useState({ errorphone: "" })
  const [errorpassword, setErrorpassword] = useState({ errorpassword: "" })
  const [users, setUsers] = useState([])
  const refreshUsers = () => getData().then(setUsers)

  useEffect(() => {
    refreshUsers();
    const observer = onDataChange(refreshUsers)
    return () => {
      observer.cancel()
    }
  }, [])
  const checkInput = event => {
    let check = true
    if (!details.phone) {
      check = false
      setErrors({ ...errors, errorphone: "Vui lòng nhập tên !!" })
    }
    if (!details.password) {
      check = false
      setErrorpassword({ ...errorpassword, errorpassword: "Vui lòng nhập password" })
    }
    return check
  }
  const refresh = () => {
    window.location.reload()
  }

  const style = {
    marginTop: '115px'
  }

  return (
       <div>

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
            <div className="myLeftCtn">
              <form className="myForm text-center" onSubmit={handleSubmit}>
                <header>Đăng nhập tài khoản</header>
                <div className="form-group">
                  <i className="fa fa-user" style={{ fontSize: '25px' }}></i>&ensp;
                  <input type="text" id="phone" name="phone" className="myInput" onChange={event => setDetails({ ...details, phone: event.target.value })} value={details.phone} placeholder="Phone...." />
                  <label htmlFor="phone" className="mr-sm-2" style={{ color: 'red' }}>{errors.errorphone}</label>
                  <div className="form-group">
                    <i className="fa fa-lock" style={{ fontSize: '25px' }}></i>&ensp;
                    <input className="myInput" type="password" id="password" name="password" onChange={event => setDetails({ ...details, password: event.target.value })} value={details.password} placeholder="Password...." />
                    <label htmlFor="password" className="mr-sm-2" style={{ color: 'red' }}>{errorpassword.errorpassword}</label>
                  </div>
                </div>
                <button className="btn btn-success" style={{ marginTop: '10px', width: '180px', marginLeft: '30px', borderRadius: '25px' }}>Ðăng nhập</button>
                <br /> <br />
                <span>Nếu chua có tài khoản đăng ký <Link to="/signup" >tại dây.</Link></span>
              </form>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

// export const Profile1 = () => {
//   const Auth = React.useContext(AuthApi)
//   const handleOnClick = () => {
//     Auth.setAuth(false);
//     Cookies.remove("id");
//     Cookies.remove("level");
//   }
//   return handleOnClick();
// }

const Routes = () => {
  const Auth = React.useContext(AuthApi)
  return (
    <Switch>
      <ProtectedLogin path="/signin" auth={Auth.auth} component={Login} />
      <ProtectedRoute path="/navigate" auth={Auth.auth} component={RouteMenu} />
    </Switch>
  )
}
const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => auth ? (
        <Component />
      ) :
        (
          <Redirect to="/signin" />
        )
      }
    />
  )
}

const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => !auth ? (
        <Component />
      ) :
        (
          <Redirect to="/navigate" />
        )
      }
    />
  )
}

export default SignIn;