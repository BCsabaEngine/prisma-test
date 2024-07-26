import { PrismaClient } from '@prisma/client'
require('dotenv').config()

import { getNativePgConnection } from './pg';

const prisma = new PrismaClient();

export type DbSampleRow = {
    id: string
    name: string
    address: string
}

const sql = `
SELECT 
    d."id",
    d."name",
    d."address"
FROM "Data" d
LIMIT 1000000`;

const run = async () => {

    /*
    const kafkaSchema = 'secondary';
    const kafkaTable = 'kafka';
    prisma.$transaction(async (prsm) => {
        const res = await prsm.data.create({
            data: {
                id: `date: ${Date.now().toString()}`,
                name: 'Példa',
                address: 'MBH Bank'
            }
        })
        await prsm.$executeRawUnsafe(`INSERT INTO ${kafkaSchema}.${kafkaTable} (id, topic, message) VALUES ($1, $2, $3)`, res.id, res.name, res.address);
        //await prsm.$executeRaw`INSERT INTO ${kafkaSchema}.kafka (id, topic, message) VALUES (${res.id}, ${res.name}, ${res.address})`;
    })

    return;
    */
    console.log(`Start RSS: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} Mb`);

    /* Prisma queryRawUnsafe */
    // const rows = await prisma.$queryRawUnsafe<DbSampleRow[]>(sql);
    // await prisma.$disconnect();

    /* Native pg */
    const pgConn = await getNativePgConnection("postgresql://postgres:dev@127.0.0.1:5432/prisma-test?schema=prisma-test");
    const rows = (await pgConn.query<DbSampleRow>(sql)).rows;
    await pgConn.end();

    console.log(`Extract finished - ${rows.length} rows`)
    const concat = rows.reduce((prev, curr) => prev + curr.id + curr.name + curr.address, '')
    console.log(`Concat - ${Math.round(concat.length / 1024 / 1024)} Mb`)

    console.log(`End RSS: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} Mb`);
}

run();