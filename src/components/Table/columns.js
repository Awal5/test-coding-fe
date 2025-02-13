// columns.js
import { idrFormat } from "../../utlis/idrFormat";

export const columns = [
  {
    name: "No Transaksi",
    selector: (row) => row.kode,
    sortable: true, // Aktifkan sorting
  },
  {
    name: "Tanggal",
    selector: (row) => row.tgl,
    sortable: true,
  },
  {
    name: "Nama Customer",
    selector: (row) => row.m_customer.name,
    sortable: true,
  },
  {
    name: "Jumlah Barang",
    selector: (row) =>
      row.t_sales_det.map((detail) => detail.qty).reduce((a, b) => a + b),
    sortable: true,
  },
  {
    name: "Sub Total",
    selector: (row) => idrFormat(row.subtotal),
    sortable: true,
  },
  {
    name: "Diskon",
    selector: (row) => idrFormat(row.diskon),
    sortable: true,
  },
  {
    name: "Ongkir",
    selector: (row) => idrFormat(row.ongkir),
    sortable: true,
  },
  {
    name: "Total",
    selector: (row) => idrFormat(row.total_bayar),
    sortable: true,
  },
];
