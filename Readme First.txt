1. running migration
npx sequelize db:migrate

2. running seeder (atau anda tidak masuk ke halaman admin)
npx sequelize-cli db:seed:all

3. halaman admin dan halaman user memiliki alamat yang berbeda 
admin = http://localhost:8081/loginAdmin
user = http://localhost:8081/login 

4. aplikasi dibagi dalam berbagai folder 
- 4.a api terdapat pada folder api
- 4.b semua logika apliaksi ada pada folder controller.

