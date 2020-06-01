import React,{useState, useEffect} from 'react'
import {Form, Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'


const SelectForm = props => {
    
    let firstOption = (props.options.length !== 0) ? props.options[0]['placeName']:null
    let placeListError = props.error

    const [option, setOption] = useState(firstOption)

    let optionItem = props.options.map((i)=>{
        return <option value={i.placeName} key={i.placeName}>{i.placeName}</option>     
    });

    useEffect(()=>{
        //fetch data everytime component renders 
        props.fetchLatLongData(option)
    });
    
    const getFlickrData = (event) => {
        //get images on submit of form
        event.preventDefault()
        props.fetchFlickrData(props.lat, props.long, 1)
    };

    const handleChange = (event) => {
        //Change state every time option changes
        setOption(event.target.value)
    };

    let button = <Button variant="info" size="lg" onClick={getFlickrData} disabled>Submit</Button>
    if (firstOption){
        button = <Button variant="info" size="lg" onClick={getFlickrData} >Submit</Button>
    };

    let form = (
        
        <Form>
            <Form.Row>
                <Col sm={7}>
                    <Form.Control size="lg" as="select" name="options" onChange={handleChange}>
                        {optionItem}
                    </Form.Control>
                </Col>
                <div>
                    {button}
                </div>
                
            </Form.Row>
        </Form>

    )

    if (placeListError){ 
        form = <h5 className="text-danger text-center"><strong>Everything is not right currently for this option...please try after some time</strong></h5>
    }

    return (
            {...form}
    );
};

const mapStateToProps = state =>{
    //getting latitude & longitude from store 
    return{
        lat: state.photoList.lat,
        long: state.photoList.long,
    };
};

const mapDispatchToProps = dispatch =>{
    //dispatch functions for respective works
    return{
        fetchFlickrData: (lat, long, page) => dispatch(actions.fetchFlickrData(lat, long, page)),
        fetchLatLongData: (option) => dispatch(actions.fetchLatLongData(option))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SelectForm);
