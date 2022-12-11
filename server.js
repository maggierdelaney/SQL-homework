const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'hospital_db'
    },
    console.log(`Connected to the hospital_db database.`)
  );

db.connect(err => {
    if(err) {
        throw err
    }
    console.log('Mysql connected')
})


const mainMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Please select from the following:',
            choices: ["View all departments", "View all roles", "View all employees", "Add department", "Add role", "Add employee", "Update employee role"],
        }
    ])
        .then(({ menu }) => {
            if (menu === "View all departments") {
                viewDept();
            }
            if (menu === "View all roles") {
                viewRole();
            }
            if (menu === "View all employees") {
                viewEmployee();
            }
            if (menu === "Add department") {
                addDept();
            }
            if (menu === "Add role") {
                addRole();
            }
            if (menu === "Add employee") {
                addEmployee();
            }
            if (menu === "Update employee role") {
                updateRole();
            };
        })
};

function viewDept() {
    db.query('SELECT * FROM departments', function (err, results) {
        if (err) throw err;
        console.table(results);
        mainMenu();
    })
};

function viewRole() {
    db.query('SELECT * FROM roles', function (err, results) {
        if (err) throw err;
        console.table(results);
        mainMenu();
    })
};

function viewEmployee() {
    db.query('SELECT * FROM employees', function (err, results) {
        if (err) throw err;
        console.table(results);
        mainMenu();
    })
};

const addDept = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ])
    .then(({ department }) => {
        db.query(`INSERT INTO departments (department) VALUES (?)`),
        data.department,
        function (err, results) {
            if (err) throw err;
            console.table(results);
        }
        mainMenu();
    })
};

const addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please enter the role name:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter the role salary:'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Please select the department the role belongs to:',
            choices: ["Medicine", "Nursing", "Rehabilitation", "Adminstration"]
        }
    ])
    .then(({ title, salary, department }) => {
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES (? ? ?)`),
        data.title, data.salary, data.department_id,
        function (err, results) {
            if (err) throw err;
            console.table(results);
        }
        mainMenu();
    })
};

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'last',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the role of the employee?',
            choices: ["Physician", "Nurse", "Physical Therapist", "Account Manager"]
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the manager of the employee?',
            choices: ["Manager1", "Manager2", "Manager3", "Manager4"]
        }
    ])
    .then(({ first, last, role, manager }) => {
        db.query(`INSERT INTO roles (first, last, role_id, manager_id) VALUES (? ? ? ?)`),
        data.first, data.last, data.role_id, data.manager_id,
        function (err, results) {
            if (err) throw err;
            console.table(results);
        }
        mainMenu();
    })
};

// const updateRole = () => {
//     return inquirer.prompt([
//         {
//             type: 'list',
//             name: 'update',
//             message: 'Please select the employee whose role you would like to update:',
//             choices: 'employee list'
//         },
//         {
//             type: 'list',
//             name: 'update',
//             message: 'Please select the desired role:',
//             choices: 'role list'
//         }
//     ])
//     .then((update) => {
//         if (update == true) {
//             let newFirstName = 'Updated first name'
//             let newLastName = 'Updated last name'
//             let newRole = 'Updated role'
//             let newManager = 'Updated manager'
//             db.query(`UPDATE employees SET name = '${newFirstName}' WHERE id = ${req.params.id}`),
//             data.first, data.last, data.role, data.manager,
//             function (err, results) {
//                 if (err) throw err;
//                 console.table(results);
//             }
//             mainMenu();
//     })
// };

mainMenu();