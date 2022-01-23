const fs = require("fs");
const parser = require("csv-parser");
const path =  require("path");
let  files = {};
let args = process.argv.slice(2);
const writer = require("csv-writer").createObjectCsvWriter;



if (args.length) {
    const inputFilePath = path.resolve(__dirname, args.shift());
    console.log(inputFilePath);
    const stream = fs.createReadStream(inputFilePath);
    stream.pipe(parser({
        mapHeaders: ({header}) => header.replace(/\s+/, "_").toLowerCase()
    })).on('data', (data) => {
        let currentData = {userId: data.user_id, firstName: data.first_name, lastName: data.last_name, version: data.version};
        let insuranceName = data.insurance_company.replace(/\s+/g, "_");
        if (!files[insuranceName]) {
            files[insuranceName] = [currentData];
        } else {
            let file = files[insuranceName];
            let version = data.version;
            let id = data.user_id;
            let hasId = file.some((user) => {
                return user.userId === id;
            });
            if (hasId) {
                files[insuranceName] = file.map((user) => {
                    if (user.userId === id && version > user.version) {
                        user.version = version;
                    }
                    return user;
                });
            } else {
                files[insuranceName].push(currentData);
                files[insuranceName].sort((a, b) => {
                    if (a.lastName > b.lastName) {
                        return 1;
                    }

                    if (a.lastName < b.lastName) {
                        return -1;
                    }

                    if (a.firstName > b.firstName) {
                        return 1;
                    }

                    if (a.firstName < b.firstName) {
                        return -1;
                    }

                    return 0;
                });
            }
            
        }
    }).on("end", () => {
        if (!fs.existsSync("output")) {
            fs.mkdirSync("output");
        }
        for (let key in files) {
            let fileName = `output/${key.replace(/_/g, "-")}.csv`;
            let outputWriter = writer({
                path: fileName, 
                header: [
                    {id: "userId", title: "User Id"},
                    {id: "firstName", title: "First Name"},
                    {id: "lastName", title: "Last Name"},
                    {id: "version", title: "Version"}
                ]
            });

            let outputData = files[key];
            outputWriter.writeRecords(outputData).then(() => {
                console.log(`CSV file written: ${fileName}`);
            });
        }
    });
    
}