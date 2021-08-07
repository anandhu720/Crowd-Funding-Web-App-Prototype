const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname,'contracts');


const fileNames = fs.readdirSync(contractPath);

const input = fileNames.reduce(
    (input,fileName) => {
        const filePath = path.resolve(__dirname,'contracts',fileName);
        const source = fs.readFileSync(filePath, 'utf8');
        return {
            sources : { ...input.sources,[fileName]:source}
        };
    },
    {
        sources : {}
    }
);

const output = solc.compile(input,1).contracts;

fs.ensureDirSync(buildPath);

for(let contract in output){
    fs.outputJSONSync(
        path.resolve(buildPath,contract.split(":")[1] + ".json"),
        output[contract]
    );
}