import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ModalCustomer from "./Modal/ModalCustomer";
import ModalProduct from "./Modal/ModalProduct";
import Button from "react-bootstrap/Button";
import { TableProduct } from "./Table/TableProduct";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Users, Plus } from "lucide-react";
import { idrFormat } from "../utlis/idrFormat";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CreateForm = () => {
  // state
  const [show, setShow] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [manualDiscount, setManualDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [transactionDate, setTransactionDate] = useState("");
  const [error, setError] = useState(null);

  // fungsi navigasi
  const navigate = useNavigate();

  // fungsi untuk menghitung subtotal
  const subTotal = selectedProducts.reduce(
    (total, product) => parseInt(total) + parseInt(product.total || 0),
    0
  );

  // fungsi untuk menghitung total
  const totalBayar =
    parseInt(subTotal) - parseInt(manualDiscount) + parseInt(shippingCost);

  // random id
  const id = `KT-${Math.floor(Math.random() * 1000) + 1}`;

  // fungsi untuk memilih customer
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShow(false);
  };

  // fungsi untuk memilih produk
  const handleSelectProducts = (product) => {
    // cek apakah produk sudah dipilih
    setSelectedProducts((prevProducts) => {
      const exists = prevProducts.some((p) => p.id === product.id);

      // jika produk sudah dipilih, tampilkan alert
      if (exists) {
        alert(`Produk "${product.nama}" sudah ditambahkan!`);
        return prevProducts;
      }

      // jika produk belum dipilih, tambahkan produk baru
      return [
        ...prevProducts,
        {
          ...product,
          qty: 1,
          discount_percent: 0,
          discount_amount: 0,
          harga_diskon: product.harga,
          total: product.harga,
        },
      ];
    });
  };

  // fungsi untuk memperbarui produk
  const updateSelectedProduct = (id, updatedFields) => {
    // perbarui produk
    setSelectedProducts((prevProducts) =>
      // perbarui produk dengan id yang sesuai
      prevProducts.map((product) =>
        product.id === id ? { ...product, ...updatedFields } : product
      )
    );
  };

  // fungsi untuk menghapus produk
  const deleteSelectedProduct = (productId) => {
    // hapus produk dengan id yang sesuai
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== productId)
    );
  };

  // fungsi modal
  const handleCloseCustomer = () => setShow(false);
  const handleShowCustomer = () => setShow(true);
  const handleCloseProduct = () => setShowProduct(false);
  const handleShowProduct = () => setShowProduct(true);

  // fungsi untuk membuat transaksi
  const handleCreateTransaction = async () => {
    // validasi input
    if (!transactionDate) return alert("Tanggal transaksi harus diisi");
    if (!selectedCustomer) return alert("Customer harus dipilih");
    if (selectedProducts.length === 0) return alert("Produk harus dipilih");

    // buat payload transaksi
    const payload = {
      kode: id,
      tgl: transactionDate,
      cust_id: selectedCustomer.id,
      ongkir: shippingCost,
      diskon: manualDiscount,
      details: selectedProducts.map((product) => ({
        barang_id: product.id,
        harga_bandrol: product.harga,
        qty: product.qty,
        diskon_pct: product.discount_percent,
        diskon_nilai: product.discount_amount,
        harga_diskon: product.harga_diskon,
      })),
    };

    // buat transaksi dengan axios
    try {
      const response = await axios.post(
        "https://6273-2001-448a-3027-1bbc-a4d2-8853-3fa5-f4a9.ngrok-free.app/api/v1/transaction",
        payload
      );
      alert("Transaksi berhasil dibuat!");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <h4>Transaksi</h4>
      <div className="col-lg-3 col-12">
        <Form>
          {error && <p className="text-danger">{error}</p>}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Kode Transaksi</Form.Label>
            <Form.Control
              type="text"
              placeholder="KT-001"
              value={id}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Tanggal Transaksi</Form.Label>
            <Form.Control
              type="date"
              placeholder="Tanggal"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </div>

      <h4>Customer</h4>
      <div className="col-lg-3 col-12">
        {selectedCustomer && (
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Kode Customer</Form.Label>
              <Form.Control
                type="text"
                value={selectedCustomer.kode}
                readOnly
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Nama Customer</Form.Label>
              <Form.Control
                type="text"
                value={selectedCustomer.name}
                readOnly
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Telp</Form.Label>
              <Form.Control
                type="text"
                value={selectedCustomer.telp}
                readOnly
              />
            </Form.Group>
          </Form>
        )}
        <Button variant="primary" onClick={handleShowCustomer}>
          <Users /> {selectedCustomer ? "Ubah" : "Pilih"} Customer
        </Button>
        <ModalCustomer
          show={show}
          handleClose={handleCloseCustomer}
          onSelectCustomer={handleSelectCustomer}
        />
      </div>

      <div className="mt-5 text-end">
        <Button size={"sm"} className="mb-3" onClick={handleShowProduct}>
          <Plus /> Tambah Barang
        </Button>
        <ModalProduct
          showProduct={showProduct}
          handleCloseProduct={handleCloseProduct}
          onSelectProducts={handleSelectProducts}
        />
        <TableProduct
          products={selectedProducts}
          onUpdateProduct={updateSelectedProduct}
          onDelete={deleteSelectedProduct}
        />
      </div>

      <Container className="d-flex flex-column gap-1">
        <Row className="justify-content-end align-items-center text-end w-100 gap-2">
          <Col md={9}>
            <h6>Sub Total: </h6>
          </Col>
          <Col md={2}>
            <span>
              {idrFormat(
                selectedProducts.reduce(
                  (total, product) => parseInt(total) + parseInt(product.total),
                  0
                )
              )}
            </span>
          </Col>
        </Row>
        <Row className="justify-content-end align-items-center text-end w-100 gap-2">
          <Col md={9}>
            <h6>Diskon: </h6>
          </Col>
          <Col md={2}>
            <Form.Control
              type="text"
              size="sm"
              placeholder="Masukkan Diskon"
              value={manualDiscount}
              onChange={(e) => setManualDiscount(parseInt(e.target.value) || 0)}
            />
          </Col>
        </Row>
        <Row className="justify-content-end align-items-center text-end w-100 gap-2">
          <Col md={9}>
            <h6>Ongkir: </h6>
          </Col>
          <Col md={2}>
            <Form.Control
              type="text"
              size="sm"
              placeholder="Masukkan Ongkir"
              value={shippingCost}
              onChange={(e) => setShippingCost(parseInt(e.target.value) || 0)}
            />
          </Col>
        </Row>
        <Row className="justify-content-end align-items-center text-end w-100 gap-2">
          <Col md={9}>
            <h6>Total Bayar: </h6>
          </Col>
          <Col md={2}>
            <span>{idrFormat(totalBayar)}</span>
          </Col>
        </Row>
      </Container>

      <div className="mt-5 w-100 d-flex justify-content-center gap-3">
        <Button variant="success" onClick={handleCreateTransaction}>
          Simpan
        </Button>
        <Button variant="danger" onClick={() => navigate("/")}>
          Batal
        </Button>
      </div>
    </div>
  );
};
