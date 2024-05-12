import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormInput,
    CButton
} from '@coreui/react'

const FulltimerForm = () => {
    const{userId} = useParams();
    const [FulltimerData, setFulltimerData] = useState({
        userId: userId,
    });
    
    const navigate = useNavigate();

    function handleChange(event){
        const {name, value} = event.target;
        setFulltimerData({
            ...FulltimerData,
            [name]: value
        });
    }

    function handleReturn(event){
        navigate('/users/fulltimer');
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
               console.log(FulltimerData)

            const response = await Axios.post('http://localhost:3000/api/createfulltimer', FulltimerData);
            console.log(response.data);
            navigate('/users/fulltimer');
        }
        catch (e){
            console.log(e);
        }
    }

    return(
        <CForm className="row g-3 d-flex justify-content-center align-items-center" onSubmit={handleSubmit}>
        <CCol md={8}>
            <CFormInput type="text" id="userId" name="userId" label="User ID" value={FulltimerData.userId} onChange={handleChange} />
        </CCol>
        <CCol xs={12} className="text-center"> 
            <div className="d-inline-flex"> 
                <CButton color="primary" type="submit" className="me-2">Agree</CButton> 
                <CButton color="secondary" onClick={handleReturn}>Cancel</CButton>
            </div>
        </CCol>
    </CForm>
    
    
    )
}

export default FulltimerForm