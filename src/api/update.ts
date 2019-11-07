let database = require('./database');

function dbRun(database, command, params) {
    database.run(command, params, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function insertCourses(courseID, department, courseNumber, courseName, term, instructor, location, day, time, capacity, active) {
    let sql = `INSERT INTO courses (courseID, department, courseNumber, courseName, term, instructor, location, day, time, capacity, active) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let params = [courseID, department, courseNumber, courseName, term, instructor, location, day, time, capacity, active];
    dbRun(database, sql, params);
}

insertCourses(1, 'CS', 100, 'Principles of Computing', 'Fall19', 'Shvetha Soundararajan', 'Enterprise Hall 20', 'W', '19:20', 60, 20);
insertCourses(2, 'CS', 100, 'Principles of Computing', 'Spring20', 'Shvetha Soundararajan', 'Enterprise Hall 20', 'W', '19:20', 60, 0);
insertCourses(3, 'CS', 110, 'Essentials of Computer Science', 'Fall19', 'Michael Patrick Neary', 'Enterprise Hall 80', 'W', '19:20', 60, 20);
insertCourses(4, 'CS', 110, 'Essentials of Computer Science', 'Spring20', 'Michael Patrick Neary', 'Enterprise Hall 80', 'W', '19:20', 60, 0);
insertCourses(5, 'CS', 112, 'Intro Computer Programming', 'Fall19', 'Michael Patrick Neary', 'Sandbridge Hall 20', 'W', '19:20', 60, 20);
insertCourses(6, 'CS', 112, 'Intro Computer Programming', 'Spring20', 'Michael Patrick Neary', 'Sandbridge Hall 20', 'W', '19:20', 60, 0);
insertCourses(7, 'CS', 211, 'Object-Oriented Programming', 'Fall19', 'Ivan Avramovic', 'Sandbridge Hall 50', 'W', '19:20', 60, 20);
insertCourses(8, 'CS', 211, 'Object-Oriented Programming', 'Spring20', 'Ivan Avramovic', 'Sandbridge Hall 50', 'W', '19:20', 60, 0);
insertCourses(9, 'CS', 222, 'Computer Program for Engineers', 'Fall19', 'Harold M Greenwald', 'Sandbridge Hall 10', 'W', '19:20', 60, 20);
insertCourses(10, 'CS', 222, 'Computer Program for Engineers', 'Spring20', 'Harold M Greenwald', 'Sandbridge Hall 10', 'W', '19:20', 60, 0);


