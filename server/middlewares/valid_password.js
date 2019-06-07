const valid_password = (request, response, next) => {
    let {password}= request.body;

    if(!password){
        return response.status(400).send({
            status: 400,
            error: 'password is required'                     
        });
    }
    if(password.trim().length < 6){
        return response.status(400).send({
            status: 400,
            error: 'password cannot be less than 6 characters'                     
        });
    }
    return next();
}

export default valid_password;
