import { link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import CustomButton from '/Controls/CustomButton'
import { useState, useContext } from 'react'
import Cookies from 'js-cookie'
import { UserContext } from '../App'
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    styled
} from '@mui/material'