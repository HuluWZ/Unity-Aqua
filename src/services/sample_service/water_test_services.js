const ApiResponse = require("../../configs/api_response");
const WaterTest = require("../../models/sample/waterTest");
const Tank = require("../../models/tank");
const Farmer = require("../../models/farmer");
const User = require("../../models/user");
const { Op } = require("sequelize");

const createWater = async (req, res) => {
  const { body } = req;
  let news = await WaterTest.create(body);

  if (!news) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, news);
};

const getAllWater = async (req, res) => {
  let newsList = await WaterTest.findAll({
    order: [["createdAt", "DESC"]],
    include: [{ model: Tank, include: [{ model: Farmer, include: User }] }],
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);
var newsFishAll = newsList.map((record) => {
  var trueConditionsForRecord = {};
  const fishPolyType = record.tank.cultureType == "Fish" || record.tank.cultureType == "Shrimp";
  const shrimpType = record.tank.cultureType == "Shrimp";
  if (record.ph !== null && (record.ph < 7.5 || record.ph > 8.5)) {
    trueConditionsForRecord.ph = record.ph;
  }

  if (record.temprature !== null && (record.temprature < 27 || record.temprature > 32)) {
    trueConditionsForRecord.temprature = record.temprature;
  }

  if (
    record.salinity !== null && shrimpType &&
    (record.salinity < 5 || record.salinity > 25)
  ) {
    trueConditionsForRecord.salinity = record.salinity;
  }

  if (
    record.salinity !== null && fishPolyType &&
    record.salinity != 0
  ) {
    trueConditionsForRecord.salinity = record.salinity;
  }

  if (record.co3 !== null && (record.co3 < 20 || record.co3 > 40)) {
    trueConditionsForRecord.co3 = record.co3;
  }

  if (record.hco3 !== null && shrimpType && (record.hco3 < 100 || record.hco3 > 150)) {
    trueConditionsForRecord.hco3 = record.hco3;
  }
  if (record.hco3 !== null && fishPolyType && (record.hco3 < 150 || record.hco3 > 400)) {
    trueConditionsForRecord.hco3 = record.hco3;
  }

  if (record.totalAlkanility !== null && shrimpType &&(record.totalAlkanility < 100 || record.totalAlkanility > 300)) {
    trueConditionsForRecord.totalAlkanility = record.totalAlkanility;
  }

  if (record.totalAlkanility !== null && fishPolyType &&(record.totalAlkanility < 150 || record.totalAlkanility > 500)) {
    trueConditionsForRecord.totalAlkanility = record.totalAlkanility;
  }

  if (record.totalHardness !== null && shrimpType && (record.totalHardness < 250 || record.totalHardness > 1800)) {
    trueConditionsForRecord.totalHardness = record.totalHardness;
  }
  if (record.totalHardness !== null && fishPolyType && (record.totalHardness < 100 || record.totalHardness > 300)) {
    trueConditionsForRecord.totalHardness = record.totalHardness;
  }
  if (record.ca !== null && (record.ca <= 100)) {
    trueConditionsForRecord.ca = record.ca;
  }

  if (record.mg !== null && (record.mg <= 200)) {
    trueConditionsForRecord.mg = record.mg;
  }

  if (record.k !== null && (record.k <= 100)) {
    trueConditionsForRecord.k = record.k;
  }

  if (record.fe !== null && (record.fe >= 1)) {
    trueConditionsForRecord.fe = record.fe;
  }

  if (record.na !== null && (record.na <= 1500)) {
    trueConditionsForRecord.na = record.na;
  }

  if (record.cl2 !== null && (record.cl2 !== 0)) {
    trueConditionsForRecord.cl2 = record.cl2;
  }

  if (record.tan !== null && (record.tan >= 0.5)) {
    trueConditionsForRecord.tan = record.tan;
  }

  if (record.nh3 !== null && (record.nh3 >= 0.1)) {
    trueConditionsForRecord.nh3 = record.nh3;
  }

  if (record.no2 !== null && (record.no2 >= 0.25)) {
    trueConditionsForRecord.no2 = record.no2;
  }

  if (record.h2s !== null && (record.h2s >= 0.01)) {
    trueConditionsForRecord.h2s = record.h2s;
  }

  if (record.co2 !== null && (record.co2 >= 10)) {
    trueConditionsForRecord.co2 = record.co2;
  }

  if (record.dissolvedOxygen !== null && (record.dissolvedOxygen <= 4)) {
    trueConditionsForRecord.dissolvedOxygen = record.dissolvedOxygen;
  }

  if (record.electricalConductivity !== null && shrimpType && (record.electricalConductivity < 800 || record.electricalConductivity > 2500)) {
    trueConditionsForRecord.electricalConductivity = record.electricalConductivity;
  }
 if (record.electricalConductivity !== null && fishPolyType && (record.electricalConductivity < 200 || record.electricalConductivity > 1000)) {
    trueConditionsForRecord.electricalConductivity = record.electricalConductivity;
  }
  // Assign the trueConditionsForRecord to the status field
  record.status = trueConditionsForRecord;

  return record;
});
  return ApiResponse.success(res, newsFishAll);
};
const getWater = async (req, res) => {
  const { id } = req.params;
  let newsList = await WaterTest.findByPk(id, {
    include: [{ model: Tank, include: [{ model: Farmer, include: User }] }],
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

var newsFishAll = (record) => {
  var trueConditionsForRecord = {};
  const fishPolyType =
    record.tank.cultureType == "Fish" || record.tank.cultureType == "Shrimp";
  const shrimpType = record.tank.cultureType == "Shrimp";
  if (record.ph !== null && (record.ph < 7.5 || record.ph > 8.5)) {
    trueConditionsForRecord.ph = record.ph;
  }

  if (
    record.temprature !== null &&
    (record.temprature < 27 || record.temprature > 32)
  ) {
    trueConditionsForRecord.temprature = record.temprature;
  }

  if (
    record.salinity !== null &&
    shrimpType &&
    (record.salinity < 5 || record.salinity > 25)
  ) {
    trueConditionsForRecord.salinity = record.salinity;
  }

  if (record.salinity !== null && fishPolyType && record.salinity != 0) {
    trueConditionsForRecord.salinity = record.salinity;
  }

  if (record.co3 !== null && (record.co3 < 20 || record.co3 > 40)) {
    trueConditionsForRecord.co3 = record.co3;
  }

  if (
    record.hco3 !== null &&
    shrimpType &&
    (record.hco3 < 100 || record.hco3 > 150)
  ) {
    trueConditionsForRecord.hco3 = record.hco3;
  }
  if (
    record.hco3 !== null &&
    fishPolyType &&
    (record.hco3 < 150 || record.hco3 > 400)
  ) {
    trueConditionsForRecord.hco3 = record.hco3;
  }

  if (
    record.totalAlkanility !== null &&
    shrimpType &&
    (record.totalAlkanility < 100 || record.totalAlkanility > 300)
  ) {
    trueConditionsForRecord.totalAlkanility = record.totalAlkanility;
  }

  if (
    record.totalAlkanility !== null &&
    fishPolyType &&
    (record.totalAlkanility < 150 || record.totalAlkanility > 500)
  ) {
    trueConditionsForRecord.totalAlkanility = record.totalAlkanility;
  }

  if (
    record.totalHardness !== null &&
    shrimpType &&
    (record.totalHardness < 250 || record.totalHardness > 1800)
  ) {
    trueConditionsForRecord.totalHardness = record.totalHardness;
  }
  if (
    record.totalHardness !== null &&
    fishPolyType &&
    (record.totalHardness < 100 || record.totalHardness > 300)
  ) {
    trueConditionsForRecord.totalHardness = record.totalHardness;
  }
  if (record.ca !== null && record.ca <= 100) {
    trueConditionsForRecord.ca = record.ca;
  }

  if (record.mg !== null && record.mg <= 200) {
    trueConditionsForRecord.mg = record.mg;
  }

  if (record.k !== null && record.k <= 100) {
    trueConditionsForRecord.k = record.k;
  }

  if (record.fe !== null && record.fe >= 1) {
    trueConditionsForRecord.fe = record.fe;
  }

  if (record.na !== null && record.na <= 1500) {
    trueConditionsForRecord.na = record.na;
  }

  if (record.cl2 !== null && record.cl2 !== 0) {
    trueConditionsForRecord.cl2 = record.cl2;
  }

  if (record.tan !== null && record.tan >= 0.5) {
    trueConditionsForRecord.tan = record.tan;
  }

  if (record.nh3 !== null && record.nh3 >= 0.1) {
    trueConditionsForRecord.nh3 = record.nh3;
  }

  if (record.no2 !== null && record.no2 >= 0.25) {
    trueConditionsForRecord.no2 = record.no2;
  }

  if (record.h2s !== null && record.h2s >= 0.01) {
    trueConditionsForRecord.h2s = record.h2s;
  }

  if (record.co2 !== null && record.co2 >= 10) {
    trueConditionsForRecord.co2 = record.co2;
  }

  if (record.dissolvedOxygen !== null && record.dissolvedOxygen <= 4) {
    trueConditionsForRecord.dissolvedOxygen = record.dissolvedOxygen;
  }

  if (
    record.electricalConductivity !== null &&
    shrimpType &&
    (record.electricalConductivity < 800 ||
      record.electricalConductivity > 2500)
  ) {
    trueConditionsForRecord.electricalConductivity =
      record.electricalConductivity;
  }
  if (
    record.electricalConductivity !== null &&
    fishPolyType &&
    (record.electricalConductivity < 200 ||
      record.electricalConductivity > 1000)
  ) {
    trueConditionsForRecord.electricalConductivity =
      record.electricalConductivity;
  }
  // Assign the trueConditionsForRecord to the status field
  record.status = trueConditionsForRecord;
  return record;
};
  return ApiResponse.success(res, newsFishAll(newsList));
};

const deleteWater = async (req, res) => {
  const { id } = req.params;
  if (!id) return ApiResponse.error(res, "News ID Not Found", 400);
  let newsList = await WaterTest.destroy({ where: { id: id } });

  if (newsList == 0) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

const updateWater = async (req, res) => {
  const { id } = req.params;
  var { body } = req;

  if (!id) return ApiResponse.error(res, "News ID Not Found", 400);
  let newsList = await WaterTest.update(body, {
    where: { id: id },
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};
const getAllComplexWater = async (req, res) => {
  var newsList = await WaterTest.findAll({
    where: {
      [Op.or]: [
        {
          ph: {
            [Op.and]: {
              [Op.ne]: null, // Check that the ph value is not null
              [Op.or]: {
                [Op.lt]: 7.5,
                [Op.gt]: 8.5,
              },
            },
          },
        },
        {
          temprature: {
            [Op.and]: {
              [Op.ne]: null, // Check that the ph value is not null
              [Op.or]: {
                [Op.lt]: 27,
                [Op.gt]: 32,
              },
            },
          },
        },
        {
          salinity: {
            [Op.and]: {
              [Op.ne]: null,
              [Op.ne]:0, // Check that the ph value is not null
            },
          },
        },
        {
          co3: {
            [Op.and]: {
              [Op.ne]: null, // Check that the ph value is not null
              [Op.or]: {
                [Op.lt]: 20,
                [Op.gt]: 40,
              },
            },
          },
        },
        {
          hco3: {
              [Op.and]: {
                [Op.ne]: null, // Check that the ph value is not null
                [Op.or]: {
                  [Op.lt]: 150,
                  [Op.gt]: 400,
                },
              },
          },
        },
        {
          totalAlkanility: {
              [Op.and]: {
                [Op.ne]: null, // Check that the ph value is not null
                [Op.or]: {
                  [Op.lt]: 150,
                  [Op.gt]: 500,
                },
              },
          },
        },
        {
          totalHardness: {
              [Op.and]: {
                [Op.ne]: null, // Check that the ph value is not null
                [Op.or]: {
                  [Op.lt]: 150,
                  [Op.gt]: 300,
                },
              },
          },
        },
        { ca: {
            [Op.and]: {
              [Op.ne]: null, // Check that the ph value is not null
              [Op.lte]: 100,
              },
            },
        }, 
      ,
        {
          mg: {
              [Op.and]: {
                [Op.ne]: null, // Check that the ph value is not null
                [Op.lte]: 200,
              },
            },
        },
        {
          k: {
              [Op.and]: {
                [Op.ne]: null, // Check that the ph value is not null
                [Op.lte]: 100,
              },
          },
        },
        {
          fe: {
              [Op.and]: {
                [Op.ne]: null, // Check that the ph value is not null
                [Op.gte]: 1,
              },
          },
        },
        { 
          na: {
              [Op.and]: {
                [Op.ne]: null, // Check that the ph value is not null
                [Op.lte]: 1500,
              },
        }, 
       },
        { cl2: {
              [Op.and]: {
                [Op.ne]: null, // Check that the ph value is not null
                [Op.ne]: 0,
              },
        }, 
        },
        { tan: {
              [Op.and]: {
              [Op.ne]: null, // Check that the ph value is not null
              [Op.gte]: 0.5,
          },

        }, },
        { nh3: {
              [Op.and]: {
              [Op.ne]: null, // Check that the ph value is not null
              [Op.gte]: 0.1,
          },

        }, },
        { no2: {
            [Op.and]: {
              [Op.ne]: null, // Check that the ph value is not null
              [Op.gte]: 0.25,
          },
         }, 
        },
        { h2s: {
            [Op.and]: {
              [Op.ne]: null, // Check that the ph value is not null
              [Op.gte]: 0.01,
          },
          }, 
        },
        { co2: {
            [Op.and]: {
              [Op.ne]: null, // Check that the ph value is not null
              [Op.gte]: 10,
          },
        }, },
        { 
          dissolvedOxygen: {
            [Op.and]: {
              [Op.ne]: null, // Check that the ph value is not null
              [Op.lte]: 4,
           },
         }, 
        },
        { 
          electricalConductivity: {
            [Op.and]: {
              [Op.ne]: null, // Check that the ph value is not null
              [Op.or]: {
                [Op.lt]: 200,
                [Op.gt]: 1000,
              },
            },
          },
        }, 
      ],
    },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Tank,
        where: { [Op.or]: [{ cultureType: "Poly" }, { cultureType: "Fish" }] },
        include: [{ model: Farmer, include: User }],
      },
    ],
  });
  var trueConditions = newsList.map((record) => {
    const trueConditionsForRecord = {};

    if (record.ph !== null && (record.ph < 7.5 || record.ph > 8.5)) {
      trueConditionsForRecord.ph = record.ph;
    }

    if (
      record.temprature !== null &&
      (record.temprature < 27 || record.temprature > 32)
    ) {
      trueConditionsForRecord.temprature = record.temprature;
    }

    if (
      record.salinity !== null &&
      (record.salinity < 5 || record.salinity > 25)
    ) {
      trueConditionsForRecord.salinity = record.salinity;
    }

    if (record.co3 !== null && (record.co3 < 20 || record.co3 > 40)) {
      trueConditionsForRecord.co3 = record.co3;
    }

    if (record.hco3 !== null && (record.hco3 < 150 || record.hco3 > 400)) {
      trueConditionsForRecord.hco3 = record.hco3;
    }

    if (
      record.totalAlkanility !== null &&
      (record.totalAlkanility < 150 || record.totalAlkanility > 500)
    ) {
      trueConditionsForRecord.totalAlkanility = record.totalAlkanility;
    }

    if (
      record.totalHardness !== null &&
      (record.totalHardness < 150 || record.totalHardness > 300)
    ) {
      trueConditionsForRecord.totalHardness = record.totalHardness;
    }

    if (record.ca !== null && record.ca <= 100) {
      trueConditionsForRecord.ca = record.ca;
    }

    if (record.mg !== null && record.mg <= 200) {
      trueConditionsForRecord.mg = record.mg;
    }

    if (record.k !== null && record.k <= 100) {
      trueConditionsForRecord.k = record.k;
    }

    if (record.fe !== null && record.fe >= 1) {
      trueConditionsForRecord.fe = record.fe;
    }

    if (record.na !== null && record.na <= 1500) {
      trueConditionsForRecord.na = record.na;
    }

    if (record.cl2 !== null && record.cl2 !== 0) {
      trueConditionsForRecord.cl2 = record.cl2;
    }

    if (record.tan !== null && record.tan >= 0.5) {
      trueConditionsForRecord.tan = record.tan;
    }

    if (record.nh3 !== null && record.nh3 >= 0.1) {
      trueConditionsForRecord.nh3 = record.nh3;
    }

    if (record.no2 !== null && record.no2 >= 0.25) {
      trueConditionsForRecord.no2 = record.no2;
    }

    if (record.h2s !== null && record.h2s >= 0.01) {
      trueConditionsForRecord.h2s = record.h2s;
    }

    if (record.co2 !== null && record.co2 >= 10) {
      trueConditionsForRecord.co2 = record.co2;
    }

    if (record.dissolvedOxygen !== null && record.dissolvedOxygen <= 4) {
      trueConditionsForRecord.dissolvedOxygen = record.dissolvedOxygen;
    }

    if (
      record.electricalConductivity !== null &&
      (record.electricalConductivity < 200 ||
        record.electricalConductivity > 1000)
    ) {
      trueConditionsForRecord.electricalConductivity =
        record.electricalConductivity;
    }

    // Assign the trueConditionsForRecord to the status field
    record.status = trueConditionsForRecord;

    return record;
  });

var newsFish = await WaterTest.findAll({
  where: {
    [Op.or]: [
      {
        ph: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.or]: {
              [Op.lt]: 7.5,
              [Op.gt]: 8.5,
            },
          },
        },
      },
      {
        temprature: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.or]: {
              [Op.lt]: 27,
              [Op.gt]: 32,
            },
          },
        },
      },
      {
        salinity: {
          [Op.and]: {
            [Op.ne]: null,
            [Op.or]: {
              [Op.lt]: 5,
              [Op.gt]: 25,
            },
          },
        },
      },
      {
        co3: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.or]: {
              [Op.lt]: 20,
              [Op.gt]: 40,
            },
          },
        },
      },
      {
        hco3: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.or]: {
              [Op.lt]: 100,
              [Op.gt]: 150,
            },
          },
        },
      },
      {
        totalAlkanility: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.or]: {
              [Op.lt]: 100,
              [Op.gt]: 300,
            },
          },
        },
      },
      {
        totalHardness: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.or]: {
              [Op.lt]: 250,
              [Op.gt]: 1800,
            },
          },
        },
      },
      {
        ca: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.lte]: 100,
          },
        },
      },
      ,
      {
        mg: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.lte]: 200,
          },
        },
      },
      {
        k: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.lte]: 100,
          },
        },
      },
      {
        fe: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.gte]: 1,
          },
        },
      },
      {
        na: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.lte]: 1500,
          },
        },
      },
      {
        cl2: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.ne]: 0,
          },
        },
      },
      {
        tan: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.gte]: 0.5,
          },
        },
      },
      {
        nh3: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.gte]: 0.1,
          },
        },
      },
      {
        no2: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.gte]: 0.25,
          },
        },
      },
      {
        h2s: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.gte]: 0.01,
          },
        },
      },
      {
        co2: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.gte]: 10,
          },
        },
      },
      {
        dissolvedOxygen: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.lte]: 4,
          },
        },
      },
      {
        electricalConductivity: {
          [Op.and]: {
            [Op.ne]: null, // Check that the ph value is not null
            [Op.or]: {
              [Op.lt]: 800,
              [Op.gt]: 2500,
            },
          },
        },
      },
    ],
  },
  order: [["createdAt", "DESC"]],
  include: [
    {
      model: Tank,
      where: { cultureType: "Shrimp" },
      include: [{ model: Farmer, include: User }],
    },
  ],
});
var trueConditionsFish = newsFish.map((record) => {
  const trueConditionsForRecord = {};

  if (record.ph !== null && (record.ph < 7.5 || record.ph > 8.5)) {
    trueConditionsForRecord.ph = record.ph;
  }

  if (record.temprature !== null && (record.temprature < 27 || record.temprature > 32)) {
    trueConditionsForRecord.temprature = record.temprature;
  }

  if (
    record.salinity !== null &&
    (record.salinity < 5 || record.salinity > 25)
  ) {
    trueConditionsForRecord.salinity = record.salinity;
  }

  if (record.co3 !== null && (record.co3 < 20 || record.co3 > 40)) {
    trueConditionsForRecord.co3 = record.co3;
  }

  if (record.hco3 !== null && (record.hco3 < 100 || record.hco3 > 150)) {
    trueConditionsForRecord.hco3 = record.hco3;
  }

  if (record.totalAlkanility !== null && (record.totalAlkanility < 100 || record.totalAlkanility > 300)) {
    trueConditionsForRecord.totalAlkanility = record.totalAlkanility;
  }

  if (record.totalHardness !== null && (record.totalHardness < 250 || record.totalHardness > 1800)) {
    trueConditionsForRecord.totalHardness = record.totalHardness;
  }

  if (record.ca !== null && (record.ca <= 100)) {
    trueConditionsForRecord.ca = record.ca;
  }

  if (record.mg !== null && (record.mg <= 200)) {
    trueConditionsForRecord.mg = record.mg;
  }

  if (record.k !== null && (record.k <= 100)) {
    trueConditionsForRecord.k = record.k;
  }

  if (record.fe !== null && (record.fe >= 1)) {
    trueConditionsForRecord.fe = record.fe;
  }

  if (record.na !== null && (record.na <= 1500)) {
    trueConditionsForRecord.na = record.na;
  }

  if (record.cl2 !== null && (record.cl2 !== 0)) {
    trueConditionsForRecord.cl2 = record.cl2;
  }

  if (record.tan !== null && (record.tan >= 0.5)) {
    trueConditionsForRecord.tan = record.tan;
  }

  if (record.nh3 !== null && (record.nh3 >= 0.1)) {
    trueConditionsForRecord.nh3 = record.nh3;
  }

  if (record.no2 !== null && (record.no2 >= 0.25)) {
    trueConditionsForRecord.no2 = record.no2;
  }

  if (record.h2s !== null && (record.h2s >= 0.01)) {
    trueConditionsForRecord.h2s = record.h2s;
  }

  if (record.co2 !== null && (record.co2 >= 10)) {
    trueConditionsForRecord.co2 = record.co2;
  }

  if (record.dissolvedOxygen !== null && (record.dissolvedOxygen <= 4)) {
    trueConditionsForRecord.dissolvedOxygen = record.dissolvedOxygen;
  }

  if (record.electricalConductivity !== null && (record.electricalConductivity < 200 || record.electricalConductivity > 1000)) {
    trueConditionsForRecord.electricalConductivity = record.electricalConductivity;
  }

  // Assign the trueConditionsForRecord to the status field
  record.status = trueConditionsForRecord;

  return record;
});

trueConditions.push(...trueConditionsFish);
  // console.log(trueConditionsFish, trueConditions);
  return ApiResponse.success(res, trueConditions);
};
module.exports = {
  createWater,
  getAllWater,
  getWater,
  deleteWater,
  updateWater,
  getAllComplexWater,
};
