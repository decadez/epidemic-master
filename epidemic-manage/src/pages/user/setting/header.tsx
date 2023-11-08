import React, { useEffect, useState } from 'react'
import {
  Button,
  Avatar,
  Upload,
  Descriptions,
  Tag,
  Skeleton,
  Link,
  Modal,
  Input,
  Message,
  Form,
} from '@arco-design/web-react'
import { IconCamera, IconPlus } from '@arco-design/web-react/icon'
import useLocale from '@/utils/useLocale'
import locale from './locale'
import styles from './style/header.module.less'
import dayjs from 'dayjs'
import { editUser } from '@/service/user.service'
import { updateUserInfo } from '@/store/reducer/userSlice'
import { useAppDispatch } from '@/store/hooks'
import { baseUrl } from '@/utils/request'

export default function Info({
  userInfo = {},
  loading,
}: {
  userInfo: any
  loading: boolean
}) {
  const t = useLocale(locale)

  const [avatar, setAvatar] = useState('')
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  const onAvatarChange = async (_, file) => {
    setAvatar(file.originFile ? URL.createObjectURL(file.originFile) : '')

    if (file.response && file.response.data && file.response.success) {
      const imgUrl =  file.response.data?.imagePath;
      const res = await editUser({
        avatar: imgUrl,
      })
      if (res && res.success) {
        dispatch(
          updateUserInfo({
            avatar: imgUrl
          }),
        )
      }
    }
  }

  useEffect(() => {
    setAvatar(userInfo.avatar)
  }, [userInfo])

  const loadingImg = (
    <Skeleton
      text={{ rows: 0 }}
      style={{ width: '100px', height: '100px' }}
      animation
    />
  )

  const [visible, setVisible] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)

  const editPhoneNumber = () => {
    setVisible(true)
  }

  const onOk = async () => {
    const phone = form.getFieldValue('phone')
    setEditLoading(true)
    const res = await editUser({
      phone,
    })
    if (res) {
      Message.success('修改成功！')
      setVisible(false)
      dispatch(
        updateUserInfo({
          phone,
        }),
      )
    }
    setEditLoading(false)
  }

  const onCancel = () => {
    setEditLoading(false)
    setVisible(false)
  }

  const loadingNode = <Skeleton text={{ rows: 1 }} animation />
  return (
    <div className={styles['info-wrapper']}>
      <Modal
        title="修改手机号"
        visible={visible}
        unmountOnExit={true}
        onCancel={onCancel}
        footer={
          <>
            <Button onClick={onCancel}>返回</Button>
            <Button loading={editLoading} onClick={onOk} type="primary">
              确认
            </Button>
          </>
        }
        autoFocus={false}>
        <Form form={form}>
          <Form.Item
            rules={[
              {
                validator(value, cb) {
                  if (!/^1[3456789]\d{9}$/.test(value)) {
                    return cb('请正确填写手机号')
                  }
                  return cb()
                },
              },
            ]}
            field="phone">
            <Input
              style={{ width: 350, margin: 12 }}
              addBefore="+86"
              maxLength={11}
              placeholder="请输入需要修改的手机号"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Upload
        action={baseUrl + '/api/uploadImage'}
        showUploadList={false}
        onChange={onAvatarChange}>
        {loading ? (
          loadingImg
        ) : (
          <Avatar
            size={100}
            triggerIcon={<IconCamera />}
            className={styles['info-avatar']}>
            {avatar ? <img src={baseUrl + "/" + avatar} /> : <IconPlus />}
          </Avatar>
        )}
      </Upload>
      <Descriptions
        className={styles['info-content']}
        column={2}
        colon="："
        labelStyle={{ textAlign: 'right' }}
        data={[
          {
            label: t['userSetting.label.name'],
            value: loading ? loadingNode : userInfo.name || userInfo.username,
          },
          {
            label: t['userSetting.label.accountId'],
            value: loading ? loadingNode : userInfo.id,
          },
          {
            label: t['userSetting.label.phoneNumber'],
            value: loading ? (
              loadingNode
            ) : (
              <span>
                {userInfo.phone || '-'}
                <Link
                  onClick={editPhoneNumber}
                  role="button"
                  className={styles['edit-btn']}>
                  {t['userSetting.btn.edit']}
                </Link>
              </span>
            ),
          },
          {
            label: t['userSetting.label.registrationTime'],
            value: loading
              ? loadingNode
              : dayjs(userInfo.createAt).format('YYYY-MM-DD'),
          },
        ]}
      />
    </div>
  )
}
