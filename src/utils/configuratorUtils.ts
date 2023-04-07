
// var XLSX = require("xlsx");



// const fetchXlxs = async () => {
//   // let workbook = await fetch(
//   //   "https://artsunitymovement-my.sharepoint.com/:x:/r/personal/rj_mahadev_aiota_solutions/_layouts/15/Doc.aspx?sourcedoc=%7BC0AF6743-90FB-46AB-89B6-CC19A433D726%7D&file=Configurator%20v2.3.xlsx&action=default&mobileredirect=true"
//   //   // 'https://artsunitymovement-my.sharepoint.com/:x:/g/personal/rj_mahadev_aiota_solutions/EUNnr8D7kKtGibbMGaQz1yYBfNOd0c0SSEbPxzm9_0s0Iw?e=FaLOuu'
//   // , 
//   // {
//   //   mode: "no-cors",
//   //   headers: {
//   //   'Access-Control-Allow-Origin':'*'
//   //   }
//   // }).then(res => { 
//   //     console.log(res)
//   //     return res.arrayBuffer();
//   // }).then(res => {
//   //     // console.log('file:', res);
//   //     // new Uint8Array(res), {
//   //     //   type: 'array'
//   //     // }
//   //     let workbook = XLSX.read(res);
//   //     console.log(workbook)
//   //     return workbook;
//   // });
//   let workbookUrl = "https://artsunitymovement-my.sharepoint.com/personal/rj_mahadev_aiota_solutions/_layouts/15/download.aspx?e=11mpJE&share=EUNnr8D7kKtGibbMGaQz1yYBfNOd0c0SSEbPxzm9_0s0Iw"

//   const readExcel = async (file: any) => {
//     const fileReader = await new FileReader()
//     fileReader.readAsArrayBuffer(file)

//     fileReader.onload = (e: any) => {
//       const bufferArray = e?.target.result
//       const wb = XLSX.read(bufferArray, { type: "buffer" })
//       const wsname = wb.SheetNames[0]
//       const ws = wb.Sheets[wsname]

//       const data = XLSX.utils.sheet_to_json(ws)
//       const fileName = file.name.split(".")[0]

//       console.log(data)
//     }
//   }

//   let workbook = await fetch(
//     workbookUrl
//     // "https://artsunitymovement-my.sharepoint.com/personal/rj_mahadev_aiota_solutions/_layouts/15/download.aspx?UniqueId=c0af6743%2D90fb%2D46ab%2D89b6%2Dcc19a433d726"
//     // 'https://artsunitymovement-my.sharepoint.com/:x:/r/personal/rj_mahadev_aiota_solutions/_layouts/15/Doc.aspx?sourcedoc=%7BC0AF6743-90FB-46AB-89B6-CC19A433D726%7D&file=Configurator%20v2.3.xlsx&action=default&mobileredirect=true'
//     ,
//   {
//       mode: "no-cors",
//       headers: {
//       'Access-Control-Allow-Origin':'*'
//       }
//     }).then(res => { 
//     return res.arrayBuffer();
//   }).then(res => {
//       console.log('file:', res);
//       var workbook = XLSX.read(new Uint8Array(res), {
//           type: 'array'
//       });
//       return workbook;
//   });

//   // const url = "https://artsunitymovement-my.sharepoint.com/:x:/g/personal/rj_mahadev_aiota_solutions/EUNnr8D7kKtGibbMGaQz1yYBfNOd0c0SSEbPxzm9_0s0Iw?e=FaLOuu";
//   // const data = await (await fetch(url)).arrayBuffer();
//   const worksheets = [];
//   // /* data is an ArrayBuffer */
//   // const workbook = XLSX.read(data);
//   for(const sheetName of workbook.SheetNames){
//     worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
//     console.log("json:\n", JSON.stringify(worksheets[sheetName]),"\n\n")
//   }
//   console.log('end of excel')
//   return worksheets;
// }

const convertToInternationalCurrencySystem = (labelValue:number) => {
  return parseFloat((Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2))
}


const calculateIncrementalRevenue = (rooms:number) => {
  let projectTimeAiota = 14
  let projectTimeOnSite = 20
  let squareFeetPerRoom = 500

  // let totalSquareFeet = squareFeetPerRoom * rooms

  let financialSavingPerMonth = 55000/8
  let financialSavings = financialSavingPerMonth * (projectTimeOnSite - projectTimeAiota)
  let occupancy = 0.55 //55%
  let adr = 125 //$125
  let additionalRoomRevenues = rooms * adr * occupancy * 30 * (projectTimeOnSite - projectTimeAiota)
  let benefitsTotal = financialSavings + additionalRoomRevenues

  return convertToInternationalCurrencySystem(benefitsTotal);
}

export { convertToInternationalCurrencySystem, calculateIncrementalRevenue }