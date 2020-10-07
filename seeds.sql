INSERT INTO department (name)
VALUES 
("Sales"),
("Engineering"),
("Finance"), 
("Legal");


INSERT INTO role (role) 
VALUES 
("Sales Lead"),
("Salesperson"),
("Lead Engineer"),
("Software Engineer"),
("Accountant"),
("Legal Team Lead")
("Lawyer");

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Abby", "Devlin", "Accountant", "Finance"),
("Lukas", "Hackett", "Lawyer", "Legal"),
("Kyra", "Rose", "Sales Lead", "Sales"),
("Martha", "Flint", "Lead Engineer", "Engineering"),
("Tonya", "Miller", "Accountant", "Finance"),
("Daniel", "Savrin", "Software Engineer", "Engineering"),
("Joseph", "Rollins", "Salesperson", "Sales");