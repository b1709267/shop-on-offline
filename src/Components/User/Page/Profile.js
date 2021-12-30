import React, { useState, useEffect } from "react";
import { Row, Col, Tab, Nav, Container, Form, Button } from 'react-bootstrap'
import Cookie from 'js-cookie'
import { getData, onDataChange, editData } from '../../../API/AccountAPI'
import '../../CSS/Menu.css'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router'
import { toast } from 'react-toastify'
import ListPucharse from "../ListPucharse";

function Profile() {
    const styles = {
        marginTop: '115px'
    }
    const [title, setTitle] = useState('Thông tin tài khoản')
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
            info._id = user._id
            info.rev = user._rev
            info.name = user.username
            info.email = user.email
            info.phone = user.phone
            info.level = user.level
            info.address = user.address
            info.password = user.password
            info.birthday = user.birthday
            info.gender = user.gender
        }
        return (<div></div>)
    })
    const picture = info.name.charAt(0).toUpperCase()

    const styleNav = {
        backgroundColor: '#fff'
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [editProfile, setEditProfile] = useState({ name: "", address: "", phone: "", password: "", email: "", birthday: "", gender: "" })
    const checkInput = () => {
        if (editProfile.name === "") {
            editProfile.name = info.name
        }
        if (editProfile.address === "") {
            editProfile.address = info.address
        }
        if (editProfile.phone === "") {
            editProfile.phone = info.phone
        }
        if (editProfile.email === "") {
            editProfile.email = info.email
        }
        if(editProfile.gender === ""){
            editProfile.gender = info.gender
        }
        if(editProfile.birthday === ""){
            editProfile.birthday = info.birthday
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        checkInput()
        if (editProfile.password === "") {
            editData({
                _id: info._id,
                _rev: info.rev,
                username: editProfile.name,
                level: info.level,
                password: info.password,
                email: editProfile.email,
                phone: editProfile.phone,
                address: editProfile.address,
                gender: editProfile.gender,
                birthday: editProfile.birthday
            })
            toast.success('Cập nhật thông tin thành công !!')
        } else {
            editData({
                _id: info.id,
                _rev: info.rev,
                name: editProfile.name,
                password: editProfile.password,
                email: editProfile.email,
                phone: editProfile.phone,
                address: editProfile.address,
                gender: info.gender,
                birthday: info.birthday

            })
        }
    }
    if (!Cookies.get("id")) {
        return (<Redirect to="/signin" />)
    } else {
        return (
            <React.Fragment >
                <Container style={styles}>
                    <Tab.Container id="profile" defaultActiveKey="first" >
                        <Row  >
                            <Col sm={3} style={styleNav} >
                                <Nav variant="profile" className="flex-column nav-profile"  >
                                    <Nav.Item onClick={() => setTitle('Thông tin tài khoản')}>
                                        <Nav.Link eventKey="first"><i className="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;Thông tin cá nhân</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item onClick={() => setTitle('Thông tin đơn hàng')} >
                                        <Nav.Link eventKey="purchares"><i className="fa fa-list-alt" aria-hidden="true" ></i>&nbsp;&nbsp;Đơn hàng</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <Row className='proflie-header'>
                                            <h4 className='proflie-text'> Quản lý thông tin cá nhân</h4>
                                        </Row>
                                        <Row className='proflie-header'>
                                            <Col sm={8}  >
                                                <Form className='form-edit-profile' onSubmit={handleSubmit}>
                                                    <Form.Label>Tên người dùng: {info.name}&emsp;&emsp;</Form.Label>
                                                    <i className="fa fa-pencil-square-o"
                                                        aria-hidden="true"
                                                        onClick={handleShow}
                                                        style={{ color: '#DC143C', cursor: 'pointer', fontSize: '25px', float: 'right' }}></i>
                                                    {show ?
                                                        <Row>
                                                            <Col sm={8}  >
                                                                <Form.Control
                                                                    style={{ width: '300px' }}
                                                                    type='text'
                                                                    placeholder={info.name}
                                                                    onChange={event => setEditProfile({ ...editProfile, name: event.target.value })}
                                                                    value={editProfile.name}
                                                                /></Col>
                                                            <Col sm={4}  >
                                                                <i className="fa fa-times-circle"
                                                                    aria-hidden="true"
                                                                    onClick={handleClose}
                                                                    style={{ color: '#8B0000', cursor: 'pointer', fontSize: '28px', float: 'right' }}></i>
                                                            </Col>
                                                        </Row> : null}

                                                    <hr />
                                                    <Form.Label>Tài khoản Email: {info.email}</Form.Label>
                                                    {show ?
                                                        <Row>
                                                            <Col sm={8}  >
                                                                <Form.Control
                                                                    style={{ width: '300px' }}
                                                                    type='email'
                                                                    placeholder={info.email}
                                                                    onChange={event => setEditProfile({ ...editProfile, email: event.target.value })}
                                                                    value={editProfile.email}
                                                                /></Col>
                                                        </Row> : null}<hr />
                                                    <Form.Label>Mật khẩu: {info.password}&emsp;&emsp;</Form.Label>
                                                    {show ?
                                                        <Row>
                                                            <Col sm={8}  >
                                                                <Form.Control
                                                                    style={{ width: '300px' }}
                                                                    type='password'
                                                                    placeholder={info.password}
                                                                    onChange={event => setEditProfile({ ...editProfile, password: event.target.value })}
                                                                    value={editProfile.password}
                                                                /></Col>
                                                        </Row> : null}<hr />
                                                    <Form.Label>Số điện thoại: {info.phone}</Form.Label>
                                                    {show ?
                                                        <Row>
                                                            <Col sm={8}  >
                                                                <Form.Control
                                                                    style={{ width: '300px' }}
                                                                    type='text'
                                                                    placeholder={info.phone}
                                                                /></Col>
                                                        </Row> : null}<hr />
                                                    <Form.Label>Địa chỉ: {info.address}</Form.Label>
                                                    {show ?
                                                        <Row>
                                                            <Col sm={8}  >
                                                                <Form.Control
                                                                    style={{ width: '300px' }}
                                                                    type='text'
                                                                    placeholder={info.address}
                                                                    onChange={event => setEditProfile({ ...editProfile, address: event.target.value })}
                                                                    value={editProfile.address}
                                                                /></Col>
                                                        </Row> : null}<hr />
                                                    <Form.Label>Tên shop
                                                        <Form.Control
                                                            style={{ width: '400px' }}
                                                            type='text'
                                                            placeholder={info.level === 'seller' ? info.name : 'Chưa đăng ký trở thành người bán'} disabled />
                                                    </Form.Label><hr />
                                                    <Form.Label>Giới tính: &emsp;&emsp; {info.gender ==="" ?<span className="no-update">Chưa cập nhập </span> : info.gender}</Form.Label><br />
                                                    {show ?
                                                        <React.Fragment>
                                                            <input type="radio" name="gender" value="Nam" onChange={event => setEditProfile({ ...editProfile, gender: event.target.value })} />  Nam &emsp;&emsp;&emsp;&emsp;
                                                            <input type="radio" name="gender" value="Nữ" onChange={event => setEditProfile({ ...editProfile, gender: event.target.value })} /> Nữ &emsp;&emsp;&emsp;&emsp;
                                                            <input type="radio" name="gender" value="Khác" onChange={event => setEditProfile({ ...editProfile, gender: event.target.value })} />  Khác <hr />
                                                        </React.Fragment> : null}
                                                    <Form.Label>Ngày tháng năm sinh: &emsp;&emsp;{info.birthday ==="" ?<span className="no-update">Chưa cập nhập </span> : info.birthday}</Form.Label><br />
                                                    {show ?
                                                        <React.Fragment >
                                                            <input type="date" id="birthday" name="birthday" onChange={event => setEditProfile({ ...editProfile, birthday: event.target.value })}  /><br /><hr />
                                                        </React.Fragment>
                                                        : null}

                                                    <center>{show === false ?<Button type="submit" variant="success" disabled >Cập nhật thông tin</Button>:<Button type="submit" variant="success" >Cập nhật thông tin</Button>}</center>
                                                </Form>
                                            </Col>
                                            <Col sm={3}  >
                                                <center>
                                                    <div className="circle" style={{ textAlign: 'center' }}>
                                                        <h1 style={{ textAlign: 'center', marginTop: '10px', color: '#fff', fontWeight: '800' }}> {picture}</h1>
                                                        <hr />
                                                    </div>
                                                    <button type="button" className="btn btn-danger" style={{ width: '125px', marginTop: '25px' }}>Chọn ảnh</button>
                                                </center>
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="purchares" >
                                    <Row className='proflie-header'>
                                            <h4 className='proflie-text'> Danh sách đơn hàng</h4>
                                        </Row>
                                        <Row className='list-mypurchares'>
                                         <ListPucharse ></ListPucharse>
                                        </Row>
                                    </Tab.Pane>

                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
            </React.Fragment>
        )
    }
}
export default Profile;