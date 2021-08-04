import React, { useState, useContext} from 'react';


const LoginPage = () => {

    const [userCredientials, setUserCredentials] = useState({email:"", password:""});


    const handleEventChange = (e) => {
        const [name, value] = e.target;
        setUserCredentials({[name]: value})
    };


    return (
        <div>
            <p>Login User</p>
            <form>
                <label for="email">Email</label>
                <input type="text" id="email" name="email" value={userCredientials.email} onChange={handleEventChange}/>
                <label for="email">Password</label>
                <input type="text" id="password" name="password" value={userCredientials.password}onChange={handleEventChange}/>
            </form>
        </div>
    )
};


export default LoginPage;