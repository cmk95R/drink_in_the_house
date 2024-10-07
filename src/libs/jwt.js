
function createAccessToken(payload){

    jwt.sign(
        {
        id: userSaved._id,
    },"secret123",
    {
    expiresIn: "1d",
    },
    (err,token) => {
    if (err) console.log(err)
    }
    )


    
}


