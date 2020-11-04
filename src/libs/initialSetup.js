import Role from '../models/Role'

//se crearán roles al inicio de la aplicación
export const createRoles = async() => {
    try {
        const count = await Role.estimatedDocumentCount()

        //si ya se crearon los roles, retorna
        if (count > 0) return;

        //si no hay roles, crear
        //ejecutar las 3 promesas al mismo tiempo
        const values = await Promise.all([
            new Role({ name: 'user' }).save(),
            new Role({ name: 'moderator' }).save(),
            new Role({ name: 'admin' }).save()
        ])

        console.log(values)
    } catch (error) {
        console.error(error)
    }
}