import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user_model from '../model/user_model';
import {JWT_SECRET} from '../config';

const saltRounds= 3;

class UserController{
    createAccount(request, response) {
        bcrypt.hash(request.body.password, saltRounds, (err, hash) => {
            const newUser= {
                id: user_model.length + 1,
                email: request.body.email,
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                password: hash,
                address: request.body.address,
                is_admin: false
            }
            user_model.push(newUser);

            const token = jwt.sign({ newUser }, JWT_SECRET , { expiresIn: 60*60 });

            return response.status(201).send({
                status: 201,
                message: 'Account created successfully',
                token,
                newUser
            })
        });
    }
    login(request, response) {
        const { email, password } = request.body;
    
        // Check if email is present in Users array
        const found = user_model.some(user => user.email === email);
    
        if (!found) {
          return response.status(400).send({
            status: 400,
            error: 'Email not found',
          });
        }
    
        // Get User using the email
        const findEmail = email => user_model.find(user => user.email === email);

        const user = findEmail(email);

        const token = jwt.sign({ user }, JWT_SECRET , { expiresIn: 60*60 });

    
        // Compare password
        bcrypt.compare(password, user.password, (err, result) => {
            if(!result){
                response.status(400).send({
                    status: 400,
                    error: 'Password is incorrect',
                  });
            }else{
                return response.status(200).json({
                    status: 200,
                    data: {
                      token,  
                      id: user.id,
                      firstname: user.first_name,
                      lastname: user.last_name,
                      email: user.email,
                    },
                  }); 
            }
        });
      }
}
const userController = new UserController();
export default userController;


