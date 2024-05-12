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
  cilPlus
}from '@coreui/icons';


const Task = () => {

  const [taskData, setTaskData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getUsers = async() =>{
      const response = await Axios({
        url: 'http://localhost:3000/api/listTasks'
      });
      const lstUsers = Object.keys(response.data).map(i=> response.data[i]);
      setTaskData(lstUsers.flat());
    }

    getUsers();
  },[]);

  function handleCreateTask(event){
    navigate('/tasks/taskform');
  }

  function handleEdit(taskId){
    navigate(`/tasks/taskeditform/${taskId}`)
  }

   const handleDisable = async(taskId) =>{
    try{
      console.log("task ID:", taskId); // Agregar un console.log para depurar
      var url = "http://localhost:3000/api/disableTask/"+taskId;
      const response= await Axios.put(url)
      window.location.reload();

    }
    catch(e){
      console.log(e);
    }
  }


  return (
    <div>
      <CButton onClick={handleCreateTask} style={{ display: 'flex', alignItems: 'center' }}>
          New task
          <span style={{ marginLeft: '5px', fontSize: '20px' }}>
              <div >
                  <CIcon icon={cilPlus} size="xl" />

              </div>
          </span>
      </CButton>

      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Task ID</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Description</CTableHeaderCell>
            <CTableHeaderCell>Date</CTableHeaderCell>
            <CTableHeaderCell>Offer</CTableHeaderCell>
            <CTableHeaderCell>Address</CTableHeaderCell>
            <CTableHeaderCell>Task Type</CTableHeaderCell>
            <CTableHeaderCell>fulltimer Id</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>

          </CTableRow>
        </CTableHead>
        <CTableBody>
          
            {taskData.map((task, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{task.taskId}</CTableDataCell>
                <CTableDataCell>{task.taskName}</CTableDataCell>
                <CTableDataCell>{task.taskDescription}</CTableDataCell>
                <CTableDataCell>{new Date(task.date).toISOString().split('T')[0]}</CTableDataCell>
                <CTableDataCell>{task.offer}</CTableDataCell>
                <CTableDataCell>{task.address}</CTableDataCell>
                <CTableDataCell>{task.taskType.taskTypeName}</CTableDataCell>
                <CTableDataCell>{task.fulltimerId}</CTableDataCell>

                <CTableDataCell>
                  <CButton onClick={() => handleDisable(task.taskId)} >
                     <CIcon icon={cilTrash}
                     size="xl" /> 
                  </CButton>
                  <CButton onClick={() => handleEdit(task.taskId)} >
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

export default Task