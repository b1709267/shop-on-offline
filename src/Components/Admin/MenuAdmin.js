import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import Cookie from 'js-cookie'
import { getData, onDataChange } from '../../API/AccountAPI'
import { Redirect } from 'react-router'
// import AuthApi from '../User/SignIn/AuthApi'
function MenuAdmin() {
  const styleColor = {
    color: '#fff',
    fontWeight: 700,
    padding: '0px 30px 5px 0px',
    marginLeft: '15px',
    textDecoration: 'none'
  }

  const [info] = useState({ name: "" })
  const [account, setAccount] = useState([])
  const id = Cookie.get('id')

  const refreshAccount = () => getData().then(setAccount)
  useEffect(() => {
    refreshAccount();
    const observer = onDataChange(refreshAccount)
    return () => {
      observer.cancel()
    }
  }, [])
  account.map(user => {
    if (id === user._id) {
      info.name = user.username
      info.level = user.level
    }
    return (<div></div>)
  })

  // const Auth = React.useContext(AuthApi)
  const handleLogout = () => {
    // Auth.setAuth(false)
    Cookies.remove("id")
    Cookies.remove("level")
    refresh()
  }//Cai nay de Logout
  const refresh = () => {
    window.location.reload();
  }


  // const Auth = React.useContext(AuthApi)
  // const handleOnClick = () => {
  //   Auth.setAuth(false);
  //   Cookies.remove("id");
  //   Cookies.remove("level");
  // }
  const [title, setTitle] = useState('ADMIN')
  useEffect(() => {
    document.title = title;
  })

  if (Cookies.get("level") !== "admin") {
    return (<Redirect to="/signin" />)
  } else {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
          <Container>
            <Navbar.Brand href="/admin"><img src="./icon.ico" alt ="iamge"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Link
                  onClick={() => setTitle('Quản lý tài khoản')}
                  style={styleColor}
                  to="/account">
                  <i className="fa fa-users" aria-hidden="true"></i>
                  Quản lý tài khoản</Link>
                <Link
                  onClick={() => setTitle('Quản lý sản phẩm')}
                  style={styleColor}
                  to="/product">
                  <i className="fa fa-shopping-basket" aria-hidden="true"></i> Quản lý sản phẩm
                </Link>
                <Link
                  onClick={() => setTitle('Thống kê đơn hàng')}
                  style={styleColor}
                  to="/order">
                  <i className="fa fa-bar-chart" aria-hidden="true"></i> Thống kê sản phẩm
                </Link>
                <div className="dropdown">
                  <li className="header__navbar-item" style={{marginLeft:'55px'}}>
                   <h4><i className="fa fa-circle" style={{ color: '#00FF00' }} aria-hidden="true"></i> &nbsp;{info.name}</h4> 
                  </li>
                  <div className="dropdown-content">
                    <Link to='#' onClick={handleLogout}>Đăng xuất</Link>
                  </div>
                </div>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default MenuAdmin;
