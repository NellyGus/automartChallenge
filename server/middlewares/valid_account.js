const valid_account= (request, response, next)=> {

    let { first_name, last_name, address} = request.body;

    first_name= first_name.trim().replace(/\s+/g, '');
    last_name= last_name.trim().replace(/\s+/g, '');

    if(!first_name || !last_name){
        return response.status(400).send({
            status: 400,
            error: 'firstname or lastname is required'
        });
    }
    if((first_name+last_name).split().some(str => Number.isInteger(parseInt(str, 10)))){
        return response.status(400).send({
            status: 400,
            error: 'firstname or lastname cannot contain number'
        });
    }
    if(!address){
        return response.status(400).send({
            status: 400,
            error: 'address is required'
        });
    }
    if(first_name.length <2 || last_name.length <2 ){
        return response.status(400).send({
            status: 400,
            error: 'firstname or lastname cannot be less than 2 characters'
        });
    }
  return next();
}
export default valid_account;



