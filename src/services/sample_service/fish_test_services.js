const ApiResponse = require("../../configs/api_response");
const FishTest = require("../../models/sample/fishTest");
const Tank = require("../../models/tank");
const Farmer = require("../../models/farmer");
const User = require("../../models/user");
const { Op } = require("sequelize");

const createFish = async (req, res) => {
  const {body} = req;
  let news = await FishTest.create(body);

  if (!news) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, news);
};

const getAllFish = async (req, res) => {
  let newsList = await FishTest.findAll({
    order: [["createdAt", "DESC"]],
    include: [{ model: Tank, include: [{ model: Farmer, include: User }] }],
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);
var trueConditionsFishTest = newsList.map((record) => {
  const trueConditionsForRecord = {
    // id: record.id,
  };

  if (record.bodyColour !== "Normal") {
    trueConditionsForRecord.bodyColour = record.bodyColour;
  }

  if (record.bodyTexture !== "Normal") {
    trueConditionsForRecord.bodyTexture = record.bodyTexture;
  }

  if (record.mucus !== "Normal") {
    trueConditionsForRecord.mucus = record.mucus;
  }

  if (record.eyes !== "Normal") {
    trueConditionsForRecord.eyes = record.eyes;
  }

  if (record.finsColour !== "Normal") {
    trueConditionsForRecord.finsColour = record.finsColour;
  }

  if (record.gills !== "Red") {
    trueConditionsForRecord.gills = record.gills;
  }

  if (record.intestines !== "Normal") {
    trueConditionsForRecord.intestines = record.intestines;
  }

  if (record.internalBloodLumps !== "Mild") {
    trueConditionsForRecord.internalBloodLumps = record.internalBloodLumps;
  }

  if (record.liver !== "Normal") {
    trueConditionsForRecord.liver = record.liver;
  }

  if (record.gut !== "Normal") {
    trueConditionsForRecord.gut = record.gut;
  }

  if (record.gallBladder !== "Normal") {
    trueConditionsForRecord.gallBladder = record.gallBladder;
  }

  if (record.redDisease !== "Mild") {
    trueConditionsForRecord.redDisease = record.redDisease;
  }

  if (record.ulcerativeDropsy !== "Mild") {
    trueConditionsForRecord.ulcerativeDropsy = record.ulcerativeDropsy;
  }

  if (record.abdominalDropsy !== "Mild") {
    trueConditionsForRecord.abdominalDropsy = record.abdominalDropsy;
  }

  if (record.bodyColumnaris !== "Mild") {
    trueConditionsForRecord.bodyColumnaris = record.bodyColumnaris;
  }

  if (record.gillColumnaris !== "Mild") {
    trueConditionsForRecord.gillColumnaris = record.gillColumnaris;
  }

  if (record.epizooticUlcerativeSyndrome !== "Mild") {
    trueConditionsForRecord.epizooticUlcerativeSyndrome =
      record.epizooticUlcerativeSyndrome;
  }

  if (record.dactylogyrus !== "Mild") {
    trueConditionsForRecord.dactylogyrus = record.dactylogyrus;
  }

  if (record.gyrodactylus !== "Mild") {
    trueConditionsForRecord.gyrodactylus = record.gyrodactylus;
  }

  if (record.trichodina !== "Mild") {
    trueConditionsForRecord.trichodina = record.trichodina;
  }

  if (record.myxobolus !== "Mild") {
    trueConditionsForRecord.myxobolus = record.myxobolus;
  }

  if (record.anchorWormORLernaea !== "Mild") {
    trueConditionsForRecord.anchorWormORLernaea = record.anchorWormORLernaea;
  }

  if (record.argulus !== "Mild") {
    trueConditionsForRecord.argulus = record.argulus;
  }

  if (record.finRotORTailrot !== "Mild") {
    trueConditionsForRecord.finRotORTailrot = record.finRotORTailrot;
  }

  if (record.hemorrhagicSepticemia !== "Mild") {
    trueConditionsForRecord.hemorrhagicSepticemia =
      record.hemorrhagicSepticemia;
  }
  // Create the status field with the JSON-like content
  record.status = trueConditionsForRecord;
  return record;
});
  return ApiResponse.success(res, trueConditionsFishTest);
};
const getFish = async (req, res) => {
  const { id } = req.params;
  let newsList = await FishTest.findByPk(id, {
    include: [{ model: Tank, include: [{ model: Farmer, include: User }] }],
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);
var trueConditionsFishTest = (record) => {
  const trueConditionsForRecord = {
    // id: record.id,
  };

  if (record.bodyColour !== "Normal") {
    trueConditionsForRecord.bodyColour = record.bodyColour;
  }

  if (record.bodyTexture !== "Normal") {
    trueConditionsForRecord.bodyTexture = record.bodyTexture;
  }

  if (record.mucus !== "Normal") {
    trueConditionsForRecord.mucus = record.mucus;
  }

  if (record.eyes !== "Normal") {
    trueConditionsForRecord.eyes = record.eyes;
  }

  if (record.finsColour !== "Normal") {
    trueConditionsForRecord.finsColour = record.finsColour;
  }

  if (record.gills !== "Red") {
    trueConditionsForRecord.gills = record.gills;
  }

  if (record.intestines !== "Normal") {
    trueConditionsForRecord.intestines = record.intestines;
  }

  if (record.internalBloodLumps !== "Mild") {
    trueConditionsForRecord.internalBloodLumps = record.internalBloodLumps;
  }

  if (record.liver !== "Normal") {
    trueConditionsForRecord.liver = record.liver;
  }

  if (record.gut !== "Normal") {
    trueConditionsForRecord.gut = record.gut;
  }

  if (record.gallBladder !== "Normal") {
    trueConditionsForRecord.gallBladder = record.gallBladder;
  }

  if (record.redDisease !== "Mild") {
    trueConditionsForRecord.redDisease = record.redDisease;
  }

  if (record.ulcerativeDropsy !== "Mild") {
    trueConditionsForRecord.ulcerativeDropsy = record.ulcerativeDropsy;
  }

  if (record.abdominalDropsy !== "Mild") {
    trueConditionsForRecord.abdominalDropsy = record.abdominalDropsy;
  }

  if (record.bodyColumnaris !== "Mild") {
    trueConditionsForRecord.bodyColumnaris = record.bodyColumnaris;
  }

  if (record.gillColumnaris !== "Mild") {
    trueConditionsForRecord.gillColumnaris = record.gillColumnaris;
  }

  if (record.epizooticUlcerativeSyndrome !== "Mild") {
    trueConditionsForRecord.epizooticUlcerativeSyndrome =
      record.epizooticUlcerativeSyndrome;
  }

  if (record.dactylogyrus !== "Mild") {
    trueConditionsForRecord.dactylogyrus = record.dactylogyrus;
  }

  if (record.gyrodactylus !== "Mild") {
    trueConditionsForRecord.gyrodactylus = record.gyrodactylus;
  }

  if (record.trichodina !== "Mild") {
    trueConditionsForRecord.trichodina = record.trichodina;
  }

  if (record.myxobolus !== "Mild") {
    trueConditionsForRecord.myxobolus = record.myxobolus;
  }

  if (record.anchorWormORLernaea !== "Mild") {
    trueConditionsForRecord.anchorWormORLernaea = record.anchorWormORLernaea;
  }

  if (record.argulus !== "Mild") {
    trueConditionsForRecord.argulus = record.argulus;
  }

  if (record.finRotORTailrot !== "Mild") {
    trueConditionsForRecord.finRotORTailrot = record.finRotORTailrot;
  }

  if (record.hemorrhagicSepticemia !== "Mild") {
    trueConditionsForRecord.hemorrhagicSepticemia =
      record.hemorrhagicSepticemia;
  }
  // Create the status field with the JSON-like content
  record.status = trueConditionsForRecord;
  return record;
};
  return ApiResponse.success(res, trueConditionsFishTest(newsList));
};

const deleteFish = async (req, res) => {
  const { id } = req.params;
  if (!id) return ApiResponse.error(res, "News ID Not Found", 400);
  let newsList = await FishTest.destroy({ where: { id: id } });

  if (newsList == 0) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

const updateFish = async (req, res) => {
  const { id } = req.params;
  var { body } = req;

  if (!id) return ApiResponse.error(res, "News ID Not Found", 400);
  let newsList = await FishTest.update(body, {
    where: { id: id },
  });

  if (!newsList) return ApiResponse.error(res, "Something Went Wrong", 200);

  return ApiResponse.success(res, newsList);
};

const getAllComplexFish = async (req, res) => {
  let newsList = await FishTest.findAll({
    where: {
      [Op.or]: [
        { bodyColour: { [Op.ne]: "Normal" } },
        { bodyTexture: { [Op.ne]: "Normal" } },
        { mucus: { [Op.ne]: "Normal" } },
        { eyes: { [Op.ne]: "Normal" } },
        { finsColour: { [Op.ne]: "Normal" } },
        { gills: { [Op.ne]: "Red" } },
        { intestines: { [Op.ne]: "Normal" } },
        { internalBloodLumps: { [Op.ne]: "Mild" } },
        { liver: { [Op.ne]: "Normal" } },
        { gut: { [Op.ne]: "Normal" } },
        { gallBladder: { [Op.ne]: "Normal" } },
        { redDisease: { [Op.ne]: "Mild" } },
        { ulcerativeDropsy: { [Op.ne]: "Mild" } },
        { abdominalDropsy: { [Op.ne]: "Mild" } },
        { bodyColumnaris: { [Op.ne]: "Mild" } },
        { gillColumnaris: { [Op.ne]: "Mild" } },
        { epizooticUlcerativeSyndrome: { [Op.ne]: "Mild" } },
        { dactylogyrus: { [Op.ne]: "Mild" } },
        { gyrodactylus: { [Op.ne]: "Mild" } },
        { trichodina: { [Op.ne]: "Mild" } },
        { myxobolus: { [Op.ne]: "Mild" } },
        { anchorWormORLernaea: { [Op.ne]: "Mild" } },
        { argulus: { [Op.ne]: "Mild" } },
        { finRotORTailrot: { [Op.ne]: "Mild" } },
        { hemorrhagicSepticemia: { [Op.ne]: "Mild" } },
      ],
    },
    order: [["createdAt", "DESC"]],
    include: [{ model: Tank, include: [{ model: Farmer, include: User }] }],
  });
var trueConditionsFishTest = newsList.map((record) => {
  const trueConditionsForRecord = {
    // id: record.id,
  };

  if (record.bodyColour !== "Normal") {
    trueConditionsForRecord.bodyColour = record.bodyColour;
  }

  if (record.bodyTexture !== "Normal") {
    trueConditionsForRecord.bodyTexture = record.bodyTexture;
  }

  if (record.mucus !== "Normal") {
    trueConditionsForRecord.mucus = record.mucus;
  }

  if (record.eyes !== "Normal") {
    trueConditionsForRecord.eyes = record.eyes;
  }

  if (record.finsColour !== "Normal") {
    trueConditionsForRecord.finsColour = record.finsColour;
  }

  if (record.gills !== "Red") {
    trueConditionsForRecord.gills = record.gills;
  }

  if (record.intestines !== "Normal") {
    trueConditionsForRecord.intestines = record.intestines;
  }

  if (record.internalBloodLumps !== "Mild") {
    trueConditionsForRecord.internalBloodLumps = record.internalBloodLumps;
  }

  if (record.liver !== "Normal") {
    trueConditionsForRecord.liver = record.liver;
  }

  if (record.gut !== "Normal") {
    trueConditionsForRecord.gut = record.gut;
  }

  if (record.gallBladder !== "Normal") {
    trueConditionsForRecord.gallBladder = record.gallBladder;
  }

  if (record.redDisease !== "Mild") {
    trueConditionsForRecord.redDisease = record.redDisease;
  }

  if (record.ulcerativeDropsy !== "Mild") {
    trueConditionsForRecord.ulcerativeDropsy = record.ulcerativeDropsy;
  }

  if (record.abdominalDropsy !== "Mild") {
    trueConditionsForRecord.abdominalDropsy = record.abdominalDropsy;
  }

  if (record.bodyColumnaris !== "Mild") {
    trueConditionsForRecord.bodyColumnaris = record.bodyColumnaris;
  }

  if (record.gillColumnaris !== "Mild") {
    trueConditionsForRecord.gillColumnaris = record.gillColumnaris;
  }

  if (record.epizooticUlcerativeSyndrome !== "Mild") {
    trueConditionsForRecord.epizooticUlcerativeSyndrome =
      record.epizooticUlcerativeSyndrome;
  }

  if (record.dactylogyrus !== "Mild") {
    trueConditionsForRecord.dactylogyrus = record.dactylogyrus;
  }

  if (record.gyrodactylus !== "Mild") {
    trueConditionsForRecord.gyrodactylus = record.gyrodactylus;
  }

  if (record.trichodina !== "Mild") {
    trueConditionsForRecord.trichodina = record.trichodina;
  }

  if (record.myxobolus !== "Mild") {
    trueConditionsForRecord.myxobolus = record.myxobolus;
  }

  if (record.anchorWormORLernaea !== "Mild") {
    trueConditionsForRecord.anchorWormORLernaea = record.anchorWormORLernaea;
  }

  if (record.argulus !== "Mild") {
    trueConditionsForRecord.argulus = record.argulus;
  }

  if (record.finRotORTailrot !== "Mild") {
    trueConditionsForRecord.finRotORTailrot = record.finRotORTailrot;
  }

  if (record.hemorrhagicSepticemia !== "Mild") {
    trueConditionsForRecord.hemorrhagicSepticemia =
      record.hemorrhagicSepticemia;
  }
  // Create the status field with the JSON-like content
  record.status = trueConditionsForRecord;

  return record;
});

  return ApiResponse.success(res, trueConditionsFishTest);
};
module.exports = {
  createFish,
  getAllFish,
  getFish,
  deleteFish,
  updateFish,
  getAllComplexFish,
};
