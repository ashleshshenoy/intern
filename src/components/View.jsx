import { Box, Button, Card, CardActions, CardContent, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Delete from './Delete';
import SingleView from './SingleView';
import Update from './Update';

export default function View({data, setData, isDeleted}) {



  const navigate = useNavigate();

const card = data .map((value)=>{
  return (
<Box sx={{ minWidth: 300 , maxWidth: 300, mb: 2}} >
  <Card variant="outlined" >
  
  <React.Fragment>
  <CardContent>
    <Typography variant="h5" component="div" noWrap>
      {value.name}
    </Typography>
    <Typography sx={{ mb: 1.5 }} color="text.secondary">
   { value.location}
    </Typography>
    <Typography variant="body2" noWrap>

      {value.desc}  
    </Typography>
  </CardContent>
  <CardActions>
    { !isDeleted && <Button size="small"  onClick={()=>{ navigate("/viewOne/"+ value._id)}} >Learn More</Button>}
  </CardActions>
</React.Fragment>
  
  
  </Card>
</Box>
  )
 
})



  return (
    <div style={{display : "flex", gap : "1rem", flexWrap:"wrap"}}>
      {card}
    </div>
  )
}
