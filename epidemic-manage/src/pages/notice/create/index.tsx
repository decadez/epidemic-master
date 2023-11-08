import * as React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './style/index.module.less';
import {
  Modal,
  Upload,
  Input,
  Button,
  Card,
  Form,
  Grid,
} from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import { baseUrl } from '@/utils/request';
import { createNotice } from '@/service/notice.service';

const Create = (props) => {
  const [editorState, setEditorState] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const t = useLocale(locale);
  const [form] = Form.useForm();

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  const onSubmit = () => {
    form.validate().then(values => {
      const htmlContent = editorState?.toHTML();
      createNotice({
        title: values?.name,
        content: htmlContent,
        imgUrl: values?.upload[0]?.response?.data?.imagePath,
      }).then(res => {
        if (res && res.success) {
          Modal.success({
            title: '公告创建成功，点击确认跳转至发布~',
            onOk: () => {
              props.history.replace('/notice/list');
            },
          })
        }
      });
    })
  };

  return (
    <Form form={form}>
      <Card>
        <Grid.Row justify="space-between">
          <Grid.Col span={8}>
            <Form.Item
              label={t['menu.notice.title']}
              field="name"
              rules={[{ required: true, message: "请输入公告标题" }]}
            >
              <Input placeholder={t['menu.notice.title.placeholder']} />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={12}>
            <Form.Item
              label={t['menu.notice.upload']}
              field="upload"
              rules={[{ required: true, message: "请上传公告图片" }]}
            >
              <Upload
                action={baseUrl + '/api/uploadImage'}
                limit={1}
                imagePreview={true}
                listType='picture-card'
              />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={1.5}>
            <Button type="primary" loading={loading} onClick={onSubmit}>
              {t['menu.notice.create']}
            </Button>
          </Grid.Col>
        </Grid.Row>
        <BraftEditor value={editorState} onChange={handleEditorChange} />
      </Card>
    </Form>
  );
};

export default Create;
