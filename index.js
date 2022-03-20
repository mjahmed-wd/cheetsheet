const invoiceData = require('./sampleData/sampleData.json')
const fs = require('fs');

// const modifiedInvoice = []
// invoiceData.forEach(invoice => {
//     invoice?.itemList?.forEach((item, index, array) => {
//         if (index === 0) {
//             modifiedInvoice?.push({
//                 index: index+1,
//                 purchaseReceiveId: invoice?.purchaseReceiveCode,
//                 purchaseReceiveCode: invoice?.purchaseReceiveCode,
//                 receiveDate: invoice?.receiveDate,
//                 challanId: invoice?.challanId,
//                 supplierId: invoice?.supplierId,
//                 supplierName: invoice?.supplierName,
//                 netAmount: invoice?.netAmount,
//                 itemTotalAmount: invoice?.itemTotalAmount,
//                 rowSize: array?.length,
//                 ...item
//             })
//         } else {
//             modifiedInvoice?.push({
//                 purchaseReceiveId: "",
//                 purchaseReceiveCode: "",
//                 receiveDate: "",
//                 challanId: "",
//                 supplierId: "",
//                 supplierName: "",
//                 netAmount: "",
//                 itemTotalAmount: "",
//                 rowSize: 1,
//                 ...item
//             })
//         }
//     })
// });

const modifiedSupplierInfo = []

invoiceData.forEach((supplier, supplierIndex) => {
    supplier?.itemList?.forEach((item, index, array) => {
        if (index === 0) {
            modifiedSupplierInfo?.push({
                index: supplierIndex + 1,
                supplierId: supplier?.supplierId,
                supplierName: supplier?.supplierName,
                itemCount: supplier?.itemCount,
                totalAmount: supplier?.totalAmount,
                totalQuantity: supplier?.totalQuantity,
                rowSize: supplier?.itemList?.length,
                ...item
            })
        } else {
            modifiedSupplierInfo?.push({
                index: "",
                supplierId: "",
                supplierName: "",
                itemCount: "",
                totalAmount: "",
                totalQuantity: "",
                rowSize: "",
                ...item
            })
        }
    })
})

fs.writeFile('modifiedSupplierInfo.json', JSON.stringify(modifiedSupplierInfo), function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
});
console.log(modifiedSupplierInfo?.length);