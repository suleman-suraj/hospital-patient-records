import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
//import { Nav} from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/style.css';
import axios from 'axios';

class SearchPatient extends Component{

    constructor(props){
        super(props);

        this.checkData= this.checkData.bind(this);
        this.checkBMI= this.checkBMI.bind(this);

        this.state = {
            patients: []
        }

    }

    checkBMI(patient){
        if( ((patient.weight)/(patient.height * patient.height)) <18.5){
          return(
              <span style={{color: "red"}}>Under Weight</span>
          )
        }
        else if( ((patient.weight)/(patient.height * patient.height)) >24.9){
          return(
              <span style={{color: "red"}}>Over Weight</span>
          )
      }
      else{
          return(
              <span style={{color: "green"}}>Normal</span>
          )
      }
    }

    componentDidMount() {


        axios
          .get(
            `https://apricot-rattlesnake-belt.cyclic.app/patient/query?name=${this.props.search}`
          )
          .then((response) => {
            this.setState({
              patients: response.data.data,
            });
          })
          .catch((error) => {
            console.log(error);
          });
    }

    checkData(){
        if((this.state.patients && this.state.patients.length === 0) || this.state.patients== null){
            //console.log(this.state.persons);
            return (
            <h1>No Patient Found</h1>)
            
        }else{
            //console.log(this.state.persons);
            return(
                <div>
            <h1>Search Details for '{this.props.search}'</h1><br/>

                <div className="table-responsive">

                    <table className="table">
                        <thead>
                            <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Email Id</th>
                            <th>Temperature (Celsius)</th>
                            <th>Weight (KG)</th>
                            <th>Height (Metre)</th>
                            <th>Problems</th>
                            <th>Dignosis</th>
                            <th>Prescription</th>
                            <th>BMI</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            { this.state.patients.map(patient =>
                                
                                <tr>
                                    <td>{patient.fname}</td>
                                    <td>{patient.lname}</td>
                                    <td>{patient.gender}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.email}</td>
                                    <td>{patient.temperature}</td>
                                    <td>{patient.weight}</td>
                                    <td>{patient.height}</td>
                                    <td>{patient.about}</td>
                                    <td>{patient.diagnosis}</td>
                                    <td>{patient.prescription}</td>
                                    <td>{((patient.weight)/(patient.height * patient.height)).toFixed(3)} ({this.checkBMI(patient)})</td>
                            </tr>)}

                        </tbody>
                    </table></div></div>)
        }
    }

    render(){
        return(
            
            <div id="wrap" className="">
                <br/>
                <br/>
                <div className="container align-items-center">
                    
                    {this.checkData()}
                   
                </div> 
            </div>
        )
    }
}

export default SearchPatient;
