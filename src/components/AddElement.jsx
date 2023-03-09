import { useState } from "react";
import { useGlobal } from "../contexts/Global";

import { Form, Input, InputNumber, Button, Modal, Upload } from "antd";
import axios from 'axios'

export default function AddElement() {
  // UseForm
  const [form] = Form.useForm();

  // Global States
  const globalStates = useGlobal();
  const { setFetch } = globalStates;

  // Local States
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    const payload = {
        username: values.username,
        email: values.email,
        age: values.age,
        picture: values.picture.file.response.link
    }

    try {
        const { data } = axios.post('https://sm.wildanzr.my.id/api/user', payload)
        console.log(data);
    } catch (err) {
        console.log(err);
    } finally {
        setFetch(true)
        form.resetFields();
        setFileList([])
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div className="w-5/12 flex flex-col">
      <Form
        name="upload"
        form={form}
        onFinish={onFinish}
        className="w-full flex flex-col"
      >
        <Form.Item name="username" className="w-full">
          <Input placeholder="Username" className="w-full" />
        </Form.Item>
        <Form.Item name="email" className="w-full">
          <Input placeholder="Email" className="w-full" />
        </Form.Item>
        <Form.Item name="age" className="w-full">
          <InputNumber
            placeholder="Age"
            min={1}
            max={1000}
            className="w-full"
          />
        </Form.Item>
        <Form.Item name="picture" className="w-full">
          <Upload
            action="https://sm.wildanzr.my.id/storage/upload"
            listType="picture-card"
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={fileList.length === 0} className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
