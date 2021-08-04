const  {admin_auth, db} = require('./firebase');

// Here we are using the firebase verifyIdToken module to verify the token. After that we are decoding the user details and passing them in the existing request.

const isUserAuth = (req, res, next) => {
    let idToken;
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        idToken = req.headers.authorization.split(' ')[1];
    }else {
        console.error('No token found');
        res.status(403).json({error:'Unauthorized'})
    }

    admin_auth.verifyIdToken(idToken).then(decodedToken=>{
        console.log(decodedToken)
        req.user = decodedToken;
        console.log('req.user' + req.user.uid)
        return db.collection('users').where('userId', '==', req.user.uid).limit(1).get()
    }).then(data=>{
        console.log('docs' + data.docs[0].data().username)
        req.user.username = data.docs[0].data().username
        return next();
    }).catch(error=>{
        console.error('Error while verifying token', error);
        return res.status(403).json(error)
    })
};

module.exports = isUserAuth;