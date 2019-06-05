import order_model from '../model/order_model';

class OrderController {
    makeOrder(request, response){
        if(!request.car_id || !request.created_on || !request.status
            || !request.price || !request.price_offered){
                response.status(400).send({
                    status: 400,
                    message: 'Each field is required, retry please'
                });
            }else{
                const order = {
                    id: order_model.length + 1,
                    car_id: request.body.car_id,
                    created_on: request.body.created_on,
                    status: request.body.status.toLowerCase(),
                    price: request.body.price,
                    price_offered: request.body.price_offered
                }
                order_model.push(order);

                return response.status(201).send({
                    status: 201,
                    message: 'car added successfully',
                    order
                });
            }
    }
    updatePrice(request, response){
        const found = order_model.find((order) => {
            return order.id === parseInt(request.params.order_id);
        });
        if(found){
            const order= found;
            if(order.status=== 'accepted' || order.status=== 'rejected'){
                return res.status(400).json({
                    status: 400,
                    error: 'Cannot update price. Order status is either accepted or rejected',
                  });
            }
            order.price= request.body.new_price_offered;
            return response.status(200).send({
                status: 200,
                id: order.id,
                car_id: order.car_id,
                status: order.status,
                old_price_offered: order.price_offered,
                new_price_offered: order.new_price_offered
            }); 
        }else{
            return response.status(404).send({
                status: 404,
                message: 'Order not found'
            });
        } 
    }
}

const orderController= new OrderController();
export default orderController;