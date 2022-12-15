const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

db.connect(err => {
    if (err) {
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
            const sql = `INSERT INTO departments (department) VALUES (?)`;
            const params = [department];
            db.query(sql, params, (err, results) => {
                if (err) throw err;
                console.table(results);
            });
            mainMenu();
        })
};

const addRole = () => {
    //promise goes with the .then
    //rows reference the rows of the table (comes in an array)
    //we set departments equal to that array of rows
    //.map then takes the array and iterates over it to make it work with the prompt function (separates out the components)
    db.promise().query('SELECT * FROM departments').then(([rows]) => {
        let departments = rows;
        const departmentOptions = departments.map(({ id, department }) => ({
            name: department,
            value: id,
        }))
        inquirer.prompt([
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
                choices: departmentOptions
            }
        ])
            .then(({ title, salary, department }) => {
                const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
                const params = [title, salary, department];
                db.query(sql, params, (err, results) => {
                    if (err) throw err;
                    console.table(results);
                });
                mainMenu();
            })
    })
        .catch(error => {
            console.log(error)
        })
};

const addEmployee = () => {
    //promise goes with the .then
    //rows reference the rows of the table (comes in an array)
    //we set departments equal to that array of rows
    //.map then takes the array and iterates over it to make it work with the prompt function (separates out the components)
    db.promise().query('SELECT title AS name, id AS value FROM roles').then(([rows]) => {
        console.log(rows);
        db.promise().query('SELECT concat(first_name, " ", last_name) AS name, id AS value FROM employees').then(([employeeRoles]) => {
            console.log(employeeRoles);
            inquirer.prompt([
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
                    choices: rows
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Who is the manager of the employee?',
                    choices: employeeRoles
                }
            ])
                .then(({ first, last, role, manager }) => {
                    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                    const params = [first, last, role, manager];
                    db.query(sql, params, (err, results) => {
                        if (err) throw err;
                        console.table(results);
                    });
                    mainMenu();
                })
                .catch(error => {
                    console.log(error)
                });
        });
    })
};

const updateRole = () => {
    db.promise().query('SELECT title AS name, id AS value FROM roles').then(([rows]) => {
        db.promise().query('SELECT concat(first_name, " ", last_name) AS name, id AS value FROM employees').then(([employeeRoles]) => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Please select the employee you would like to update:',
                    choices: employeeRoles
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Please select the desired role:',
                    choices: rows
                }
            ])
                .then(({ employee, role }) => {
                    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
                    const params = [role, employee];
                    db.query(sql, params, (err, results) => {
                        if (err) throw err;
                        console.table(results);
                    });
                    mainMenu();
                });
        });
    })
};

mainMenu();