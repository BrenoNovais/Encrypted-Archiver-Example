var fs = require('fs');
const archiver = require('archiver')
archiver.registerFormat('zip-encrypted', require("archiver-zip-encrypted"))

//-----------------DESTINO,---SENHA,----ARQUIVO------------------\\
function encrypt({ content,  password,  file}) {

    const archive = archiver.create('zip-encrypted', {
        zlib: { level: 8 },
        encryptionMethod: 'aes256',
        password,
    });

    archive.pipe(content)

    archive.file(file)

    return archive.finalize()
}

encrypt({
    content: fs.createWriteStream("./teste.zip"), //CAMINHO FINAL PARA O ARQUIVO ZIPADO
    file: "teste.sql",       //ARQUIVO QUE SERA COMPACTADO DENTRO DO .ZIP
    password: 'senhateste',  //SENHA PARA ACESSAR O .ZIP
})