import React from "react";
import Card from "react-bootstrap/Card";
import { CreateForm } from "../components/CreateForm";

// Halaman buat transaksi
const CreateTransaction = () => {
  return (
    <>
      <div className="container mt-4">
        <Card className="mx-auto custom-card-header text-white">
          <Card.Header>
            <Card.Title className="text-center">Buat Transaksi</Card.Title>
          </Card.Header>
          <Card.Body className="text-white">
            <CreateForm />
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default CreateTransaction;
