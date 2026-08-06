// TODO: Import Card, Button dari antd
// TODO: Import useCart dari context
import { Card, Button, Tag } from "antd";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const { Meta } = Card;

function ProductCard({ product }) {
  const navigate = useNavigate();
  // TODO: Get addToCart function dari CartContext

  // TODO: Handle add to cart click
  const {addToCart} = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  }
  // TODO: Create card layout dengan:
  // - Product image
  // - Product name & category
  // - Price (format currency)
  // - Add to cart button

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  }

  return (
    <>
      <Card
        hoverable
        onClick={handleCardClick}
        cover={
          <img
            alt={product.name}
            src={
              product.imageUrl ||
              "https://via.placeholder.com/300x200?text=Health+Product"
            }
            className="h-48 object-cover"
          />
        }
        actions={[
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
            key="add-to-cart"
          >
            Tambah ke Keranjang
          </Button>,
        ]}
      >
        <Meta
          title={
            <div className="flex flex-col justify-between items-start">
              <span className="text-lg font-semibold">{product.name}</span>
              <Tag color="blue">{product.category}</Tag>
            </div>
          }
          description={
            <div>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.description}
              </p>
              <p className="text-2xl font-bold text-blue-600">
                Rp {product.price?.toLocaleString("id-ID")}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Stock: {product.stock || 0} unit
              </p>
            </div>
          }
        />
      </Card>
      {/* <div className="bg-white rounded-lg shadow-md hover:scale-102 transition p-4">
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-gray-600 text-sm mt-1">{product.category}</p>
      <p className="text-xl font-bold text-blue-600 mt-2">
        Rp {product.price?.toLocaleString("id-ID")}
      </p>

      <p className="text-gray-500 text-sm mt-2">
        <Button type="primary">
          Add to cart
        </Button>
      </p>
    </div> */}
    </>
  );
}

export default ProductCard;
