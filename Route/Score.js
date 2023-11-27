// ./Route/Info.js
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const db = require('../Database/Connect');
const info = require('../Database/Model/University_score');

// Define a route to get university_info based on University_Name
router.get('/', async (req, res) => {
  try {
    const { university_name,sat_25, sat_operator  } = req.query;
    const defaultSatOperator = 'eq';
    const validOperators = ['eq', 'ne', 'lt', 'lte', 'gt', 'gte'];

    // Validate and set the sat_operator value from the URL parameter or use 'eq' as default
    const selectedSatOperator = validOperators.includes(sat_operator) ? sat_operator : defaultSatOperator;

    // If University_Name parameter is provided, fetch specific university info
    if (university_name) {
      const universityInfo = await info.findOne({
        attributes: ['university_name', 'sat_25', 'sat_75', 'act_25', 'act_75'],
        where: { university_name }

      });

      if (!universityInfo) {
        return res.status(404).json({ message: 'University info not found for the specified name' });
      }

      return res.json(universityInfo);
    }
    if (sat_25) {
      const SATscore = await info.findAll({
        attributes: ['university_name', 'sat_25', 'sat_75', 'act_25', 'act_75'],
        where: { sat_25 :{
            [Op[selectedSatOperator]]: sat_25,
        } }
      });

      if (!SATscore ) {
        return res.status(404).json({ message: 'No university found with the specified condition' });
      }

      return res.json(SATscore);
    }


    // If no parameter provided, fetch all university info
    const allUniversityInfo = await info.findAll({
        attributes: ['university_name', 'sat_25', 'sat_75', 'act_25', 'act_75']
    });

    if (!allUniversityInfo || allUniversityInfo.length === 0) {
      return res.status(404).json({ message: 'No university info found' });
    }

    res.json(allUniversityInfo);
  } catch (error) {
    console.error('Error fetching university info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
