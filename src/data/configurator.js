const data = {
  average:261.6,
  location: {
    "Arizona":{
      "Phoenix":212.2,
      "Tuscon":207.8,
    },
    "California":{
      "Anaheim":268.0,
      "Bakersfield":266.0,
      "Fresno":271.0,
      "Los Angeles":272.4,
      "Oxnard":266.1,
      "Riverside":267.9,
      "Sacramento":277.9,
      "San Diego":266.9,
      "San Francisco":317.7,
      "Santa Barbara":264.3,
      "Stockton":276.8,
      "Vallejo":287.9,
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
    min:70,
    max:150
  },
  notes: {
    title: "Notes",
    placeholderText: "Enter text here",
    submitButtonText: "Send me this Estimate"
  }
}


var kingRoom = 30
var queenRoom = 30
var standardRoom = 40

var rooms=(kingRoom+queenRoom+standardRoom)

var sqft = rooms*500
var RSMeans //Location value here


var finishesList = {
  "Base (Class C)":1.0,
  "Standard (Class B)":1.05,
  "Premium (Class A)":1.10,
}
var finish = "Base (Class C)"

var amenitiesList = {
  "Base":1.0,
  "Standard":1.05,
  "Premium":1.10,
  "Suites":1.01,
  "ADA Rooms":1.05,
}
var amenities = "Base"

var suites = 20 //% Suites (Up to 50%), 20%
var ada = 20 //% ADA (Up to 30%)

var rev = (12375*rooms)+41250
var roomDesign = sqft*1.5*.5
var modCost = sqft*130*(RSMeans/261.6)*finishesList[finish]*amenitiesList[amenities]
var modRoomCost=modCost*(1-(suites/100))*(1-(ada/100))
var modSuiteCost=modCost*(suites/100)*1.01
var modADACost=modCost*(ada/100)*1.05
var totalModCost=modRoomCost+modSuiteCost+modADACost
var roomFFE=5000*rooms*.75
var fees=(roomDesign+totalModCost)*.035
var cost = roomDesign+totalModCost+roomFFE+fees-rev //cost = RaaP Room Cost

var siteDesign = sqft*6*.5
var siteCost = sqft*135*(RSMeans/261.6)*finish*amenities
var siteRoomCost=siteCost*(1-(suites/100))*(1-(ada/100))
var siteSuiteCost=siteRoomCost*(suites/100)*1.01
var siteADACost=siteRoomCost*(ada/100)*1.05
var totalSiteCost=siteRoomCost+siteSuiteCost+siteADACost
var siteFFE=5000*rooms*.75
var onSiteCost = siteDesign+totalSiteCost+siteFFE  //on_site = ON Site Room Cost
var modSiteCost = sqft*140*(RSMeans/261.6)
var modSiteFFE=5000*rooms*.25
var projectCost = roomDesign+modSiteCost+modSiteFFE+cost  //projectCost = RaaP Building Cost
var onSiteProject = siteDesign+modSiteCost+modSiteFFE+onSiteCost  //on_site_project = ON Site Project Cost


//cost_percent = RaaP room cost vs on-site room cost
//project_cost_percent = RaaP project cost vs on-site project cost





var projectTimeAiota = 14
var projectTimeOnSite = 20
var squareFeetPerRoom = 500

var totalSquareFeet = squareFeetPerRoom * rooms

var financialSavingPerMonth = 55000/8
var financialSavings = financialSavingPerMonth * (projectTimeOnSite - projectTimeAiota)
var occupancy = 0.55 //55%
var adr = 125 //$125
var additionalRoomRevenues = rooms * adr * occupancy * 30 * (projectTimeOnSite - projectTimeAiota)
var benefitsTotal = financialSavings + additionalRoomRevenues



export default data;