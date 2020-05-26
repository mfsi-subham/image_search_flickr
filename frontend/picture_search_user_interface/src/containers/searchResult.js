import React from 'react'
import {connect} from 'react-redux'
import {Button, Form} from 'react-bootstrap'
import * as actions from '../store/actions/index'
import {useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const ADD_FAV_URL = gql`mutation($photoUrl: String!){createFavouritePhoto(input: {photoUrl: $photoUrl}){favouritePhoto{photoUrl: photoUrl}}}`
const DELETE_FAV_URL = gql`mutation($photoUrl: String!){deleteFavouritePhoto(input: {photoUrl: $photoUrl}){favouritePhoto{photoUrl}}}`

const SearchResult = (props) => {
    
    const [addFavouritePhoto] = useMutation(ADD_FAV_URL);
    const [deleteFavouritePhoto] = useMutation(DELETE_FAV_URL);
    

    const favouriteHandler = (photoUrl) => {
        const checkboxValue = document.getElementById(photoUrl).checked
        
        if (checkboxValue === true){
            addFavouritePhoto({variables: {photoUrl}}).catch(err=>{console.log(err)});
            }
        
        else{
            deleteFavouritePhoto({variables: {photoUrl}}).catch(err=>{console.log(err)});
        };
    };
    
    let photoList = props.photoList.map((i)=>{
        let photoUrl = `https://farm${i.farm}.staticflickr.com/${i.server}/${i.id}_${i.secret}.jpg`
        return(
            <div key={i.id+1}>
                <a key={i.id+2}target="_blank"  href={photoUrl}>
                    <img key={i.id+3} src={photoUrl} alt="not found" style={{ height: 150, width: 150 }}></img>{' '}
                </a>
                <Form.Check type='checkbox' key={photoUrl} id={photoUrl}  label='Add to Fav' onClick={()=>favouriteHandler(photoUrl)} />
            </div>

        );
    });

    const nextPageHandler = (event) => {
        //Displaying next page data
        event.preventDefault()
        props.fetchFlickrData(props.lat, props.long, props.page+1)

    };

    const prevPageHandler = (event) => {
        //displaying next page data
        event.preventDefault()
        props.fetchFlickrData(props.lat, props.long, props.page-1)

    };


    return(
        <div>
            {photoList}
            <br></br>
            <br></br>
            {props.page !== 1? <Button key="prev" variant="outline-info" size="sm" onClick={prevPageHandler}>Prev</Button>:null}{" "}
            <Button key="next" variant="outline-info" size="sm" onClick={nextPageHandler} >Next</Button>{" "}            
        </div>

    );
};

const mapStateToProps = state =>{
    return{
        photoList: state.photoList.photoList,
        lat: state.photoList.lat,
        long: state.photoList.long,
        page: state.photoList.page

    };
};

const mapDispatchToProps = dispatch =>{
    return{
        fetchFlickrData: (lat, long, page) => dispatch(actions.fetchFlickrData(lat, long, page)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)