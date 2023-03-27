
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