const inquirer = require('inquirer');
const mysql = require('mysql');

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'employee_tracker_db',
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database.');
  startApp();
});

// Function to start the application
function startApp() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          // Add more choices for additional functionality
          'Exit',
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          connection.end();
          console.log('Exiting the application.');
          break;
      }
    });
}

// Function to view all departments
function viewDepartments() {
  const query = 'SELECT * FROM department';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// Function to view all roles
function viewRoles() {
  const query = 'SELECT * FROM role';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// Function to view all employees
function viewEmployees() {
  const query =
    'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager ' +
    'FROM employee ' +
    'LEFT JOIN role ON employee.role_id = role.id ' +
    'LEFT JOIN department ON role.department_id = department.id ' +
    'LEFT JOIN employee manager ON employee.manager_id = manager.id';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
      },
    ])
    .then((answer) => {
      const query = 'INSERT INTO department (name) VALUES (?)';
      connection.query(query, [answer.name], (err, res) => {
        if (err) throw err;
        console.log('Department added successfully!');
        startApp();
      });
    });
}

// Function to add a role
function addRole() {
  // Similar to addDepartment, prompt the user for role details and insert into the role table
}

// Function to add an employee
function addEmployee() {
  // Similar to addDepartment, prompt the user for employee details and insert into the employee table
}

// Function to update an employee role
function updateEmployeeRole() {
  // Prompt the user to select an employee and enter the new role details, then update the employee's role in the database
}
