import React, { useState } from "react";
import "./UserForm.css";

function EditUser({ selectedUser, onUpdateUser, closeForm }) {
  const [firstName, setFirstName] = useState(selectedUser.firstName || "");
  const [lastName, setLastName] = useState(selectedUser.lastName || "");
  const [email, setEmail] = useState(selectedUser.email || "");
  const [password, setPassword] = useState(selectedUser.password || "");
  const [country, setCountry] = useState(selectedUser.country || "");
  const [city, setCity] = useState(selectedUser.city || "");
  const [dob, setDob] = useState(selectedUser.dob || "");
  const [gender, setGender] = useState(selectedUser.gender || "");

  function onSubmitUser(event){
    console.log("onSubmiUser")
    event.preventDefault();

    const updatedUser = {
      ...selectedUser,
      firstName,
      lastName,
      email,
      password,
      country,
      city,
      dob,
      gender,
    };

    onUpdateUser(updatedUser);
  }

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="close" onClick={closeForm}>
          &times;
        </div>
        <h3>Edit selected User</h3>
        <div className="user-form">
          <form onSubmit={onSubmitUser}>
            <div>
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="password" placeholder="Confirm Password" />
            </div>
            <div>
              <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="India">India</option>
                <option value="Germany">Germany</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="Delhi">Delhi</option>
                <option value="Berlin">Berlin</option>
                <option value="New York">New York</option>
                <option value="London">London</option>
              </select>
            </div>
            <div>
              <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>
            <button type="submit" className="add-user-button">Update User</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
