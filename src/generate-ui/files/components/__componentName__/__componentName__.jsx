import React from "react"
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";


const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        width: 300,
    },
    margin: {
        height: theme.spacing(3),
    },
    OneForm:{
        marginTop:100
      },
}));

export default function <%= classify(componentName)%>(){
    
    const classes = useStyles();
    <% let view="" %>
        <% feilds.forEach(element => { %>
        
        <% if(element.type ==="TextField"){ %>
            <% view+=`<Grid item xs={12} sm={6} md={8} lg={12}><TextField  label="${element.properties.label}"variant="outlined" /></Grid>\n` %>        
        <% } else if(element.type ==="CheckBox"){%>
           <% view+=`<Grid item xs={12} sm={6} md={8} lg={12}><FormControlLabel
           control={
             <Checkbox   value="${element.properties.label}" />
           }
           label="${element.properties.label}"
         /></Grid>\n` %>     
        <% }else if(element.type ==="Radio"){ %>
           <% let t =`<Grid item xs={12} sm={6} md={8} lg={12}>` %>           
          <% t = t + `<FormControl component="fieldset" className={classes.formControl}>\n<FormLabel component="legend">Gender</FormLabel>\n<RadioGroup name="gender1" >`%>
          <% element.properties.options.forEach(e=>{t=t+`<FormControlLabel value="${e.label}" control={<Radio />} label="${e.label}" />`})%>
        <% t=t+`</RadioGroup>\n</FormControl>` %>
           <%t+=`</Grid>\n` %>   
           <% view+=t %>  
        <% }else if(element.type ==="Button"){ %>
            <% view+=`<Grid item xs={12} sm={6} md={8} lg={12}><Button /></Grid>\n` %>  
        <% }else if(element.type ==="Select"){ %>
            <%let opt=element.properties.options%>            
            <% let t=`<Grid item xs={12} sm={6} md={8} lg={12}><Select style={{width:"235px"}} variant="outlined">\n` %>                       
            <%opt.forEach(e=>{t+=`<MenuItem value= "${e.label}" >${e.label}</MenuItem>\n`})%>
            <% t+="</Select></Grid>\n" %>   
            <% view+=t %> 
            <%}%>


        <% }); %>


    return(
        <Container component="main">
        <form className={classes.form}>
                    <Grid container>
     <Grid item className={classes.OneForm}>
         <Grid container>
         <%=view%>
         </Grid>
     </Grid>
    </Grid>
    
    </form>
    </Container>
    );
}
