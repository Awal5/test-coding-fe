import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";
import axios from "axios";
function ModalCustomer({ show, handleClose, onSelectCustomer }) {
  // state
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fungsi untuk memilih customer
  const handleSelectCustomer = (customer) => {
    onSelectCustomer(customer);
    handleClose();
  };

  // fungsi untuk mengambil data
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await axios.get(`https://6273-2001-448a-3027-1bbc-a4d2-8853-3fa5-f4a9.ngrok-free.app/api/v1/customers`);

        setCustomers(data.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        throw new Error(error);
      }
    };

    // jika show true, jalankan fungsi
    if (show) {
      getData();
    }
  }, [show]);

  // kondisi untuk menampilkan error
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Pilih Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <div className="text-center">Loading...</div>}
        <ListGroup defaultActiveKey="#" className="gap-2">
          {customers.map((customer) => (
            <ListGroup.Item
              action
              onClick={() => handleSelectCustomer(customer)}
              key={customer.id}
            >
              {customer.kode} - {customer.name} - {customer.telp}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCustomer;
