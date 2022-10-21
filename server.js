const inquirer = require('inquirer');
const mySQL = require('mysql2');
require('dotenv').config();
require('console.table');

const db = mySQL.createConnection(
    {
        host: 'localhost',
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD

    },
    console.log(`Connected to ${process.env.DB_NAME}`)
);

const mainQuery = () => {
    inquirer
        .prompt ([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'choice',
                choices: [
                    'View All Employees',
                    'Add Employee',
                    'Update Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Deparments',
                    'Add Deparments',
                    'Exit'
                ]
            }
        ])
        .then((response) => {
            if (response.choice === 'View All Employees') {
                viewAllEmp()
            } else if (response.choice === 'Update Employee Role') {
                updateEmpRole()
            } else if (response.choice === 'Add Employee') {
                addEmployee()
            } else if (response.choice === 'View All Roles') {
                viewAllRoles()
            } else if (response.choice === 'Add Role') {
                addRole()
            } else if (response.choice === 'View All Deparments') {
                viewAllDept()
            } else if (response.choice === 'Add Deparments') {
                addDept()
            } else {
                console.log('Query Complete')
            }
        })
};

viewAllEmp = () => {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, title, name as departments, salary, CONCAT(e.first_name," ", e.last_name) as manager FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON departments.id = roles.department_id LEFT JOIN employees e ON e.id = employees.manager_id', function(err, results) {
        if (err) {
            console.log(err)
        } else {
            console.table(results)
            mainQuery()
        }
    })
};

viewAllRoles = () => {
    db.query('SELECT * FROM roles JOIN departments ON roles.department_id = departments.id', function(err, results) {
        if (err) {
            console.log(err)
        } else {
            console.table(results)
            mainQuery()
        }
    })
};

viewAllDept = () => {
    db.query('SELECT * FROM departments', function(err, results) {
        if (err) {
            console.log(err)
        } else {
            console.table(results)
            mainQuery()
        }
    })
};

addEmployee = () => {
    inquirer
        .prompt ([
            {
                type: 'input',
                message: 'Enter new employee first name',
                name: 'first'
            },
            {
                type: 'input',
                message: 'Enter new employee last name',
                name: 'last'
            },
            {
                type: 'input',
                message: 'Enter role id (#)',
                name: 'role'
            },
            {
                type: 'input',
                message: 'Enter manager id (#)',
                name: 'manager'
            }
        ])
        .then((response) => {
            db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${response.first}', '${response.last}', '${response.role}', '${response.manager}')`, function(err, results) {
                if (err) {
                    console.log(err)
                } else {
                    console.table(results)
                    mainQuery()
                }
        })
})
};

updateEmpRole = () => {
    viewAllEmp1()
    inquirer
        .prompt ([
            {
                type: 'input',
                message: 'Enter id of employee',
                name: 'empid'
            },
            {
                type: 'input',
                message: 'Enter id of role you would like to update the employee to',
                name: 'roleid'
            }
        ])
        .then((response) => {
            db.query(`UPDATE employees SET role_id = ${response.roleid} WHERE role_id = ${response.empid}`,  function(err, results) {
                if (err) {
                    console.log(err)
                } else {
                    console.table(results)
                    mainQuery()
                }
        })
})

};

viewAllEmp1 = () => {
    db.query('SELECT * FROM employees', function(err, results) {
        if (err) {
            console.log(err)
        } else {
            console.table(results)
        }
    })
};

viewAllDept1 = () => {
    db.query('SELECT * FROM departments', function(err, results) {
        if (err) {
            console.log(err)
        } else {
            console.table(results)
        
        }
    })
};


addRole = () => {
    viewAllDept1();
    inquirer
        .prompt([
            {
                type:'input',
                message: 'Enter title of the role',
                name: 'title'
            },
            {
                type: 'input',
                message: 'Enter salary of role',
                name: 'salary'
            },
            {
                type: 'input',
                message: 'Enter department id',
                name: 'department'
            }
        ])
        .then((response) => {
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${response.title}', '${response.salary}', '${response.department}')`,  function(err, results) {
                if (err) {
                    console.log(err)
                } else {
                    console.table(results)
                    mainQuery()
                }
        })
    });
};

addDept = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter name of new department',
                name: 'dept'
            }
        ])
        .then((response) => {
            db.query(`INSERT INTO departments (name) VALUES ('${response.dept}')`, function(err, results) {
                if (err) {
                    console.log(err)
                } else {
                    console.table(results)
                    mainQuery()
                }
            })
        })
};

mainQuery()

