import { Col, Input, message, Row } from "antd";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { addProduct, getProductBySku, getProductList } from "../../apis";
import AuthContext from "../../contexts/AuthContext";

import styles from "./index.module.scss";
import ProductModal from "./ProductModal";
import ProductTable from "./ProductTable";

const HomePage = () => {
  const { loggedIn } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [resetFields, setResetFields] = useState(false);
  const [products, setProducts] = useState();

  const handleCancelModal = () => {
    setResetFields(true);
    setIsModalVisible(false);
  };

  const getData = async () => {
    setIsLoadingList(true);
    try {
      await getProductList().then(({ data }) => {
        setProducts(data);
      });
    } catch (error) {
      console.error(error);
      message.error("An error occurred. Please try again later.");
    }
    setIsLoadingList(false);
  };

  const handleAddProduct = async (values) => {
    setIsLoading(true);
    try {
      await addProduct(values).then((response) => {
        if (response?.status === 200) {
          if (!response.data.message) {
            message.success("Add Product Successfully");
            handleCancelModal();
            setTimeout(() => {
              getData();
            }, 500);
          } else {
            message.error(response.data.message);
          }
        } else {
          message.error("An error has occurred.");
        }
      });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleSearch = async (sku) => {
    try {
      await getProductBySku(sku).then(({ data }) => {
        if (!data.message) {
          setProducts([data]);
        } else {
          setProducts(null);
        }
      });
    } catch (error) {
      console.error(error);
      message.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      {!loggedIn && (
        <div className={styles.action}>
          <Link href={"/register"}>Register</Link>|
          <Link href={"/login"}>Login</Link>
        </div>
      )}

      <Row>
        <Col span={12}>
          <Input
            placeholder="Search By SKU"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.target.value !== "") {
                  handleSearch(e.target.value);
                } else {
                  getData();
                }
              }
            }}
          />
        </Col>
        <Col span={12} className={styles.btnAddProduct}>
          {loggedIn ? (
            <div
              className={styles.addProductText}
              onClick={() => setIsModalVisible(true)}
            >
              Add Product
            </div>
          ) : (
            <div className={styles.addProductTextDisable}>Add Product</div>
          )}
        </Col>
      </Row>
      <ProductTable
        isLoadingList={isLoadingList}
        products={products}
        getData={getData}
      />
      <ProductModal
        title="Add Product"
        isLoading={isLoading}
        isModalVisible={isModalVisible}
        onCancel={handleCancelModal}
        onOk={handleAddProduct}
        okText={"Add"}
        resetFields={resetFields}
      />
    </div>
  );
};

export default HomePage;
