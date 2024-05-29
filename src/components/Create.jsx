import { Height } from '@mui/icons-material'
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React,{useState, useEffect} from 'react'



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,

  display:'flex',
  flexDirection: 'column',
  p: 4,
};

export default function Create({data, setData}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);








  const [destination, setDestination] = useState({});
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleUpdate = (e) => {
    setDestination({
      ...destination,
      [e.target.name] : e.target.value
    })
  };

  const handleCreate = () => {
    if(destination.name == null  || destination.name == "") setErrorMessage("please specify a destination name");
    else if(destination.location == null || destination.location == "") setErrorMessage("please specify a location");
    else if(destination.budget == null ) setErrorMessage("please specify a bugdet");
    else if(destination.desc == null || destination.desc == '') setErrorMessage("please specify a description");
    else {


      const _id = data.length === 0 ? 1 : data[data.length - 1]._id + 1;
      const details = {
        _id,
        ...destination,
        isPinned: false
      }
      const updatedValue = [ ...data, details ];
      setData(updatedValue);

      // Store the updated value in local storage
      localStorage.setItem("Storage", JSON.stringify(updatedValue));

      setDestination({});
      handleClose();
    }
    setTimeout(()=>{
      setErrorMessage("");

    },2000)
  }


  return (
    <div>
      <Button sx={{mb:5}} onClick={handleOpen} variant="contained">Add destination</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new Destination
          </Typography>
          <Typography id="modal-modal-title" sx={{color : "red"}}component="p">{errorMessage}</Typography>
          <TextField sx={{mb:2, mt : 3}} name="name" id="name" label="Name" variant="outlined" onChange={handleUpdate} />
          <TextField sx={{mb:2}} name="location" id="location" label="Locations" variant="outlined" onChange={handleUpdate} />
          <TextField sx={{mb:2}} name="budget" id="budget" label="budget" variant="outlined" type="number" onChange={handleUpdate}/>
          <TextField sx={{mb:2}} name="todo" id="todo" label="Must do/visit (seperate by comma)" variant="outlined"  multiline rows={4} onChange={handleUpdate}/>
          <TextField sx={{mb:2}} name="desc" id="desc" label="Description" variant="outlined"  multiline rows={4} onChange={handleUpdate}/>
          <Button variant='contained' onClick={handleCreate}>Create destination</Button>
        </Box>
      </Modal>
    </div>
  );
}
