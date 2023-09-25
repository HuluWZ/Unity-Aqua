const ApiResponse = require("../configs/api_response");
const {State,District} = require("../models/stateDistrict");
const Fuse = require("fuse.js");
var indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];
const indianDistricts = [
  // Andhra Pradesh
  "Visakhapatnam",
  "Krishna",
  "Guntur",
  "Nellore",
  "Chittoor",

  // Arunachal Pradesh
  "Itanagar Capital Complex",
  "Tawang",
  "West Kameng",
  "East Kameng",
  "Lower Subansiri",

  // Assam
  "Kamrup (Metropolitan)",
  "Kamrup (Rural)",
  "Dibrugarh",
  "Nagaon",
  "Cachar",

  // Bihar
  "Patna",
  "Gaya",
  "Muzaffarpur",
  "Bhagalpur",
  "Darbhanga",

  // Chhattisgarh
  "Raipur",
  "Durg",
  "Bilaspur",
  "Bastar",
  "Raigarh",

  // Goa
  "North Goa",
  "South Goa",

  // Gujarat
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Rajkot",
  "Bhavnagar",

  // Haryana
  "Gurgaon",
  "Faridabad",
  "Rohtak",
  "Hisar",
  "Sonipat",

  // Himachal Pradesh
  "Shimla",
  "Kangra",
  "Mandi",
  "Solan",
  "Una",

  // Jharkhand
  "Ranchi",
  "Dhanbad",
  "Bokaro",
  "Jamshedpur",
  "Hazaribagh",

  // Karnataka
  "Bangalore Urban",
  "Bangalore Rural",
  "Belagavi (Belgaum)",
  "Mysuru (Mysore)",
  "Hubballi-Dharwad",

  // Kerala
  "Thiruvananthapuram",
  "Ernakulam",
  "Kozhikode",
  "Thrissur",
  "Kottayam",

  // Madhya Pradesh
  "Indore",
  "Bhopal",
  "Jabalpur",
  "Gwalior",
  "Ujjain",

  // Maharashtra
  "Mumbai City",
  "Mumbai Suburban",
  "Thane",
  "Pune",
  "Nagpur",

  // Manipur
  "Imphal East",
  "Imphal West",
  "Thoubal",
  "Bishnupur",
  "Churachandpur",

  // Meghalaya
  "East Khasi Hills",
  "West Garo Hills",
  "East Garo Hills",
  "Ri-Bhoi",
  "West Jaintia Hills",

  // Mizoram
  "Aizawl",
  "Lunglei",
  "Champhai",
  "Serchhip",
  "Mamit",

  // Nagaland
  "Dimapur",
  "Kohima",
  "Mokokchung",
  "Tuensang",
  "Mon",

  // Odisha
  "Khordha",
  "Cuttack",
  "Ganjam",
  "Balasore",
  "Puri",

  // Punjab
  "Ludhiana",
  "Amritsar",
  "Jalandhar",
  "Patiala",
  "Bathinda",

  // Rajasthan
  "Jaipur",
  "Jodhpur",
  "Kota",
  "Bikaner",
  "Udaipur",

  // Sikkim
  "East Sikkim",
  "West Sikkim",
  "South Sikkim",
  "North Sikkim",

  // Tamil Nadu
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Tiruchirappalli",
  "Salem",

  // Telangana
  "Hyderabad",
  "Rangareddy",
  "Medchal-Malkajgiri",
  "Warangal Urban",
  "Nizamabad",

  // Tripura
  "West Tripura",
  "Sepahijala",
  "Gomati",
  "Dhalai",
  "South Tripura",

  // Uttar Pradesh
  "Lucknow",
  "Kanpur",
  "Agra",
  "Varanasi",
  "Meerut",

  // Uttarakhand
  "Dehradun",
  "Haridwar",
  "Nainital",
  "Udham Singh Nagar",

  // West Bengal
  "Kolkata",
  "Howrah",
  "North 24 Parganas",
  "South 24 Parganas",
  "Bardhaman (Burdwan)",
];

const createState = async (req, res) => {
  console.log(req.body);
  let book = await State.create(req.body);
  
  if (!book) return ApiResponse.error(res, "Something Went Wrong", 200);
  
  return ApiResponse.success(res, book);
};

const getAllState = async (req, res) => {
  let bookList = await State.findAll({
    order: [["createdAt", "DESC"]],
  });

  if (!bookList) return ApiResponse.error(res, "Something Went Wrong", 200);
  
  return ApiResponse.success(res, bookList);
};

const deleteState = async (req, res) => {
  const { id } = req.params;
  if (!id) return ApiResponse.error(res, "State ID Not Found", 400);
  
  let bookList = await State.destroy({
    where: {
      id: id,
    },
  });

  if (bookList == 0)
    return ApiResponse.error(res, "No State with this Id ", 200);

  return ApiResponse.success(res, bookList);
};

const getState = async (req, res) => {
  const { id } = req.params;

  if (!id) return ApiResponse.error(res, "State ID Not Found", 400);
  let bookList = await State.findOne({ where: { id: id } });

  if (!bookList) return ApiResponse.error(res, "No State with this Id ", 200);

  return ApiResponse.success(res, bookList);
};
const updateState = async (req, res) => {
  var body = req.body;
  const { id } = req.params;

  if (!id) return ApiResponse.error(res, "State ID Not Found", 400);
  let booksList = await State.update(body, {
    where: { id: id },
  });

  if (!booksList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, booksList);
};

const importState = async (req, res) => {
  var allState = []
  const val = indianStates.map((state)=>{
    allState.push({name:state});
  })
  let bookList = await State.bulkCreate(allState);

  if (bookList.length != indianstates.length) return ApiResponse.error(res, "Unable to import All ", 200);

  return ApiResponse.success(res, bookList);
};

const createDistrict = async (req, res) => {
  let book = await District.create(req.body);

  if (!book) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, book);
};

const getAllDistrict = async (req, res) => {
  let bookList = await District.findAll({
    order: [["createdAt", "DESC"]],
  });

  if (!bookList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, bookList);
};

const deleteDistrict = async (req, res) => {
  const { id } = req.params;
  if (!id) return ApiResponse.error(res, "District ID Not Found", 400);
  let bookList = await District.destroy({
    where: {
      id: id,
    },
  });

  if (bookList == 0)
    return ApiResponse.error(res, "No District with this Id ", 200);

  return ApiResponse.success(res, bookList);
};

const getDistrict = async (req, res) => {
  const { id } = req.params;
  if (!id) return ApiResponse.error(res, "District ID Not Found", 400);
  let bookList = await District.findOne({ where: { id: id } });

  if (!bookList) return ApiResponse.error(res, "No District with this Id ", 200);

  return ApiResponse.success(res, bookList);
};
const updateDistrict = async (req, res) => {
  var body = req.body;
  const { id } = req.params;

  if (!id) return ApiResponse.error(res, "District ID Not Found", 400);
  let booksList = await District.update(body, {
    where: { id: id },
  });

  if (!booksList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, booksList);
};
const importDistrict = async (req, res) => {
  var allState = [];
  const val = indianDistricts.map((state) => {
    allState.push({ name: state });
  });
  let bookList = await District.bulkCreate(allState);

  if (bookList.length != indianDistricts.length)
    return ApiResponse.error(res, "Unable to import All ", 200);

  return ApiResponse.success(res, bookList);
};
module.exports = {
  createState,
  getAllState,
  getState,
  deleteState,
  updateState,
  importState,
  createDistrict,
  getAllDistrict,
  getDistrict,
  deleteDistrict,
  updateDistrict,
  importDistrict,
};
