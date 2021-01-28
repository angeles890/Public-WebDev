import React, {useState, useRef, useEffect}  from 'react';
import {Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText} from "@material-ui/core";
import useForm from './useForm';
import { connect } from 'react-redux';
import * as actions from '../actions/dCanidatesActions';
import { useToasts } from 'react-toast-notifications';


const styles = (theme) => ({
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1), 
        minWidth: 230
        },
    }, 
    formControl: {
        margin: theme.spacing(1), 
        minWidth: 230
    }, 
    sm: {
        margin: theme.spacing(1), 
        minWidth: 230
    }
    
})


//Instatiating object to pass as initital value for state variables
const initalFieldValues = { 
    fullName: '', 
    mobile: '', 
    email: '', 
    age: '', 
    bloodGroup: '', 
    address: ''
}

const DCanidatesForm = ({classes, ...props}) =>{
    //For toast message
    const {addToast} = useToasts();

    
    //Form Validation
    //Whole form validation: validate()
    //Single Control Validation: validate({fullName: 'jenny'})
    const validate = (fieldValues = values) => {
        //Creates temp object
        let temp = {...errors}
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName != "" ? "": "Full Name is Required"
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile ? "" : "Mobile Phone is Required"
        if ('bloodGroup' in fieldValues)
            temp.bloodGroup = fieldValues.bloodGroup ? "" : "Blood Group is Required"
        // email is optional, it must be an empty string or a valid email format
        if('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email)? "" : "Email is Not valid"
        
        setErrors({
            ...temp
        });
        if(fieldValues == values)
            //Creates an arrary of temp values, and cycle through each
            //If all of them are empty string it will return TRUE else FALSE
            return Object.values(temp).every(x=> x== "");
    }


    //initate state to store and track values in state variable
    //useForm is used to house common functions
    //Pass in validate() to support real time form validation
    const {values, setValues, errors, setErrors, handleInputChange, resetForm} =  useForm(initalFieldValues,validate, props.setCurrentId);


    //Handles label alignment for ddl
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, [])

    //Will handle POST request
    const handleSubmit = (e) => {
        e.preventDefault(); 
        if(validate())
        {
            const onSuccess = () => {
                resetForm();
                addToast("Submitted Succesfully",{appearance:'success'});
            }
            if(props.currentId == 0)
            {
                //currentId == 0, so create new record
                props.createDCanidate(values,onSuccess);
            }
            else
            {
                //currentID !=0, so lets update record
                props.updateDCanidate(props.currentId, values,onSuccess);
            }
            
            
        }        
    }

    //will fire off whenever a new id is passed into the component
    useEffect(()=>{        
        if(props.currentId != 0)
        {
            setValues({
                ...props.dCanidatesList.find(x => x.id == props.currentId)
            });
            setErrors({});
        }
    },[props.currentId])

    return(
       <form autoComplete="off" noValidate className = {classes.root} onSubmit={handleSubmit}>
           <Grid container>
                <Grid item xs={6}>
                    <TextField name="fullName" variant="outlined" label="Full Name" value = {values.fullName} 
                        onChange= {handleInputChange} {...(errors.fullName && {error:true, helperText: errors.fullName})}>
                    </TextField>
                    <TextField name="email" variant="outlined" label="Email" value = {values.email} 
                        onChange = {handleInputChange} {...(errors.email && {error:true, helperText: errors.email})} >
                    </TextField>
                    <FormControl variant="outlined" className = {classes.formControl} {...(errors.bloodGroup && {error:true})}>
                        <InputLabel ref = {inputLabel}>Blood Group</InputLabel>
                        <Select
                            name="bloodGroup"
                            value = {values.bloodGroup}
                            onChange = {handleInputChange}
                            labelWidth = {labelWidth}
                        >
                            <MenuItem value="">Select Blood Group</MenuItem>
                            <MenuItem value="A+">A+</MenuItem>
                            <MenuItem value="A-">A-</MenuItem>
                            <MenuItem value="B+">B+</MenuItem>
                            <MenuItem value="B-">B-</MenuItem>
                            <MenuItem value="AB+">AB+</MenuItem>
                            <MenuItem value="AB-">AB-</MenuItem>
                            <MenuItem value="O+">O+</MenuItem>
                            <MenuItem value="O-">O-</MenuItem>
                        </Select>
                        {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText> }
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField name="mobile" variant="outlined" label="Phone Number" value = {values.mobile} 
                        onChange = {handleInputChange} {...(errors.mobile && {error:true, helperText: errors.mobile})}>
                    </TextField>
                    <TextField name="age" variant="outlined" label="Age" value = {values.age} onChange = {handleInputChange}></TextField>
                    <TextField name="address" variant="outlined" label="Address" value = {values.address} onChange = {handleInputChange}></TextField>
                    <div>
                        <Button variant="contained" color="primary" type="submit" className = {classes.sm}>Submit </Button>
                        <Button variant="contained" className = {classes.sm} onClick={resetForm} >Reset</Button>
                    </div>
                </Grid>
           </Grid>
       </form>
    );
}


const mapStateToProps = state => {
    return{
        dCanidatesList: state.dCanidate.donorsList
    }    
}


const mapActionToProps ={
    createDCanidate: actions.create, 
    updateDCanidate: actions.update
}

export default connect(mapStateToProps, mapActionToProps) (withStyles(styles) (DCanidatesForm));