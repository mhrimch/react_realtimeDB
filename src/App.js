import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./Components/UserForm";
import "./App.css";
import UserDetails from "./Components/UserDetails";
import Loader from "./Components/Loader";
import User from "./models/User";
import ErrorModal from "./Components/ErrorModal";
import EditUser from "./Components/EditUser";

function App() {
  let [showForm, setShowForm] = useState(false);
  let [showTable, setShowTable] = useState(true);
  let [users, setUsers] = useState([]);
  let [selectedUser, setSelectedUser] = useState([]);
  let [loadingAddingSpinner, setLoadingAddingSpiner] = useState(false);
   let [loadingGettingSpinner, setLoadingGettingSpinner] = useState(false);
  let [errorMessage, setErrorMessage] = useState(null);
  let [editMode, setEditMode] = useState(false);
  let [userToedit, setUser] = useState(null);

const baseUrl = "https://react-http-tutorial-471a1-default-rtdb.europe-west1.firebasedatabase.app";


  useEffect(() => {
    fetchUsers();
  }, []);

  function addUserHandler() {
    setEditMode(false);
    setShowForm(true);
    setShowTable(false);
    setLoadingAddingSpiner(false);
    setSelectedUser(null);
  }

  function closeForm() {
    setShowForm(false);
    setShowTable(true);
    setEditMode(false);
  }

  function onCreateUser(user) {
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
    
    axios.post(`${baseUrl}/users.json`, user)
      .then((response) => {
          closeForm();
          fetchUsers();
          setShowTable(true);
      })
      .catch((err) => {
       setErrorMessage("Failed to create user: " + err.message);
      });
  }

  function fetchUsers() {
    setLoadingGettingSpinner(true);
     fetch(`${baseUrl}/users.json`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        const loadedUsers = [];
        for (let key in data) {
          loadedUsers.push({ ...data[key], id: key });
        }
        setUsers(loadedUsers);
        setLoadingGettingSpinner(false);
      })
      .catch((err) => {
         setErrorMessage("Failed to fetch users: " + err.message);
     /*     setTimeout(()=>{
          setLoadingGettingSpinner(false)
         }, 1000) */
      });

    /* axios.get(url)
        .then((resp)=>{console.log(resp.data)})
        .catch((err)=>{console.log(err)}) */
  }

  function onEditUser(event, user) {
   console.log(event, user);
   setShowForm(false)
   setShowTable(false);
    setEditMode(true);
   setSelectedUser(user);
  }



function onUpdateUser(updatedUser) {
  axios.put(`${baseUrl}/users/${updatedUser.id}.json`, updatedUser)
    .then(() => {
      fetchUsers();
      closeForm();
    })
    .catch(err => setErrorMessage(err.message));
}


function onDeleteUser(user) {
  console.log("ondelete")
  axios.delete(`${baseUrl}/users/${user.id}.json`)
    .then(() => fetchUsers())
    .catch(err => setErrorMessage(err.message));
}

return (
  <div>
    <div className="page-header">
      <button className="btn btn-success" onClick={addUserHandler}>
        Add User
        {loadingAddingSpinner && <span className="small-loader"></span>}
      </button>
      <button className="btn btn-normal" onClick={fetchUsers}>
        {loadingGettingSpinner && <span className="small-loader"></span>}  Get Users
      </button>
    </div>
    {!loadingGettingSpinner && showTable && <UserDetails loadedUsers={users} editUser={onEditUser} onDeleteUser={onDeleteUser} ></UserDetails>}
    {showForm && <UserForm closeForm={closeForm} onCreateUser={onCreateUser} ></UserForm>}
    {editMode && <EditUser selectedUser={selectedUser}  onUpdateUser={onUpdateUser} closeForm={closeForm}></EditUser>}
    {errorMessage && (
        <ErrorModal
          message={errorMessage}
          onClose={() => {setErrorMessage(null); setLoadingGettingSpinner(false)}}
        />
      )}
  </div>
);
}

export default App;
