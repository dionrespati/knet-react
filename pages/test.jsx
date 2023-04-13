import React from 'react';
import useCartStore from '../store-zustand/useCartStore';

const products = [
  {
    prdcd: 'PR001',
    prdnm: 'Product 1',
    imageUrl: 'https://example.com/product1.jpg',
    bv: 20,
    priceWestDist: 10000,
    priceEastDist: 12000,
    priceWestCust: 11000,
    priceEastCust: 13000,
    weight: 1.5,
  },
  {
    prdcd: 'PR002',
    prdnm: 'Product 2',
    imageUrl: 'https://example.com/product2.jpg',
    bv: 15,
    priceWestDist: 8000,
    priceEastDist: 10000,
    priceWestCust: 9000,
    priceEastCust: 11000,
    weight: 1,
  },
  {
    prdcd: 'PR003',
    prdnm: 'Product 3',
    imageUrl: 'https://example.com/product3.jpg',
    bv: 25,
    priceWestDist: 15000,
    priceEastDist: 17000,
    priceWestCust: 16000,
    priceEastCust: 18000,
    weight: 2,
  },
  {
    prdcd: 'PR004',
    prdnm: 'Product 4',
    imageUrl: 'https://example.com/product4.jpg',
    bv: 30,
    priceWestDist: 20000,
    priceEastDist: 22000,
    priceWestCust: 21000,
    priceEastCust: 23000,
    weight: 2.5,
  },
  {
    prdcd: 'PR005',
    prdnm: 'Product 5',
    imageUrl: 'https://example.com/product5.jpg',
    bv: 10,
    priceWestDist: 5000,
    priceEastDist: 7000,
    priceWestCust: 6000,
    priceEastCust: 8000,
    weight: 0.5,
  },
];

const Test = () => {
  const { addToCart, items, totalHarga, totalBv } = useCartStore();

  console.log({ items, totalHarga, totalBv });

  return (
    <div>
      <div>
        {products.map((product) => (
          <div key={product.prdcd}>
            <h2>{product.prdnm}</h2>
            <img src={product.imageUrl} alt={product.prdnm} />
            <p>BV: {product.bv}</p>
            <p>Price (West Dist): {product.priceWestDist}</p>
            {/* <p>Price (East Dist): {product.priceEastDist}</p>
            <p>Price (West Cust): {product.priceWestCust}</p>
            <p>Price (East Cust): {product.priceEastCust}</p> */}
            <p>Weight: {product.weight}</p>
            <button onClick={() => addToCart(product, 1)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div>Total Harga {totalHarga}</div>
      <div>Total BV {totalBv}</div>
      <div>
        {items.map((item) => (
          <div key={item.prdcd}>
            <p>Product Code: {item.prdcd}</p>
            <p>Quantity: {item.qty}</p>
            <p>Harga: {item.priceWestDist}</p>
            <p>BV: {item.bv}</p>
            <p>Weight: {item.weight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
