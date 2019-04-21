import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import {getUsers, createUserMutation} from '../queries/queries'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

class AddUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            country:'',
            jobPosition:'',
            dateJoined:''
        };
    }

    onSubmit =(e)=>{
        e.preventDefault();
        const values = this.state;

        // Check if there are input field is empty
        for(let key in values){
            if(values.hasOwnProperty(key) && values[key] === '')return;
        }
        this.props.createUserMutation({
            variables: {user:values},
            refetchQueries: [{query: getUsers}]
        })
        
        // Clear the state
        this.setState({
            firstName:'',
            lastName:'',
            email:'',
            country:'',
            jobPosition:'',
            dateJoined:''
        })
        
        
        toast.success("The User Added Successfully!");
    }

        

    handleInputs = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    render(){
        return (
            
            <MDBContainer className="w-50 mx-auto">
            <MDBRow>
                <MDBCol>
                <form className="mt-3" onSubmit={this.onSubmit}>
                    <h2 className=" text-center text-capitalize mb-4">create a new user</h2>
                    <div className="grey-text">
                    <MDBRow>
                        <MDBCol>
                            <MDBInput
                                label="First Name"
                                icon="user"
                                value={this.state.firstName}
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                name="firstName"
                                onChange={this.handleInputs}
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                label="Last Name"
                                icon="user"
                                value={this.state.lastName}
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                name="lastName"
                                onChange={this.handleInputs}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBInput
                        label="Your email"
                        icon="envelope"
                        value={this.state.email}
                        group
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                        name="email"
                        onChange={this.handleInputs}
                    />
                    <MDBInput
                        label="Your Country"
                        icon="globe"
                        value={this.state.country}
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        name="country"
                        onChange={this.handleInputs}
                    />
                    <MDBInput
                        label="Job Position"
                        icon="briefcase"
                        value={this.state.jobPosition}
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        name="jobPosition"
                        onChange={this.handleInputs}
                    />
                    <MDBInput
                        label="Date Joined"
                        icon="calendar-alt"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        name="dateJoined"
                        onChange={this.handleInputs}
                    />
                    
                    </div>
                    <div className="text-center">
                    <MDBBtn type="submit" style={{fontSize:15}} color="primary">Add User</MDBBtn>
                    </div>
                </form>
                </MDBCol>
            </MDBRow>
            </MDBContainer>
        )
    }
}
export default compose(
    graphql(createUserMutation, {name: "createUserMutation"}),
    graphql(getUsers, {name: "getUsers"}),
)(AddUser);