import React,{useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Home() {
 const [data, setData] = useState([]);
 const navigate = useNavigate();

 useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
      fetch('http://localhost:8081/load')
        .then((response) => response.json())
        .then((result) => {
          setData(result);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

  const handleButtonClick = () => {
    navigate('/add');
  };

 const handleEditClick = (loadId) => {
     fetch(`http://localhost:8081/load/${loadId}`)
          .then((response) => response.json())
          .then((result) => {
            // Navigate to the 'add' page and pass the data as state
            navigate('/edit', { state: { data: result } });
          })
          .catch((error) => {
            console.error('Error fetching data for loadId:', loadId, error);
          });
  };

   const handleDeleteClick = (loadId) => {
      console.log(`Delete button clicked for loadId: ${loadId}`);
      fetch(`http://localhost:8081/load/${loadId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            console.log('Data deleted successfully');
            // Fetch updated data after deletion
            fetchData();
          } else {
            console.error('Failed to delete data:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
        });
    };

return (
        <>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
           Add Load
        </Button>
        <TableContainer component={Paper}>
           <Table>
             <TableHead>
                 <TableRow>
                    <TableCell>loadingPoint</TableCell>
                    <TableCell>unloadingPoint</TableCell>
                    <TableCell>productType</TableCell>
                    <TableCell>truckType</TableCell>
                    <TableCell>noOfTrucks</TableCell>
                    <TableCell>weight</TableCell>
                    <TableCell>comment</TableCell>
                    <TableCell>shipperId</TableCell>
                    <TableCell>date</TableCell>
                  </TableRow>
                </TableHead>
                <tbody>
                    {data.map((row) => (
                        <TableRow key={row.loadId}>
                        <TableCell>{row.loadingPoint}</TableCell>
                        <TableCell>{row.unloadingPoint}</TableCell>
                        <TableCell>{row.productType}</TableCell>
                        <TableCell>{row.truckType}</TableCell>
                        <TableCell>{row.noOfTrucks}</TableCell>
                        <TableCell>{row.weight}</TableCell>
                        <TableCell>{row.comment}</TableCell>
                        <TableCell>{row.shipperId}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>
                          <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleEditClick(row.loadId)}
                              >
                              Edit
                              </Button>
                              <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleDeleteClick(row.loadId)}
                                >
                                Delete
                                </Button>
                        </TableCell>
                        </TableRow>
                     ))}
                </tbody>
           </Table>
        </TableContainer>
        </>
  );
}