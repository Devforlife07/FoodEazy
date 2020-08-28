import React, {useState, useEffect, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Toast} from "react-bootstrap"
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const Verify = (props) => {
  const[status,setStatus]= useState({val:0,msg:"",type:""});
  const {user} = useContext(AuthContext);
  const Alert = (msg, type) => {
    return (
      <Toast
        className={
         status.type === "red"
            ? "animate_animated animate_shakeX"
            : "animate_animated animate_fadeInRight animate_slow"
        }
        style={{ position: "fixed", right: "0", zIndex: "9899899" }}
      >
        <Toast.Header
          style={{
            background: status.type,
            color: "white",
            fontWeight: "bold"
          }}
        >
          <strong className="mr-auto">
            {type === "success" || "darkGreen" ? "Success" : "Fail"}
          </strong>
          {/* <small>2 seconds ago</small> */}
        </Toast.Header>
        <Toast.Body>{status.msg}</Toast.Body>
      </Toast>
    );
  };
  useEffect(()=>{
    if(!user)
    props.history.push("/")
    
  },[])
    const [code, setCode]  = useState(0);
    const [loading, setLoading] = useState(0);

    const handleSubmit = async(e)=>{
      e.preventDefault();
        const config = {
            headers: {
              "Content-Type": "application/json",
            }
        }
        setLoading(true);
        if(code==""){
          setLoading(false)
        alert("Please Enter Valid Code")}
        else{
        try{
        const res = await axios.post("/api/verify",{ code}, config);
        setLoading(false);
       document.write("<h1>Verified Successfully.You Are getting redirected to HomePage</h1>")
       setTimeout(()=>{
         window.location.href="/"
       },3000)
      }
        catch(e){
         console.log(e.response.data)
         setStatus({val:1,
        type:"red",
      msg:e.response.data})
      let id = setTimeout(()=>{
        setStatus({val:0,
        type:"",
      msg:""})
      clearTimeout(id)
      },[3000])
         setLoading(false)
        }}
    }

    const classes = useStyles();
    const handleChange = (e)=>{
        setCode(e.target.value);
    }
    const resend = async()=>{
      let id = user._id;
      let email = user.email;
      let name= user.name;
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
    }
    try{
      setLoading(true)
      const res = await axios.post("/api/resend",{id, email , name}, config);
      setStatus({val:1,msg:res.data,type:"darkGreen"})  
      let id = setTimeout(()=>{
        setStatus({val:0,msg:"",type:""})
      },3000)
      setLoading(false);
    
    }
      catch(e){
        setStatus({val:1,msg:e.response.data,type:"red"})  
        let id = setTimeout(()=>{
          setStatus({val:0,msg:"",type:""})
        },3000)
      }
      setLoading(false)
 
    }
    return (
      <>{loading==true?<div><img src={require("../images/Spinner.gif")}/></div>:<>
        {status.val==1?<Alert/>:""}
    
         <h4 style={{ margin: "2rem 3rem 3.5rem 3rem", fontFamily: "Mulish" }}>
        Email Verification <img src='https://image.flaticon.com/icons/svg/1271/1271380.svg' style={{height:'3rem'}} />
      </h4>
      <div className="parent1">
        <div className="parent2">
      <div className="forget1  animate__animated animate__backInUp" >
      <p>
          <span style={{ fontFamily: "Poppins", fontSize: "0.95rem" }}>
            {" "}
           <MailOutlineIcon /> Enter the 6-digit code we sent to your email address to verify your account
          </span>
        </p>
        <form className={classes.root} noValidate autoComplete="off" onSubmit = {handleSubmit} >
        <TextField id="outlined-basic" label="Code" variant="outlined" onChange={handleChange} style={{fontFamily:'Poppins'}}   inputProps={{ maxLength: 6 }}/>
        
        <Button variant="contained"  type="submit" color="primary"  style={{fontFamily: 'Mulish'}}> 
        Submit
      </Button>
      </form>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<MailOutlineIcon />}
        style={{ fontFamily:'Mulish'}}
        onClick = {resend}
      >
        Resend Code
      </Button>
      </div>
      </div>
      <div className= "verifyImage" style={{marginTop:'1.5rem'}}>
      <img src='https://image.freepik.com/free-vector/people-eating-their-food-smile_23-2148473328.jpg' alt='happy'
      style={{height: '25rem'}}
        />
      </div>
      </div>
    
      </>}
      </>
    )
}

export default Verify