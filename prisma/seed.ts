import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// async function seedData() {
//     data?.['DATA']?.map(async (store) => {
//         const storeData = {
//             phone: store?.tel_no,
//             storeType: store?.cob_code_nm,
//             category: store?.bizcnd_code_nm,
//             name: store?.upso_nm,
//             lng: store?.x_cnts,
//             lat: store?.y_dnts,
//             address: store?.rdn_code_nm,
//             foodCertifyName: store?.crtfc_gbn_nm,
//         };

//         const res = await prisma.store.create({
//             data: storeData,
//         });
//         console.log(res);
//     });
// }

async function main() {
    // await seedData();
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
