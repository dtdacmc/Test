import { Form, Input, Modal, Spin } from "antd";
import React, { useEffect } from "react";

const ProductModal = ({
  title,
  isModalVisible,
  onOk,
  okText = "Submit",
  onCancel,
  isLoading = false,
  values,
  resetFields,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    if (resetFields) {
      form.resetFields();
    }
  }, [form, resetFields, isModalVisible]);

  return (
    <Spin spinning={isLoading}>
      <Modal
        title={title}
        visible={isModalVisible}
        onCancel={onCancel}
        okText={okText}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onOk(values);
            })
            .catch((info) => {
              console.error("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="product">
          <Form.Item
            name="sku"
            rules={[
              {
                required: true,
                message: "Please input the sku",
              },
            ]}
          >
            <Input placeholder="sku" />
          </Form.Item>
          <Form.Item
            name="product_name"
            rules={[
              {
                required: true,
                message: "Please input the product name",
              },
            ]}
          >
            <Input placeholder="product name" />
          </Form.Item>
          <Form.Item
            name="qty"
            rules={[
              {
                required: true,
                message: "Please input the qty",
              },
            ]}
          >
            <Input placeholder="qty" />
          </Form.Item>
          <Form.Item
            name="price"
            rules={[
              {
                required: true,
                message: "Please input the price",
              },
            ]}
          >
            <Input placeholder="price" />
          </Form.Item>
          <Form.Item
            name="unit"
            rules={[
              {
                required: true,
                message: "Please input the unit",
              },
            ]}
          >
            <Input placeholder="unit" />
          </Form.Item>
        </Form>
      </Modal>
    </Spin>
  );
};

export default ProductModal;
