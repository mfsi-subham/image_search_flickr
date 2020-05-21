import React,{useState, useEffect} from 'react'
import {Form, Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'


const SelectForm = props => {
    
    let firstOption = (props.options != null) ? props.options[0]['placeName']:''

    const [option, setOption] = useState(firstOption)

    let optionItem = props.options.map((i, opt)=>{
        return <option value={i.placeName} key={i.placeName}>{i.placeName}</option>     
    })

    useEffect(()=>{
        props.fetchLatLongData(option)
    })
    
    const getFlickrData = (event) => {

        event.preventDefault()
        props.fetchFlickrData(props.lat, props.long, 1)
    }

    const handleChange = (event) => {
        setOption(event.target.value)
    }
    
    return (
        <Form>
            <Form.Row>
                <Col sm={2}>
                    <Form.Control size="sm" as="select" name="options" onChange={handleChange}>
                        {optionItem}
                    </Form.Control>
                </Col>
                <Button variant="outline-info" size="sm" onClick={getFlickrData} >Submit</Button>{' '}
            </Form.Row>
        </Form>
    );
};

const mapStateToProps = state =>{
    return{
        lat: state.photoList.lat,
        long: state.photoList.long,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchFlickrData: (lat, long, page) => dispatch(actions.fetchFlickrData(lat, long, page)),
        fetchLatLongData: (option) => dispatch(actions.fetchLatLongData(option))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SelectForm);
