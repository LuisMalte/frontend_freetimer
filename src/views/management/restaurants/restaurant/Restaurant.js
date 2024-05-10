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
  cilPencil
}from '@coreui/icons';


const Restaurant = () => {

  const [restaurantData, setRestaurantData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getRestaurants = async() =>{
      const response = await Axios({
        url: 'http://localhost:1337/api/listrestaurant'
      });
      const lstRestaurants = Object.keys(response.data).map(i=> response.data[i]);
      setRestaurantData(lstRestaurants.flat());
    }

    getRestaurants();
  },[]);

  function handleCreateRestaurant(event){
    navigate('/restaurants/restaurantform');
  }

  
  function handleEdit(restaurantId){
    navigate(`/restaurants/restauranteditform/${restaurantId}`)
  }

   const handleDisable = async(restaurantId) =>{
    try{
      console.log("Restaurant ID:", restaurantId); // Agregar un console.log para depurar
      var url = "http://localhost:1337/api/disablerestaurant/"+restaurantId;
      const response= await Axios.put(url)
      window.location.reload();

    }
    catch(e){
      console.log(e);
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'restaurantName'
    },
    {
      title: 'NIT',
      dataIndex: 'restaurantNit'
    },
    {
      title: 'Address',
      dataIndex: 'restaurantAddress'
    },
    {
      title: 'Phone',
      dataIndex: 'restaurantPhone'
    },
    {
      title: 'City',
      dataIndex: 'cityId'
    },
    {
      title: 'Options',
    }
  ]
  console.log("Restaurant Data:", restaurantData);


  return (
    <div>
      <CButton onClick={handleCreateRestaurant} > New Restaurant </CButton>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>NIT</CTableHeaderCell>
            <CTableHeaderCell>Address</CTableHeaderCell>
            <CTableHeaderCell>Phone</CTableHeaderCell>
            <CTableHeaderCell>City</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          
            {restaurantData.map((restaurant, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{restaurant.restaurantName}</CTableDataCell>
                <CTableDataCell>{restaurant.restaurantNit}</CTableDataCell>
                <CTableDataCell>{restaurant.restaurantAddress}</CTableDataCell>
                <CTableDataCell>{restaurant.restaurantPhone}</CTableDataCell>
                <CTableDataCell>{restaurant.cityId}</CTableDataCell>
                <CTableDataCell>
                  <CButton onClick={() => handleDisable(restaurant.restaurantId)} >
                     <CIcon icon={cilTrash} /> 
                  </CButton>
                  <CButton onClick={() => handleEdit(restaurant.restaurantId)} >
                    <CIcon icon={cilPencil} /> 
                  </CButton>
                </CTableDataCell>
                </CTableRow>
              ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default Restaurant
