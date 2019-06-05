const valid_status = (request, response, next) => {
    let {status}= request.body;

    status = status.trim().replace(/\s+/g, '');

  if (!status) {
    return res.status(400).json({
      status: 400,
      error: 'Status is required'
    });
  }

  if (status.split('').some(x => Number.isInteger(parseInt(x, 10)))) {
    return res.status(400).json({
      status: 400,
      error: 'Status cannot contain number'
    });
  }

  return next();
}

export default valid_status;