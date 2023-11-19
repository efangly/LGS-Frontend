import { useState, useEffect } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import { FaUnlockAlt } from "react-icons/fa";

type ModalProps = {
  shelf: string,
  position: string,
  cmd: string[] ,
  key: number,
  update: (cmd: string) => void
};
type Color = {
  R: boolean,
  G: boolean,
  B: boolean,
  Y: boolean  
}

const BoxModal = (props: ModalProps) => {
  const { shelf, position, cmd, update } = props;
  const [show, setShow] = useState<boolean>(false);
  const [color, setColor] = useState<Color>({ R: false, G: false, B: false, Y: false });
  const [btn, setBtn] = useState<boolean>(false);
  const { R, G, B, Y } = color; 
  const handleChange = (value: string) => {
    setBtn(true);
    switch(value){
      case "R":
        update(`B01${shelf}${position}0000${value}${R ? '0' : '1'}D1001`);
        break;
      case "G":
        update(`B01${shelf}${position}0000${value}${G ? '0' : '1'}D1001`);
        break;
      case "B":
        update(`B01${shelf}${position}0000${value}${B ? '0' : '1'}D1001`);
        break;
      case "Y":
        update(`B01${shelf}${position}0000${value}${Y ? '0' : '1'}D1001`);
        break;
      default:
        setColor({ R: false, G: false, B: false, Y: false });
    }
    setTimeout(() => {
      setBtn(false);
    },500)
  }
  useEffect(() => {
    if(cmd.length > 0){
      let res: string = cmd[cmd.length - 1]
      if(res.substring(0, 5) === `B01${shelf}${position}`){
        switch(res.slice(16, 17)){
          case "Z":
            setColor(prev => ({ ...prev,[res.slice(9, 10)]: res.slice(10, 11) === '0' ? false : true }));
            break;
          case "T":
            setColor(prev => ({ ...prev,[res.slice(9, 10)]: true }));
            break;
          default:
            console.log('error');
        }
      }
    }
  }, [cmd]);
  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);
  
  return (
    <>
      <Button className='m-1 btn-box' style={{ width: '9rem' , height: '4rem' }} onClick={handleShow}>
        {shelf + position}
      </Button>
      <Modal className='text-white' size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ชั้นที่ {shelf} ช่องที่ {position}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='py-2 px-2'>
          <Row className='justify-content-center px-0'>
            <Button 
              disabled={btn}
              variant='danger'
              className='m-1'
              style={{ width: '9rem' ,height: '5rem' }} 
              onClick={() => handleChange("R")} >
              <FaUnlockAlt size={30} />
            </Button>
            <Button 
              disabled={btn}
              variant='success'
              className='m-1'
              style={{ width: '9rem' ,height: '5rem' }} 
              onClick={() => handleChange("G")} >
              <FaUnlockAlt size={30} />
            </Button>
            <Button 
              disabled={btn}
              variant='primary'
              className='m-1'
              style={{ width: '9rem' ,height: '5rem' }} 
              onClick={() => handleChange("B")} >
              <FaUnlockAlt size={30} />
            </Button>
            <Button 
              disabled={btn}
              variant='warning' 
              className='m-1 text-white'
              style={{ width: '9rem' ,height: '5rem' }} 
              onClick={() => handleChange("Y")} >
              <FaUnlockAlt size={30} />
            </Button> 
          </Row>
          <hr className='my-1' />
          <Row className='px-4 justify-content-center'>
            <Col>
              <h5 className={`${R ? 'text-success' : 'text-danger'}`}>สีแดง : { R ? 'เปิด' : 'ปิด' }</h5>
              <h5 className={`${B ? 'text-success' : 'text-danger'}`}>สีน้ำเงิน : { B ? 'เปิด' : 'ปิด' }</h5>
              
            </Col>
            <Col>
              <h5 className={`${G ? 'text-success' : 'text-danger'}`}>สีเขียว : { G ? 'เปิด' : 'ปิด' }</h5>
              <h5 className={`${Y ? 'text-success' : 'text-danger'}`}>สีเหลือง : { Y ? 'เปิด' : 'ปิด' }</h5>
            </Col>
          </Row>
          <hr className='my-2' />
          <h5>{cmd[cmd.length - 1]}</h5>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BoxModal;