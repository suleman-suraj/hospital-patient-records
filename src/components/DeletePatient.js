import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
//import { Nav} from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/style.css'
import axios from 'axios';

var n=1;
var totalResults= 0;

class DeletePatient extends Component{
    constructor(props){
        super(props);

        this.deletePatient= this.deletePatient.bind(this);
        this.nextPage= this.nextPage.bind(this);
        this.previousPage= this.previousPage.bind(this);

        this.state = {
            patients: [],
            message: "",
            messageDelete: ""
        }

    }

    

    componentDidMount() {

        axios
          .get(`https://apricot-rattlesnake-belt.cyclic.app/patient/pages`)
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
            .get(
              `https://apricot-rattlesnake-belt.cyclic.app/patient/pages?page=1`
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
          .get(
            `https://apricot-rattlesnake-belt.cyclic.app/patient/pages?page=${n}`
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
          .get(
            `https://apricot-rattlesnake-belt.cyclic.app/patient/pages?page=${n}`
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

    async deletePatient(e){

        // eslint-disable-next-line no-restricted-globals
        var result = confirm("Want to delete?");
        if (result) {
            //Logic to delete the item

        await axios
          .delete(
            `https://apricot-rattlesnake-belt.cyclic.app/patient/${e.target.id}`
          )
          .catch((error) => {
            console.log(error);
          })
          .then(
            console.log("deleted")

            //this.forceUpdate();
            //window.location= '/deletepatient';
          );}

        if(result){
        axios
          .get("https://apricot-rattlesnake-belt.cyclic.app/patient/")
          .then((response) => {
            this.setState(
              {
                patients: response.data.data,
                messageDelete: "Patient Record Successfully Deleted!",
              },
              () => {
                console.log(this.state.patients);
              }
            );
          })
          .catch((error) => {
            console.log(error);
          });
        }
    }

    


    render(){

        return(
            
            <div id="wrap" className="">
                <br/>
                <br/>
                <div className="container align-items-center">
                <h3 style={{color: "green"}} className="label label-success">{this.state.messageDelete}</h3>
                    
                    <h1>Select a Patient to Delete</h1>
                    <br/>

                    <div className="table-responsive">

                    <div className="table-responsive">

                    <table className="table">
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Email Id</th>
                            <th>Temperation (Celsius)</th>
                            <th>Weight (KG)</th>
                            <th>Height (Metre)</th>
                            <th>Problems</th>
                            <th>Diagnosis</th>
                            <th>Prescription</th>
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

                        <td><button type="button" id={patient._id} onClick={this.deletePatient} className="btn btn-danger btn-sm">Delete</button></td>
                    </tr>)}
                        </tbody>
                    </table></div>
                    </div>

                    <div><button onClick={this.previousPage}>Previous</button> <button onClick={this.nextPage}>Next</button></div>
                    <h3 style={{color: "red"}}>{this.state.message}</h3>
                   
                    
                </div> 
            </div>
        )
    }
}

export default DeletePatient;
