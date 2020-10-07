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
    // console.log(response);

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

          connection.query("INSERT INTO department SET ?",
            {
              name: data.departmentInput
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

      connection.query("SELECT * from department", function (err, departmentData) {
        if (err) throw err;
        console.log(departmentData)
       
        // for (var i = 0; i < departmentData.length; i++) {
        //   objects[i] = {id: departmentData[i].id, name: departmentData[i].name }
        //   departmentArray.push(objects[i]);
        // }

        const departments = departmentData.map(data => data.name)
        const departmentId = departmentData.map(data => data.id)

        console.log(departments) //this will show the names, so we're good here 
        console.log(departmentId)
        // console.log(departmentArray)

        inquirer.prompt([
          {
            type: "input",
            name: "titleInput",
            message: "What type of role would you like to add?",
          },
          {
            type: "input",
            name: "salaryInput",
            message: "What is the salary of the role?",
          },
          {
            type: "list",
            name: "departmentInput",
            message: "Which department is the role part of?",
            choices: departments
          }
        ])

          .then(function (data) {
            console.log(data);
            // console.log(data.departmentInput)
            let deptID = "";
            for(i =0; i < departmentData.length; i++) {
              if(data.departmentInput == departmentData[i].name) {
                deptID = departmentData[i].id;
              }
            }

            

            connection.query("INSERT INTO role SET ?",
              {
                title: data.titleInput,
                salary: data.salaryInput,
                department_id: deptID // i want this value >>> department_id: "____" <<<<< to have an INT that corresponds with the department id
              },
              function (err, res) {
                if (err) throw err;

                console.log(res.affectedRows + " role inserted\n")
                whatWouldYouLikeToDo();
              });
          })



      })


      // ===================================
    }



    // =================================================================
    // ADD EMPLOYEE
    // =================================================================

    else if (response.decision === "Add Employee") {
      inquirer.prompt([

        {
          type: "input",
          name: "addEmployeeFirstName",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "addEmployeeLastName",
          message: "What is the employee's last name?"
        },
        {
          type: "list",
          name: "addEmployeeRole",
          message: "What is the employee's role?",
          choices: [
            "Sales lead",
            "Salesperson",
            "Lead Engineer",
            "Software Engineer",
            "Accountant",
            "Lawyer"
          ]
        },
        {
          type: "input",
          name: "addEmployeeManager",
          message: "Who is the employee's manager?"
        }
      ])

        .then(function (data) {
          console.log(data);

          connection.query("INSERT INTO employee SET ?",
            {
              first_name: data.addEmployeeFirstName,
              last_name: data.addEmployeeLastName,
              role_id: data.addEmployeeRole,
              manager_id: data.addEmployeeManager
            },
            function (err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " employees inserted\n")
              whatWouldYouLikeToDo();
            });

        });
    }


    // =================================================================
    // VIEW ALL DEPARTMENTS                                           +
    // =================================================================

    else if (response.decision === "View All Departments") {

      connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;

        // console.log(res);

        for (var i = 0; i < res.length; i++) {
          console.log(`department: ${res[i].name}`);
        }
        whatWouldYouLikeToDo();
      });
    }

    // =================================================================
    // VIEW ALL ROLES                                                 +
    // =================================================================

    else if (response.decision === "View All Roles") {

      connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
          console.log(`role: ${res[i].title}`);
        }
        whatWouldYouLikeToDo();
      });
    }



    // =================================================================
    // VIEW ALL EMPLOYEES
    // =================================================================

    else if (response.decision === "View All Employees") {

      connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;

        console.log(`id  first_name    last_name     title`)
        console.log(`--  ----------   -----------  ----------------`)
        for (var i = 0; i < res.length; i++) {
          console.log(`${res[i].id}  ${res[i].first_name}           ${res[i].last_name}        ${res[i].role_id}`);
        }
        whatWouldYouLikeToDo();
      });
    }


    // =================================================================
    // UPDATE EMPLOYEE ROLES
    // =================================================================

    else if(response.decision === "Update Employee Roles") {
        inquirer.prompt([

            // ==========================================================================================================
            // same here; I believe the employee list should be dynamic
            // ==========================================================================================================    
        {
            type: "input",
            name: "employeeUpdate",
            message: "Which employee would you like to update?"
        }
        ])

        .then(function(data) {
            console.log(data);

            whatWouldYouLikeToDo();
        })
    }

    else if (response.decision === "Quit") {
      inquirer.prompt([
        {
          type: "confirm",
          name: "quit",
          message: "Are you sure you would you like to quit?"
        }
      ])

        .then(function () {
          connection.end();
        });
    }


  });

}

