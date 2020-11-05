import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User';
import Role from '../models/Role'

export const verifyToken = async(req, res, next) => {
    try {
        const token = req.headers["x-access-token"]; //obtener el token por cabecera

        if (!token) return res.status(403).json({ message: "No token provided" }); //si no existe enviar el mensaje
        //si existe extraer lo hay dentro del token
        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id

        const user = await User.findById(req.userId, { password: 0 }) //porque no quiero utilizar la contraseña
        if (!user) return res.status(404).json({ message: 'No user found' })

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
};

//comprobar si el usuario es moderador
export const isModerator = async(req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles } })
        //buscar en el arreglo de ids de roles, si incluye el id del rol
        //recorrer los roles del usuario, si uno de ellos corresponde al moderador, avanza, sino retorna el mensaje
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next()
            return;
        }
    }

    return res.status(403).json({ message: 'Require Moderator Role' })

}

//comprobar si el usuario es admin
export const isAdmin = async(req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles } })
        //buscar en el arreglo de ids de roles, si incluye el id del rol
        //recorrer los roles del usuario, si uno de ellos corresponde al moderador, avanza, sino retorna el mensaje
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next()
            return;
        }
    }

    return res.status(403).json({ message: 'Require Admin Role' })

}