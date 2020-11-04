import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'

export const signIn = async(req, res) => {
    const userFound = await User.findOne({ email: req.body.email }).populate("roles")

    if (!userFound) return res.status(400).json({ message: "User Not Found" })

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid Password' })

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })

    res.json({ token })
}

export const signUp = async(req, res) => {
    const { username, email, password, roles } = req.body
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    //si al nuevo usuario se le asignaron roles
    //estos roles se buscarán el el schema de roles
    //para obtener su id y guardarlos en el schema de usuarios
    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } })
        newUser.roles = foundRoles.map(role => role._id) //para guardar el id del rol y no todo el objeto
            //ejm: roles:["jsidskdsdskd","psdjsdjsndsd9sdsjds"]
    } else { //si no se asignaron ningun rol
        const role = await Role.findOne({ name: "user" }) //buscar el id del rol user
        newUser.roles = [role._id] //si no sele asignó ningun rol, el usuario tendrá el rol user
            //guardar en el array el id del rol user
    }

    //usuario se guarda en la BD
    const savedUser = await newUser.save()
    console.log(savedUser)

    //creación del token
    //dato que se guardará dentro del token,
    //clave secreta para guardar el token,
    //objeto de configuración
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400 //está en segundos. El token expira en 1 dia
    })

    //se devolverá al usuario su token
    res.status(200).json({ token })

}