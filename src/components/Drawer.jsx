import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Create from './Create';
import View from './View';
import AppsIcon from '@mui/icons-material/Apps';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteIcon from '@mui/icons-material/Delete';

const drawerWidth = 240;



function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [navState, setNavState] = React.useState("Destination");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  let initialValue;
  if (localStorage.getItem("Storage") === null) {
    initialValue = [];
  } else {
    initialValue = JSON.parse(localStorage.getItem("Storage"));
  }



  let initialtrashValues;
  if (localStorage.getItem("Trash") === null) {
    initialtrashValues = [];
  } else {
    initialtrashValues = JSON.parse(localStorage.getItem("Trash"));
  }




  const [value, setValue] = useState(initialValue);
  const [trashedValues, setTrashedValues] = useState(initialtrashValues);
  const[pinnedValues, setPinnedValues] = useState([]);



  useEffect( () => {
    setPinnedValues( value.filter((s) => s.isPinned ));
  },[value])


  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>

          <ListItem disablePadding onClick={()=>{setNavState("Destination")}} 
            sx={{backgroundColor: (navState == "Destination")?"#D3D3D3": "white" }}
          >
            <ListItemButton>
              <ListItemIcon>
            <AppsIcon/>
              </ListItemIcon>
              <ListItemText primary="All destinations"/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={()=>{setNavState("Pinned")}}
                      sx={{backgroundColor: (navState == "Pinned")?"#D3D3D3": "white" }}

          >
            <ListItemButton >
              <ListItemIcon>
          <PushPinIcon/>
              </ListItemIcon>
              <ListItemText primary="Pinned"/>
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <List>
      <ListItem  disablePadding onClick={()=>{setNavState("Trash")}}
                            sx={{backgroundColor: (navState == "Trash")?"#D3D3D3": "white" }}
                            >
            <ListItemButton>
              <ListItemIcon>
             <DeleteIcon/>
              </ListItemIcon>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
           {navState}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {
            navState == 'Destination' && <Create data={value} setData={setValue}/>
          }
          {
            navState == 'Destination' && <View data={value} setData={setValue} isDeleted={false}/>
          }
          {
            navState == 'Trash' && <View data={trashedValues} setData={setValue} isDeleted={true}/>
          }
          {
            navState == 'Pinned' && <View data={pinnedValues} setData={setValue} isDeleted={false}/>
          }
        

      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
