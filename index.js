var inquirer = require("inquirer");

// ================================
//Questions array
// ================================
// // array of questions for user
const firstQuestion = [{
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
  }
];



//   {
//     type: "input",
//     name: "roleName",
//     message: "What is the name of the role?"
//   },
//   {
//     type: "input",
//     name: "roleSalary",
//     message: "What is the salary of the role?"
//   },
//   {
//     type: "list",
//     name: "roleDepartment",
//     message: "Which department does the role belong to?",
//     choices: [
//         "Sales",
//         "Engineering",
//         "Finance",
//         "Legal"
//         ]    
//   },


whatWouldYouLikeToDo();

function whatWouldYouLikeToDo() {


inquirer.prompt({ 
    firstQuestion
    
}).then( function(response) {
    
    if(response.decision === "Add Department") {
        inquirer.prompt([
            {
                type: "list",
                name: "departmentInput",
                message: "What type of Department would you like to add?",
                choices: [
                    "Sales",
                    "Engineering",
                    "Finance",
                    "Legal"
                ]
            }
        ])

        .then(function(data) {
            console.log(data);

            whatWouldYouLikeToDo();
        });
    }
    
    else if(response.decision === "Add Role") {
        inquirer.prompt([
       
        {
            type: "list",
            name: "roleInput",
            message: "What type of role would you like to add?",
            choices: [
                "Sales lead",
                "Salesperson",
                "Lead Engineer",
                "Software Engineer",
                "Accountant",
                "Lawyer"
            ]
        }
        ])

        .then(function(data) {
            console.log(data);

            whatWouldYouLikeToDo();
        })
    }
    
    else if(response.decision === "Add Employee") {
        inquirer.prompt([
       
        {
            type: "input",
            name: "addEmployeeFirstName",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "addEmployeeSecondName",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "addEmployeeRole",
            message: "What is the employee's role?"
        },
        {
            type: "input",
            name: "addEmployeeDepartment",
            message: "What is the employee's department?"
        }
        ])

        .then(function(data) {
            console.log(data);

            whatWouldYouLikeToDo();
        })
    }
    
    else if(response.decision === "View All Departments") {
        inquirer.prompt([
       
        {
            type: "list",
            name: "viewDepartments",
            message: "What type of department would you like to view?",
            choices: [
                "Sales",
                "Engineering",
                "Finance",
                "Legal"
            ]
        }
        ])

        .then(function(data) {
            console.log(data);

            whatWouldYouLikeToDo();
        })
    }
    
    else if(response.decision === "View All Roles") {
        inquirer.prompt([
       
        {
            type: "list",
            name: "viewRoles",
            message: "What is the name of the role?",
            choices: [
                "Sales lead",
                "Salesperson",
                "Lead Engineer",
                "Software Engineer",
                "Accountant",
                "Lawyer"
            ]
        }
        ])

        .then(function(data) {
            console.log(data);

            whatWouldYouLikeToDo();
        })
    }
    
    else if(response.decision === "View All Employees") {
        inquirer.prompt([
       
            // ==========================================================================================================
            // need to eventually fill this with the sql data rather than typing it all out; also have to make it dynamic
            // ==========================================================================================================
        {
            type: "input",
            name: "viewEmployees",
            message: "Which employee would you like to view?"
        }
        ])

        .then(function(data) {
            console.log(data);

            whatWouldYouLikeToDo();
        })
    }
    
    else if(response.decision === "Update Employee Roles") {
        inquirer.prompt([
       
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
            message: "Would you like to quit?"
        }
        ])

        .then(function(data) {
            console.log(data);

            whatWouldYouLikeToDo();
        })
    }


});

}

