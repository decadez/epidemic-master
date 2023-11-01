import Qs from 'query-string'
import { extend } from 'umi-request'

const baseUrl = 'http://localhost:8080'

enum StatusCode {
  SUCCESS = 200,
  ERROR = 500,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  TIMEOUT = 408,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean
  data: any
  code?: StatusCode
  errorMessage?: string
}

const accessToken = JSON.parse(localStorage.getItem('persist:root'))?.token;

const request = extend({
  prefix: baseUrl,
  headers: {
    "Content-Type": "application/json",
    token: accessToken.substring(1, accessToken.length - 1),
  },
  paramsSerializer(params) {
    return Qs.stringify(params, { arrayFormat: 'bracket' })
  },
  // 错误处理
  errorHandler: (error: any) => {
    const { response } = error
    if (response) {
      const { status, statusText, data } = response
      const { success, code, errorMessage } =
        data as ResponseStructure
      if (success) {
        return
      }
      switch (code) {
        case StatusCode.ERROR:
          return
        case StatusCode.NOT_FOUND:
          console.warn(errorMessage)
          return
        case StatusCode.UNAUTHORIZED:
          console.error(errorMessage)
          return
        case StatusCode.FORBIDDEN:
          return
        case StatusCode.TIMEOUT:
          return
        default:
          return
      }
    } else {
      console.error(error)
    }
  },
})

export default request;
