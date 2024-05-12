import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
    CForm,
    CCol,
    CFormInput,
    CFormSelect,
    CButton
} from '@coreui/react'

const TaskForm = () => {
    const [taskData, setTaskData] = useState({
        taskName: '',
        taskDescription: '',
        date: new Date(),
        offer: '',
        address: '',
        taskTypeId: '',
        fulltimerId: '',
    });

    const [tasks, setTask] = useState([]);
    const [selectedTask, setSelectedTask] = useState('');
    const [fulltimers, setFulltimers] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const taskResponse = await Axios.get('http://localhost:3000/api/listTypes');
            const fulltimerResponse = await Axios.get('http://localhost:3000/api/listfulltimerid');
            
            const lstTasks = Object.keys(taskResponse.data).map(i => taskResponse.data[i]);
            setTask(lstTasks.flat());
            
            const lstFulltimers = fulltimerResponse.data.data.map(fulltimer => fulltimer.fulltimerId);
            setFulltimers(lstFulltimers);
        }

        fetchData();
    }, []);

    function handleSelectTasks(event){
        setSelectedTask(event.target.value);
        setTaskData({
            ...taskData,
            taskTypeId: event.target.value
        })
    }

    function handleSelectId(event) {
        const selectedId = event.target.value;
        setTaskData({
            ...taskData,
            fulltimerId: selectedId
        });
    }
    
    function handleChange(event){
        const { name, value } = event.target;
        setTaskData({
            ...taskData,
            [name]: value
        });
    }

    function handleReturn(event){
        navigate('/tasks/task');
    }

    const handleDateChange = (date) => {
        setTaskData(prevState => ({
            ...prevState,
            date: date
        }));
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const response = await Axios.post('http://localhost:3000/api/createTask', taskData);
            console.log(response.data);
            console.log(taskData)
            navigate('/tasks/task');
        } catch (e) {
            console.log(e);
        }
    }

    return(
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={12}>
                <CFormInput type="text" id="taskName" name="taskName" label="Name" value={taskData.taskName} onChange={handleChange} />
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="taskDescription" name="taskDescription" label="Task Description" value={taskData.taskDescription} onChange={handleChange} />
            </CCol>

            <CCol xs={12}>
                <label>Creation date:</label>
                <br />
                <DatePicker
                    selected={taskData.date}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                />
            </CCol>

            <CCol xs={4}>
                <CFormInput type="text" id="offer" name="offer" label="Offer" value={taskData.offer} onChange={handleChange} />
            </CCol>
            <CCol md={4}>
                <CFormInput type="text" id="address" name="address" label="Address" value={taskData.address} onChange={handleChange} />
            </CCol>

            <CCol xs={12}>
                <CFormSelect id="taskType" label="Task types" value={selectedTask} onChange={handleSelectTasks}>
                    <option value="">Select task</option>
                    {tasks.map(opcion => (
                        <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                    ))}
                </CFormSelect>
            </CCol>

            <CCol md={12}>
    <CFormSelect id="fulltimerId" label="Fulltimer ID" value={taskData.fulltimerId} onChange={handleSelectId}>
        <option value="">Select Fulltimer ID</option>
        {fulltimers.map(id => (
            <option key={id} value={id}>{id}</option>
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

export default TaskForm;
