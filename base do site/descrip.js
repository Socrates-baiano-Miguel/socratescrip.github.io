document.addEventListener('DOMContentLoaded', () => {
    const imageMapping = {
        'X': 'l.jpg',
        'H': 'm.png',
        'M': 'jv.jpg',
        'S': 'lp.jpg',
        'Ç': 'digs.jpg',
        'F': 'gabd.jpg',
        'A': 'joj.jpg',
        'K': 'maconha.jpg',
        'Â': 'anb.jpg',
        'Z': 'rafs.jpg',
        'Ã': 'tau.jpg',
        'L': 'camis.jpg',
        'J': 'joseph.jpg',
        '?': 'lin.jpg',
        'C': 'migsm.jpg',
        'Õ': 'omt.jpg',
        'B': 'gabs.jpg',
        'T': 'rango.jpg',
        'Á': 'alin.jpg',
        '#': 'luana.jpg',
        'D': 'joooj.jpg',
        'G': 'linlin.jpg',
        'Q': 'jjjj.jpg',
        'W': 'jjjj.jpg',
        'Ô': 'amimir.jpg',
        'É': 'lulu.jpg',
        'I': 'lulum.jpg',
        'Û': 'lçç.jpg',
        'N': 'lel.jpg',
        'Ê': 'rangotwo.jpg',
        'Í': 'rt.jpg',
        '!': 'rangotree.jpg',
        'Ó': 'hum.jpg',
        '%': 'rangofour.jpg',
        'E': 'cachorro.jpg',
        'O': 'calvo.jpg',
        'Í': 'aaaaaaaaa.jpg',
        'V': 'dá.jpg',
    };

    const searchBar = document.getElementById('searchBar');
    const imageContainer = document.getElementById('imageContainer');
    const downloadAllButton = document.getElementById('downloadAll');

    searchBar.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const inputText = searchBar.value.toUpperCase();
            searchBar.value = '';
            imageContainer.innerHTML = '';
            let imagesToDownload = [];

            for (let char of inputText) {
                if (char === ' ') {
                    const spacer = document.createElement('div');
                    spacer.className = 'spacer';
                    imageContainer.appendChild(spacer);
                    continue;
                }

                if (imageMapping[char]) {
                    const container = document.createElement('div');
                    
                    const img = document.createElement('img');
                    img.src = `/img/${imageMapping[char]}`;
                    img.alt = char;

                    imagesToDownload.push({ src: img.src, filename: `${char}.png` });

                    container.appendChild(img);
                    imageContainer.appendChild(container);
                }
            }

            if (imagesToDownload.length > 0) {
                downloadAllButton.style.display = 'block';
                downloadAllButton.onclick = () => downloadAllImages(imagesToDownload);
            } else {
                downloadAllButton.style.display = 'none';
            }
        }
    });

    function downloadAllImages(images) {
        const zip = new JSZip();
        const imgFolder = zip.folder("figurinhas");

        images.forEach(img => {
            const filename = img.filename;
            const url = img.src;

            fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    imgFolder.file(filename, blob);
                    if (images.indexOf(img) === images.length - 1) {
                        zip.generateAsync({ type: 'blob' })
                            .then(content => {
                                const link = document.createElement('a');
                                link.href = URL.createObjectURL(content);
                                link.download = 'figurinhas.zip';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            });
                    }
                });
        });
    }
});
