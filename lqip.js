// Importa os pacotes necessários
const lqip = require('lqip');
const fs = require('fs');
const path = require('path');

// Qual pasta será verificada.
const dir = 'imgs/'; 

// Onde as imagens serão gravadas.
const dest = 'imgs/placeholders';

// A função readdir() lista o nome e extensão 
// (no caso de arquivos) de todo conteúdo de uma pasta, 
// sejam arquivos, outras pastas, ou o que for.
fs.readdir(dir,(err,contents) => {
	// Filtra somente os arquivos de imagem com a 
	// exetenção aceita pelo lqip (PNG e JPG).
	const images = contents.filter((content)=>{
		return path.extname(content).toLowerCase() == '.jpg' ||
		       path.extname(content).toLowerCase() == '.png';
	})
	
	// Cria e salva o placeholder a partir das imagens
	// que passaram na filtragem.
	images.forEach(image =>{
		const filePath = dir + image;
		const outputFileName = image.split('.').shift().toString() + '-placeholder'
		lqip.base64(filePath)
		.then(res => {
			const base64String = res.split(';base64,').pop();

			fs.writeFile(image, base64String, {encoding: 'base64'},err=>{
				console.log('file created!')
			})
		});
	});
});