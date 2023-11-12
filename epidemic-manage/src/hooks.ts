import * as React from 'react'
import { getCommonNoticeList } from '@/service/notice.service'
import { useRequest, useReactive } from 'ahooks'
import SockJS from 'sockjs-client/dist/sockjs.min.js'
import Stomp from 'stomp-websocket'
import { cloneDeep } from 'lodash'

function useNoticeSubscribeList() {
  const noticeReactive = useReactive({
    loading: false,
    list: [],
  })
  // 1、连接SockJS的endpoint是“epidemic-ws”，与后台代码中注册的endpoint要一样。
  const socket = React.useMemo(() => {
    return new SockJS('http://localhost:8080/epidemic-ws')
  }, [])
  // 2、用stom进行包装，规范协议
  const stompClient = React.useMemo(() => {
    return Stomp.over(socket)
  }, [])

  const subscribe = () => {
    stompClient.subscribe('/topic/notice', (message) => {
      const data = JSON.parse(message.body)
      const notices = cloneDeep(noticeReactive.list)
      if (data.status === 'OPEN') {
        notices.push(data)
      }
      if (data.status === 'CLOSE') {
        notices.splice(
          notices.findIndex((item) => item.id === data.id),
          1,
        )
      }
      noticeReactive.list = notices
    })
  }

  const connect = () => {
    stompClient.connect({}, (frame) => {
      // 4、通过stompClient.subscribe（）订阅服务器的目标是'/topic/notice'发送过来的地址，与@SendTo中的地址对应。
      subscribe()
    })
  }

  const disconnect = () => {
    if (stompClient !== null) {
      stompClient.disconnect()
    }
  }

  const fetchList = async () => {
    noticeReactive.loading = true
    const result = await getCommonNoticeList()
    if (result && result.success) {
      noticeReactive.list = result.data || []
    }
    noticeReactive.loading = false
  }

  React.useEffect(() => {
    fetchList()
    connect()
    return () => disconnect()
  }, [])

  return {
    list: noticeReactive.list,
    loading: noticeReactive.loading,
  }
}

export { useNoticeSubscribeList }
