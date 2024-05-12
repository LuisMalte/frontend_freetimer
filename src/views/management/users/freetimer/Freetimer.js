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
  cilPencil,
  cilUserPlus
}from '@coreui/icons';


const Freetimer = () => {

  const [freetimerData, setFreetimerData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getFreetimers = async() =>{
      const response = await Axios({
        url: 'http://localhost:3000/api/listfreetimers'
      });
      const lsFreetimers = Object.keys(response.data).map(i=> response.data[i]);
      setFreetimerData(lsFreetimers.flat());
      console.log(setFreetimerData)
    }

    getFreetimers();
  },[]);

  function handleCreateUser(event){
    navigate('/users/userform');
  }

  
  function handleEdit(freetimerId){
    
    navigate(`/users/freetimereditform/${freetimerId}`)
  }

   const handleDisable = async(freetimerId) =>{
    try{
      console.log("User ID:", freetimerId); // Agregar un console.log para depurar
      var url = "http://localhost:3000/api/disablefreetimer/"+freetimerId;
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
          <CTableHeaderCell>Id freetimer</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Phone</CTableHeaderCell>
            <CTableHeaderCell>City</CTableHeaderCell>
            <CTableHeaderCell>Address</CTableHeaderCell>
            <CTableHeaderCell>Category</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          
            {freetimerData.map((freetimer, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{freetimer.freetimerId}</CTableDataCell>
                <CTableDataCell>{freetimer.user.userName}</CTableDataCell>
                <CTableDataCell>{freetimer.user.userEmail}</CTableDataCell>
                <CTableDataCell>{freetimer.user.userPhone}</CTableDataCell>
                <CTableDataCell>{freetimer.user.cityId}</CTableDataCell>
                <CTableDataCell>{freetimer.user.userAddress}</CTableDataCell>
                <CTableDataCell>{freetimer.category.categoryName}</CTableDataCell>
                <CTableDataCell>
                  <CButton onClick={() => handleDisable(freetimer.freetimerId)} >
                     <CIcon icon={cilTrash}
                     size="xl" /> 
                  </CButton>
                  <CButton onClick={() => handleEdit(freetimer.freetimerId)} >
                    <CIcon icon={cilPencil} 
                    size="xl"/> 
                  </CButton>
                </CTableDataCell>
               
                </CTableRow>
              ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default Freetimer