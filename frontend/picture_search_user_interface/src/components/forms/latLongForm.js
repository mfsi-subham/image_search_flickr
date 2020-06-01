import React, {useState} from 'react'
import {Form, Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'


const LatLongForm = props =>{
    
    const [lat, setLatitude] = useState(null)
    const [long, setLongitude] = useState(null)

    const handleLatitudeChange = (event) =>{
        //changing state while form input value changes for latitude
        setLatitude(event.target.value)
    };

    const handleLongitudeChange = (event) =>{
        //changing state while form input value changes for longitude
        setLongitude(event.target.value)
    };

    const onSubmitHandler = (event) =>{
        // calling action to fetch images from flickr api
        // arg 1 is pageNO - for 1st time page no will always 1
        event.preventDefault()
        props.fetchFlickrData(lat, long, 1)

    };
    
    let button = <Button variant='info' size='lg' onClick={onSubmitHandler} disabled>Submit</Button>
    if (lat !==null && long != null){
        button = <Button variant='info' size='lg'  onClick={onSubmitHandler} >Submit</Button>    
    }

    return (

        <Form >
            <Form.Row >
                <Col sm={5} className='py-1'>
                    <Form.Control size='lg' type='number' step='0.0001' name='latitude' placeholder='Latitude'  onChange={handleLatitudeChange}/>
                </Col>
                <Col sm={5} className='py-1'>
                    <Form.Control size='lg' type='number' step='0.0001' name='longitude' placeholder='Longitude'  onChange={handleLongitudeChange}/>
                </Col>
                <div className='px-2 py-1'>
                    {button}
                </div>
                
            </Form.Row>
        </Form>
    );
};

const mapDispatchToProps = dispatch =>{
    //dispatching on button submit to call store action for fetching images
    return{
        fetchFlickrData: (lat, long, page) => dispatch(actions.fetchFlickrData(lat, long, page)),
    }
}

export default connect(null, mapDispatchToProps)(LatLongForm)
