const request = require ("supertest")('http://localhost:8080')
const expect = require('chai').expect



describe('test de api' ,() =>{
    describe('GET', () =>{
        it('deberia retornar un status 200', async () =>{
            let response = await request.get('/producto/api')
            expect(response.status).to.eql(200)
        })
    })
    describe('POST', () =>{
        it('deberia agregar un producto', async () => {
            let producto = {
                title:'compas',
                price: 200.00,
                url:"https://cdn3.iconfinder.com/data/icons/education-209/64/microscope-lab-science-school-512.png"
            }
            let response = await (await request.post('/agregar')).send(producto)
            expect(response.status).to.eql(200)

            const prod = response.body
            expect(prod).to.include.keys('title','price','url')
            expect(prod.title).to.eql(producto.title)
            expect(prod.price).to.eql(producto.price)
            expect(prod.url).to.eql(producto.url)
        })
    })
})