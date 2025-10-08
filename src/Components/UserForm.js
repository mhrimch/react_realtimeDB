import React, {useRef} from 'react';
import './UserForm.css';
import User from '../models/User';

function UserForm({onCreateUser, closeForm}){
    let fnameRef = useRef();
    let lnameRef = useRef();
    let emailRef = useRef();
    let pswdRef = useRef();
    let countryRef = useRef();
    let cityRef = useRef();
    let dateRef = useRef();
    let genderRef = useRef();

    function onSubmitUser(event){
        event.preventDefault();
      const newUser = new User(
    fnameRef.current.value,
    lnameRef.current.value,
    emailRef.current.value,
    pswdRef.current.value,
    countryRef.current.value,
    cityRef.current.value,
    dateRef.current.value,
    genderRef.current.value
  );

  console.log(newUser);
        onCreateUser(newUser);
    }
    return <>  
           <div id="myModal" className="modal">
                    <div className="modal-content">
                        <div className="close" onClick={closeForm}>&times;</div>
                        <h3>Create new User</h3>
                        <div className="user-form">
                            <form onSubmit={onSubmitUser}>
                                <div>
                                    <input type="text" placeholder="First name"  ref={fnameRef}/>
                                    <input type="text" placeholder="Last name"  ref={lnameRef} />
                                </div>
                                <div>
                                    <input type="email" placeholder="Email" ref={emailRef} />
                                </div>
                                <div>
                                    <input type="password" placeholder="Password" ref={pswdRef}  />
                                    <input type="password" placeholder="Confirm Password" />
                                </div>
                                <div>
                                    <select name="country"  ref={countryRef}>
                                        <option value="India">Morocco</option>
                                        <option value="Germany">Germany</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                    </select>
                                    <select name="city"  ref={cityRef}>
                                        <option value="Delhi">Tiflet</option>
                                        <option value="Berlin">Düsseldorf</option>
                                        <option value="New York">New York</option>
                                        <option value="London">London</option>
                                    </select>
                                </div>
                                <div>
                                    <input type="date" placeholder="Date of Birth"  ref={dateRef} />
                                    <select name="gender" ref={genderRef} >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Unknown">Unknown</option>
                                    </select>
                                </div>
                                <button className='add-user-button'>Create User</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
}

export default UserForm;