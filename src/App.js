import React, {useState, useEffect} from 'react';
import axios from 'axios';
import UserForm from './Components/UserForm';
import './App.css';
import UserDetails from './Components/UserDetails';
import Loader from './Components/Loader';
import User from './models/User';

function App() {
  let[showForm, setShowForm] = useState(false);
  let[users, setUsers] = useState([]);
  let[loading, setLoading] = useState(false);
  let[errorMessage, setErrorMessage] = useState(null);
  let[editMode, setEditMode] = useState(false);
  let[userToedit, setUser] = useState(null);

  const url = 'https://react-http-tutorial-471a1-default-rtdb.europe-west1.firebasedatabase.app/users.json';

  useEffect(() => {
    fetchUsers();
  }, []);

  function addUserHandler(){
    setEditMode(false);
    setShowForm(true);
  }

  function closeForm(){
    setShowForm(false)
  }

  function onCreateUser(user){
    console.log(user)

   /*  fetch('https://react-http-tutorial-471a1-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      (response) =>{console.log(response.status); console.log(response)}
    ).catch((error)=>{console.log(error)});
    closeForm(); */
    axios.post(url,user)
    .then( (response)=>{console.log(response.data)})
    .catch((err)=>{console.log(err)})
  }

  function fetchUsers(){
    fetch(url)
    .then((resp)=>{return resp.json()})
    .then((data) => {
      const loadedUsers = [];
      for (let key in data) {
        loadedUsers.push({ ...data[key], id: key });
      }
      setUsers(loadedUsers);
    })
    .catch((err)=>{console.log(err)})



   /* axios.get(url)
        .then((resp)=>{console.log(resp.data)})
        .catch((err)=>{console.log(err)}) */
  }

  function onEditUser(user){
    setEditMode(true);
    setUser(user);
    setShowForm(true);
    console.log(user);
  }

  function onDeleteUser(user){
    let del = window.confirm("Do you really want to delete the record of " +user.firstName + " " +user.lastName);
    if(del){
      axios.delete('https://react-http-tutorial-116d3-default-rtdb.firebaseio.com/users/'+user.id+'.json')
      .then((response) => {
        console.log(response);
        fetchUsers();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
    }
    //console.log(user);
  }

  return (
      <div>
        <div className='page-header'>
          <button className='btn btn-success' onClick={addUserHandler}>Add User</button>
          <button className='btn btn-normal'onClick={fetchUsers} >Get Users</button>
        </div>
        <UserDetails loadedUsers={users}></UserDetails>
       {showForm && <UserForm closeForm={closeForm} onCreateUser={onCreateUser}></UserForm>} 
      </div>
  );
}

export default App;
