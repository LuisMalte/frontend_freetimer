import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormSelect,
    CButton
} from '@coreui/react'

const FreetimerEditForm = () => {
    const { freetimerId } = useParams();
    const [freetimerData, setFreetimerData] = useState({
        categoryId: '',
        // Aquí puedes agregar más propiedades si es necesario
    });
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getFreetimer = async () => {
            const response = await Axios({ url: `http://localhost:3000/api/getfreetimer/${freetimerId}` });
            const freetimer = response.data.data;
            setFreetimerData(freetimer);
            setSelectedCategory(freetimer.categoryId);
        }

        const getCategory = async () => {
            const response = await Axios({ url: 'http://localhost:3000/api/listCategories' });
            const lstCategories = Object.keys(response.data).map(i => response.data[i]);
            setCategories(lstCategories.flat());
        }

        getFreetimer();
        getCategory();
    }, [freetimerId]);

    function handleSelectCategories(event) {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId);
        setFreetimerData({
            ...freetimerData,
            categoryId: categoryId
        })
    }

    function handleReturn(event) {
        navigate('/users/freetimer');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await Axios.put(`http://localhost:3000/api/updatefreetimer/${freetimerId}`, freetimerData);
            console.log(response.data);
            navigate('/users/freetimer');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol xs={12}>
                <CFormSelect id="categoryOptions" label="Category" value={selectedCategory} onChange={handleSelectCategories}>
                    <option value="">Select a category</option>
                    {categories.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </CFormSelect>
            </CCol>
            <CCol xs={6}>
                <CButton color="primary" type="submit">Save</CButton>
            </CCol>
            <CCol xs={6}>
                <CButton color="secondary" onClick={handleReturn}>Cancel</CButton>
            </CCol>
        </CForm>
    )
}

export default FreetimerEditForm;
