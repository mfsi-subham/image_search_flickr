import React, {useState, useEffect} from 'react'
import LatLongForm from './forms/latLongForm'
import SelectForm from './forms/selectForm'
import Button from 'react-bootstrap/Button'
import * as actions from '../store/actions/index'
import {connect} from 'react-redux'
import SearchResult from '../containers/searchResult'
import Heading from '../components/heading'
import {Offline, Online} from 'react-detect-offline'

const HomePageSearch = props => {

    useEffect(() => {
        //fetch the pre defined places from database on each render
        props.onPlaceList()
    }, []);

    let [form, setform] = useState('latLongForm') // By default display lat-long-form

    const  showLatLongForm = () => {
        setform ('latLongForm')
    };

    const  showNameForm = () => { 
        setform ('nameForm')
    };
    
    let buttonLatLong = null
    let buttonName = null
    if (form === 'latLongForm'){
        //when displaying lat-long-form , disable that button
        buttonLatLong = <Button variant="info" size="lg" onClick={showLatLongForm} disabled>By Lat-Long</Button>
        buttonName = <Button variant="info" size="lg" onClick={showNameForm} >By Name</Button>
    }
    else{
        //when displaying name-form , disable that button
        buttonLatLong = <Button variant="info" size="lg" onClick={showLatLongForm} >By Lat-Long</Button>
        buttonName = <Button variant="info" size="lg" onClick={showNameForm} disabled>By Name</Button>
    }    

    return (
        
        <div>
            
            <Heading /> 
            
            <Offline>
                <div className="shadow p-4 bg-dark text-white">
                    <h5 className="text-center text-danger" ><strong>You are Offline...Please check your internet conection</strong></h5>
                </div>
            </Offline>

            <Online>
                <div className="shadow p-4 bg-dark text-white">
                    <h5 className="text-center" >So, How do you want to search {buttonLatLong} or {buttonName} ?</h5>
                </div>
            
                <div className="shadow p-2 bg-dark d-flex justify-content-sm-center">
                    {form === "latLongForm" ? <LatLongForm></LatLongForm> : <SelectForm options={props.options} error={props.placeListError}></SelectForm> }
                </div>

                <div className="shadow p-4 bg-dark d-flex justify-content-sm-center">
                    {props.photoList ? <SearchResult></SearchResult>: null}
                </div>
            </Online>

        </div>
    );
};

const mapStateToProps = state => {
    //fetching states from store
    return{
        options: state.placeList.placeList,
        placeListError: state.placeList.error,
        photoList: state.photoList.photoList != null
    };
};

const mapDispatchToProps = dispatch => {
    //dispatching action to get places 
    return{
        onPlaceList: () => dispatch(actions.placeFetch())
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (HomePageSearch)
