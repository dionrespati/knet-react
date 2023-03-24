const handler = (req, res) => {
  res.status(200);
  res.json({
    errorCode: '0',
    data: [
      {
        id: 1,
        name: 'Home',
        path: '/',
        submenu: [],
      },
      {
        id: 3,
        name: 'Product',
        path: '/product',
        submenu: [
          {
            id: 31,
            name: 'Beauty Care',
            path: '/product/1',
            submenu: [],
          },
          {
            id: 32,
            name: 'Health Care',
            path: '/product/2',
            submenu: [],
          },
          {
            id: 33,
            name: 'Fragance',
            path: '/product/3',
            submenu: [],
          },
        ],
      },
    ],
  });
};
export default handler;
