import { ROLES } from "../models/Role";
import User from "../models/User";

//MIDDLEWARE QUE VERIFICA QUE EL NUEVO USUARIO QUE SE VA A CREAR NO TENGA EL MISMO NOMBRE DE USUARIO O EMAIL EXISTENTE EN LA BD
export const checkDuplicateUsernameOrEmail = async(req, res, next) => {
    //buscar el username
    const user = await User.findOne({ username: req.body.username })
        //si ya existe el username
    if (user) return res.status(400).json({ message: 'The user already exists' })
        //buscar el email
    const email = await User.findOne({ email: req.body.email })
        //si ya existe el email
    if (email) return res.status(400).json({ message: 'The email already exists' })

    next()
}

//MIDDLEWARE que verifica que los roles que se asignen a los usuarios existan
export const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                //si el array de roles que se envía desde el body no incluye a ninguno de los roles definidos
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exists`,
                });
            }
        }
    }
    next();
};