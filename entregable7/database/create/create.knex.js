const knexConfig = require ("../config");
const knex = require('knex')(knexConfig);

knex.schema.createTable('products', table =>{
    table.increments('id'),
    table.string('title').notNullable(),
    table.float('price').notNullable(),
    table.string('url').notNullable()
}).then(()=>{
    console.info('Table created');
}).catch(err =>{
    console.error(err)
}).finally(() => {
    knex.destroy();
})

knex.schema.createTable('messages', table =>{
    table.string('userEmail').notNullable(),
    table.string('time').notNullable(),
    table.string('message').notNullable()
}).then(()=>{
    console.info('Table created');
}).catch(err =>{
    console.error(err)
}).finally(() => {
    knex.destroy();
})

const cargaProducts = [
    {
        "title": "Escuadra",
        "price": 123.45,
        "url": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png"
      },
      {
        "title": "Calculadora",
        "price": 234.56,
        "url": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png"
      },
      {
        "title": "Globo Terraqueo",
        "price": 345.67,
        "url": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-512.png"
      },
      {
        "title": "Reloj",
        "price": "234.02",
        "url": "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-512.png"
      }
]

knex('products').insert(cargaProducts).then(data =>{
    console.log("productos cargados")
}).catch(err =>{
    console.error(err)
}).finally(()=>{
    knex.destroy();
});

