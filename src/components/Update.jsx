import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React,{useState, useEffect} from 'react'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { json } from 'react-router-dom';



export default function Update({_id, data,setSingle, single}) {
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
  

  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const [selected, setSelected] = useState(single[0]);


  const handleOpen = () => {
    setSelected(single[0]);
    setOpen(true)};
  const handleClose = () =>setOpen(false)




  

  const handleChange = (e) => {
    setSelected({
      ...selected,
      [e.target.name] : e.target.value
    })
  };

  const handleUpdate = () => {
    if(selected.name == null  || selected.name == "") setErrorMessage("please specify a selected name");
    else if(selected.location == null || selected.location == "") setErrorMessage("please specify a location");
    else if(selected.budget == null ) setErrorMessage("please specify a bugdet");
    else if(selected.desc == null || selected.desc == '') setErrorMessage("please specify a description");
    else {

      const index = data.indexOf(single[0]);
      data.splice(index, 1, selected);
      localStorage.setItem("Storage", JSON.stringify(data));
      setSingle([selected]);
      
      
    
      handleClose();
    }
    setTimeout(()=>{
      setErrorMessage("");

    },2000)
  }

  return (
        <div>
      <Button size="small" onClick={handleOpen} variant="contained" sx={{marginRight:1 , p:0.5}} ><ModeEditOutlineIcon /> Edit</Button>

        
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            update
          </Typography>
          <Typography id="modal-modal-title" sx={{color : "red"}}component="p">{errorMessage}</Typography>
          <TextField sx={{mb:2, mt : 3}} name="name" id="name" label="Name" variant="outlined" onChange={handleChange} autoFocus={true} value={selected.name} />
          <TextField sx={{mb:2}} name="location" id="location" label="Locations" variant="outlined" onChange={handleChange} value={selected.location}/>
          <TextField sx={{mb:2}} name="budget" id="budget" label="budget" variant="outlined" type="number" onChange={handleChange} value={selected.budget}/>
          <TextField sx={{mb:2}} name="todo" id="todo" label="Must do/visit (seperate by comma)" variant="outlined"  value={selected.todo} multiline rows={4} onChange={handleChange}/>
          <TextField sx={{mb:2}} name="desc" id="desc" label="Description" variant="outlined"  multiline rows={4} onChange={handleChange} value={selected.desc}/>
          <Button variant='contained' onClick={handleUpdate}>Create destination</Button>
        </Box>
      </Modal>
    </div>

  )
}
