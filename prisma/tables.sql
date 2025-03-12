-- Teachers Table
CREATE TABLE Teachers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Centers Table
CREATE TABLE Centers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    phone VARCHAR(255) UNIQUE NOT NULL
);

-- Teacher-Centers (Many-to-Many Relationship)
CREATE TABLE Teacher_Centers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    teacher_id BIGINT NOT NULL,
    center_id BIGINT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (center_id) REFERENCES Centers(id) ON DELETE CASCADE
);

-- Parents Table
CREATE TABLE Parents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Students Table
CREATE TABLE Students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    section ENUM('first_sec', 'second_sec_scientific', 'second_sec_literary', 'third_sec') NOT NULL,
    center_id BIGINT,
    phone VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (center_id) REFERENCES Centers(id) ON DELETE SET NULL
);

CREATE TABLE Student_Parents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    parent_id BIGINT NOT NULL,
    relationship ENUM('father', 'mother', 'guardian') NOT NULL, -- Defines role
    FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES Parents(id) ON DELETE CASCADE,
    UNIQUE(student_id, parent_id) -- Prevents duplicate relationships
);
-- Sessions Table
CREATE TABLE Sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    teacher_id BIGINT,
    date DATETIME NOT NULL,
    topic VARCHAR(255) NOT NULL,
    center_id BIGINT,
    section ENUM('first_sec', 'second_sec_scientific', 'second_sec_literary', 'third_sec') NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(id) ON DELETE SET NULL,
    FOREIGN KEY (center_id) REFERENCES Centers(id) ON DELETE SET NULL
);

-- Homeworks Table
CREATE TABLE Homeworks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id BIGINT NOT NULL,
    description VARCHAR(255) NOT NULL,
    due_date DATETIME NOT NULL,
    FOREIGN KEY (session_id) REFERENCES Sessions(id) ON DELETE cascade
);

-- Quizzes Table
CREATE TABLE Quizzes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id BIGINT NOT NULL,
    max_score INTEGER NOT NULL,
    date DATETIME NOT NULL,
    FOREIGN KEY (session_id) REFERENCES Sessions(id) ON DELETE cascade
);

-- Trials Table
CREATE TABLE Trials (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    max_score INTEGER NOT NULL,
    section ENUM('first_sec', 'second_sec_scientific', 'second_sec_literary', 'third_sec') NOT NULL,
    teacher_id BIGINT,
    center_id BIGINT,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(id) ON DELETE SET NULL,
    foreign key (center_id) references Centers(id) on delete set null
);

-- Student-Sessions Table (Many-to-Many)
CREATE TABLE Student_Sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    notes VARCHAR(255),
    attendance_status ENUM('present', 'absent') DEFAULT 'absent',
    FOREIGN KEY (session_id) REFERENCES Sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE
);

-- Student-Trials Table (Many-to-Many)
CREATE TABLE Student_Trials (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    trial_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    result VARCHAR(255) NOT NULL,
    FOREIGN KEY (trial_id) REFERENCES Trials(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE
);

-- Student-Homeworks Table (Many-to-Many)
CREATE TABLE Student_Homeworks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    homework_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    status VARCHAR(255) NOT NULL,
    submission_date DATETIME NOT NULL ,
    FOREIGN KEY (homework_id) REFERENCES Homeworks(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE
);


-- Student-Quizzes Table (Many-to-Many)
CREATE TABLE Student_Quizzes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quiz_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    score INTEGER NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES Quizzes(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE
);


