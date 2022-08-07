const { create } = require('domain');
const fs = require ('fs');
const vl = require ('validator');

const dir = './database';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
};

const file = './database/kontak.json';
if (!fs.existsSync (file)) {
    fs.writeFileSync(file, '[]', 'utf-8');
};

const loadData = () => {
    const baca = fs.readFileSync('./database/kontak.json', 'utf-8');
    const buat = JSON.parse(baca);
    return buat;
};

const tambahKontak = (nama, email, nomor) => {
    const isi = {nama, email, nomor};
    const bacaAwal = loadData();

    const duplikat = bacaAwal.find((isi) => isi.nama === nama);
    if (duplikat) {
        console.log('Nama sudah ada, masukan nama lain');
        return false;
    }

    if (email) {
        if (!vl.isEmail (email)) {
            console.log('email yang anda masukan salah');
            return false;
        };
    };

    if (!vl.isMobilePhone (nomor, 'id-ID')){
        console.log('Nomor anda salah');
        return false;
    };

    bacaAwal.push(isi);
    fs.writeFileSync('./database/kontak.json', JSON.stringify(bacaAwal));
    console.log('Data berhasil ditambahkan')
}

const listKontak = () => {
    listing = loadData();
    console.log('DAFTAR KONTAK:');
    listing.forEach((listing, i) => {
        console.log(`${i+1}. ${listing.nama} - ${listing.nomor}`);
    });
};

const detailKontak = (nama) => {
    const listing = loadData();
    const lihat = listing.find((kontak) => kontak.nama.toLowerCase() === nama.toLowerCase());

    if(!lihat) {
        console.log(`Nama ${nama} tidak terdaftar`);
        return false;
    }
    
    console.log(lihat.nama);
    console.log(lihat.nomor);
    if (lihat.email){
    console.log(lihat.email);
    }
};

const deleteKontak = (nama) => {
    const listing = loadData();
    const newListing = listing.filter((kontak) => kontak.nama.toLowerCase() !== nama.toLowerCase());
    if (listing.length === newListing.length){
        console.log(`Nama ${nama} tidak ditemukan`);
        return false;
    }

    const isi = fs.writeFileSync('./database/kontak.json', JSON.stringify(newListing));
    console.log('Data berhasil dihapus');
}
module.exports = {tambahKontak, listKontak, deleteKontak, detailKontak};