import jwt from 'jsonwebtoken'
import env from '../../config/env'

const jwtSecret = env.JWT_SECRET

export class AuthService {

    /**
     * 
     * @param id de l'utilisateur
     * @returns le token jwt
     */
    jwtToken(id: string) : string {
        const token = jwt.sign({id},jwtSecret,{expiresIn:"1h"})
        return token;
    }


}