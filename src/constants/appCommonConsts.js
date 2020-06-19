// here must be placed constans that used in different parts of application 
const OWNER_STUDIOS = 'Owner`s studios';

export const STUDIO_MANAGEMENT_SUBPAGE = {
    DEFAULT: OWNER_STUDIOS,
    OWNER_STUDIOS: OWNER_STUDIOS,
    CREATE_STUDIO: 'Create studio',
    ROOMS: 'Rooms',
    PHOTOS: 'Photos',
    OTHER: 'Other'
};

export const UNKNOWN_STUDIO = {
    id: 1,
    name: '',
    status: "INACTIVE",
    address: {
        city: '',
        street: '',
        house: 0
    },
    rooms: [],
    photos: []
};
