var input =
`X O O X X X O O
O O O O X O X X
X X O X X O O O
O X O O O X X X
O O X X X X O X
X O X X X O X O
O O O X O X O X
X O X X O X O X`;


const printResults = (input) => printTable(calculateMines(input))

const printTable = (table) => table.reduce((str, row) => str += row.join(' ') + '\n', '')

const getTable = (input) => input.split('\n').reduce((acc, str) => {
  acc.push(str.split(' '))
  return acc
},[])

const getCount = (coords, table) => {
  let count = 0;
  for(let i = 0; i < coords.length; i++) {
    const rowInd = coords[i][0];
    const colInd = coords[i][1];
    if(table[rowInd][colInd] === 'X') {
      count++;
    }
  }
  return count;
}

const calculateMines = (input) => (
  getTable(input).reduce((acc, inputRow, rowInd, table) => {
    const outputRow = inputRow.reduce((acc2, ch, colInd) => {
      if(ch === 'X') {
        acc2.push(ch)
        return acc2;
      }
      let count = 0;
      if(rowInd === 0) {
        if(colInd === 0) {
          count += getCount([
            [rowInd, colInd + 1],
            [rowInd + 1, colInd],
            [rowInd + 1, colInd + 1]
          ], table);
        } else if(colInd === table[0].length - 1) {
          count += getCount([
            [rowInd, colInd - 1],
            [rowInd + 1, colInd],
            [rowInd + 1, colInd - 1]
          ], table);
        } else {
          count += getCount([
            [rowInd, colInd - 1],
            [rowInd, colInd + 1],
            [rowInd + 1, colInd],
            [rowInd + 1, colInd - 1],
            [rowInd + 1, colInd + 1]
          ], table);
        }
      } else if(rowInd === table.length - 1) {
        if(colInd === 0) {
            count += getCount([
              [rowInd, colInd + 1],
              [rowInd - 1, colInd],
              [rowInd - 1, colInd + 1]
            ], table);
          } else if(colInd === table[0].length - 1) {
            count += getCount([
              [rowInd, colInd - 1],
              [rowInd - 1, colInd],
              [rowInd - 1, colInd - 1]
            ], table);
          } else {
            count += getCount([
              [rowInd, colInd - 1],
              [rowInd, colInd + 1],
              [rowInd - 1, colInd],
              [rowInd - 1, colInd - 1],
              [rowInd - 1, colInd + 1]
            ], table);
          }
      } else {
        if(colInd === 0) {
          count += getCount([
            [rowInd - 1, colInd],
            [rowInd - 1, colInd + 1],
            [rowInd, colInd + 1],
            [rowInd + 1, colInd],
            [rowInd + 1, colInd + 1],
          ], table);
        } else if(colInd === table[0].length - 1) {
          count += getCount([
            [rowInd - 1, colInd - 1],
            [rowInd - 1, colInd],
            [rowInd, colInd - 1],
            [rowInd + 1, colInd - 1],
            [rowInd + 1, colInd],
          ], table);
        } else {
          count += getCount([
            [rowInd - 1, colInd - 1],
            [rowInd - 1, colInd],
            [rowInd - 1, colInd + 1],
            [rowInd, colInd - 1],
            [rowInd, colInd + 1],
            [rowInd + 1, colInd - 1],
            [rowInd + 1, colInd],
            [rowInd + 1, colInd + 1],
          ], table);
        }
      }
      acc2.push(count)
      return acc2
    }, [])

    acc.push(outputRow)
    return acc
  }, [])
)
