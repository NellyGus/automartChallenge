const valid_price = (request, response, next) => {
    let {price}= request.body;
    price= parseFloat(price);

    if(Number.isNaN(price)){
        return response.status(400).send({
            status: 400,
            error: 'price is invalid'
        });
    }
    return next();
}
export default valid_price;