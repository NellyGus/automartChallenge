const valid_price_offered= (request, response, next) => {
    let {price_offered}= request.body;

    if (Number.isNaN(price_offered)) {
        return response.status(400).send({
          status: 400,
          error: 'price is not valid',
        });
      }
    
      return next();
}

export default valid_price_offered;
