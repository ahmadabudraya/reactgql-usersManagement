import React,{Component,Fragment} from "react";
import {compose, Query, graphql} from 'react-apollo'
import ReactTable from 'react-table'
import {Link} from 'react-router-dom'
import 'react-table/react-table.css'
import { getUsers, deleteUserMutation } from "../queries/queries";
import UpdateUser from "./UpdateUser";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {MDBIcon,MDBBtn} from 'mdbreact'
import { css } from '@emotion/core';
// First way to import
import {ClipLoader} from 'react-spinners';
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
class Users extends Component {
    _isMounted = false;
    state = {
        user:'',
        isEdit:false
    }
    DeleteUser = (id) =>{
        if(window.confirm('Are you sure you wish to delete this user ??')){
            this.props.deleteUserMutation({
                variables: {id:id},
                refetchQueries: [{query: getUsers}]
            })
            
            
            toast.success("User deleted Successfully!");
        }
        
    }
    columns = [
        {
            width:60,
            filterable:false,
            Cell: props =>{
                return (
                    <Fragment>
                        <Link to={`/users/${props.original.id}`}>
                            <MDBBtn 
                                style={{padding:9,marginRight:0}}
                                size="sm"
                                color="primary">
                                <MDBIcon far icon="eye" />
                            </MDBBtn>
                        </Link>
                    </Fragment>
                )
            }
        },
        {
            Header:'ID',
            accessor:'id',
            style:{
                textAlign:'center'
            },
            width:85
        },
        {
            Header:'First Name',
            accessor:'firstName',
            style:{
                textAlign:'center'
            }
    
        },
        {
            Header:'Last Name',
            accessor:'lastName',
            style:{
                textAlign:'center'
            }
        },
        {
            Header:'Email',
            accessor:'email',
            width:250
        },
        {
            Header:'country',
            accessor:'country',
        },
        {
            Header:'Job Position',
            accessor:'jobPosition',
        },
        {
            Header:'Date Joined',
            accessor:'dateJoined',
            width:110,
            style:{
                textAlign:'center'
            }
        },
        {
            Header:'Action',
            style:{
                textAlign:'left'
            },
            Cell: props =>{
                return(
                    <Fragment>
                        
                        <MDBBtn 
                            style={{padding:8, marginRight:1, fontSize:12}}
                            size="sm"
                            color="danger"
                            onClick={()=>{
                                this.DeleteUser(props.original.id)
                            }}
                        >
                    <MDBIcon far icon="trash-alt" /> Delete</MDBBtn>
                    <MDBBtn 
                        style={{padding:8,fontSize:12}}
                        size="sm"
                        color="primary"
                        onClick={()=>{
                            if(this._isMounted){
                                this.setState({
                                    user:props.original,
                                    isEdit:true
                                })
                            }
                            
                            
                        }}
                        >
                        <MDBIcon far icon="edit" /> Update</MDBBtn>
                       
                    </Fragment>
                )
            },
            filterable:false
        }
    ]
    componentDidMount(){
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render(){
        return (
            <div>
            <Query query={getUsers}>
                {({loading, error, data}) => {
                    if(loading){
                        return (
                        <div className='sweet-loading'>
                            <h2>Loading....</h2>
                            <ClipLoader
                                css={override}
                                sizeUnit={"50px"}
                                size={150}
                                color={'#123abc'}
                                loading={loading}
                            />
                        </div> 
                        )
                    }
                    if(error)return `Error! ${error.message}`;
                    return (
                        <div>
                        <ReactTable
                            columns={this.columns}
                            data={data.allUsers}
                            filterable
                            defaultPageSize={15}
                        >
                        

                        </ReactTable>
                        <UpdateUser isEdit={this.state.isEdit} updateUser={this.state.user}/>
                        </div>
                    )
                    
                }}
            </Query>
            
            </div>
        )
    }
}


export default compose(
    graphql(getUsers, {name: "getUsers"}),
    graphql(deleteUserMutation, {name:"deleteUserMutation"})
)(Users);