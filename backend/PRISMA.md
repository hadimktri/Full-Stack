# prisma

$ npm i --save-dev prisma
$ npx prisma init --datasource provider postgresql
$ npx prisma format
$ npx prisma migrate dev --name init
$ npm i @prisma/client
$ npx prisma generate
$ npx prisma studio

# code

peisma.user.findFirst()
peisma.user.findMany()
peisma.user.create({data:{neme:"hadi"}})
prisma.$disconnect
