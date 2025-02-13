import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { PencilIcon, TrashIcon } from "lucide-react";
import { idrFormat } from "../../utlis/idrFormat";

export const TableProduct = ({ products, onDelete, onUpdateProduct }) => {
  // state
  const [updatedProducts, setUpdatedProducts] = useState([]);

  // useEffect untuk memperbarui data
  useEffect(() => {
    setUpdatedProducts(products);
  }, [products]);

  // fungsi untuk memperbarui produk
  const handleChange = (id, field, value) => {
    // mencari produk dengan id yang sesuai
    const product = products.find((p) => p.id === id);
    // jika produk tidak ditemukan, keluar
    if (!product) return;

    // perbarui produk
    let qty = product.qty;
    let discount_percent = product.discount_percent;
    let harga_bandrol = product.harga;

    // perbarui qty, discount_percent
    if (field === "qty") qty = parseInt(value) || 0;
    if (field === "discount_percent") discount_percent = parseFloat(value) || 0;

    // hitung harga diskon
    const discount_amount = (harga_bandrol * discount_percent) / 100;
    const harga_diskon = harga_bandrol - discount_amount;
    const total = harga_diskon * qty;

    // Update ke parent
    onUpdateProduct(id, {
      qty,
      discount_percent,
      discount_amount,
      harga_diskon,
      total,
    });
  };

  // fungsi untuk menghapus produk
  const handleDelete = (id) => {
    // mencari produk dengan id yang sesuai
    setUpdatedProducts((prev) => prev.filter((product) => product.id !== id));
    onDelete(id); // Kirim ke parent agar selectedProducts juga terhapus
  };

  return (
    <Table striped bordered size="sm" responsive>
      <thead>
        <tr className="text-center">
          <th rowSpan={2}>Aksi</th>
          <th rowSpan={2}>No.</th>
          <th rowSpan={2}>Kode Barang</th>
          <th rowSpan={2}>Nama Barang</th>
          <th rowSpan={2} className="text-danger">
            Qty
          </th>
          <th rowSpan={2}>Harga Bandrol</th>
          <th colSpan={2}>Diskon</th>

          <th rowSpan={2}>Harga Diskon</th>
          <th rowSpan={2}>Total</th>
        </tr>
        <tr className="text-center">
          <th className="text-danger">%</th>
          <th>(Rp)</th>
        </tr>
      </thead>
      <tbody>
        {updatedProducts.map((product, index) => (
          <tr className="text-center" key={product.id}>
            <td className="d-flex justify-content-center gap-4">
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleDelete(product.id)}
              >
                <TrashIcon size={20} /> Hapus
              </Button>
            </td>
            <td>{index + 1}</td>
            <td>{product.kode}</td>
            <td>{product.nama}</td>
            <td>
              <input
                type="number"
                value={product.qty}
                onChange={(e) =>
                  handleChange(product.id, "qty", e.target.value)
                }
                className="form-control w-50 mx-auto"
              />
            </td>
            <td>{idrFormat(product.harga)}</td>
            <td>
              <input
                type="text"
                className="form-control w-50 mx-auto"
                value={product.discount_percent}
                onChange={(e) =>
                  handleChange(product.id, "discount_percent", e.target.value)
                }
              />
            </td>

            <td>{idrFormat(product.discount_amount)}</td>
            <td>{idrFormat(product.harga_diskon)}</td>
            <td>{idrFormat(product.total)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
