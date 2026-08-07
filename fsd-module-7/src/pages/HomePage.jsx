// TODO: Import necessary components dari Ant Design
// Hint: Button, Card, Row, Col
import { Button, Card, Row, Col } from "antd";
import {
  ShoppingOutlined,
  RocketOutlined,
  SafetyOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShoppingOutlined style={{ fontSize: "48px", color: "#1890ff" }} />,
      title: "Produk Berkualitas",
      description:
        "Vitamin dan suplemen kesehatan berkualitas tinggi",
    },
    {
      icon: <RocketOutlined style={{ fontSize: "48px", color: "#52c41a" }} />,
      title: "Pengiriman Cepat",
      description: "Pengiriman cepat dan terkendali ke seluruh wilayah Indonesia",
    },
    {
      icon: <DollarOutlined style={{ fontSize: "48px", color: "#faad14" }} />,
      title: "Harga Terjangkau",
      description: "Harga kompetitif dengan berbagai promo menarik",
    },
  ];

  // TODO: Create hero section dengan:
  // - Welcome heading
  // - Deskripsi singkat
  // - Button navigate ke /products (use Link from react-router-dom)

  // TODO: Create features section dengan 3 cards:
  // - Card 1: Produk Berkualitas
  // - Card 2: Pengiriman Cepat
  // - Card 3: Harga Terjangkau

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Selamat Datang di Health E-Commerce
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Platform terpercaya untuk produk kesehatan berkualitas
          </p>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/products")}
            className="h-12 px-8 text-lg"
          >
            Start Buying
          </Button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Kenapa E-Commerce ini lebih baik?
        </h2>

        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} md={8} key={index}>
              <Card className="text-center h-full rounded-md shadow-md hover:scale-101 transition">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div className="bg-gray-200 py-16 rounded-xl">
        <div className="container mx-auto px-4 text-center">
          <SafetyOutlined style={{ fontSize: '64px', color: '#1890ff' }} className="mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Produk Kesehatan Terpercaya
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Semua produk telah tersertifikasi dan aman untuk dikonsumsi
          </p>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/products')}
            className="h-12 px-8"
          >
            Lihat Semua Produk
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
