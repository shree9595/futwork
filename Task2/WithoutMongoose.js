const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost/27017/futwork';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function findEmployeeAndUser(employeeId) {
    try {
        await client.connect();

        const result = await client.db("futwork").collection("employees").aggregate([
            {
                $match: { _id: employeeId }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
        ]).toArray();

        if (result.length > 0) {
            const employeeAndUser = result[0];
            console.log("Employee and User:", employeeAndUser);
        } else {
            console.log("Employee not found.");
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

findEmployeeAndUser("<employeeId>"); 