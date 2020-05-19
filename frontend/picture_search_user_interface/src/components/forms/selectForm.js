import React from 'react'
import {Form, Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'


const selectForm = props => {

    let optionItem = props.options.map((i, opt)=>{
        return <option key={i.placeName}>{i.placeName}</option>
    })

    const getFlickrData = (event) => {
        event.preventDefault()
        props.fetchData()
    }
    
    return (
        <Form>
            <Form.Row>
                <Col sm={2}>
                    <Form.Control size="sm" as="select" name="options">
                        {optionItem}
                    </Form.Control>
                </Col>
                <Button variant="outline-info" size="sm" onClick={getFlickrData} >Submit</Button>{' '}
            </Form.Row>
        </Form>
    );
};

const mapDispatchToProps = dispatch =>{
    return{
        fetchData: () => dispatch(actions.fetchFlickrData())
    };
};


export default connect(null, mapDispatchToProps)(selectForm);
