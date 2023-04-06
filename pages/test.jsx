saya punya 2 table

nama table : tbl_varian_product
nama field : id_variant,kode_product,warna
isi record :
1,A1,Hitam
1,A2,Putih
1,A3,Merah
1,A4,Kuning
2,B1,Biru
2,B2,Hijau

nama table : tbl_bundling
nama field : id_variant,jumlah,kode_bundling
1,2,BUN1
2,2,BUN1


tbl_varian_product dan tbl_bundling memiliki relasi yang di hubungkan dengan id_variant
misal id_variant = 1 di tbl_bundling, bila dilihat di tbl_variant_product, itu ada 4 record
nah jumlah = 2, itu mengindikasikan bahwa maksimum qty untuk id_variant = 1 adalah 2 dengan id_variant = 1 (misal kode_product = A1)

hasil yang mungkin seperti ini :
kode_bundling, kode_product, qty
BUN1-1,A1,2
BUN1-1,B1,2

dari contoh di atas untuk varian A1 qty nya 2 dan varian B1 qty nya 2, karena terbatas pada nilai 2 pada field jumlah pada tbl_bundling
namun bisa saja hasilnya seperti ini :

kode_bundling, kode_product, qty
BUN1-1,A1,1
BUN1-1,A2,1
BUN1-1,B1,2

atau juga 

kode_bundling, kode_product, qty
BUN1-1,A1,2
BUN1-1,B1,1
BUN1-1,B1,1

atau bisa juga

kode_bundling, kode_product, qty
BUN1-1,A1,1
BUN1-1,A2,1
BUN1-1,B1,1
BUN1-1,B2,1

nah saya ingin setiap jenis kombinasi ini, kode bundling nya berbeda beda dari BUN1-1 sampai BUN-(n)

BUN1-1,A1,2
BUN1-1,B1,2

total qty nya adalah 4, karena masing2 id_variant jumlah nya adalah 2

BUN1-2,A1,1
BUN1-2,A2,1
BUN1-2,B1,2

total qty nya adalah 4, karena masing2 id_variant jumlah nya adalah 2, hanya saja id_variant 1 itu ada A1 dan A2 dengan masing2 qty 1

A1,1 dan A2,1 dan B1,1 dan B2,1 (total qty: 4)
A2,1 dan A3,1 dan B1,1 dan B2,1 (total qty: 4)
A3,1 dan A4,1 dan B1,1 dan B2,1 (total qty: 4)


public function get_combinations($bundling_code)
{
    // Ambil semua data dari tabel tbl_bundling yang sesuai dengan kode bundling yang diberikan
    $bundling_data = $this->db->get_where('tbl_bundling', array('kode_bundling' => $bundling_code))->result_array();
    
    // Inisialisasi array kosong untuk menampung semua kombinasi
    $combinations = array();
    
    // Looping setiap record di tabel tbl_bundling
    foreach ($bundling_data as $row) {
        // Ambil data dari tabel tbl_varian_product yang sesuai dengan id_variant dari record yang sedang di-looping
        $varian_data = $this->db->get_where('tbl_varian_product', array('id_variant' => $row['id_variant']))->result_array();
        
        // Looping setiap record di tabel tbl_varian_product
        foreach ($varian_data as $varian) {
            // Jumlah maksimum adalah jumlah dari record yang sedang di-looping di tabel tbl_bundling
            $max_qty = $row['jumlah'];
            
            // Looping untuk semua nilai qty dari 1 sampai max_qty
            for ($i = 1; $i <= $max_qty; $i++) {
                // Tambahkan kombinasi baru ke dalam array
                $combinations[] = array(
                    'kode_bundling' => $bundling_code,
                    'kode_product' => $varian['kode_product'],
                    'warna' => $varian['warna'],
                    'qty' => $i
                );
            }
        }
    }
    
    // Return hasil dari semua kombinasi yang ditemukan
    return $combinations;
}
