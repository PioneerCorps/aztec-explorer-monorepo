import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Footer } from "./components/footer/footer";
import "./index.css";
import { Landing } from "./components/landing/landingLayout";
import { Transaction } from "./components/transaction/transactionLayout";
import { Header } from "./components/header/header";
import { Block } from "./components/block/blockLayout";
import { Address } from "./components/address/addressLayout";
import { BlockList } from "./components/block/blockList";
import { TransactionList } from "./components/transaction/transactionList";
import { AddressList } from "./components/address/addessList";

//"https://api.aztec.network/devnet/aztec-node-1/xF4vCY9uuwFMEfk8mR3AQ6JJ8JCX26vo/"

function App() {
  return (
    <div className="bg-bgDark1 w-screen min-h-screen flex flex-col relative overflow-x-hidden dark:bg-transparent diamond-grad">
      <Header />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/tx/:hash" element={<Transaction />} />
          <Route path="/block/:hash" element={<Block />} />
          <Route path="/address/:hash" element={<Address />} />
          <Route path="/addresses" element={<AddressList />} />
          <Route path="/blocks" element={<BlockList />} />
          <Route path="/transactions" element={<TransactionList />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
