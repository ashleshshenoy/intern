import { Box, Button, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Delete({_id,data}) {

  const [open, setOpen] = useState(false);

  const [deleted, setDeleted] = useState([]);
  const [remain, setRemain] = useState([]);
  const [trash, setTrash] = useState([]);
  const navigate = useNavigate()
  const handleOpen = () =>{ setOpen(true);};
  const handleClose = () => setOpen(false);

  const handleDelete = ()=>{
    localStorage.setItem("Trash", JSON.stringify([...trash, ...deleted]));
    localStorage.setItem("Storage", JSON.stringify(remain));
    navigate('/');  
  }





  useEffect( () => {
    setRemain( data.filter((s) => s._id != _id));
    setDeleted(data.filter((s) => s._id == _id));
    const initalTrashValue = localStorage.getItem("Trash");
    if(initalTrashValue){
      setTrash(JSON.parse(initalTrashValue));
    }
  },[data])
 




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: "inherit",
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,

  display:'flex',
  flexDirection: 'column',
  
  gap:1,
  p: 4,
};
  return (
      <div>
           <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>are you sure you want to delete ? {_id}
        <div>
        <Button size="small"  variant='contained' onClick={handleClose} sx={{marginRight:2}}>No</Button>
        <Button size="small" variant='contained'color='error' onClick={handleDelete}>Yes</Button>
        </div>

        
        </Box>

      </Modal>
      <Button size="small"  color='error'  sx={{marginRight:1 , p:0.5}} variant="contained" onClick={handleOpen} ><DeleteIcon/>Delete</Button>

      </div>

  )
}
