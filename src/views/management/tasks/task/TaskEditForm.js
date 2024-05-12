import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const TaskEditForm = () => {

    const {taskId} = useParams();
    const [taskData, setTaskData] = useState({
        taskName: '',
        taskDescription: '',
        date: new Date(), 
        offer: '',
        address: '',
        taskTypeId: '',
       
    });
    const [tasks, setTask] = useState([]);
    const [selectedTask, setSelectedTask] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        const getTask = async () => {
            const response = await Axios({ url: `http://localhost:3000/api/gettask/${taskId}` });
            const task = response.data.data;
            setTaskData(task);

            setSelectedTask(task.taskTypeId);
          
        }

        const getTasksType = async () => {
            const response = await Axios({url:'http://localhost:3000/api/listTypes'});
            const lstTasks = Object.keys(response.data).map(i=> response.data[i]);
            setTask(lstTasks.flat());
        }

        getTask();
        getTasksType();
     

    }, [taskId]);

    function handleSelectTasks(event) {
        const taskId = event.target.value;
        setSelectedTask(taskId);
        setTaskData(prevState => ({
            ...prevState,
            taskTypeId: taskId
        }));
    }
    

    function handleChange(event) {
        const { name, value } = event.target;
        setTaskData({
            ...taskData,
            [name]: value
        });
    }

    function handleReturn(event) {
        navigate('/tasks/task');
    }

    const handleDateChange = (date) => {
        setTaskData(prevState => ({
            ...prevState,
            date: date
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await Axios.put(`http://localhost:3000/api/updateTask/${taskId}`, taskData);
            console.log(response.data);
            navigate('/tasks/task');
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={12}>
                <CFormInput type="text" id="taskName" name="taskName" label="Name" value={taskData.taskName} onChange={handleChange} />
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="taskDescription" name="taskDescription" label="Description" value={taskData.taskDescription} onChange={handleChange} />
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
                <CFormSelect id="taskType" label = "Task taypes" value={ selectedTask} onChange={handleSelectTasks} >
                    <option value="">Select task</option>
                    {tasks.map(opcion =>(
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

export default TaskEditForm;
