import React from 'react'
import {Form, Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

const latLongForm = props =>{

    return (

        <Form>
            <Form.Row>
                <Col sm={2}>
                    <Form.Control size="sm" type="number" step='0.0001' name="latitude" placeholder="Latitude" required={true}/>
                </Col>
                <Col sm={2}>
                    <Form.Control size="sm" type="number" step='0.0001' name="latitude" placeholder="Latitude" required={true}/>
                </Col>
                <Button variant="outline-info" size="sm">Submit</Button>{' '}
            </Form.Row>
        </Form>
    );
};

export default latLongForm
