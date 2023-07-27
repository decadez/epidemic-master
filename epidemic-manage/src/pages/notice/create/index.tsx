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
      console.log(values);
    })
    const htmlContent = editorState?.toHTML();
    console.log(htmlContent);
    props.history.replace('/notice/list');
  };

  return (
    <Form form={form}>
      <Card>
        <Grid.Row justify="space-between">
          <Grid.Col span={7}>
            <Form.Item
              label={t['menu.notice.title']}
              field="name"
              rules={[{ required: true }]}
            >
              <Input placeholder={t['menu.notice.title.placeholder']} />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={10}>
            <Form.Item
              label={t['menu.notice.upload']}
              field="upload"
              initialValue={[
                {
                  uid: '-1',
                  url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
                  name: '20200717',
                },
              ]}
            >
              <Upload
                action="/"
                onPreview={(file) => {
                  Modal.info({
                    title: 'Preview',
                    content: (
                      <img
                        src={file.url || URL.createObjectURL(file.originFile)}
                        style={{
                          maxWidth: '100%',
                        }}
                      ></img>
                    ),
                  });
                }}
              />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={1}>
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
