const nodemailer = require('nodemailer');
const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'tu_usuario',
  password: 'tu_contraseña',
  host: 'localhost',
  port: 5432,
  database: 'nombre_basedatos'
});

// Conexión a la base de datos
pool.connect((error, client, release) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    release(); // Libera el cliente de la pool
  } else {
    console.log('Conexión exitosa a la base de datos');

    // Consulta los productos de la tabla "products"
    client.query('SELECT name, availableQty, price FROM products', (error, result) => {
      if (error) {
        console.error('Error al obtener los productos:', error);
      } else {
        const productos = result.rows;

        // Datos de la factura
        const factura = {
          nombre: 'Juan Carlos Gonzales',
          productos: productos,
          total: 0
        };

        // Calcula el total de la factura y actualiza la cantidad disponible en el inventario
        productos.forEach(producto => {
          factura.total += producto.price;

          // Resta la cantidad facturada del inventario
          const cantidadFacturada = 1; // Cantidad a facturar (en este ejemplo, se asume una cantidad de 1)
          const nuevaCantidad = producto.availableqty - cantidadFacturada;

          // Actualiza la cantidad disponible en la base de datos
          client.query('UPDATE products SET availableqty = $1 WHERE name = $2', [nuevaCantidad, producto.name], (error, result) => {
            if (error) {
              console.error('Error al actualizar la cantidad disponible del producto:', error);
            }
          });
        });

        // Crea el cuerpo del correo electrónico
        const mensaje = `
          Estimado ${factura.nombre},

          Gracias por tu compra. A continuación se detalla la factura de los productos adquiridos:

          Productos:
          ${factura.productos.map(producto => `- ${producto.name}: $${producto.price}`).join('\n')}

          Total: $${factura.total}

          ¡Gracias por tu preferencia!

          Atentamente,
          Tu tienda en línea
        `;

        // Configuración del transporte de correo
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'tu_correo@gmail.com', // Cambia esto con tu dirección de correo
            pass: 'tu_contraseña' // Cambia esto con tu contraseña de correo
          }
        });

        // Configuración del correo electrónico
        const mailOptions = {
          from: 'tu_correo@gmail.com', // Cambia esto con tu dirección de correo
          to: 'juan.carlos@gmail.com', // Cambia esto con el correo de Juan Carlos Gonzales
          subject: 'Factura de compra',
          text: mensaje
        };

        // Envío del correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error al enviar el correo:', error);
          } else {
            console.log('Correo enviado:', info.response);
          }

          release(); //
