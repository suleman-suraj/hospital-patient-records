import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
//import { Nav} from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/style.css'
import axios from 'axios';

var n=1;
var totalResults= 0;

class AllPatients extends Component{

    constructor(props){
        super(props);

        this.checkData= this.checkData.bind(this);
        this.nextPage= this.nextPage.bind(this);
        this.previousPage= this.previousPage.bind(this);

        this.state = {
            patients: [],
            totalResult: 0,
            message: ""
        }
    }


    componentDidMount() {

        axios
          .get("https://misty-tan-overshirt.cyclic.app/patient/pages")
          .then((response) => {
            totalResults = response.data.totalResult;
            this.setState({
              totalResult: response.data.totalResult,
            });
          })
          .catch((error) => {
            console.log(error);
          });



          axios
            .get("https://misty-tan-overshirt.cyclic.app/patient/pages?page=1")
            .then((response) => {
              this.setState({
                patients: response.data.data,
              });
            })
            .catch((error) => {
              console.log(error);
            });
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

    nextPage() {

        if(n < Math.ceil(totalResults/10)){
        n++;
        
        this.setState({
            message: ""
        })
            }
        else{
            this.setState({
                message: "Last Page Reached!"
            })
        }
        //db.comments.find().skip(pagesize * (n-1)).limit(pagesize);
        axios
          .get(`https://misty-tan-overshirt.cyclic.app/patient/pages?page=${n}`)
          .then((response) => {
            this.setState({
              patients: response.data.data,
            });
          })
          .catch((error) => {
            console.log(error);
          });
    }

    previousPage() {
        if(n>=2){
            n--;
            this.setState({
                message: ""
            })
        }
        else{
            this.setState({
                message: "Already at first Page!"
            })
        }
        //db.comments.find().skip(pagesize * (n-1)).limit(pagesize);
        axios
          .get(`https://misty-tan-overshirt.cyclic.app/patient/pages?page=${n}`)
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
            if(this.state.patients){
                return(
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
                    <th>Diagnosis</th>
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
                        <td>{
                                
                                ((patient.weight)/(patient.height * patient.height)).toFixed(3)
                                
                            } ({this.checkBMI(patient)})</td>
                    </tr>)}
                </tbody>
            </table>
                )}
            else{
                return(
                    
                    <h3>No Records Found</h3>
                )
            }
      }

    render(){
        return(
            
            <div id="wrap" className="container">
                <br/>
                <div className="align-items-center">
                    
                    <h1>All Patients Record</h1><br/>
                    <h3>Total Patients: {this.state.totalResult}</h3>

                    <div className="table-responsive">

                        {this.checkData()}

                    </div>

                    <div><button onClick={this.previousPage}>Previous</button> <button onClick={this.nextPage}>Next</button></div>
                    <h3 style={{color: "red"}}>{this.state.message}</h3>
                </div> 
            </div>
        )
    }
}

export default AllPatients;
