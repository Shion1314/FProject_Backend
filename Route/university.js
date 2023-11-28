// ./Route/Info.js
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const db = require("../Database/Connect");
const info = require("../Database/Model/University");

/** GET university by ID*/
router.get("/:id", async (req, res) => {
  let college = await info.findByPk(req.params.id);
  res.status(200).json(college);
});

// Define a route to get university_info based on University_Name
router.get("/", async (req, res) => {
  const { university_name, sat_score_25th, act_score_25th, sat_operator } = req.query;
  const defaultSatOperator = "eq";
  const validOperators = ["eq", "ne", "lt", "lte", "gt", "gte"];

  const selectedSatOperator = validOperators.includes(sat_operator)
    ? sat_operator
    : defaultSatOperator;

  // If University_Name parameter is provided, fetch specific university info
  if (university_name) {
    const universityInfo = await info.findOne({
      attributes: [
        "university_name",
        "sat_score_25th",
        "sat_score_75th",
        "act_score_25th",
        "act_score_75th",
        "gpa_avg",
        "admissions_rate",
        "tuition_instate_full",
        "tuition_outstate_full",
        "popular_major",
        "id",
      ],
      where: { university_name },
    });

    if (!universityInfo) {
      return res.status(404).json({ message: "University info not found for the specified name" });
    }

    return res.json(universityInfo);
  }

  // If sat_score_25th parameter is provided, fetch all university info that fit the description
  if (sat_score_25th) {
    const SATscore = await info.findAll({
      attributes: [
        "university_name",
        "sat_score_25th",
        "sat_score_75th",
        "act_score_25th",
        "act_score_75th",
        "gpa_avg",
        "admissions_rate",
        "tuition_instate_full",
        "tuition_outstate_full",
        "popular_major",
        "id",
      ],
      where: {
        sat_score_25th: {
          [Op[selectedSatOperator]]: sat_score_25th,
        },
      },
    });

    if (!SATscore) {
      return res.status(404).json({ message: "No university found with the specified condition" });
    }

    return res.json(SATscore);
  }
  // If act_score_25th parameter is provided, fetch all university info that fit the description
  if (act_score_25th) {
    const ACTscore = await info.findAll({
      attributes: [
        "university_name",
        "sat_score_25th",
        "sat_score_75th",
        "act_score_25th",
        "act_score_75th",
        "gpa_avg",
        "admissions_rate",
        "tuition_instate_full",
        "tuition_outstate_full",
        "popular_major",
        "id",
      ],
      where: {
        act_score_25th: {
          [Op[selectedSatOperator]]: act_score_25th,
        },
      },
    });

    if (!ACTscore) {
      return res.status(404).json({ message: "No university found with the specified condition" });
    }

    return res.json(ACTscore);
  }

  // If no parameter provided, fetch all university info
  const allUniversityInfo = await info.findAll({
    attributes: [
      "university_name",
      "sat_score_25th",
      "sat_score_75th",
      "act_score_25th",
      "act_score_75th",
      "gpa_avg",
      "admissions_rate",
      "tuition_instate_full",
      "tuition_outstate_full",
      "popular_major",
      "id",
    ],
  });

  if (!allUniversityInfo || allUniversityInfo.length === 0) {
    return res.status(404).json({ message: "No university info found" });
  }

  res.json(allUniversityInfo);
});
// POST given correct body
router.post("/", async (req, res) => {
  let NewUniversity = await info.create(req.body);
  res.status(200).json(NewUniversity);
});

//Delete base on id
router.delete("/:id", async (req, res) => {
  await info.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json("University deleted");
});

//PUT
router.put("/:id", async (req, res) => {
  await info.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  let university_info = await info.findByPk(req.params.id);
  res.status(201).json(university_info);
});

module.exports = router;
