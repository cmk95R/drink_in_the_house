import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Para resolver __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFilePath = path.join(__dirname, '../db-json/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    index: (req, res) => {
        const { keywords } = req.query; // Capturamos el término de búsqueda

        // Filtrar los productos si hay una palabra clave
        const filteredProducts = keywords
            ? products.filter(product => product.nombre_producto.toLowerCase().includes(keywords.toLowerCase()))
            : products;

        return res.render('index.ejs', {
            products: filteredProducts,  // Pasamos los productos filtrados
            toThousand,
            keywords // Pasamos el término de búsqueda a la vista para mantenerlo en el formulario
        });
    }
};

export default controller;
