class readExcel {
    constructor() {
        this.xlCreateData = [];
        this.xlUpdateData = [];
        this.cred = [];

        // Requiring the module
        const reader = require('xlsx');

       /* // Include fs module
        const fs = require('fs');

        // Get the filename
        if (fs.readdirSync('../input').length > 1) {
            util.console.error("Error: More than one file, please keep one file");
            return
        } else {
            var filename = fs.readdirSync('../input')[0];

            if (filename == undefined) {
                util.console.error("Error: Input file not found");
                return
            }

            filename = "../input/" + filename;
        } 

        //Read input sheet
        const filereader = reader.readFile('./B2B-Test Template.xlsx');
        const xlSheet = filereader.SheetNames;
        for (let j = 0; j < xlSheet.length; j++) {

            const temp = reader.utils.sheet_to_json(filereader.Sheets[filereader.SheetNames[j]]);
            temp.forEach((res) => {
                switch (xlSheet[j]) {
                    case 'Ticket Creation':
                        this.xlCreateData.push(res);
                        break;
                    case 'Ticket Modification':
                        this.xlUpdateData.push(res);
                        break;
                    default:
                        break;
                }
            });
        }

        //Read credentials sheet
        const credentials = reader.readFile('./Credentials.xlsx');
        const crSheet = credentials.SheetNames;
        for (let j = 0; j < crSheet.length; j++) {

            const tempCred = reader.utils.sheet_to_json(credentials.Sheets[credentials.SheetNames[j]]);
            tempCred.forEach((res) => {
                switch (crSheet[j]) {
                    case 'Credentials':
                        this.cred.push(res);
                        break;
                    default:
                        break;
                }
            });
        }
        */
    }
}
module.exports = new readExcel();