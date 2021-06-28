/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

const useData = () => {
  const [item, setItem] = useState([]);
  useEffect(() => {
    fetch("http://localhost/php-react/product.php")
      .then(res => 
        res.json())
      .then(
        (result) => {
          result.map(e=>
            e.id=uuid()
          );
          setItem(result);
        }
      )
  },[])
  return [item];
}

export default useData;
