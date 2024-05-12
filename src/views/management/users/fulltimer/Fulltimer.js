import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react'

import Axios from 'axios';
import {
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  
  
} from '@coreui/react';

import{
  cilTrash,  
}from '@coreui/icons';


const Fulltimer = () => {

  const [fulltimerData, setFulltimerData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getFulltimers = async() =>{
      const response = await Axios({
        url: 'http://localhost:3000/api/listfulltimer'
      });
      const lsFreetimers = Object.keys(response.data).map(i=> response.data[i]);
      setFulltimerData(lsFreetimers.flat());
      console.log(setFulltimerData)
    }

    getFulltimers();
  },[]);

   const handleDisable = async(fulltimerId) =>{
    try{
      console.log("Fulltimer ID:", fulltimerId); 
      var url = "http://localhost:3000/api/disablefulltimer/"+fulltimerId;
      const response= await Axios.put(url)
      window.location.reload();

    }
    catch(e){
      console.log(e);
    }
  }




  return (
    <div>
      <CTable>
        <CTableHead>
          <CTableRow>
          <CTableHeaderCell>Id FullTimer</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Phone</CTableHeaderCell>
            <CTableHeaderCell>City</CTableHeaderCell>
            <CTableHeaderCell>Address</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          
            {fulltimerData.map((fulltimer, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{fulltimer.fulltimerId}</CTableDataCell>
                <CTableDataCell>{fulltimer.user.userName}</CTableDataCell>
                <CTableDataCell>{fulltimer.user.userEmail}</CTableDataCell>
                <CTableDataCell>{fulltimer.user.userPhone}</CTableDataCell>
                <CTableDataCell>{fulltimer.user.cityId}</CTableDataCell>
                <CTableDataCell>{fulltimer.user.userAddress}</CTableDataCell>
                <CTableDataCell>
                  <CButton onClick={() => handleDisable(fulltimer.fulltimerId)} >
                     <CIcon icon={cilTrash}
                     size="lg" /> 
                  </CButton>
                </CTableDataCell>
               
                </CTableRow>
              ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default Fulltimer