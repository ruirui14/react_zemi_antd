import React, { useState, useEffect } from "react";
import { Select, Table, Button, Modal, Layout, theme, Input, Tag } from "antd";

const { Header } = Layout;

// ランダムID生成関数
const generateId = () => Math.random().toString(36).substring(2, 10);

const titledata = [
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
  const [productID, setProductID] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("stockData");
    return saved ? JSON.parse(saved) : titledata;
  });
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [editMode, setEditMode] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  const showModal = () => {
    setOpen(true);
  };

  const handleadd = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);

    const newItem = {
      key: editMode ? editingKey : generateId(),
      id: productID || generateId(),
      name,
      category,
      stock,
      price,
    };

    if (editMode) {
      // 編集時：既存データを上書き
      const newData = data.map((item) =>
        item.key === editingKey ? newItem : item
      );
      setData(newData);
    } else {
      // 新規登録時
      setData([...data, newItem]);
    }

    setProductID(""); // 入力欄をクリア
    setName("");
    setCategory("");
    setStock("");
    setPrice("");
    setEditMode(false);
    setEditingKey(null);
  };

  //ダイアログ閉じる
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //カテゴリー絞り込み
  const filteredData =
    selectedCategory === "すべて"
      ? data
      : data.filter((item) => item.category === selectedCategory);

  //ローカルストレージに新規登録を保存
  useEffect(() => {
    const savedData = localStorage.getItem("stockData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("stockData", JSON.stringify(data));
  }, [data]);

  //編集
  const handleEdit = (record) => {
    setProductID(record.id);
    setName(record.name);
    setCategory(record.category);
    setStock(record.stock);
    setPrice(record.price);
    setEditingKey(record.key);
    setEditMode(true);
    setOpen(true);
  };

  //削除
  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

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
      width: 120,
      render: (stock) => {
        const stockNum = Number(stock);

        if (stockNum === 0) {
          return <Tag color="red">在庫なし</Tag>;
        } else if (stockNum <= 20) {
          return <Tag color="orange">残りわずか（{stockNum}）</Tag>;
        } else {
          return <Tag color="green">在庫あり（{stockNum}）</Tag>;
        }
      },
    },
    {
      title: "単価",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>¥{text}</span>,
      width: 100,
    },
    {
      title: "編集/削除",
      key: "action",
      width: 160,
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button size="small" onClick={() => handleEdit(record)}>
            編集
          </Button>
          <Button size="small" danger onClick={() => handleDelete(record.key)}>
            削除
          </Button>
        </div>
      ),
    },
  ];

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
            onChange={(value) => setSelectedCategory(value)}
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
        onOk={handleadd}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width="40%"
      >
        <div style={{ height: "35vh" }}>
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "25px",
            }}
          >
            <Input
              placeholder="商品ID"
              value={productID}
              onChange={(e) => setProductID(e.target.value)}
            />
            <Input
              placeholder="商品名"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Select
              placeholder="カテゴリー"
              value={category || undefined}
              onChange={(value) => setCategory(value)}
              options={[
                { value: "食品", label: "食品" },
                { value: "資材", label: "資材" },
              ]}
            />
            <Input
              placeholder="在庫数"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <Input
              placeholder="単価"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
      </Modal>

      <div style={{ padding: "30px 40px" }}>
        <Table columns={columns} dataSource={filteredData} />
      </div>
    </>
  );
}
