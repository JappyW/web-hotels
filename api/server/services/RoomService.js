import database from "../src/models";

class RoomService {
    static async getAllRooms(studioId) {
        const rooms = await database.rooms.findAll({
            where: { studioId: studioId },
            attributes: ['id', 'price', 'roomNumber'],
            include: [
                { model: database.room_type },
                {
                    model: database.room_comforts,
                    attributes: ['id'],
                    include: [{ model: database.comforts }]
                }
            ]
        });
        return rooms;
    } catch (e) {
        throw e;
    }

    static async addRoom(room) {
        try {
        return await database.rooms.create(room);
        } catch (e) {
        throw e;
        }
    }
}

export default RoomService;
