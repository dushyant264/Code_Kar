import { useEffect, useState, useContext } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from "@mui/material/TablePagination"
import Paper from '@mui/material/Paper'
import { UserContext } from '../App'
import { useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'
import axios from 'axios'

const StyledTableCell= styled(TableCell)(({theme})=>({
    [`&.${tableCellClasses.head}`]:{
        backgroundColor:theme.palette.common.black,
        color:theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]:{
        fontSize:14
    }
}))

const StyledtableRow=styled(TableRow)(({theme})=>({
    '&:nth-of-type(odd)':{
        backgroundColor:theme.palette.action.hover
    },
    '&:last-child td,&:last-child th':{ // last border hidden
        border:0
    }
}))

const LeaderBoard=()=>{
    // set states
    const [rows, setRows]= useState([])
    const [loader, setLoader]= useState(false)
    const {token, isLoggedIn}= useContext(UserContext)
    const [pg,setpg]= useState(0)
    const [rpg, setrpg]= useState(10)
    const navigate= useNavigate()

    // not logged in
    useEffect(()=>{
        if(!isLoggedIn){
            navigate('/login')
        }
    },[isLoggedIn, navigate])

    // fetch users rankings
    useEffect(()=>{
        (
            async()=>{
                try {
                    setLoader(true)
                    const RANKINGS_URL= 'https://code-kar.onrender.com/api/leaderboard'
                    const result= await axios.get(RANKINGS_URL,{ headers:{ Authorization: `Bearer ${token}`}})
                    if(result.status===200){
                        setRows(result.data)
                    }
                    setLoader(false)
                } catch (error) {
                    console.log(error)
                    setLoader(false)
                }
            }
        )()
    },[])

    // handle page change
    const handleChangePage=(event, newPage)=>{
        setpg(newPage)
    }

    // handle rows per page change
    const handleChangeRowsPerPage=(event)=>{
        setrpg(parseInt(event.target.value, 10))
        setpg(0)
    }

    return (
        <TableContainer component={Paper} sx={{m:'auto', width:'1200px', maxWidth:'90%', mt:'30px'}}>
            <Table sx={{minWidth:650}} arial-label='simple table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Rank</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Score</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(pg*rpg, pg*rpg+rpg).map((row)=>(
                        <StyledtableRow
                           key={row.rank}
                           sx={{'&:last-child td, &:last-child th':{border:0}}}
                        >
                            <StyledTableCell>{row.rank}</StyledTableCell>
                            <StyledTableCell>{row.name}</StyledTableCell>
                            <StyledTableCell>{row.score}</StyledTableCell>
                        </StyledtableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 50, 100]}
                component='div'
                count={rows.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            { loader &&
               <Box sx={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>
                  <ColorRing
                      visible={true}
                      height='80'
                      width='80'
                      ariaLabel='blocks-loading'
                      wrapperStyle={{}}
                      wrapperClass='blocks-wrapper'
                      colors={['#55AAFF', '#55AAFF', '#55AAFF', '#55AAFF', '#55AAFF']}
                  />
               </Box>
            }
        </TableContainer>
    )
}

export default LeaderBoard