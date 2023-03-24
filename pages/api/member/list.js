const handler = (req, res) => {
  res.status(200);
  res.json({
    errorCode: '0',
    data: [
      { id: 1, nama: 'J B Dion Adry Respati' },
      { id: 2, nama: 'Toto Widianto Adi' },
      { id: 3, nama: 'Mohammad Idris Asrianto' },
      { id: 4, nama: 'Dwi Bayu Anggara Putra' },
      { id: 5, nama: 'Umar Bahabasi' },
      { id: 6, nama: 'Muammar Qadhafi' },
      { id: 7, nama: 'Roby Romadhany' },
      { id: 8, nama: 'Fifien Amelia' },
      { id: 9, nama: 'Vera Yunita' },
    ],
  });
};
export default handler;
