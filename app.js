const yargs = require('yargs');
const system = require('./system');

yargs.command({
    command: 'add',
    describe: 'Menambah data kontak',
    builder: {
        nama: {
        describe: 'Masukan nama kamu',
        demandOption: true,
        type: 'string',
        },
        email: {
            describe: 'Masukan email kamu',
            demandOption: false,
            type: 'string',
        },
        nomor: {
            describe: 'Masukan nomor HP kamu',
            demandOption: true,
            type: 'string',
        },
    },
    handler (argv) {
        const kontak = {
        nama: argv.nama,
        email: argv.email,
        nomor: argv.nomor,
        };
    system.tambahKontak(argv.nama, argv.email, argv.nomor);
    },
}).demandCommand();

yargs.command({
    command: 'list',
    describe: 'Memunculkan daftar kontak',
    handler() {
    system.listKontak();
    },
});

yargs.command({
    command: 'delete',
    describe: "Menghapus data kontak",
    builder: {
        nama: {
            describe: 'Nama yang ingin dhapus',
            demandOption: true,
            type: "string",
        },
    },
    handler (argv) {
        system.deleteKontak(argv.nama);
    },
});

yargs.command ({
    command: 'detail',
    describe: 'Mencari detail kontak',
    builder: {
        nama: {
            describe: 'Masukan nama yang ingin dicari',
            demandOption: true,
            type: 'string',
        },
    },
    handler (argv){
        system.detailKontak (argv.nama);
    },
});
yargs.parse();