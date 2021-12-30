import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Menu.css';
// import AuthApi from './SignIn/AuthApi'
import { Navbar, Container, Nav, FormControl, Button, Form } from 'react-bootstrap'
import Cookie from 'js-cookie'
import Cookies from 'js-cookie'
import { getData, onDataChange } from '../../API/AccountAPI'


function Menu() {
    const styleColor = {
        color: '#fff',
        fontWeight: 700,
        fontSize: '14px',
        marginLeft: '30px',
        textDecoration: 'none'
    }
    const styleForm = {
        marginLeft: '25px',
    }
    const styleLogo = {
        textDecoration: 'none',
        fontWeight: 700,

    }
    const [title, setTitle] = useState('Shop On-Offline')
    useEffect(() => {
        document.title = title;
    })
    
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

    const handleShowAcount = () => {
        if (id) {
            return (
                <React.Fragment>
                    <div className="dropdown">
                        <li className="header__navbar-item">
                            <i className="fa fa-circle" style={{ color: '#00FF00' }} aria-hidden="true"></i> &nbsp;{info.name}
                        </li>

                        <div className="dropdown-content">
                            <Link to={info.level ===  "buyer" ? "/myprofile" : "/seller"} onClick={()=>setTitle('Thông tin tài khoản')}>Tài khoản của tôi</Link>
                            <Link to='#' onClick={handleLogout}>Đăng xuất</Link>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <li className="header__navbar-item header--separate">
                    <Link
                        className="text-link-menu"
                        to="/signup"
                        onClick={() => setTitle('Đăng ký')}
                    >
                        <i className="fa fa-user-plus" aria-hidden="true"></i> &nbsp; Đăng ký</Link>
                </li>
                <li className="header__navbar-item">
                    <Link
                        className="text-link-menu"
                        to="/signin"
                        onClick={() => setTitle('Đăng nhập')}
                    >
                        <i className="fa fa-sign-in" aria-hidden="true"></i> &nbsp; Đăng nhập</Link>
                </li>
            </React.Fragment>

        )

    }
    return (
        <React.Fragment>
            <div className="menu-main" >
                <div className=" container menu-home" >
                    <div className="row">
                        <div className="grid">
                            <nav className="header__navbar">
                                <ul className="header__navbar-list">
                                    <li className="header__navbar-item header--separate">
                                        <Link
                                            className="text-link-menu"
                                            to="/seller"
                                            onClick={() => setTitle('Kênh người bán')}
                                        >
                                         Kênh người bán</Link>
                                    </li>
                                    <a href="http://facebook.com" >
                                        <li className="header__navbar-item">
                                            Kết nối &nbsp;
                                            <i className="fa fa-facebook-square" aria-hidden="true"></i>
                                        </li>
                                    </a>
                                </ul>
                                <ul className="header__navbar-list">
                                    <li className="header__navbar-item">
                                        <i className="fa fa-question-circle-o" aria-hidden="true"></i>
                                        &nbsp; Trợ giúp
                                    </li>
                                    {handleShowAcount()}
                                    <li className="header__navbar-item">
                                        <i className="fa fa-bell" aria-hidden="true"></i>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="header-main">
                            <Navbar collapseOnSelect expand="lg">
                                <Container>
                                    <Link to='/' style={styleLogo}> <Navbar.Brand  >
                                        <img
                                            src="/icon.ico"
                                            width="30"
                                            height="30"
                                            className="d-inline-block align-top"
                                            alt="Shop On-Offline Logo" />
                                       <Navbar.Brand  className="text-logo">&ensp;&ensp;Shop On-Offline</Navbar.Brand></Navbar.Brand>
                                    </Link>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="me-auto">
                                            <Link
                                                onClick={() => setTitle(' Shop On-Offline')}
                                                style={styleColor}
                                                className="text-link-menu" to="/">
                                                <i className="fa fa-home" aria-hidden="true"></i> &nbsp; Trang chủ
                                            </Link>
                                            <Link
                                                onClick={() => setTitle('Chăm sóc khách hàng')}
                                                style={styleColor}
                                                className="text-link-menu"
                                                to="/help"><i className="fa fa-sign-language" aria-hidden="true"></i> &nbsp; Chăm sóc khách hàng
                                            </Link>
                                            <Form className="d-flex" >
                                                <FormControl
                                                    style={styleForm}
                                                    type="search"
                                                    placeholder="Tìm kiếm sản phẩm"
                                                    className="mr-2"
                                                    aria-label="Search"
                                                />
                                                &nbsp;
                                                <Button variant="success">  <i className="fa fa-search" aria-hidden="true"></i></Button>
                                            </Form>
                                            {Cookie.get('id')?
                                            <Link
                                                onClick={() => setTitle('Giỏ hàng của bạn')}
                                                style={styleColor}
                                                className="text-link-menu" to="/cart"><i className="fa fa-cart-plus " aria-hidden="true"></i>&nbsp; Giỏ hàng
                                            </Link>:
                                            <Link
                                            onClick={() => setTitle('Giỏ hàng của bạn')}
                                            style={styleColor}
                                            className="text-link-menu" to="/signin"><i className="fa fa-cart-plus " aria-hidden="true"></i>&nbsp; Giỏ hàng
                                        </Link>}
                                        </Nav>
                                    </Navbar.Collapse>

                                </Container>
                            </Navbar>

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Menu;
