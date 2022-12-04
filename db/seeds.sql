INSERT INTO departments (department)
VALUES ("Medicine"),
       ("Nursing"),
       ("Rehabilitation"),
       ("Administration");

INSERT INTO employees (first_name, last_name, title, department, salary, manager)
VALUES ("Jane", "Doe", "Physician", "Medicine", 150000, "John Smith"),
        ("John", "Dean", "Nurse", "Nursing", 80000, "Katie Brown"),
        ("Joseph", "Dale", "Physical Therapist", "Rehabilitation", 80000, "Chris Stevens"),
        ("Jake", "Daniel", "Account Manager", "Administration", 70000, "Mary Jackson");
       
INSERT INTO roles (title, department, salary)
VALUES ("Physician", "Medicine", 150000),
        ("Nurse", "Nursing", 80000),
        ("Physical Therapist", "Rehabilitation", 80000),
        ("Account Manager", "Administration", 70000);