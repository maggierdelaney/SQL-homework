const inquirer = require('inquirer');

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
    //all depts in table: names + ids
};

function viewRole() {
    //all roles in table: job title, role id, dept, salary
};

function viewEmployee() {
    //all employees in table: employee id, first name, last name, job title, dept, salary, manager
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
        //department added to table//
        mainMenu();
    })
};

const addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'role',
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
    .then(({ role, salary, department }) => {
        //role added to table
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
            choices: ["manager names"]
        }
    ])
    .then(({ first, last, role, manager }) => {
        //employee added to table//
        mainMenu();
    })
};

const updateRole = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'update',
            message: 'Please select the employee whose role you would like to update:',
            choices: 'employee list'
        },
        {
            type: 'list',
            name: 'update',
            message: 'Please select the desired role:',
            choices: 'role list'
        }
    ])
    .then((update) => {
        if (update == true) {
            addEmployee();
            //or other function to 'replace' current info
        };
        mainMenu();
    })
};