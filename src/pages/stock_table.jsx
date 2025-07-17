import React, { useState } from "react";
import { Select, Table, Button, Modal, Layout, theme, Input } from "antd";

const { Header } = Layout;

// ランダムID生成関数
const generateId = () => Math.random().toString(36).substring(2, 10);

const columns = [
  {
    title: "商品ID",
    dataIndex: "id",
    key: "id",
    width: 120,
    render: (text) => <a>{text}</a>, //商品IDをリンクっぽく表示
  },
  {
    title: "商品名",
    dataIndex: "name",
    key: "name",
    width: 400,
  },
  {
    title: "カテゴリー",
    dataIndex: "category",
    key: "category",
    width: 100,
  },
  {
    title: "在庫数",
    dataIndex: "stock",
    key: "stock",
    width: 100,
  },
  {
    title: "単価",
    dataIndex: "price",
    key: "price",
    render: (text) => <span>¥{text}</span>,
    width: 100,
  },
];

const data = [
  {
    key: "1",
    id: generateId(),
    name: "バンズ",
    category: "食品",
    stock: "100",
    price: "300",
  },
  {
    key: "2",
    id: generateId(),
    name: "シュレッドレタス",
    category: "食品",
    stock: "200",
    price: "200",
  },
  {
    key: "3",
    id: generateId(),
    name: "卵",
    category: "食品",
    stock: "300",
    price: "150",
  },
  {
    key: "4",
    id: generateId(),
    name: "オニオン",
    category: "食品",
    stock: "200",
    price: "100",
  },
  {
    key: "5",
    id: generateId(),
    name: "ペーパーナプキン",
    category: "資材",
    stock: "80",
    price: "30",
  },
  {
    key: "6",
    id: generateId(),
    name: "消毒液",
    category: "資材",
    stock: "10",
    price: "150",
  },
  {
    key: "7",
    id: generateId(),
    name: "トング",
    category: "資材",
    stock: "6",
    price: "300",
  },
  {
    key: "8",
    id: generateId(),
    name: "紙ストロー",
    category: "資材",
    stock: "30",
    price: "100",
  },
];

export default function StockTable() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  //ダイアログ閉じる
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          borderBottom: "1px solid #f0f0f0",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div style={{ fontWeight: "bold", padding: "0 20px" }}>
          AntDesign（在庫一覧）
        </div>
      </Header>

      <div
        style={{
          padding: "40px 0 0 38px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 40,
        }}
      >
        <div style={{ flex: 1 }}>
          <Select
            showSearch
            placeholder="カテゴリー絞り込み"
            optionFilterProp="label"
            size="large"
            options={[
              {
                value: "すべて",
                label: "すべて",
              },
              {
                value: "食品",
                label: "食品",
              },
              {
                value: "資材",
                label: "資材",
              },
            ]}
          />
        </div>
        <Button
          color="cyan"
          variant="solid"
          size="large"
          style={{ fontWeight: "600" }}
          onClick={showModal}
        >
          新規登録
        </Button>
      </div>

      <Modal
        title="新規登録"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width="40%"
      >
        <div style={{ height: "35vh" }}>
          <div style={{marginTop: "30px", display:"flex", flexDirection: "column", justifyContent: "center", gap: "25px"}}>
            <Input placeholder="商品ID" />
            <Input placeholder="商品名" />
            <Input placeholder="カテゴリー" />
            <Input placeholder="在庫数" />
            <Input placeholder="単価" />
          </div>
        </div>
      </Modal>

      <div style={{ padding: "30px 40px" }}>
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
}
