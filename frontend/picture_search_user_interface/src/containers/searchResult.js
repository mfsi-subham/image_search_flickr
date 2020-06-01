import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Button, Form, Spinner} from 'react-bootstrap'
import * as actions from '../store/actions/index'
import {useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const ADD_FAV_URL = gql`mutation($photoUrl: String!){createFavouritePhoto(input: {photoUrl: $photoUrl}){favouritePhoto{photoUrl: photoUrl}}}`
const DELETE_FAV_URL = gql`mutation($photoUrl: String!){deleteFavouritePhoto(input: {photoUrl: $photoUrl}){favouritePhoto{photoUrl}}}`

const SearchResult = (props) => {
    
    const [addFavouritePhoto] = useMutation(ADD_FAV_URL);
    const [deleteFavouritePhoto] = useMutation(DELETE_FAV_URL);

    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const favouriteHandler = (photoUrl) => {
        const checkboxValue = document.getElementById(photoUrl).checked
    
        if (checkboxValue === true){
            addFavouritePhoto({variables: {photoUrl}}).then(res => {
                setSuccessMessage('Added to favourite list successfully')
                setErrorMessage(null)
            }).catch(err => {
                setSuccessMessage(null)
                setErrorMessage('Something went wrong...Please try after sometime( '+err.message+' )')
                if(err.message.includes('UNIQUE constraint')){
                    setSuccessMessage('Already added to favourite list')
                    setErrorMessage(null)
                }
            });
        }
        
        else{
            deleteFavouritePhoto({variables: {photoUrl}})
            .then(() => {
                setErrorMessage(null)
                setSuccessMessage('Removed from favourite list successfully')
            }).catch(err => {
                setSuccessMessage(null)
                setErrorMessage('Something went wrong...Please try after sometime( '+err.message+' )')
            }
                
            );
        };
    };
    
    let photoList = <Spinner animation="border" variant="info" />
    
    if (!props.loading){
        photoList = props.photoList.map((i)=>{
            let photoUrl = `https://farm${i.farm}.staticflickr.com/${i.server}/${i.id}_${i.secret}.jpg`
            return(
                    <div className='card bg-light' style={{ width: 200 }} key={i.id+2}>
                        <a key={i.id+3} target='_blank' rel='noopener noreferrer'  href={photoUrl} >
                            <img key={i.id+4} src={photoUrl} alt='not found' style={{ height: 200, width: 200 }}></img>
                        </a>
                        <div className='card-body d-flex justify-content-sm-center'>
                            <Form.Check type='checkbox' key={photoUrl} id={photoUrl}  label='Add to Fav' onClick={()=>favouriteHandler(photoUrl)} />
                        </div>
                    </div>
            );
        });

    }
    

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
            <div className='row p-2 justify-content-md-center align-content-center bg-dark '>
                {errorMessage ? <h5 className='text-danger'><strong>{errorMessage}</strong></h5> : null}
                {successMessage ? <h5 className='text-success'><strong>{successMessage}</strong></h5> : null}
            </div>
            
            <div className='row p-5 justify-content-md-center align-content-center bg-dark'>
                {photoList}
            </div>

            <div className='row justify-content-md-center align-content-center bg-dark '>
                {props.page !== 1? <Button className='m-3' key='prev' variant='outline-info' size='lg' onClick={prevPageHandler}>Prev</Button>:null}
                <Button className='m-3' key='next' variant='outline-info' size='lg' onClick={nextPageHandler} >Next</Button>
            </div>

        </div>

    );
};

const mapStateToProps = state =>{
    return{
        photoList: state.photoList.photoList,
        loading: state.photoList.loading,
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