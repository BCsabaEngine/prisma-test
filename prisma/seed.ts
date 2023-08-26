import { PrismaClient } from '@prisma/client'

const rndStr = () => (Math.random() + 1).toString(36).substring(2);

const prisma = new PrismaClient()
async function main() {
    let id = 0;

    for (let i = 0; i < 1000; i++)
        await prisma.$transaction(async (tx) => {
            for (let j = 0; j < 1000; j++)
                await tx.data.create({
                    data: {
                        id: (id++).toString(),
                        name: rndStr(),
                        address: rndStr(),
                    }
                })
            console.log(`${(i + 1) * 1000} rows added`);
        })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })