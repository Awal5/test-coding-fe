import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { columns } from "./columns";
import Button from "react-bootstrap/Button";
import { Plus } from "lucide-react";
import { idrFormat } from "../../utlis/idrFormat";

import axios from "axios";

export const Table = () => {
  // state
  const [filterText, setFilterText] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect untuk memperbarui data
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(
          `https://bb36-2001-448a-3027-1bbc-a4d2-8853-3fa5-f4a9.ngrok-free.app/api/v1/transaction`
        );

        setTransactions(data.data.data);
        setLoading(false);
      } catch (error) {
        throw new Error(error);
      }
    };
    getData();
  }, []);

  // fungsi untuk memfilter data
  const filteredItems = transactions.filter((item) => {
    return (
      // filter berdasarkan kode dan nama customer
      item.kode.toLowerCase().includes(filterText.toLowerCase()) ||
      item.m_customer.name.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-4 d-flex flex-lg-row flex-column gap-4 justify-content-end">
        <div className="">
          <input
            type="text"
            placeholder="Cari..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="border border-gray-300 rounded py-2 px-4 w-full"
          />
        </div>
        <div className="">
          <Button variant="primary" href="/create">
            <Plus /> Tambah data baru
          </Button>
        </div>
      </div>
      <DataTable
        className="custom-table-color"
        title="List Transaksi"
        columns={columns}
        data={filteredItems}
        pagination
        sortable
      />
      <div className="d-flex justify-content-between flex-md-row flex-column fw-semibold mt-2 text-white">
        <p>Total Transaksi: {filteredItems.length}</p>
        <p>
          Grand Total: &nbsp;
          {idrFormat(
            filteredItems
              .map((t) => parseInt(t.total_bayar))
              .reduce((a, b) => a + b)
          )}
        </p>
      </div>
    </div>
  );
};
