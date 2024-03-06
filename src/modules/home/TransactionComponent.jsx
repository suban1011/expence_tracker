import { useEffect, useState } from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  font-family: "Lilita One", sans-serif;
  width: 100%;
  & input {
    outline: none;
    border: 1px solid #e6e8e9;
    padding: 10px 12px;
    margin: 10px;
    width: 100%;
    border-radius: 8px;
  }
`;
const Cell = styled.div`
  display: flex;
  margin: 10px;
  justify-content: space-between;
  font-weight: normal;
  border-radius: 8px;
  padding: 10px 15px;
  border: 1px solid #e6e8e9;
  width: 100%;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;
const TransactionCell = (props) => {
  return (
    <Cell isExpense={props.payload?.type === "EXPENSE"}>
      <span>{props.payload.desc}</span>
      <span>{props.payload.amount}</span>
    </Cell>
  );
};
const TransactionComponent = (props) => {
  const [searchText, setSearchText] = useState("");
  const [filteredTransaction, setFilteredTransaction] = useState(
    props.transactions
  );

  const filterData = (searchText) => {
    if (!searchText || !searchText.trim().length) {
      setFilteredTransaction(props.transactions);
      return;
    }
    let txn = [...props.transactions];
    txn = txn.filter((payload) =>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    setFilteredTransaction(txn);
  };
  useEffect(() => filterData(searchText), [props.transactions]);

  return (
    <Container>
      Transctions
      <input
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          filterData(e.target.value);
        }}
      />
      {filteredTransaction?.length
        ? filteredTransaction.map((payload) => (
            <TransactionCell payload={payload} />
          ))
        : ""}
    </Container>
  );
};

export default TransactionComponent;
