import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

function App() {
  return (
    <>
      <GlobalStyle />
      <Container className="App">
        <div>공송이 화이팅</div>
      </Container>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  // GlobalStyle 작성
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

export default App;
