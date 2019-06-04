import car_model from '../model/car_model';

class CarController {
    postCar(request, response){
        if(!request.body.owner || !request.body.state ||
            !request.body.status || !request.body.price || !request.body.manufacturer
            || !request.body.model || !request.body.year){
                response.status(400).send({
                    status: 400,
                    message: 'Each field is required, retry please'
                });
            }else{
                const car= {
                    id: car_model.length + 1,
                    owner: request.body.owner,
                    created_on: request.body.created_on,
                    state: request.body.state,
                    status: request.body.status,
                    price: request.body.price,
                    manufacturer: request.body.manufacturer,
                    model: request.body.model,
                    year: request.body.year,
                    more_description: request.body.more_description
                }
                car_model.push(car);
    
                return response.status(201).send({
                    status: 201,
                    message: 'car added successfully',
                    car
                });
            }
            
    } 
    getAllCars(request, response) {
        return response.status(200).send({
            status: 200,
            cars: car_model
        });
    }
    getCarById(request, response){
        const found = car_model.find((car) => {
            return car.id === parseInt(request.params.car_id);
        });
        if(found){
            response.status(200).send({
                status : 200,
                car: found
            })
        }else{
            response.status(404).send({
                status: 404,
                message: 'Car not found'
            });
        }      
    }
    
    searchCars(request, response){
        const {query} = request;

        if(query.status){
            const filtered= car_model.filter(car => car.status=== request.query.status);
            if (filtered.length === 0) {
                return res.status(200).send({
                  status: 200,
                  data: 'Not found',
                });
              }
        
              return response.status(200).send({
                status: 200,
                data: filtered,
              });
        }
        if(query.status && query.manufacturer){
            const filtered= car_model.filter(car => car.status=== query.status && car.manufacturer=== query.manufacturer);
            if (filtered.length === 0) {
                return res.status(200).send({
                  status: 200,
                  data: 'Not found',
                });
              }
        
              return response.status(200).send({
                status: 200,
                data: filtered,
              });
        }
        if(query.status && query.state){
            const filtered= car_model.filter(car => car.status=== query.status && car.state=== query.state); 
            if (filtered.length === 0) {
                return res.status(200).send({
                  status: 200,
                  data: 'Not found',
                });
              }
        
              return response.status(200).send({
                status: 200,
                data: filtered,
              });
        }
        if(query.status && query.min_price && query.max_price){
            const filtered= car_model.filter(car => car.status=== query.status && car.price >= query.min_price && car.price <= query.max_price);
            if (filtered.length === 0) {
                return res.status(200).send({
                  status: 200,
                  data: 'Not found',
                });
              }
        
              return response.status(200).send({
                status: 200,
                data: filtered,
              });
        }
    }

    updatePrice(request, response){
        const found = car_model.find((car) => {
            return car.id === parseInt(request.params.car_id);
        });
        if(found){
            const car= found;
            car.price= request.body.price;
            return response.status(200).send({
                status: 200,
                car
            });            
        }else{
            return response.status(404).send({
                status: 404,
                message: 'Car not found'
            });
        } 

    }
    updateStatus(request, response){
        const found = car_model.find((car) => {
            return car.id === parseInt(request.params.car_id);
        });
        if(found){
            const car= found;
            car.status= request.body.status;
            return response.status(200).send({
                status: 200,
                car
            });
        }else{
            return response.status(404).send({
                status: 404,
                message: 'Car not found'
            });
        }
    }
    deleteCar(request, response){
        const found = car_model.find((car) => {
            return car.id === parseInt(request.params.car_id);
        });
        if(found){
            const targetIndex= car_model.indexOf(found);
            car_model.splice(targetIndex, 1);
            return response.status(200).send({
                status: 200,
                message: 'Car deleted successfully'
            });
        }else{
            return response.status(404).send({
                status: 404,
                message: 'Car not found'
            });
        }
    }
}

const carController = new CarController();
export default carController;