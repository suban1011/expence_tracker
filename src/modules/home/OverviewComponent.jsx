import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  font-family: "Lilita One", sans-serif;
  width: 100%;
`;
const BalanceBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const AddTransction = styled.button`
  background: black;
  color: white;
  border-radius: 4px;
  padding: 5px;
`;
const AddTransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e8e9;
  gap: 10px;
  margin: 20px 20px;
  padding: 20px 20px;
  border-radius: 4px;
  width: 100%;
  & input {
    outline: none;
    border: 1px solid #e6e8e9;
    padding: 10px 12px;
    border-radius: 4px;
  }
`;
const RadioBox = styled.div`
  margin: 5px;
  padding: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
  & input {
    width: unset;
    margin: 0 10px;
  }
`;
const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 10px;
  width: 100%;
  justify-content: space-between;
`;
const Expense = styled.div`
  border: 1px solid #e6e8e9;
  padding: 5px 10px;
  width: 135px;
  font-size: 14px;
  border-radius: 4px;
  & span {
    font-weight: 800;
    font-size: 20px;
    margin: 3px;
    color: ${(props) => (props.isIncome ? "green" : "red")};
  }
`;
const AddTransactionView = (props) => {
  const [amount, setAmount] = useState();
  const [desc, setDesc] = useState();
  const [type, setType] = useState("EXPENSE");

  const handleTransaction = () => {
    props.addTransaction({
      amount: Number(amount),
      desc,
      type,
      id: Date.now(),
    });
    props.toogleAddBtn();
  };
  return (
    <AddTransactionContainer>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
      />
      <RadioBox>
        <input
          type="radio"
          id="expense"
          name="type"
          checked={type === "EXPENSE"}
          value="EXPENSE"
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="expense">Expense</label>
        <input
          type="radio"
          id="income"
          name="type"
          value="INCOME"
          checked={type === "INCOME"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="income">Income</label>
      </RadioBox>
      <AddTransction onClick={handleTransaction}>Add Transaction</AddTransction>
    </AddTransactionContainer>
  );
};
const OverviewComponent = (props) => {
  const [isTransVisible, toogleAddBtn] = useState(false);
  return (
    <Container>
      <BalanceBox>
        <h3>Balance: $ {props.income - props.expense}</h3>
        <AddTransction
          onClick={() => {
            toogleAddBtn(!isTransVisible);
          }}
        >
          {isTransVisible ? "CANCEL" : "ADD"}
        </AddTransction>
      </BalanceBox>
      {isTransVisible && (
        <AddTransactionView
          toogleAddBtn={toogleAddBtn}
          addTransaction={props.addTransaction}
        />
      )}
      <ExpenseContainer>
        <Expense isIncome={false}>
          Expense <br />
          <span>$ {props.expense}</span>
        </Expense>
        <Expense isIncome={true}>
          Income <br /> <span>${props.income}</span>
        </Expense>
      </ExpenseContainer>
    </Container>
  );
};

export default OverviewComponent;
