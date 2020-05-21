import React, {useState, useEffect} from 'react'
import LatLongForm from '../components/forms/latLongForm'
import SelectForm from '../components/forms/selectForm'
import Button from 'react-bootstrap/Button'
import * as actions from '../store/actions/index'
import {connect} from 'react-redux'
import SearchResult from '../containers/searchResult'

const HomePageSearch = props => {

    useEffect(() => {
        props.onPlaceList()
    }, [])

    let [form, setform] = useState("latLongForm")

    const  showLatLongForm = () => {
        setform ("latLongForm")
    }

    const  showNameForm = () => { 
        setform ("nameForm")
    }
    
    return (
        
        <div>
        
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Button variant="outline-info" size="sm" onClick={showLatLongForm} >By Lat-Long</Button>{" "}
        <Button variant="outline-info" size="sm" onClick={showNameForm} >By Name</Button>{" "}
        <br></br>
        <br></br>
        {
            form === "latLongForm" ? <LatLongForm></LatLongForm> : <SelectForm options={props.options}></SelectForm>
        }
        
        <br></br>
        {props.photoList ? <SearchResult></SearchResult>: null}
        
        </div>
    );
};

const mapStateToProps = state => {
    return{
        options: state.placeList.placeList,
        photoList: state.photoList.photoList != null
    }

}

const mapDispatchToProps = dispatch => {
    return{
        onPlaceList: () => dispatch(actions.placeFetch())
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (HomePageSearch)
