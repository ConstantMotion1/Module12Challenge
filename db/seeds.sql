INSERT INTO departments (name)
VALUES  ("Marketing"),
        ("Finance"),
        ("Human Resources"),
        ("IT"),
        ("Sales"),
        ("Production");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Lead Marketing Analyst", 80000, 1),
        ("Junior Marketing Analyst", 45000, 1),
        ("Lead Accountant", 100000, 2),
        ("Junior Accountant", 60000, 2),
        ("HR", 60000, 3),
        ("Lead IT Analyst", 120000, 4),
        ("Junior IT Analyst", 90000, 4),
        ("Lead Sales Analyst", 130000, 5),
        ("Junior Sales Analyst", 90000, 5),
        ("Production Supervisor", 60000, 6),
        ("Production Worker", 40000, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Lukas", "Wolf", 1, NULL),
        ("Amaris", "Norman", 2, 1),
        ("Frida", "Long", 2, 1),
        ("Jose", "Diaz", 3, NULL),
        ("Jaylon", "Best", 4, 4),
        ("Aiden", "McClain", 4, 4),
        ("Molly", "Deleon", 5, NULL),
        ("Elena", "Shelton", 6, NULL),
        ("Autumn", "Dillon", 7, 8),
        ("Alessandro", "Holt", 7, 8),
        ("Elisa", "Patrick", 8, NULL),
        ("Jaelyn", "Terrell", 9, 11),
        ("Kai", "Neal", 9, 11),
        ("Yurem", "Sullivan", 10, NULL),
        ("Mallory", "Key", 11, 14),
        ("Ace", "Garza", 11, 14),
        ("Thomas", "Skinner", 11, 14);
        


