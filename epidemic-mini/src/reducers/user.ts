const initialState = {
  name: '未命名',
  displayName: '阿三'
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case "GET_USER_INFO":
      return {
        ...state,
      };
    default:
      return state;
  }
}
