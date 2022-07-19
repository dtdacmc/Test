import { ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal, Spin, Table } from "antd";
import React, { useContext, useMemo, useState } from "react";
import AuthContext from "../../contexts/AuthContext";

import { deleteProduct, updateProduct } from "../../apis";
import ProductModal from "./ProductModal";
import styles from "./ProductTable.module.scss";

const { confirm } = Modal;

const showDeleteConfirm = (sku, reloadData) => {
  confirm({
    title: "Are you sure delete this product?",
    icon: <ExclamationCircleOutlined />,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      try {
        deleteProduct(sku);
        message.success("Delete product successfully");
        setTimeout(() => {
          reloadData();
        }, 500);
      } catch (error) {
        message.error("An error occurred. Please try again");
      }
    },
  });
};

const ProductTable = ({ products, getData, isLoadingList }) => {
  const { loggedIn } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productSelected, setProductSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };
  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const columns = useMemo(
    () => [
      {
        title: "sku",
        dataIndex: "sku",
        key: "sku",
        fixed: "left",
      },
      {
        title: "product name",
        dataIndex: "product_name",
        key: "product_name",
        fixed: "left",
      },
      {
        title: "Action",
        key: "ig",
        fixed: "right",
        render: (row) =>
          loggedIn ? (
            <>
              <span
                className={styles.btnAction}
                onClick={() => {
                  handleShowModal();
                  setProductSelected(row);
                }}
              >
                Edit
              </span>{" "}
              |{" "}
              <span
                className={styles.btnAction}
                onClick={() => {
                  showDeleteConfirm(row.sku, getData);
                  setProductSelected(row);
                }}
              >
                Delete
              </span>
            </>
          ) : (
            <>
              <span className={styles.btnActionDisable}>Edit</span> |{" "}
              <span className={styles.btnActionDisable}>Delete</span>
            </>
          ),
      },
    ],
    [getData, loggedIn]
  );

  const handleUpdateProduct = async (values) => {
    setIsLoading(true);
    try {
      await updateProduct(values).then((response) => {
        if (response?.status === 200) {
          message.success("Update Product Successfully");
          setIsModalVisible(false);
          getData();
        } else {
          message.error("An error has occurred.");
        }
      });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Spin spinning={isLoadingList}>
        <Table
          columns={columns}
          dataSource={products}
          className={styles.productTable}
          pagination={false}
        />
      </Spin>
      <ProductModal
        isLoading={isLoading}
        title="Update Product"
        isModalVisible={isModalVisible}
        onOk={handleUpdateProduct}
        onCancel={handleCancelModal}
        okText="Update"
        values={productSelected}
      />
    </>
  );
};

export default ProductTable;
