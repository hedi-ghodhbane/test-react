import Tax from './Tax';
import styled from 'styled-components'
const Container = styled.div`
 width:100%;
 height:100vh;
 display  :grid ;
 place-items: center;
`
function App() {
  return (
    <Container >
    <Tax/>
         </Container>
  );
}

export default App;
