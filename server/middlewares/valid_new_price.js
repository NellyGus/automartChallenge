const new_price_offered= (request, response, next) => {
    let {new_price_offered}= request.body;

    if (Number.isNaN(new_price_offered)) {
        return response.status(400).send({
          status: 400,
          error: 'price is not valid',
        });
      }
    
      return next();
}

export default new_price_offered;