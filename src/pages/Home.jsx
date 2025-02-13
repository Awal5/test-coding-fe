import React from "react";
import Card from "react-bootstrap/Card";
import { Table } from "../components/Table/Table";

// Halaman List Transaksi
const Home = () => {
  return (
    <>
      <div className="container mt-4">
        <Card className="mx-auto custom-card-header ">
          <Card.Header>
            <Card.Title className="text-center text-white">POS APP</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table />
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Home;
