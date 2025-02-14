import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import { useState, useEffect } from "react";
import { idrFormat } from "../../utlis/idrFormat";
import ListGroup from "react-bootstrap/ListGroup";

import axios from "axios";
function ModalCustomer({ showProduct, handleCloseProduct, onSelectProducts }) {
  // state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  // useEffect untuk memperbarui data
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await axios.get(`http://localhost:3000/api/v1/products`);

        setProducts(data.data.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };
    if (showProduct) {
      getData();
    }
  }, [showProduct]);

  // fungsi untuk memilih produk
  const handleSelectProduct = (product) => {
    onSelectProducts(product);
    handleCloseProduct();
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Modal show={showProduct} onHide={handleCloseProduct} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Pilih Produk</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ListGroup defaultActiveKey="#" className="gap-2">
            {products.map((product) => (
              <ListGroup.Item
                action
                onClick={() => handleSelectProduct(product)}
                key={product.id}
              >
                {product.kode} - {product.nama} - {product.harga}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseProduct}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCustomer;
