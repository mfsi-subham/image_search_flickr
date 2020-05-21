import React from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import * as actions from '../store/actions/index'


const searchResult = (props) => {

    
    let photoList = props.photoList.map((i, photo)=>{

        let photoUrl =`https://farm${i.farm}.staticflickr.com/${i.server}/${i.id}_${i.secret}.jpg`
    
        return(
            
            <a key={i.id}target="_blank"  href={photoUrl}>
                <img key={photoUrl} src={photoUrl} alt="not found"></img>{" "}     
            </a>
            

        ) 
    })

    const nextPageHandler = (event) => {
        event.preventDefault()
        props.fetchFlickrData(props.lat, props.long, props.page+1)

    }
    const prevPageHandler = (event) => {
        event.preventDefault()
        props.fetchFlickrData(props.lat, props.long, props.page-1)

    }


    return(
        <div>
            {photoList}
            <br></br>
            <br></br>
            {props.page !== 1? <Button variant="outline-info" size="sm" onClick={prevPageHandler}>Prev</Button>:null}{" "}
            <Button variant="outline-info" size="sm" onClick={nextPageHandler} >Next</Button>{" "}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(searchResult)