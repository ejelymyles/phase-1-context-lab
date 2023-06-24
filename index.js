/* Your Code Here */
/*
1. update the application to use the employee record as context INSTEAD of passing it as an argument
2. Assume that employees always check in and check out
3. Assume employees always check in and out on the hour
4. The time is represented on a 24-hour clock (1300 is 1:00 pm); this keeps the math easier and is the standard in most of the world
5. When timestamps are needed, they will be provided as Strings in the form: "YYYY-MM-DD 800" or "YYYY-MM-DD 1800" e.g. "2018-01-01 2300"
6. employees will never work across days
*/

let singleEmployeeArray = [first, last, role, pay]

function createEmployeeRecord (singleEmployeeArray){
    let employeeRecordObject = {
        firstName: singleEmployeeArray[0],
        familyName: singleEmployeeArray[1],
        title: singleEmployeeArray[2],
        payPerHour: singleEmployeeArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
 return employeeRecordObject;
}

function createEmployeeRecords (arrayOfEmployees){
   let newRecords = arrayOfEmployees.map(createEmployeeRecord);
   return newRecords;
}


function createTimeInEvent(dateStamp){
   //let [date, hour] = dateStamp.split(" ");
    //let hours = hour.substring(0, 2);
    let date = dateStamp.slice(0, 10);
   let hour = dateStamp.slice(10);

   // modify it so that the its called on context to employeeRecord

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });

    return this
}

function createTimeOutEvent(dateStamp){
    //let [date, hour] = dateStamp.split(" ");
    //let hours = hour.substring(0, 2);
    let date = dateStamp.slice(0, 10);
   let hour = dateStamp.slice(10);

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });

    return this
}


function hoursWorkedOnDate(dateStamp) {
    let hoursWorked = 0;
  
    const timeInEvent = this.timeInEvents.find(event => event.date === dateStamp);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === dateStamp);
  
    if (timeInEvent && timeOutEvent) {
      const timeIn = Math.floor(timeInEvent.hour / 100)
      const timeOut = Math.floor(timeOutEvent.hour / 100)
  
      hoursWorked = timeOut - timeIn;
    }
  
    return hoursWorked;
  }
  

function wagesEarnedOnDate(dateStamp) {
    const hoursWorked = hoursWorkedOnDate.call(this, dateStamp);
    const payRate = this.payPerHour;
    const wagesEarned = hoursWorked * payRate;
  
    return wagesEarned;
  }

  /* FUNCTION FROM PREVIOUS LAB
    function allWagesFor (employeeRecord){
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages
  }
  */

  /*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function allWagesFor () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
};

// INSERT FIND EMPLOYESS BY THEIR FIRST NAME HERE
function findEmployeeByFirstName (srcArray, firstName){
    return srcArray.find(function(employeeRecord){
        return employeeRecord.firstName === firstName;
    });
}

function calculatePayroll(employeeRecords){
    const totalPayroll = employeeRecords.reduce((total, employee) =>
        total + allWagesFor.call(employee), 0);

    return totalPayroll
  }









