import { useEffect, useState } from "react";
import OverviewComponent from "./OverviewComponent";
import TransactionComponent from "./TransactionComponent";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Lilita One", sans-serif;
  font-weight: 100;
  font-style: normal;
`;
const HomeComponent = (props) => {
  const [transactions, updateTransaction] = useState([]);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);

  const addTransaction = (payload) => {
    const transArray = [...transactions];
    transArray.push(payload);
    updateTransaction(transArray);
  };

  const calculateBalance = () => {
    let exp = 0;
    let inc = 0;
    transactions.map((payload) => {
      payload.type === "EXPENSE"
        ? (exp = exp + payload.amount)
        : (inc = inc + payload.amount);
      setExpense(exp);
      setIncome(inc);
    });
  };
  useEffect(() => calculateBalance(), [transactions]);
  return (
    <Container>
      <OverviewComponent
        addTransaction={addTransaction}
        expense={expense}
        income={income}
      />
      <TransactionComponent transactions={transactions} />
    </Container>
  );
};
export default HomeComponent;
