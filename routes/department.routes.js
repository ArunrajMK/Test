const { Router } = require("express");
const { departmentModel } = require("../module/department.model");
const router = Router();

router.post("/", async (req, res) => {
  const {
    firm_name,
    firm_type,
    location,
    employee_count,
    resque_vehicle,
    timings,
    depart_id,
    name,
    email,
    proof,
    password,
    mobile
  } = req.body;



  const new_department = new departmentModel({
    firm_name: firm_name,
    firm_type:firm_type,
    location:{
        street: location.street,
        city: location.city,
        state: location.state,
        postalCode: location.postalCode,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude
    },
    employee_count: employee_count,
    resque_vehicle: resque_vehicle,
    timings:timings,
    depart_id:depart_id,
    name:name,
    email:email,
    password:password,
    mobile:mobile,
    proof: {
        aadhar_image_url:proof.aadhar_image_url ,
        aadhar_image_id:proof.aadhar_image_id ,
        licence_number:proof.licence_number,
        licence_image_url:proof.licence_image_url,
        licence_image_id:proof.licence_image_id
    }
  });

  const result = await departmentModel.findOne({ firm_name });
  if (result) {
    res.send({
      success: false,
      message: "Department already exist",
    });
  } else {
    await new_department.save();
    res.send({
      success: true,
      message: "Success",
    });
  }
});

router.get("/", async (req, res) => {
    const { firm_name, firm_type, location } = req.query;
    let query = {};
  
    if (firm_name) {
      query.firm_name = firm_name;
    }
  
    if (firm_type) {
      query.firm_type = firm_type;
    }
  
    if (location) {
        query.location = {};
        if (location.state) {
          query.location.state = location.state;
        }
        if (location.city) {
          query.location.city = location.city;
        }
        if (location.street) {
          query.location.street = location.street;
        }
        if (location.country) {
          query.location.country = location.country;
        }
    }
    try {
      const departments = await departmentModel.find(query);
      res.send({
        departments,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal Server Error",
      });
    }
  });


router.delete("/:id", async (req, res) => {
  const departmentId = req.params.id;

  try {
    const result = await departmentModel.findByIdAndDelete(departmentId);

    if (!result) {
      res.status(404).send({
        success: false,
        message: "Department not found",
      });
    } else {
      res.send({
        success: true,
        message: "Department deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});


router.get("/:id", async (req, res) => {
    const departmentId = req.params.id;
  
    try {
      const department = await departmentModel.findById(departmentId);
      if (!department) {
        res.status(404).send({
          success: false,
          message: "Department not found",
        });
      } else {
        res.send({
        
         department,
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal Server Error",
      });
    }
  });
  
  
  router.get("/:id", async (req, res) => {
    const firmType = req.query.firm_type;
  
    try {
      const departments = await departmentModel.find({ firm_type: firmType });
      res.send(
        departments
      );
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal Server Error",
      });
    }
    
  });

module.exports = router;
