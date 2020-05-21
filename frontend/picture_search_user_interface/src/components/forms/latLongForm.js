import React, {useState} from 'react'
import {Form, Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'


const LatLongForm = props =>{

    const [lat, setLatitude] = useState(null)
    const [long, setLongitude] = useState(null)

    const handleLatitudeChange = (event) =>{
        setLatitude(event.target.value)
    }

    const handleLongitudeChange = (event) =>{
        setLongitude(event.target.value)
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault()
        props.fetchFlickrData(lat, long, 1)

    }

    return (

        <Form>
            <Form.Row>
                <Col sm={2}>
                    <Form.Control size="sm" type="number" step='0.0001' name="latitude" placeholder="Latitude" required={true} onChange={handleLatitudeChange}/>
                </Col>
                <Col sm={2}>
                    <Form.Control size="sm" type="number" step='0.0001' name="longitude" placeholder="Longitude" required={true} onChange={handleLongitudeChange}/>
                </Col>
                <Button variant="outline-info" size="sm" onClick={onSubmitHandler}>Submit</Button>{' '}
            </Form.Row>
        </Form>
    );
};

const mapDispatchToProps = dispatch =>{
    return{
        fetchFlickrData: (lat, long, page) => dispatch(actions.fetchFlickrData(lat, long, page)),
    }
}

export default connect(null, mapDispatchToProps)(LatLongForm)
