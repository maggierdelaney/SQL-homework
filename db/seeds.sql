INSERT INTO departments (department)
VALUES ("Medicine"),
       ("Nursing"),
       ("Rehabilitation"),
       ("Administration");
       
INSERT INTO roles (title, salary, department_id)
VALUES ("Physician", 150000, 1),
        ("Nurse", 80000, 2),
        ("Physical Therapist", 80000, 3),
        ("Account Manager", 70000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 1, 1),
        ("John", "Dean", 2, 2),
        ("Joseph", "Dale", 3, 3),
        ("Jake", "Daniel", 4, 4);