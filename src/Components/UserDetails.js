import React from "react";
import "./UserDetails.css";

function UserDetails({ loadedUsers, editUser,  onDeleteUser}) {

  return (
    <div className="user-details">
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Date Of Birth</th>
            <th>Gender</th>
            <th>Country</th>
            <th>City</th>
              <th></th>
                <th></th>
          </tr>
        </thead>
        <tbody>
          {loadedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>{user.gender}</td>
              <td>{user.country}</td>
              <td>{user.city}</td>
              <td>
                <button className="btn btn-edit" onClick={(event) => editUser(event, user)}>Edit</button>
              </td>
              <td>
                <button className="btn btn-delete" onClick={() => onDeleteUser(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetails;
