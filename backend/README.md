$ npm init

$ npm i --save-dev typescript ts-node @types/node

# tsconfig.json needs to be changed for prisma

https://www.prisma.io/docs/guides/upgrade-guides/upgrade-from-prisma-1/upgrading-prisma-binding-to-nexus#12-configure-typescript
{
"compilerOptions": {
"skipLibCheck": true,
"strict": true,
"rootDir": "src",
"noEmit": true
},
"include": ["src/**/*"]
}



# nodemon

$ npn i --save-dev nodemon
$ "dev": "nodemon app.ts"
$ npm run dev



