import React, { Component } from 'react'
import {graphql} from 'react-apollo'
import {getUser} from '../queries/queries'
class UserDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.user_id
        }
    }
    
    displayUserDetails(){
        const {user} = this.props.data;
        console.log(user);
        if(!user){
            return (
                <div>Loading ....</div>
            )
        }else{
            return(
                <div className="card ml-3 mt-3 w-75 mx-auto">
                    <div className="card-header text-center">
                        {`User #${user.id}`} 
                    </div>
                    <ul className="list-group list-group-flush">
                        <li class="list-group-item">    
                            <h3 className="text-capitalize"><b>full name: </b>{`${user.firstName} ${user.lastName}`}</h3>
                        </li>
                        <li class="list-group-item">
                            <h3 className="text-capitalize"><b>job position: </b>{user.jobPosition}</h3>
                        </li>
                        <li class="list-group-item">
                            <h3 className="text-capitalize"><b>Country:</b> {user.country}</h3>
                        </li>
                        <li class="list-group-item">
                            <h3 className="text-capitalize"><b>email: </b>{user.email}</h3>
                        </li>
                        <li class="list-group-item">
                            <h3 className="text-capitalize"><b>date joined: </b>{user.dateJoined}</h3>
                        </li>
                    </ul>
                </div>
            )
        }
    }

    render() {
        
        return (
            <div>
                {this.displayUserDetails()}
            </div>
        )
    }
}

export default graphql(getUser, {
    options: (props) => {
        return {
            variables:{
                id:props.match.params.user_id
            }
        }
    }
})(UserDetails);