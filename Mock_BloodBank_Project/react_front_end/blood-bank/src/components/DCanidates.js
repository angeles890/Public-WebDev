import React, {useState, useEffect }  from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/dCanidatesActions';
import { Grid,TableContainer, Paper, Table,TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from '@material-ui/core';
import DCanidatesForm from './DCanidatesForm';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useToasts } from 'react-toast-notifications';


const styles = theme => ({
    root: {
        "& .MuiTableCell-head": { fontSize: "1.25rem"}
    },
    paper: {
        margin: theme.spacing(2), 
        padding: theme.spacing(2)
    }
})

const DCanidates = ({classes,...props}) => {
    //const [x,setX] = useState()
    const [currentId, setCurrentId] = useState(0);
    //For toast message
    const {addToast} = useToasts();

    useEffect(()=>{
        props.fetchAllDCanidates()
    },[]);

    const onDelete = (id) => {
        if(window.confirm("Are you sure you want to delete?"))
        {
            props.deleteDCanidates(id,()=> addToast('Deleted Successfully',{appearance:'info'}));
        }
    }

    return (
        <Paper className = {classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DCanidatesForm {...({currentId,setCurrentId})}  />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className = {classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dCanidatesList.map((record,index)=>{
                                        return (
                                            <TableRow key={index} hover>
                                                <TableCell>{record.fullName}</TableCell>
                                                <TableCell>{record.mobile}</TableCell>
                                                <TableCell>{record.bloodGroup}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup variant="text">
                                                        <Button><EditIcon color="primary" onClick={()=>{setCurrentId(record.id)}}></EditIcon></Button>   
                                                        <Button><DeleteIcon color="secondary" onClick={()=> {onDelete(record.id)}}></DeleteIcon></Button> 
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => {
    return{
        dCanidatesList: state.dCanidate.donorsList
    }    
}


const mapActionToProps ={
    fetchAllDCanidates: actions.fetchAll, 
    deleteDCanidates: actions.Delete
}


export default connect(mapStateToProps,mapActionToProps)(withStyles(styles) (DCanidates));