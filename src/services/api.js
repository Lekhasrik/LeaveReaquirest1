import axios from 'axios';

const API_URL = 'http://localhost:5000/api/leaves';

export const applyLeave = (leaveData) => axios.post(API_URL, leaveData);
export const getStudentLeaves = (studentId) => axios.get(`${API_URL}/student/${studentId}`);
// export const getStudentLeaves = async (studentId) => {
//     try {
//       const response = await axios.get(`${API_URL}/student/${studentId}`);
//       return response.data;
//     } catch (error) {
//       console.error('API Error:', error.response?.data || error.message);
//       throw error;
//     }
//   };
export const getAllLeaves = () => axios.get(API_URL);
export const updateLeaveStatus = (leaveId, statusData) => axios.put(`${API_URL}/${leaveId}`, statusData);