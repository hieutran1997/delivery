import React from 'react';
import { Row, Col, Card } from 'antd';

const style = { background: '#0092ff', padding: '8px 0' };

function Home(props) {
    console.log('1');
    return (
        <div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={6}>
                    <Card style={{ width: '100%' }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card style={{ width: '100%' }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card style={{ width: '100%' }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card style={{ width: '100%' }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
            </Row>
            <br/>
            <Row>
                <Card style={{ width: '100%' }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Row>
        </div>
    );
}

export default Home;