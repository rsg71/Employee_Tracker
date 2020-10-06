var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',
  password: "shed120",
  database: 'work_db'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  whatWouldYouLikeToDo();
});





// =============================================
// Kicking off the questions in the command line
// =============================================


function whatWouldYouLikeToDo() {


  inquirer.prompt({

    type: "list",
    name: "decision",
    message: "What would you like to do?",
    choices: [
      "Add Department",
      "Add Role",
      "Add Employee",
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Update Employee Roles",
      "Quit"
    ]

  }).then(function (response) {
    console.log(response);

    // =================================================================
    // ADD DEPARTMENT
    // =================================================================

    if (response.decision === "Add Department") {
      inquirer.prompt([
        {
          type: "input",
          name: "departmentInput",
          message: "What is the name of the Department you would you like to add?"
        }
      ])

        .then(function (data) {
          console.log(data);
          console.log("adding " + data.departmentInput + " to the database");

          connection.query("INSERT INTO departments SET ?",
            {
              department_name: data.departmentInput
            },

            function (err, res) {
              if (err) throw err;

              console.log(res.affectedRows + " department inserted\n")
              whatWouldYouLikeToDo();
            });
        })

    }

    // =================================================================
    // ADD ROLE
    // =================================================================

    else if (response.decision === "Add Role") {
      inquirer.prompt([

        {
          type: "input",
          name: "roleInput",
          message: "What type of role would you like to add?",

        }
      ])

        .then(function (data) {
          console.log(data);

          connection.query("INSERT INTO roles SET ?", 
          {
            role: data.roleInput
          },
          function (err, res) {
            if (err) throw err;

            console.log(res.affectedRows + " role inserted\n")
            whatWouldYouLikeToDo();
          });
        })
       
    }



    // =================================================================
    // ADD EMPLOYEE
    // =================================================================

    // else if(response.decision === "Add Employee") {
    //     inquirer.prompt([

    //     {
    //         type: "input",
    //         name: "addEmployeeFirstName",
    //         message: "What is the employee's first name?"
    //     },
    //     {
    //         type: "input",
    //         name: "addEmployeeSecondName",
    //         message: "What is the employee's first name?"
    //     },
    // {
    //     type: "list",
    //     name: "addEmployeeRole",
    //     message: "What is the employee's role?".
    //        choices: [
    //         "Sales lead",
    //         "Salesperson",
    //         "Lead Engineer",
    //         "Software Engineer",
    //         "Accountant",
    //         "Lawyer"
    //        ]
    // },
    // {
    //     type: "input",
    //     name: "addEmployeeDepartment",
    //     message: "What is the employee's department?"
    // }
    //     ])

    //     .then(function(data) {
    //         console.log(data);

    //         whatWouldYouLikeToDo();
    //     })
    // }


    // =================================================================
    // VIEW ALL DEPARTMENTS
    // =================================================================

    else if (response.decision === "View All Departments") {

      connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;

        console.log(res);
      });
      // .then(whatWouldYouLikeToDo());
    }

    // =================================================================
    // VIEW ALL ROLES
    // =================================================================

    else if (response.decision === "View All Roles") {
      (function (data) {
        console.log(data);

        connection.query("SELECT * FROM roles", function (err, res) {
          if (err) throw err;

          console.log(res)
        });
      })
        .then(whatWouldYouLikeToDo());
    }


    // =================================================================
    // VIEW ALL EMPLOYEES
    // =================================================================

    else if (response.decision === "View All Employees") {
      (function (data) {
        console.log(data);

        connection.query("SELECT * FROM employees", function (err, res) {
          if (err) throw err;

          console.log(res)
        });
      })
        .then(whatWouldYouLikeToDo());
    }


    // =================================================================
    // UPDATE EMPLOYEE ROLES
    // =================================================================

    // else if(response.decision === "Update Employee Roles") {
    //     inquirer.prompt([

    //         // ==========================================================================================================
    //         // same here; I believe the employee list should be dynamic
    //         // ==========================================================================================================    
    //     {
    //         type: "input",
    //         name: "employeeUpdate",
    //         message: "Which employee would you like to update?"
    //     }
    //     ])

    //     .then(function(data) {
    //         console.log(data);

    //         whatWouldYouLikeToDo();
    //     })
    // }

    else if (response.decision === "Quit") {
      inquirer.prompt([
        {
          type: "confirm",
          name: "quit",
          message: "Are you sure you would you like to quit?"
        }
      ])

        .then(function (err) {
          if (err) throw err;
          connection.end();
        })


    }


  });

}

