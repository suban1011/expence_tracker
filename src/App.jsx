import styled from "styled-components";
import HomeComponent from "./modules/home/HomeComponent";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Lilita One", sans-serif;
  font-weight: 400;
  font-style: normal;
  border: 1px solid #e6e8e9;
  width: 100%;
  margin: 10px;
  padding:10px;
  border-radius: 30px;
 
`;
const Header = styled.span`
  color: black;
  font-size: 25px;
  margin-top: 10px;
`;
const App = () => {
  return (
    <>
      <Container>
        <Header>Expense Tracker</Header>
        <HomeComponent />
      </Container>
    </>
  );
};

export default App;
