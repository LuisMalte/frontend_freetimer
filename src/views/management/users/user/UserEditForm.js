import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormInput,
    CFormSelect,
    CButton
} from '@coreui/react'

const UserEditForm = () => {

    const{userId} = useParams();
    const [userData, setUserData] = useState({
        userName: '',
        userEmail: '',
        userPhone: '',
        cityId:0,
        userAddress: '',
        userPassword: ''
    });
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{

        const getUser = async () => {
            const response = await Axios({url:`http://localhost:3000/api/getuser/${userId}`});
            const user = response.data.data;
            setUserData (user)
        }

        const getDepartments = async () => {
            const response = await Axios({url:'http://localhost:3000/api/listdepartments'});
            const lstDepartments = Object.keys(response.data).map(i=> response.data[i]);
            setDepartments(lstDepartments.flat());
        }

        const getCities = async(departmentId)=>{
            const response = await Axios({url: `http://localhost:3000/api/listcities/${departmentId}`});
            const lstCities = Object.keys(response.data).map(i=> response.data[i]);
            setCities(lstCities.flat());
        }

        getUser();
        getDepartments();

        if(selectedDepartment !== "")
            getCities(selectedDepartment);

    },[selectedDepartment]);

    function handleSelectDepartments(event){
        setSelectedDepartment(event.target.value);
    }

    function handleSelectCities(event){
        setSelectedCity(event.target.value);
        setUserData({
            ...userData,
            cityId: event.target.value
        })
    }

    function handleChange(event){
        const {name, value} = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    function handleReturn(event){
        navigate('/users/user');
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const response = await Axios.put(`http://localhost:3000/api/updateuser/${userId}`, userData);
            console.log(response.data);
            navigate('/users/user');
        }
        catch (e){
            console.log(e);
        }
    }

    return(
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={12}>
                <CFormInput type="text" id="userName" name="userName" label="Name" value={userData.userName} onChange={handleChange} />
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="userEmail" name="userEmail" label="Email" value={userData.userEmail} onChange={handleChange} />
            </CCol>
            <CCol xs={4}>
                <CFormSelect id="departmentOptions" label = "Department" value={ selectedDepartment} onChange={handleSelectDepartments} >
                    <option value="">Select a department</option>
                    {departments.map(opcion =>(
                        <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                    ))}
                </CFormSelect>
            </CCol>
            <CCol xs={4}>
                <CFormSelect id="cityOptions" label = "City" value={ selectedCity} onChange={handleSelectCities} >
                    <option value="">Select a city</option>
                    {cities.map(opcion =>(
                        <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                    ))}
                </CFormSelect>
            </CCol>
            <CCol xs={4}>
                <CFormInput type="text" id="userPhone" name="userPhone" label="Phone" value={userData.userPhone} onChange={handleChange} />
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="userAddress" name="userAddress" label="Adress" value={userData.userAddress} onChange={handleChange} />
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="userPassword" name="userPassword" label="Password" value={userData.userPassword} onChange={handleChange} />
            </CCol>
            <CCol xs={6}>
                <CButton color="primary" type="submit" >Save</CButton>
            </CCol>
            <CCol xs={6}>
                <CButton color="secondary" onClick={handleReturn}>Cancel</CButton>
            </CCol>
        </CForm>
    )
}

export default UserEditForm