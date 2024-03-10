import React, { useState } from 'react';
import { TextField, Button, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Add() {
const navigate = useNavigate();
 const [formData, setFormData] = useState({
    loadingPoint: '',
    unloadingPoint: '',
    productType: '',
    truckType: '',
    noOfTrucks: 0,
    weight: 0,
    comment: '',
    shipperId: '',
    date: '',
  });

const handleChange = (event) => {
  const { id, value } = event.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [id]: value,
  }));
};
  const handleCancelClick = () => {
  navigate('/');
  }
  const handleButtonClick = async () => {
      try {
        const response = await fetch('http://localhost:8081/load', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Successful post, you may want to handle the response if needed
          console.log('Post successful');
          navigate('/');
        } else {
          // Handle error cases
          console.error('Post failed');
        }
      } catch (error) {
        console.error('Error while posting data:', error);
      }
    };
return (
    <Container>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Loading Point" id="loadingPoint" fullWidth required  value={formData.loadingPoint} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Unloading Point" id="unloadingPoint" fullWidth required value={formData.unloadingPoint} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Product Type" id="productType" fullWidth required value={formData.productType} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Truck Type" id="truckType" fullWidth required value={formData.truckType} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField type="number" label="Number of Trucks" id="noOfTrucks" fullWidth required value={formData.noOfTrucks} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField type="number" label="Weight" id="weight" fullWidth required value={formData.weight} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Comment" id="comment" fullWidth value={formData.comment} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Shipper ID" id="shipperId" fullWidth required value={formData.shipperId} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField type="date" label="Date" id="date" fullWidth required value={formData.date} onChange={handleChange}/>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" onClick={handleButtonClick}>
              Submit
            </Button>
            <Button type="cancel" variant="contained" color="secondary" onClick={handleCancelClick}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
);
}