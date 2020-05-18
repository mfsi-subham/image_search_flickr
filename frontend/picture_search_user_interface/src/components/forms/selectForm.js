import React, {useEffect} from 'react'
import {Form, Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'


const SelectForm = props => {

    useEffect(() => {
        props.onPlaceList()
    }, [])

    return (
        <Form>
            <Form.Row>
                <Col sm={2}>
                    <Form.Control size="sm" as="select" name="options">
                        <option>Choose...</option>
                        <option>...</option>
                    </Form.Control>
                </Col>
                <Button variant="outline-info" size="sm" >Submit</Button>{' '}
            </Form.Row>
        </Form>
    );
};

const mapDispatchToProps = dispatch => {
    return{
        onPlaceList: () => dispatch(actions.placeFetch())
    }
}

export default connect(null, mapDispatchToProps)(SelectForm)
