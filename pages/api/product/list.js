const handler = (req, res) => {
  res.status(200);
  res.json({
    errorCode: '00',
    data: [
      {
        productId: '01',
        brand: 'Apple',
        productName: 'Macbook Air M1',
        productDesc: 'lorem',
        price: 5000000,
        img: 'https://images.app.goo.gl/bLCET8PXauWkGtUd8',
        isBundling: 1,
        isi: [
          {
            idBundling: 11,
            namaBundling: 'Produk Ok',
            qtyBundling: 1,
          },
          {
            idBundling: 12,
            namaBundling: 'Produk Ok 2',
            qtyBundling: 2,
          },
        ],
      }, {
        productId: '02',
        brand: 'Apple',
        productName: 'Macbook Pro M1',
        price: 4000000,
        img: 'https://images.app.goo.gl/bLCET8PXauWkGtUd8',
        isBundling: 0,
        isi: [],
      }, {
        productId: '03',
        brand: 'Lenovo',
        productName: 'Lenovo ThinkPad X1',
        price: 3500000,
        img: 'https://images.app.goo.gl/bLCET8PXauWkGtUd8',
        isBundling: 0,
        isi: [],
      }, {
        productId: '04',
        brand: 'HP',
        productName: 'HP Pavilion X23',
        price: 4100000,
        img: 'https://images.app.goo.gl/bLCET8PXauWkGtUd8',
        isBundling: 0,
        isi: [],
      }, {
        productId: '05',
        brand: 'Asus',
        productName: 'Asus Vivobook 13',
        price: 4150000,
        img: 'https://images.app.goo.gl/bLCET8PXauWkGtUd8',
        isBundling: 1,
        isi: [
          {
            idBundling: 11,
            namaBundling: 'Produk Ok',
            qtyBundling: 2,
          },
          {
            idBundling: 12,
            namaBundling: 'Produk Ok 2',
            qtyBundling: 3,
          },
        ],
      },
    ],
  });
};
export default handler;
