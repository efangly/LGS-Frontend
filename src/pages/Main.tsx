/* eslint-disable */
import { useState, useEffect, ChangeEvent } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { socket } from '../utils/socket';
import NavigationBar from '../components/NavigationBar';
import BoxModal from '../components/BoxModal';

const Main = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [data, setData] = useState<string[]>([]);
  const [onShelf, setOnShelf] = useState<string>('1');
  const [filter, setFilter] = useState<string>('');
  const btngroup: string[] = ['1','2','3','4','5','6','7','8'];
  const shelf: string[] = ['1','2','3','4','5','6','7'];
  useEffect(() => {
    socket.on('res_message', (receivedata) => {
      setData(previous => [...previous, receivedata]);
    });
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    if(data.length > 4){
      data.shift();
      setData(data);
    }
    return () =>{ socket.off('res_message') };
  }, [data]);
  const send_data = (data: string) => {
    socket.emit("send_message", data);
    setFilter('');
  }
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setOnShelf(shelf[Number(e.target.value)]);
  }
  return (
    <>
      <NavigationBar />
      <Row className='bg-box1 px-0 mx-1'>
        <Col className='px-3 py-2' md={12} lg={7}>
          <h3 className='align-middle d-flex'>
            Shelf :
            <Form.Select size="sm" className='ms-2 py-0' onChange={handleSelect} style={{ width: '6rem' }}>
              {shelf.map((shelfIndex,index)=>(
                <option key={index} value={index}>ชั้นที่ : {shelfIndex}</option>
              ))}
            </Form.Select>
          </h3>
          <hr className='my-2' />
          <Row className="justify-content-center">
            {btngroup.map((btn,index)=>(
              <BoxModal shelf={onShelf} position={btn} cmd={data} update={send_data} key={index} />
            ))}
          </Row>
          <hr className='my-2' />
          <h4>Status : {isConnected ? "เชื่อมต่อแล้ว" : "ยังไม่เชื่อมต่อ"}</h4>
        </Col>
        <Col className='px-3 py-2' md={12} lg={5}>
          <h3>Manual</h3>
          <hr className='my-2' />
          <Form.Control
            type="text"
            placeholder='Insert Command..'
            style={{ height: '3rem' }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Button className='form-control btn-box no-focusborder mt-1' onClick={() => send_data(filter)} style={{ height: '3rem' }}>
            Send
          </Button>
          <h3 className='mt-2'>Data</h3>
          <hr className='my-2' />
          { data.map((data, index) =>
            <p key={ index }>{ data }</p>
          ).reverse() }
        </Col>
      </Row>
    </>
  );
}

export default Main;