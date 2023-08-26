# Prisma RSS usage

```
git clone https://github.com/BCsabaEngine/prisma-test
npm i

npm run seed:1m
npm run dev
```

retrieves 1m rows and concat data to one string that 25Mb only

displays RSS usage:

```
Start RSS: 213 Mb
Extract finished - 1000000 rows
Concat - 25 Mb
End RSS: 2085 Mb
```

when use PG native query (commented out in source code)

```
Start RSS: 213 Mb
Extract finished - 1000000 rows
Concat - 25 Mb
End RSS: 474 Mb
```