var fs = require('fs')
var calc = require('./calc')

const args = process.argv
if(args.length < 3) {
  console.log('Input file not specified');
  process.exit(1);
}

const filename = args[2]
if(fs.existsSync(filename)) {
  fs.readFile(filename, "utf8", (err, data) => (
    console.log(calc.printResults(data))
    )
  )
} else {
  console.log('Input file not exists');
  process.exit(1);
}
