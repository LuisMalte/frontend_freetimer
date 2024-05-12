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

const FreetimerForm = () => {
    const{userId} = useParams();
    const [freetimeData, setFreetimeData] = useState({
        userId: userId,
        healthInsurance: '',
        categoryId: '',
    });
    
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [booleanOptions] = useState([true, false]); // Opciones booleanas
    const navigate = useNavigate();

    useEffect(()=>{
        const getCategory = async () => {
            const response = await Axios({url:'http://localhost:3000/api/listCategories'});
            const lstCategories = Object.keys(response.data).map(i=> response.data[i]);
            setCategories(lstCategories.flat());
            console.log(categories)
            console.log(selectedCategory)
        }

        getCategory();


    },[selectedCategory]);

    function handleSelectCategories(event){
        setSelectedCategory(event.target.value);
        setFreetimeData({
            ...freetimeData,
            categoryId:event.target.value
        })
    }

    function handleChange(event){
        const {name, value} = event.target;
        setFreetimeData({
            ...freetimeData,
            [name]: value
        });
    }

    function handleReturn(event){
        navigate('/users/freetimer');
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
               console.log(freetimeData)

            const response = await Axios.post('http://localhost:3000/api/createfreetimer', freetimeData);
            console.log(response.data);
            navigate('/users/freetimer');
        }
        catch (e){
            console.log(e);
        }
    }

    return(
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={12}>
                <CFormInput type="text" id="userId" name="userId" label="User ID" value={freetimeData.userId} onChange={handleChange} />
            </CCol>
            <CCol md={12}>
            <CFormSelect id="healthInsurance" name="healthInsurance" label="Health Insurance" value={freetimeData.healthInsurance} onChange={handleChange}>
                    <option value="">Select an option</option>
                    {booleanOptions.map(option => (
                        <option key={option} value={option}>{option.toString()}</option>
                    ))}
                </CFormSelect>
            </CCol>
            <CCol xs={12}>
                <CFormSelect id="category Options" label = "category Options" value={ selectedCategory} onChange={handleSelectCategories} >
                    <option value="">Select a category</option>
                    {categories.map(opcion =>(
                        <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                    ))}
                </CFormSelect>
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

export default FreetimerForm