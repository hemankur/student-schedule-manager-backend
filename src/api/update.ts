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

insertCourses(1, 'CS', 100, 'Principles of Computing', 'Fall19', 'Shvetha Soundararajan', 'Enterprise Hall 20', 'W', '19:20', 44, 36);
insertCourses(2, 'CS', 100, 'Principles of Computing', 'Spring20', 'Shvetha Soundararajan', 'Enterprise Hall 20', 'R', '19:20', 44, 20);
insertCourses(3, 'CS', 110, 'Essentials of Computer Science', 'Fall19', 'Michael Patrick Neary', 'Enterprise Hall 80', 'W', '19:20', 44, 44);
insertCourses(4, 'CS', 110, 'Essentials of Computer Science', 'Spring20', 'Michael Patrick Neary', 'Enterprise Hall 80', 'M', '19:20', 44, 40);
insertCourses(5, 'CS', 112, 'Intro Computer Programming', 'Fall19', 'Michael Patrick Neary', 'Sandbridge Hall 20', 'T', '19:20', 44, 36);
insertCourses(6, 'CS', 112, 'Intro Computer Programming', 'Spring20', 'Michael Patrick Neary', 'Sandbridge Hall 20', 'W', '19:20', 44, 44);
insertCourses(7, 'CS', 211, 'Object-Oriented Programming', 'Fall19', 'Ivan Avramovic', 'Sandbridge Hall 50', 'M', '19:20', 44, 20);
insertCourses(8, 'CS', 211, 'Object-Oriented Programming', 'Spring20', 'Ivan Avramovic', 'Sandbridge Hall 50', 'W', '19:20', 44, 44);
insertCourses(9, 'CS', 222, 'Computer Program for Engineers', 'Fall19', 'Harold M Greenwald', 'Sandbridge Hall 10', 'R', '19:20', 44, 25);
insertCourses(10, 'CS', 222, 'Computer Program for Engineers', 'Spring20', 'Harold M Greenwald', 'Sandbridge Hall 10', 'F', '19:20', 44, 30);

insertCourses(11, 'SWE', 205, 'Software Usability Analy/Desgn', 'Fall19', 'Paul E Ammann', 'Peterson Hall 11', 'T', '10:30', 44, 20);
insertCourses(12, 'SWE', 205, 'Software Usability Analy/Desgn', 'Spring20', 'Paul E Ammann', 'Peterson Hall 11', 'W', '10:30', 44, 20);
insertCourses(13, 'SWE', 432, 'Web App Development', 'Fall19', 'Jeff Offutt', 'Innovation Hall 206', 'M', '16:30', 44, 44);
insertCourses(14, 'SWE', 432, 'Web App Development', 'Spring20', 'Jeff Offutt', 'Innovation Hall 206', 'T', '16:30', 44, 40);
insertCourses(15, 'SWE', 625, 'Software Project Mgmt', 'Fall19', 'Kenneth E Nidiffer', 'Innovation Hall 206', 'F', '19:20', 44, 40);
insertCourses(16, 'SWE', 625, 'Software Project Mgmt', 'Spring20', 'Robert G Kurtz', 'Buchanan Hall D023', 'R', '16:30', 44, 26);
insertCourses(17, 'SWE', 637, 'Software Testing', 'Spring20', 'Robert G Kurtz', 'Buchanan Hall D023', 'R', '16:30', 44, 26);
insertCourses(18, 'SWE', 699, 'Agile Sftwre Develop & DevOps', 'Spring20', 'Michael S Reep', 'Buchanan Hall D023', 'T', '16:30', 44, 26);
