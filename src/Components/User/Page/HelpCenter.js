import React from 'react';
import { Form, Button, Col, Container } from 'react-bootstrap'

function HelpCenter() {
    const style = {
        marginTop: '115px'
    }
    return (
        <React.Fragment>
            <center style={style}>  <marquee><font color="#FF0000"><h1>Trung tâm chăm sóc khách hàng Shop on-offline</h1></font></marquee></center>
            <center><p>Chúng tôi muốn lắng nghe câu hỏi và ý kiến đóng góp từ bạn. Hãy phản hồi cho Shop biết vấn đề của bạn nhé! Chúng tôi sẽ liên hệ lại bạn trong 24h tiếp theo.</p></center>
            <hr />
            <Container style={{ marginLeft: "30%" }}>
                <Col sm={6}>
                    <Form>
                    <Form.Label>Bạn cần hổ trợ với vai trò nào ?</Form.Label>
                        <Form.Select>
                            <option>Lựa chọn</option>
                            <option>Người bán</option>
                            <option>Người mua</option>
                        </Form.Select>
                        <br />
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Địa chỉ email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email....... " />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>  Vấn đề cần hỗ trợ.</Form.Label>
                            <Form.Control type="password" placeholder="Enter Issue......" />
                        </Form.Group>
                        <Button variant="danger" type="submit">
                            Gửi yêu cầu
                        </Button>
                    </Form>
                </Col>
            </Container>
        </React.Fragment>
    )
}
export default HelpCenter;