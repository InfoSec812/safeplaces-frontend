import usersTypes from './types';

const {
  GET_ALL_USERS_SUCCESS,
  CREATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  CHANGE_USER_ROLE_SUCCESS,
} = usersTypes;

const initialState = {
  list: [],
};

export default function reducer(state = initialState, action) {
  const { type, data, error } = action;
  switch (type) {
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        list: [data, ...state.list],
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        list: state.list.filter(e => e.id !== data.id),
      };
    case CHANGE_USER_ROLE_SUCCESS: {
      const updatedList = state.list.map(p =>
        p.id === data.id ? { ...p, role: data.role } : p,
      );
      return {
        ...state,
        list: updatedList,
      };
    }
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        list: data,
      };
    default:
      return state;
  }
}
