const initialState = {
  name: '未知用户',
  username: '未知用户',
  isLogin: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...action.payload,
        isLogin: true,
      };
    default:
      return state;
  }
}
