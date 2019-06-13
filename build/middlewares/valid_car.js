'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var valid_car = function valid_car(request, response, next) {
    var _request$body = request.body,
        state = _request$body.state,
        manufacturer = _request$body.manufacturer,
        model = _request$body.model,
        year = _request$body.year;


    state = state.trim().replace(/\s+/g, '');
    manufacturer = manufacturer.trim().replace(/\s+/g, '');
    model = model.trim().replace(/\s+/g, '');
    year = parseInt(year, 10);

    if (!state) {
        return response.status(400).send({
            status: 400,
            error: 'Car state is required'
        });
    }
    if (state.split('').some(function (x) {
        return Number.isInteger(parseInt(x, 10));
    })) {
        return response.status(400).send({
            status: 400,
            error: 'Car state cannot contain number'
        });
    }
    if (!manufacturer) {
        return response.status(400).send({
            status: 400,
            error: 'Car manufacturer is required'
        });
    }
    if (manufacturer.split('').some(function (x) {
        return Number.isInteger(parseInt(x, 10));
    })) {
        return response.status(400).send({
            status: 400,
            error: 'car manufacturer cannot contain number'
        });
    }
    if (!model) {
        return response.status(400).send({
            status: 400,
            error: 'Car model is required'
        });
    }
    if (year.toString().length < 4 || year.toString().length > 4 || !year) {
        return response.status(400).send({
            status: 400,
            error: 'Enter a valid year, please'
        });
    }
    if (!year) {
        return response.status(400).send({
            status: 400,
            error: 'Enter a valid year, please'
        });
    }

    return next();
};
exports.default = valid_car;
//# sourceMappingURL=valid_car.js.map