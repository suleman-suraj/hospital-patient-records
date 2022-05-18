import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import axios from 'axios';

class AddPatient extends Component{
    constructor(props){
        super(props);

        this.onSubmit= this.onSubmit.bind(this);

        this.onChangeFname= this.onChangeFname.bind(this);
        this.onChangeLname= this.onChangeLname.bind(this);
        this.onChangeGender= this.onChangeGender.bind(this);
        this.onChangeAge= this.onChangeAge.bind(this);
        this.onChangeEmail= this.onChangeEmail.bind(this);
        this.onChangeTemperature= this.onChangeTemperature.bind(this);
        this.onChangeWeight= this.onChangeWeight.bind(this);
        this.onChangeHeight= this.onChangeHeight.bind(this);
        this.onChangeAbout= this.onChangeAbout.bind(this);
        this.onChangeDiagnosis= this.onChangeDiagnosis.bind(this);
        this.onChangePrescription = this.onChangePrescription.bind(this);

        this.state = {
            fname: "",
            lname: "",
            gender: "",
            age: null,
            email: "",
            temperature: null,
            weight: null,
            height: null,
            about: "",
            diagnosis: "",
            prescription: ""
        }

    }

    onChangeFname(e){
        this.setState({
            fname: e.target.value
        })
    }

    onChangeLname(e){
        this.setState({
            lname: e.target.value
        })
    }

    onChangeGender(e){
        this.setState({
            gender: e.target.value
        })
    }

    onChangeAge(e){
        this.setState({
            age: e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    onChangeTemperature(e){
        this.setState({
            temperature: e.target.value
        })
    }

    onChangeWeight(e){
        this.setState({
            weight: e.target.value
        })
    }
    onChangeHeight(e){
        this.setState({
            height: e.target.value
        })
    }
    onChangeAbout(e){
        this.setState({
            about: e.target.value
        })
    }
    onChangeDiagnosis(e){
        this.setState({
            diagnosis: e.target.value
        })
    }
    onChangePrescription(e){
        this.setState({
            prescription: e.target.value
        })
    }

    //When the user clicks on submit button
    onSubmit(e){
        e.preventDefault();

        const patient={
            fname: this.state.fname,
            lname: this.state.lname,
            gender: this.state.gender,
            age: this.state.age,
            email: this.state.email,
            temperature: this.state.temperature,
            weight: this.state.weight,
            height: this.state.height,
            about: this.state.about,
            diagnosis: this.state.diagnosis,
            prescription: this.state.prescription
        }

        console.log(patient);

        axios
          .post(
            "https://apricot-rattlesnake-belt.cyclic.app/Patient/query/:id",
            patient
          )
          .then((res) => console.log(res.data));

        
        this.setState({
            username: '',
            message: "Patient Successfully Added!"
        })

        //window.location= '/allUsers';
    }

    render(){
        return(
            
            <div id="wrap" className="">
                <br/>
                <br/>
                <div className="container align-items-center">
                
                    <h1>Provide Details to Add Patient</h1><br/>

                    <form onSubmit={this.onSubmit}>

                        <div>First Name: <input className="form-control mr-sm-2" required value={this.state.fname} onChange={this.onChangeFname} type="text" placeholder="First name" /></div><br/>
                        <div>Last Name: <input className="form-control mr-sm-2" required value={this.state.lname} onChange={this.onChangeLname} type="text" placeholder="Last name" /></div><br/>
                        <div className="radio">Gender:<br/> <input className="" name="gender" value="Male" onChange={this.onChangeGender} type="radio" /> Male <input className="" name="gender" value="Female" onChange={this.onChangeGender} type="radio" /> Female </div><br/>
                        <div>Age: <input className="form-control mr-sm-2" required value={this.state.age} onChange={this.onChangeAge} type="text" placeholder="Age" /></div><br/>
                        <div>Email: <input className="form-control mr-sm-2" required value={this.state.email} onChange={this.onChangeEmail} type="email" placeholder="Email" /></div><br/>
                        <div>Temperature: <input className="form-control mr-sm-2" required value={this.state.temperature} onChange={this.onChangeTemperature} type="text" placeholder="Temperature in Celsius" /></div><br/>
                        <div>Weight: <input className="form-control mr-sm-2" required value={this.state.weight} onChange={this.onChangeWeight} type="text" placeholder="Weight in Kg" /></div><br/>
                        <div>Height: <input className="form-control mr-sm-2" required value={this.state.height} onChange={this.onChangeHeight} type="text" placeholder="Height in Metre" /></div><br/>
                        <div>Patient Problems: <input className="form-control mr-sm-2" required value={this.state.about} onChange={this.onChangeAbout} placeholder="Cough, Cold, etc" /></div><br/>
                        <div>Diagnosis: <input className="form-control mr-sm-2" required value={this.state.diagnosis} onChange={this.onChangeDiagnosis} placeholder="Malaria, Pneumonia, etc" /></div><br/>
                        <div>Prescription: <input className="form-control mr-sm-2" required value={this.state.prescription} onChange={this.onChangePrescription} placeholder="Amoxicillin as antibiotic, Generic Glucophage a diabetes drug, etc" /></div><br/>
                    
                    <div><button className="btn btn-success" type="submit">Add Patient</button></div>
                    
                    </form>

                    <h3 style={{color: "green"}} className="label label-success">{this.state.message}</h3>
                    
                </div> 
            </div>
        )
    }
}

export default AddPatient;
