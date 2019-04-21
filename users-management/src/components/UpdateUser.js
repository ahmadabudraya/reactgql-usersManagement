import React, { Component,Fragment } from 'react'
import { compose, graphql } from 'react-apollo'
import {getUsers,updateUserMutation} from '../queries/queries'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {Formik, Field, ErrorMessage} from 'formik'
//import * as Yup from 'yup'
import 'bootstrap/dist/css/bootstrap.css'
import {Modal,Button} from 'react-bootstrap'
class UpdateUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            show:false
        };
    }
    
    /* Methods for Formik */
    
    onSubmit =(values)=>{
        console.log(values)
        const userId = this.props.updateUser.id;
        for(let key in values){
            if(values.hasOwnProperty(key) && values[key] === '')return;
        }
        this.props.updateUserMutation({
            variables: {id:userId,  user:{
                
                firstName:values.firstName,
                lastName:values.lastName,
                email:values.email,
                country:values.country,
                jobPosition:values.jobPosition,
                dateJoined:values.dateJoined
            }},
            refetchQueries: [{query: getUsers}]
        })
        
        
        toast.success("Updated Successfully!");
    }
    renderState =()=>{
        this.setState({
            show:this.props.isEdit
        })
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.isEdit){

            this.setState({
                show:true
            })
        }
    }
    form = (props) =>{
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <form onSubmit={props.handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">First Name: </label>
                        <div className="col-sm-9">
                            <Field className="form-control" name="firstName"/>
                        </div>
                        <ErrorMessage name="firstName"/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Last Name: </label>
                        <div className="col-sm-9">
                            <Field className="form-control" name="lastName"/>
                        </div>
                        <ErrorMessage name="lastName"/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Email: </label>
                        <div className="col-sm-9">
                            <Field className="form-control" name="email"/>
                        </div>
                        <ErrorMessage name="email"/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Country: </label>
                        <div className="col-sm-9">
                            <Field className="form-control" name="country"/>
                        </div>
                        <ErrorMessage name="country"/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Job Position: </label>
                        <div className="col-sm-9">
                            <Field className="form-control" name="jobPosition"/>
                        </div>
                        <ErrorMessage name="jobPosition"/>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Date Joined: </label>
                        <div className="col-sm-9">
                            <Field className="form-control" name="dateJoined"/>
                        </div>
                        <ErrorMessage name="dateJoined"/>
                    </div>
                    
                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" type="submit">
                    Save Changes
                    </Button>
                </Modal.Footer>
                </form>
            </Modal>
            
        )
    }

    /* schema = () =>{
        const schema = Yup.object().shape({
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
            email: Yup.string().required(),
            country: Yup.string().required(),
            jobPosition: Yup.string().required(),
            dateJoined: Yup.string().required()
        });

        return schema;
    } */
    renderFormik = (obj) =>{
        return (
            <Formik 
                enableReinitialize
                initialValues={obj}
                onSubmit={this.onSubmit}
                render={this.form}
                //validateOnChange={this.schema}
            />
        )
    }
    handleClose =() =>{
        this.setState({
            show: false
        })
    }
    
  render() {
      return (
        <Fragment>
          
        {
            this.state.show ? this.renderFormik(this.props.updateUser) : null
        }
        
        </Fragment>
    )
  }
}

export default compose(
    graphql(updateUserMutation, {name: "updateUserMutation"})
)(UpdateUser);