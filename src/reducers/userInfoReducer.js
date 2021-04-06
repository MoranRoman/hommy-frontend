import { GET_FAVOURITES_SUCCESS, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from "../types";

const emptyStore = {
    id: null,
    name: 'Guest',
    surname: null,
    login: null,
    mail: null,
    photoUrl: null,
    role: 'user',
    favouritesHousesIds: null,
    favouritesHousesInfo: null
}
const initStore = { ...emptyStore }

export default function reducer(store = initStore, { type, payload }) {
    switch (type) {
        case SIGN_IN_SUCCESS: {
            return { ...store, ...payload }
        }
        case SIGN_OUT_SUCCESS: {
            return emptyStore
        }
        case GET_FAVOURITES_SUCCESS: {
            console.log(store)
            return { ...store, ...payload }
        }
        default:
            return store;
    }
}

