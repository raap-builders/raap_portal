
var XLSX = require("xlsx");

const fetchXlxs = async () => {
  // let data = await fetch(
  //   'https://artsunitymovement-my.sharepoint.com/:x:/g/personal/rj_mahadev_aiota_solutions/EUNnr8D7kKtGibbMGaQz1yYBfNOd0c0SSEbPxzm9_0s0Iw?e=FaLOuu'
  // , 
  // {
  //   mode: "no-cors",
  //   headers: {
  //   'Access-Control-Allow-Origin':'*'
  //   }
  // }).then(res => { 
  //     return res.arrayBuffer();
  // }).then(res => {
  //     console.log('file:', res);
  //     var workbook = XLSX.read(new Uint8Array(res), {
  //         type: 'array'
  //     });
  //     return workbook;
  // });
  const url = "https://artsunitymovement-my.sharepoint.com/:x:/g/personal/rj_mahadev_aiota_solutions/EUNnr8D7kKtGibbMGaQz1yYBfNOd0c0SSEbPxzm9_0s0Iw?e=FaLOuu";
  const data = await (await fetch(url)).arrayBuffer();
  /* data is an ArrayBuffer */
  const workbook = XLSX.read(data);
  return workbook;
}

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

export { convertToInternationalCurrencySystem, calculateIncrementalRevenue, fetchXlxs }