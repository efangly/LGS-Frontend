import { useState, useEffect } from 'react';

const QR = () => {
  const [value, setValue] = useState<string>('Not Found!!');
  let barcodescan: string = "DATA : ";
  const keypressHandler =(e: any) => {
    if (e.keyCode === 13){
      setValue(barcodescan);
    }else{
      barcodescan += e.key;
    }
  }
  useEffect(() => {
    document.addEventListener('keypress', keypressHandler);  
  }, []);
  return (
    <>
    <h1>{value}</h1>
    </>
  );
};

export default QR