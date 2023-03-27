'use strict';
var dbConn = require('../db.config');

// Main object create
var Main = function(employee){
    this.first_name     = employee.first_name;
    this.last_name      = employee.last_name;
    this.email          = employee.email;
    this.phone          = employee.phone;
    this.organization   = employee.organization;
    this.designation    = employee.designation;
    this.salary         = employee.salary;
    this.status         = employee.status ? employee.status : 1;
    this.created_at     = new Date();
    this.updated_at     = new Date();
};

Main.getMain = function (result) {
    dbConn.query("Select * from meet", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
module.exports = Main;