import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User';

export const verifyToken = async(req, res, next) => {
    const token = req.headers["x-access-token"]; //obtener el token por cabecera

    if (!token) return res.status(403).json({ message: "No token provided" }); //si no existe enviar el mensaje
    //si existe extraer lo hay dentro del token
    const decoded = jwt.verify(token, config.SECRET)
    req.userId = decoded.id

    const user = await User.findById(req.userId, { password: 0 }) //porque no quiero utilizar la contraseña
    if (!user) return res.status(404).json({ message: 'No user found' })

    next();
};