import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import CustomButton from './Controls/CustomButton'
import { useState, useContext } from 'react'
import Cookies from 'js-cookie'
import { UserContext } from '../App'
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    styled,
    IconButton
} from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { Avatar } from '@mui/material'

const Navbar=({ darkMode, toggleDarkMode })=> {
    const {user, isLoggedIn, setToken}= useContext(UserContext); // get user data

    const [mobileMenu, setMobileMenu]= useState({ left:false});

    // side bar toggle

    const toggleDrawer = (anchor, open) => (event) => {
        if(event.type==='keydown' && (event.key==='Tab' || event.key==='Shift')){
            return;
        }
        setMobileMenu({...mobileMenu, [anchor]:open})
    };

    const list=(anchor)=>{
        <Box
        sx={{ width:anchor==='top'||anchor==='bottom'?'auto':250}}
        role='presentation'
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Problem Set','Leader Board'].map(
                    (text,index)=>(
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    )
                )}
            </List>

        </Box>
    };

    // navig lnk

    const NavLink= styled(Typography)(({theme})=>({
        fontSize:'16px',
        color:'#fff',
        textDecoration:'none',
        marginRight:'20px',
        '&:hover':{
            color:'#fff'
        }
    }));

    const NavbarLinksBox= styled(Box)(({theme})=>({
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        gap:theme.spacing(3),
        [theme.breakpoints.down('md')]:{
            display:'none'
        }
    }));

    const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
		cursor: "pointer",
		display: "none",
		color: "#fff",
		marginRight: theme.spacing(2),
		[theme.breakpoints.down("md")]: {
			display: "block",
		},
	}));

    const NavbarContainer=styled(Box)(({theme})=>({
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        padding:theme.spacing(2,10),
        backgroundColor:'#3c005a',
        [theme.breakpoints.down('md')]:{
            padding:theme.spacing(2,3)
        }
    }));
    
    return(
        <NavbarContainer>
            <Box
                sx={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    gap:'2.5rem'
                }}
            >
                <Box sx={({display:'flex',alignItems:'center'})}>
                    <CustomMenuIcon onClick={toggleDrawer('left',true)} /> 
                    <Drawer
                       anchor='left'
                       open={mobileMenu['left']}
                       onClose={toggleDrawer('left',false)}
                    >
                        {list('left')}
                    </Drawer>
                    <Typography fontWeight='bold' component='h6' sx={{cursor:'pointer',color:'#fff',fontSize:'24px'}} >
                        <Link to='/' style={{textDecoration:'none', color:'#fff'}}>Code Kar</Link>
                    </Typography>
                </Box>

                <NavbarLinksBox>
                    <NavLink variant='body2'><Link to='/' style={{textDecoration:'none', color:'#fff'}}>Problem Set</Link></NavLink>
                    <NavLink variant='body2'><Link to='/leader-board' style={{textDecoration:'none', color:'#fff'}}>Leader Board</Link></NavLink>
                    {
                        user.role==='admin'&&<NavLink variant='body2'><Link to='/admin/add-problem' style={{textDecoration:'none', color:'#fff'}}>Add Problem</Link></NavLink>
                    }
                </NavbarLinksBox>
            </Box>

            {
                isLoggedIn ?
                <Box
                    sx={{
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        gap:'1rem'
                    }}
                >
                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                        <Avatar sx={{ width: 40, height: 40 }}>{user.name[0]}</Avatar>
                    </Link>
                    <NavLink variant='body2'>{user.name}</NavLink>
                    <IconButton color="inherit" onClick={toggleDarkMode} sx={{ ml: 1 }}>
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <Box onClick={()=>{
                        Cookies.remove('token');
                        setToken('');
                        window.location.href='/login';
                    }}
                    >
                        <CustomButton
                            backgroundColor='#fff'
                            color='#0f1b4c'
                            buttonText='Logout'
                        />
                    </Box>
                </Box>
                :
                <Box
                   sx={{
                       display:'flex',
                       alignItems:'center',
                       justifyContent:'center',
                       gap:'1rem'
                    }}
                >
                   <NavLink variant='body2'><Link to='/login' style={{textDecoration:'none', color:'#fff'}}>Login</Link></NavLink>
                   <Link to='/signup' style={{textDecoration:'none'}}>
                       <CustomButton
                           backgroundColor='#fff'
                           color='#0f1b4c'
                           buttonText='Sign Up'
                        />
                    </Link>
                </Box>
            }
        </NavbarContainer>
    );
    
};

export default Navbar;