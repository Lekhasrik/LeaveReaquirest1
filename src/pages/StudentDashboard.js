// import React, { useState, useEffect } from 'react';
// import { Container, Typography } from '@mui/material';
// import LeaveForm from '../components/LeaveForm';
// import LeaveList from '../components/LeaveList';
// import { getStudentLeaves } from '../services/api';

// const StudentDashboard = () => {
//   const [leaves, setLeaves] = useState([]);
//   const studentId = '123'; // Hardcoded for demo (replace with actual student ID)

//   useEffect(() => {
//     const fetchLeaves = async () => {
//       try {
//         const { data } = await getStudentLeaves(studentId);
//         setLeaves(data);
//       } catch (error) {
//         console.error('Error fetching leaves:', error);
//       }
//     };
//     fetchLeaves();
//   }, [studentId]);

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" gutterBottom>Student Dashboard</Typography>
//       <LeaveForm studentId={studentId} />
//       <Typography variant="h5" gutterBottom style={{ marginTop: 20 }}>My Leave Applications</Typography>
//       <LeaveList leaves={leaves} />
//     </Container>
//   );
// };

// export default StudentDashboard;

import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import LeaveForm from '../components/LeaveForm';
import LeaveList from '../components/LeaveList';
import { getStudentLeaves } from '../services/api';

const StudentDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const studentId = '123'; // Replace with actual student ID

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        setLoading(true);
        const data = await getStudentLeaves(studentId);
        setLeaves(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching leaves:', err);
        setError('Failed to load leave data');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, [studentId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Student Dashboard</Typography>
      <LeaveForm studentId={studentId} />
      <Typography variant="h5" gutterBottom style={{ marginTop: 20 }}>
        My Leave Applications
      </Typography>
      <LeaveList leaves={leaves} />
    </Container>
  );
};

export default StudentDashboard;