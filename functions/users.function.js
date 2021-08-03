const {admin_auth, firebase_auth, db} = require('../utils/firebase')
const {validateLoginData, validateSignUpData} = require('../utils/validators');




const loginUser = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const {errors, valid} = validateLoginData(user)

    if(!valid){
        return res.status(400).json(errors)
    }

    firebase_auth.signInWithEmailAndPassword(user.email, user.password)
    .then(data=>{
        return data.user.getIdToken().then(token=>{
            return res.json({token})
        })
    }).catch(err=>{
        console.log(err);
        return res.status(403).json({general: 'Wrong Credentials, please try again'})
    })
};

const signUpUser = (req, res) => {
    const newUser = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
		username: req.body.username
    };

    const {errors, valid} = validateSignUpData(newUser);

    if(!valid){
        res.status(400).json(errors)
    };

    let token;
    let userId;

    db.collection('users').doc(newUser.username).get().then(doc=>{
        if(doc.exists){
            res.status(400).json({username: 'This username is already taken'})
        }else{
            return firebase_auth.createUserWithEmailAndPassword(newUser.email, newUser.password).then(data=>{
                userId = data.user.uid
                return data.user.getIdToken();
            }).then((idToken)=>{
                token = idToken;
                userCredentials = {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    username: newUser.username,
                    phoneNumber: newUser.phoneNumber,
                    email: newUser.email,
                    createdAt: new Date().toISOString(),
                    userId
                };
                return db.collection('users').doc(newUser.username).set(userCredentials)
            }).then(()=>{
                return res.status(201).json({token})
            }).catch(error=>{
                console.log(error);
                if(error.code === 'auth/email-already-in-use'){
                    return res.status(400).json({email: 'Email already in use'})
                }else{
                    return res.status(500).json({email: 'Something went wrong, please try again'})
                }
            })
        }
    })
};

const getUserDetails = (req, res)=> {
    let userData = {};
    db.collection('users').doc(req.user.username).get().then(doc=>{
        userData.userCredentials = doc.data();
        return res.json(userData)
    }).catch(error=>{
        console.log(error);
        return res.status(500).json({error: error.code})
    })
}


module.exports = {loginUser, signUpUser, getUserDetails}

