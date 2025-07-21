import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  TableOutlined,
  DatabaseOutlined,
  FileAddOutlined,
  HistoryOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Card, Col, Row, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { Line } from "@ant-design/plots";

const { Sider, Content, Header } = Layout;

const items = [
  {
    key: "1",
    icon: <TableOutlined />,
    label: "在庫一覧",
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: "監視カメラ",
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "アップロード",
  },
  {
    key: "4",
    icon: <UserOutlined />,
    label: "アカウント設定",
  },
];

export default function StockList() {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/stock_table"); //在庫一覧ページへ
  };

  const data = [
    { month: "4月", 在庫数: 8 },
    { month: "5月", 在庫数: 9 },
    { month: "6月", 在庫数: 9.1 },
    { month: "7月", 在庫数: 9.8 },
    { month: "8月", 在庫数: 9.3 },
    { month: "9月", 在庫数: 7.2 },
    { month: "10月", 在庫数: 4.5 },
  ];

  const config = {
    data,
    xField: "month",
    yField: "在庫数",
    autoFit: true, //親要素にフィット
    height: 200, //グラフの高さを指定（Cardの高さに収める）
    shapeField: "smooth",
    scale: {
      y: {
        domainMin: 0,
        domainMax: 10,
      },
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Content>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            borderBottom: "1px solid #f0f0f0",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div style={{ fontWeight: "bold", marginLeft: "18%" }}>AntDesign</div>
        </Header>
        <Sider
          width={250}
          style={{
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>

        <Row
          gutter={[20, 30]}
          style={{
            marginLeft: 260,
            marginRight: 10,
            marginTop: 40,
          }}
        >
          <Col span={8}>
            <Card
              onClick={handleCardClick}
              title="在庫一覧"
              variant="borderless"
              style={{ height: 300 }}
            >
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  marginTop: "30px",
                  gap: "8px",
                }}
              >
                <DatabaseOutlined
                  style={{ fontSize: 80, marginBottom: 16, color: "#8c8c8c" }}
                />
                <p style={{ fontSize: 16, margin: 0 }}>
                  商品の在庫状況をチェック
                </p>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="在庫登録" variant="borderless" style={{ height: 300 }}>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  marginTop: "30px",
                  gap: "8px",
                }}
              >
                <FileAddOutlined
                  style={{ fontSize: 80, marginBottom: 16, color: "#8c8c8c" }}
                />
                <p style={{ fontSize: 16, margin: 0 }}>
                  新しい商品の在庫情報を入力・登録します
                </p>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="在庫変更履歴"
              variant="borderless"
              style={{ height: 300 }}
            >
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  marginTop: "30px",
                  gap: "8px",
                }}
              >
                <HistoryOutlined
                  style={{ fontSize: 80, marginBottom: 16, color: "#8c8c8c" }}
                />
                <p style={{ fontSize: 16, margin: 0 }}>
                  商品の在庫数やステータス変更の履歴を確認できます
                </p>
              </div>
            </Card>
          </Col>
          <Col span={16}>
            <Card title="在庫推移" variant="borderless" style={{ height: 300 }}>
              ”商品名”在庫推移
              <Line {...config} />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="アカウント設定"
              variant="borderless"
              style={{ height: 300 }}
            >
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  marginTop: "30px",
                  gap: "8px",
                }}
              >
                <SettingOutlined
                  style={{ fontSize: 80, marginBottom: 16, color: "#8c8c8c" }}
                />
                <p style={{ fontSize: 16, margin: 0 }}>アカウント設定</p>
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
}
