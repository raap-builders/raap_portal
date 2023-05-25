const data = {
  average: 261.6,
  location: {
    "Arizona": {
      "Phoenix": 212.2,
      "Tuscon": 207.8,
    },
    "California": {
      "Anaheim": 268.0,
      "Bakersfield": 266.0,
      "Fresno": 271.0,
      "Los Angeles": 272.4,
      "Oxnard": 266.1,
      "Riverside": 267.9,
      "Sacramento": 277.9,
      "San Diego": 266.9,
      "San Francisco": 317.7,
      "Santa Barbara": 264.3,
      "Stockton": 276.8,
      "Vallejo": 287.9,
    }
  },
  // projectTypes: [
  //   "Hotel",
  //   "Student Housing",
  //   "Affordable Housing",
  //   "Data Center",
  //   "Franchise Store",
  // ],
  brand: [
    "Tru",
    "Home2",
    "Hampton"
  ],
  Layout: [
    "3D View",
    "Photo",
    "Layout"
  ],
  projectTypes: [
    "Bathroom Pod",
    "Volumetric Room",
    "Kitchen Pod"
  ],
  finishTypes: [
    "Glimmer",
    "Spark",
    "Burst"
  ],
  rooms: {
    kingRoom: 30,
    queenRoom: 30,
    standardRoom: 40,
    total: 80,
    min: 70,
    max: 150
  },
  notes: {
    title: "Notes",
    placeholderText: "Any other customizations?",
    submitButtonText: "Send me this Estimate"
  },
  disabledButtons: [
    "Home2",
    "Hampton",
    "Kitchen Pod"
  ]

}


// var kingRoom = 30
// var queenRoom = 30
// var standardRoom = 40

// var rooms=(kingRoom+queenRoom+standardRoom)

// var sqft = rooms*500
// var RSMeans //Location value here


// var finishesList = {
//   "Base (Class C)":1.0,
//   "Standard (Class B)":1.05,
//   "Premium (Class A)":1.10,
// }
// var finish = "Base (Class C)"

// var amenitiesList = {
//   "Base":1.0,
//   "Standard":1.05,
//   "Premium":1.10,
//   "Suites":1.01,
//   "ADA Rooms":1.05,
// }
// var amenities = "Base"

// var suites = 20 //% Suites (Up to 50%), 20%
// var ada = 20 //% ADA (Up to 30%)

// var rev = (12375*rooms)+41250
// var roomDesign = sqft*1.5*.5
// var modCost = sqft*130*(RSMeans/261.6)*finishesList[finish]*amenitiesList[amenities]
// var modRoomCost=modCost*(1-(suites/100))*(1-(ada/100))
// var modSuiteCost=modCost*(suites/100)*1.01
// var modADACost=modCost*(ada/100)*1.05
// var totalModCost=modRoomCost+modSuiteCost+modADACost
// var roomFFE=5000*rooms*.75
// var fees=(roomDesign+totalModCost)*.035
// var cost = roomDesign+totalModCost+roomFFE+fees-rev //cost = RaaP Room Cost

// var siteDesign = sqft*6*.5
// var siteCost = sqft*135*(RSMeans/261.6)*finish*amenities
// var siteRoomCost=siteCost*(1-(suites/100))*(1-(ada/100))
// var siteSuiteCost=siteRoomCost*(suites/100)*1.01
// var siteADACost=siteRoomCost*(ada/100)*1.05
// var totalSiteCost=siteRoomCost+siteSuiteCost+siteADACost
// var siteFFE=5000*rooms*.75
// var onSiteCost = siteDesign+totalSiteCost+siteFFE  //on_site = ON Site Room Cost
// var modSiteCost = sqft*140*(RSMeans/261.6)
// var modSiteFFE=5000*rooms*.25
// var projectCost = roomDesign+modSiteCost+modSiteFFE+cost  //projectCost = RaaP Building Cost
// var onSiteProject = siteDesign+modSiteCost+modSiteFFE+onSiteCost  //on_site_project = ON Site Project Cost


// cost_percent = RaaP room cost vs on-site room cost
// project_cost_percent = RaaP project cost vs on-site project cost

export function getValues(rooms, rsMeans) {
  
  var rooms = rooms
  const king = 0.50
  const RSMeans = rsMeans || 261.6;
  const RSMeansAvg = 261.6
  const startBuild = 0
  const schematics = 2
  const raapPreCon = 3
  const sitePreCon = 5
  const raapPermits = 4
  const sitePermits = 5
  let siteWork = 0
  if (rooms < 100) { siteWork = 5; } else { siteWork = 6; }
  var raapBuild = Math.round(rooms / 16.67)
  var siteBuild = Math.round(rooms / 8.33)
  var queen = 1 - king
  const roomSqft = 500
  const bathSqft = 150
  const commonMultiple = 0.1
  const finSavInput = 68.75
  const daysPerMonth = 30
  const revPerRoom = 75
  const adaPercent = 0.06
  const adaCostFactor = 1.05
  const raapRoomDesignCost = 0
  const siteRoomDesignCost = 2
  const raapRoomCostPerSqft = 100
  const siteRoomCostPerSqft = 110
  const ffe = 3750
  const raapDesignFees = 0.015
  const raapFabFees = 0.03
  const raapBldgDesignCost = 1.6
  const siteBldgDesignCost = 2
  const BldgCostPerSqft = 80
  var buildSchematics = startBuild + schematics


  var raapPlans = schematics + raapPreCon
  var sitePlans = schematics + sitePreCon
  var raapLoan = raapPlans + raapPermits
  var siteLoan = sitePlans + sitePermits
  var raapFoundation = raapLoan + siteWork
  var siteFoundation = siteLoan + siteWork
  var raapComplete = raapBuild + raapFoundation
  var siteComplete = siteBuild + siteFoundation
  var raapTimeSav = (siteComplete - raapComplete) / siteComplete
  var finSav = finSavInput * rooms * (siteComplete - raapComplete)
  var roomRev = rooms * revPerRoom * (siteComplete - raapComplete) * daysPerMonth
  var raapRev = finSav + roomRev
  var raapRoomDesign = roomSqft * rooms * raapRoomDesignCost
  var siteRoomDesign = roomSqft * rooms * siteRoomDesignCost
  var raapRoomCost = roomSqft * raapRoomCostPerSqft * rooms * (RSMeans / RSMeansAvg) * ((1 - adaPercent) + (adaPercent * adaCostFactor))
  var siteRoomCost = roomSqft * siteRoomCostPerSqft * rooms * (RSMeans / RSMeansAvg) * ((1 - adaPercent) + (adaPercent * adaCostFactor))
  var roomFFE = ffe * rooms
  var raapDesignCost = raapDesignFees * (raapRoomCost + roomFFE)
  var raapFabCost = raapFabFees * (raapRoomCost + roomFFE)
  var raapTotRoomCost = raapRoomDesign + raapRoomCost + roomFFE + raapDesignCost + raapFabCost
  var siteTotRoomCost = siteRoomDesign + siteRoomCost + roomFFE
  var netRoomCost = raapTotRoomCost - raapRev
  var raapRoomSav = (siteTotRoomCost - raapTotRoomCost) / siteTotRoomCost
  var raapCostSav = (siteTotRoomCost - netRoomCost) / siteTotRoomCost
  var raapPerRoom = (netRoomCost / rooms)
  var raapPerSqft = (netRoomCost / (roomSqft * rooms))
  var bldgSqft = rooms * roomSqft * 1.1
  var raapBldgDesign = bldgSqft * raapBldgDesignCost
  var siteBldgDesign = bldgSqft * siteBldgDesignCost
  var BldgCost = bldgSqft * (RSMeans / RSMeansAvg) * BldgCostPerSqft
  var raapBldgCost = raapBldgDesign + BldgCost
  var siteBldgCost = siteBldgDesign + BldgCost
  var raapTotalCost = raapTotRoomCost + raapBldgCost
  var siteTotalCost = siteTotRoomCost + siteBldgCost
  var netTotalCost = raapTotalCost - raapRev
  var raapTotalSav = (siteTotalCost - raapTotalCost) / siteTotalCost
  var raapNetSav = (siteTotalCost - netTotalCost) / siteTotalCost
  var raapNetPerRoom = (netTotalCost / rooms)
  var raapNetPerSqft = (netTotalCost / bldgSqft)

  return {
    siteTotalCost,
    raapTotalCost,
    netTotalCost,
    raapNetPerRoom,
    raapNetPerSqft,
    raapComplete,
    siteComplete,
    raapPlans,
    sitePlans,
    raapLoan,
    siteLoan,
    raapFoundation,
    siteFoundation,
    buildSchematics,
  }
}



// var projectTimeAiota = 14
// var projectTimeOnSite = 20
// var squareFeetPerRoom = 500

// var totalSquareFeet = squareFeetPerRoom * rooms

// var financialSavingPerMonth = 55000/8
// var financialSavings = financialSavingPerMonth * (projectTimeOnSite - projectTimeAiota)
// var occupancy = 0.55 //55%
// var adr = 125 //$125
// var additionalRoomRevenues = rooms * adr * occupancy * 30 * (projectTimeOnSite - projectTimeAiota)
// var benefitsTotal = financialSavings + additionalRoomRevenues


// console.log(getValues(30))


export default data;
