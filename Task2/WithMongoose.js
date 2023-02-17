const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
mongoose.connect('mongodb://localhost/27017/futwork', { useNewUrlParser: true, useUnifiedTopology: true });

const Employee = mongoose.model('Employee', {
    designation: String,
    company: String,
    userId: {
        type: ObjectId,
        ref: "User"
    },

});

const User = mongoose.model('User', {
    firstName: String,
    lastName: String,
    mobileNumber: String,
    address: String
});

async function findEmployeeAndUser(employeeId) {
    try {
        const employee = await Employee.findById(employeeId)
            .populate(userId)
        console.log("Employee:", employee);

    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
}

findEmployeeAndUser("<employeeId>"); 