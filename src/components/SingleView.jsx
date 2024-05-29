import { ContactsOutlined, Height } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, Modal, TextField, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Delete from './Delete'
import PushPinIcon from '@mui/icons-material/PushPin';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Update from './Update'


export default function SingleView() {

  
  const { id } = useParams();
  var st;
  const [data, setData] = useState([]);
  const [single, setSingle] = useState([]);

  const navigate = useNavigate()

  useEffect( ()  => {
  
    setData(JSON.parse(localStorage.getItem("Storage")));
  }, []); 


  useEffect( () => {
    setSingle( data.filter((s) => s._id == id));
  },[data])
  console.log(single)


  const style = {
    bgcolor: 'background.paper',
    display:'flex',
    mt:4,
    flexDirection: 'column',
    p: 4,
  };



  const handlePin = (e) => {
    const updated = {
      ...single[0],
      isPinned: !single[0].isPinned,
    }
    const index = data.indexOf(single[0]);
    data.splice(index, 1, updated);
    localStorage.setItem("Storage", JSON.stringify(data));
    setSingle([updated])
    
  
  };


  return (


      
    <div style={{backgroundColor: "white", minHeight: "100vh"}}>

    
      <Button  onClick={()=>navigate("/")} > <ArrowBackIcon/></Button>

      { single.map((value,i)=>{

        return(
          <Card sx={style}>
          <CardContent>
            <Typography gutterBottom variant="h2" component="div">
              {value.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Location: {value.location }
            </Typography>
            <Typography gutterBottom variant="h5" component="div" sx={{color:"green"}}>
              Budget: {value.budget }
            </Typography>
            <Typography  sx={{fontSize: 24, marginTop:5}} >
              Description:
            </Typography>
            <Typography sx={{fontSize: 24, marginTop:1}} color="text.secondary">
             
              {value.desc}
            </Typography>
            <Typography  sx={{fontSize: 24, marginTop:5}} >
              Must do/visit :
            </Typography>
            <Typography sx={{fontSize: 20}} color="text.secondary">
             <ol >
             {value.todo.split(",").map((value,i)=>{
                return <li>{value}</li> 
              })}
             </ol>
              
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" sx={{marginRight:1 , p:0.5}} variant="contained"  onClick={handlePin}><PushPinIcon/> {(value.isPinned)?"Unpin" :"Pin"} </Button>
            {/* <Button size="small" variant='outlined' color='error'>delete</Button> */}
            <Update  data={data} single={single}  _id={value._id}  setSingle={setSingle}/>
            <Delete data={data} _id={value._id}/>
          </CardActions>
          </Card>
        )

      })
       
   
      }
    </div>



  );
}
