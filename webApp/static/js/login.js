const Form = ReactBootstrap.Form;
const Button = ReactBootstrap.Button;
const Image = ReactBootstrap.Image;
const Alert = ReactBootstrap.Alert;
const {TextField,Box,IconButton,InputLabel,InputAdornment,Visibility,VisibilityOff,Input,Checkbox,FormControlLabel,Icon,Grid,Select,MenuItem,FormControl,makeStyles,spacing} = MaterialUI;
const Button_MUI = MaterialUI.Button;
const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
    }
  }));

class Sign_In_Form extends React.Component{
    

    constructor(props){
        super(props);
        
    }
    render(){
        return (
                <div id="" class="jumbotron my-auto">
                    <Box mb={2}>
                        <Grid container spacing={2} justify="flex-start" alignItems="flex-start">
                            <Grid item xl={4} xs={6}>
                            <Button
                                variant="outline-primary" className="rounded-pill " 
                                onClick={()=>{ this.props.logInFormCaller()}}
                            >
                                Return to Login
                            </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid
                        container
                        direction="row"
                        spacing={2}
                        justify="center"
                        alignItems="baseline"
                    >
                        <Grid item xl={6} xs={6}>
                            <TextField id="outlined-full-width" label="Nome" variant="outlined" required fullWidth>

                            </TextField>
                        </Grid>
                        <Grid item xl={6} xs={6}>
                            <TextField id="outlined-full-width" label="Cognome" variant="outlined" required fullWidth>

                            </TextField>
                        </Grid>
                        
                        <Grid item xl={6} xs={6}>
                            <TextField id="outlined-full-width" label="Indirizzo Email" variant="outlined" required fullWidth>

                            </TextField>
                        </Grid>

                        <Grid item xl={6} xs={6}>
                            <TextField id="outlined-full-width" type="password" label="Password" variant="outlined" required fullWidth>

                            </TextField>
                        </Grid>
                    </Grid>
                    <Box mt={1}>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="baseline"
                            spacing={2}
                        >
                            <Grid mt={2} item xl={8} xs={8} spacing={2}>
                                <FormControl variant="outlined" style={{minWidth: 200}}>
                                    <InputLabel id="demo-simple-select-outlined-label">Tipo Operatore</InputLabel>
                                    <Select autoWidth
                                        labelId="tipo-operatore-label"
                                        id="demo-simple-select-outlined"
                                        label="Tipo Utente"
                                        >
                                        <MenuItem value={'10'}>Operatore Semplice</MenuItem>
                                        <MenuItem value={20}>Operatore</MenuItem>
                                        <MenuItem value={30}>Esterno</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xl={8} xs={8}>
                            <TextField id="outlined-full-width" label="Telefono" variant="outlined" required fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start">+39</InputAdornment>,
                                }}>

                            </TextField>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mt={3}>
                        <Grid container item direction="row" justify="flex-end" alignItems="baseline">
                            <Button_MUI variant="contained" color="primary" fullWidth>
                                Registrati
                            </Button_MUI>
                        </Grid>
                    </Box>
                </div>
                );
    }
}

class Login_Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password : "",
            rememberme: false,
            formErrors : {
                email_error:'',
                password_error:' '
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.tryLogIn = this.tryLogIn.bind(this);
        }

    handleChange(event,name){
        const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let formErrors = this.state.formErrors;
        let {value} = event.target;
        switch(name){
            case "email":
                formErrors.email_error = value.match(email_regex) 
                    ? 'Ok'
                    : 'Inserire una mail corretta';
                break;
            case "password":
                formErrors.password = value.length <=0
                    ? "campo password vuoto"
                    : ""
                break;
            case "rememberme":
                console.log(event.target.checked);
                value = event.target.checked;
            default:
                break;
        }
        this.setState({formErrors, [name]: value});
    }

    tryLogIn(){
        event.preventDefault();
        axios.post('/', {
            email : this.state.email,
            password: this.state.password,
            rememberME : this.state.rememberme
          })
          .then((response) => {
            if (response.data["operationCode"] != 200){
                console.log(response.data["operationCode"]);
                this.props.loginCheck(true);
            }else{
                console.log("LOGGED!");
            }
          })
          .catch((error) => {
            console.log(error);
          });
          
    }
    
   

    render(){
        const {disableButtonLogIn} = this.props;
        const {email,password} = this.state;
        let {formErrors} = this.state.formErrors;
        // const messageErrorEmail = email.length >= 0 && email.length<5 
        //                             ? (<Form.Control.Feedback type="invalid" className="d-block">Lunghezza campo non valida</Form.Control.Feedback>)
        //                             : (<Form.Control.Feedback type="valid" className="d-block" >OK.</Form.Control.Feedback>);
        return  (<Form onSubmit = {this.tryLogIn}>
                    <Form.Group mb="4" controlId="formBasicEmail">
                        {/* <Form.Label for = "validationCustomEmail">Email </Form.Label>
                        <Form.Control required id="validationCustomEmail" name="email" type="email" placeholder="Enter email" onChange={this.handleChange}
                            isvalid={email.length >= 0 && email.length >6}
                            isinvalid = {email.length >=0 && email.length <=6}
                            className ="rounded-pill"
                        />
                        {messageErrorEmail} */}
                        <TextField id="standard-basic"  label="E-Mail" fullWidth={true} onChange={e => this.handleChange(e,'email')} helperText={this.state.formErrors.email_error} autoComplete></TextField>
                    </Form.Group>
                    
                    {/* <Form.Group controlId="formBasicPassword">
                        {/* <Form.Label>Password</Form.Label>
                        <Form.Control required value={password} onChange={e => this.handleChange(e,'password')} type="password" placeholder="Password" className="rounded-pill"/>
                        }*/} 
                    
                    <TextField id="standard-basic" type={'password'} label="Password" fullWidth={true} onChange={e => this.handleChange(e,'password')} helperText={this.state.formErrors.email_error} autoComplete></TextField>
                    
                    <FormControlLabel
                        control={<Checkbox checked={this.state.rememberme} onChange={e => this.handleChange(e,'rememberme')} name="rememberme" />}
                        label="Ricordami"
                    />
                    {/* </Form.Group>
                    <Checkbox
                        defaultChecked
                        color="primary"
                        label="Ricordami"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        checked={this.state.rememberme} onChange={this.handleChange} 
                    /> 
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check name="rememberme" type="checkbox" label="Ricordami." checked={} onChange={this.handleChange} />
                    </Form.Group> */}
                    <Button variant="primary" type="submit" size="lg" block className="rounded-pill" disabled={disableButtonLogIn ? 'true' : ''}>Entra</Button>
                    

                </Form>);
                
    }
}

class Login extends React.Component{
    constructor() {
        super();
        

        this.state = {
          nrlUpdating : false,
          signUpClicked:false
        }
    }

    handleSignInClick = () => {
        console.log(this.state.signUpClicked)
        this.setState({
            signUpClicked: !this.state.signUpClicked
          });
      }

    loginCheck = (result) => {
        this.setState({loginFailed : result});
    }  

    nrlChangeState = (state) => {
        this.setState({nrlUpdating : state});
    }
    
    render(){
        const nrlUpdating = this.state.nrlUpdating;
        return (    
                <div id="log_in" class="h-100"> 
                    <div class="row align-items-center h-100">
                        {   this.state.signUpClicked
                            ?   <div class="col-xl-6 col-sm-5 col-lg-4 col-md-4 mx-auto">
                                    <Sign_In_Form logInFormCaller={this.handleSignInClick} >
                                        
                                    </Sign_In_Form>
                                </div>

                            :    <div class="col-xl-4 col-sm-4 col-lg-4 col-md-4 mx-auto">
                                        <NrlComponent nrlChangeState={this.nrlChangeState}></NrlComponent>
                                        <div class="border rounded-top jumbotron ">
                                            <Login_Form loginCheck={this.loginCheck} disableButtonLogIn={nrlUpdating}></Login_Form> 
                                            <Button variant="outline-primary" className="rounded-pill mt-4" size="lg" block onClick={this.handleSignInClick} disabled={nrlUpdating ? 'true' : '' } >Registrati</Button>
                                        </div>
                                        {
                                            this.state.loginFailed ?
                                            <Alert variant="warning" className=" w-20 alert-dismissible fade show" >
                                                Accesso non riuscito, controllare email o password!
                                            </Alert> 
                                            : <div></div>
                                        }            
                                </div> 
                              
                        }
                    </div>
                </div>
        );
    }
}

ReactDOM.render(<Login></Login>,document.getElementById("root"));