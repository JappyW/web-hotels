import database from "../src/models";

class OwnerService {
    static async getAllStudios(ownerId) {
        const studios = await database.studios.findAll({
            where: { ownerId: ownerId },
            attributes: ['id', 'name', 'status'],
            include: [
                {
                    model: database.addresses,
                    attributes: ['city', 'street', 'house']
                },
                {
                    model: database.rooms,
                    attributes: { exclude: ['studio_id'] },
                    include: [
                        { model: database.room_type },
                        {
                            model: database.room_comforts,
                            include: [{ model: database.comforts }]
                        }
                    ]
                },
                { model: database.photo, attributes: ['id']}
            ]
        });
        return studios;
    } catch (e) {
        throw e;
    }
}

export default OwnerService;
