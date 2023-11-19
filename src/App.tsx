import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Main from './pages/Main';
import QR from './pages/QR';

const App = () => {
  return (
    <Container className='text-white py-1 px-0' fluid="lg">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/qr" element={<QR />} />
      </Routes>
    </BrowserRouter>
    </Container>
  );
}

export default App;