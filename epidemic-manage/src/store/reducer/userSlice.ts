import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import defaultSettings from '@/settings.json'
import { login, getUserInfo } from '@/service/user.service'
import { isEmpty } from 'lodash'

export interface UserState {
  settings?: typeof defaultSettings
  userInfo?: {
    avatar?: string
    address?: string
    age?: number
    email?: string
    name?: string
    phone?: string
    sex?: string
    username?: string
  }
  token?: string
  userLoading?: boolean
  permissions: Record<string, string[]>
}

const initialState: UserState = {
  settings: defaultSettings,
  userInfo: {},
  permissions: {
    'menu.history.health': ['write'],
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateSetting: (state, action) => {
      return {
        ...state,
        settings: action.payload.settings,
      }
    },
    updateUserInfo: (state, action) => {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.payload,
        },
      }
    },
    logout: () => {
      localStorage.setItem('userStatus', 'logout')
      window.location.href = '/login'
      return {
        ...initialState,
        userLoading: true,
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.userLoading = true
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.userInfo = {
          ...action.payload,
          avatar:
            'https://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
        }
        state.userLoading = false
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        localStorage.setItem('userStatus', 'logout')
        window.location.href = '/login'
        return {
          ...initialState,
          userLoading: true,
        }
      })
      .addCase(getToken.fulfilled, (state, action) => {
        if (isEmpty(action.payload)) {
          return null
        }
        localStorage.setItem('userStatus', 'login')
        state.token = action.payload;
      })
      .addCase(getToken.rejected, () => {
        return null
      })
  },
})

export const getToken = createAsyncThunk(
  'user/getToken',
  async (loginParams: any) => {
    const res = await login(loginParams)
    if (res && res.data) {
      return res.data.token
    }
    return initialState?.userInfo
  },
)

export const fetchUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  const res = await getUserInfo()
  if (res && res.data) {
    return res.data
  }
  return null
})

export const { updateUserInfo, updateSetting, logout } = userSlice.actions

export default userSlice.reducer
