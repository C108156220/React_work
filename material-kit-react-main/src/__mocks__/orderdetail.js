/* eslint-disable */
import { useState, useEffect } from 'react';

const useData = () => {
  const [item, setItem] = useState([]);
  useEffect(() => {
    fetch("http://localhost/php-react/all-orderdetail.php")
      .then(res => 
        res.json())
      .then(
        (result) => {
          result.map(e=>
            e.id=e.seq
          );
          setItem(result);
        }
      )
  },[])
  return [item];
}

export default useData;
