import {gql} from 'apollo-boost'

const getUsers = gql`
  {
    allUsers{
        id
        firstName
        lastName
        email
        country
        jobPosition
        dateJoined
    }
  }
`;
const getUser = gql`
  query getUser($id: Int){
      user(id: $id){
        id
        firstName
        lastName
        email
        country
        jobPosition
        dateJoined
      }
  }
`
const createUserMutation = gql`
  mutation createUser($user: UserInput!) {
    createUser(input: $user) {
      ok
      user{
        firstName
        lastName
        jobPosition
      }
    }
  }
`;

const updateUserMutation = gql`
  mutation updateUser($id:Int!,$user: UserInput!) {
    updateUser(id: $id, input: $user) {
      ok
      user{
        firstName
        lastName
        jobPosition
        dateJoined
      }
    }
  }

`;

const deleteUserMutation = gql`
  mutation deleteUser($id:Int!) {
    deleteUser(id: $id) {
      ok
      user{
        firstName
        lastName
        jobPosition
        dateJoined
      }
    }
  }
`

export {getUsers, getUser, createUserMutation, updateUserMutation, deleteUserMutation};



/*

$sudo bash
#npm  start

mutation updateUser($id:Int!,$user: UserInput!) {
  updateUser(id: $id, input: $user) {
    ok
    user{
      firstName
      lastName
      jobPosition
      dateJoined
    }
  }
}

{
  "id": 53,
  "user": {
    "firstName": "Ronaldo",
    "lastName": "Alvista",
    "jobPosition": "Cashier",
    "country": "Canada",
    "email": "alvisata@gmail.com",
    "dateJoined": "2018-4-16",
    "description": "bla bla bla bla bla blabla blabla bla"
  }
}
---------------------------------------------

mutation createUser($user: UserInput!) {
  createUser(input: $user) {
    ok
    user{
      firstName
      lastName
      jobPosition
    }
  }
}

{
  "user": {
    "first_name": "Rony",
    "lastName": "Alvista",
    "jobPosition": "Cashier",
    "country": "Canada",
    "email": "alvisata@gmail.com",
    "dateJoined": "2018-4-16",
    "description": "bla bla bla bla bla blabla blabla bla"
  }
}
*/