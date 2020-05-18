import React, {useState} from 'react'
import LatLongForm from '../components/forms/latLongForm'
import SelectForm from '../components/forms/selectForm'


const HomePageSearch = props => {

    const [form, setform] = useState("lat_long_form")
    
    return (
        <div>
        
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <LatLongForm></LatLongForm>
        <br></br>
        <SelectForm></SelectForm>
        </div>
    );
};

export default HomePageSearch
