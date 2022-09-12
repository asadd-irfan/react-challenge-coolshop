import React from 'react';
import './App.css';

function App() {
  const arithmeticOperators = [{ label: '+', value: '+' }, { label: '-', value: '-', }]
  const [rows, setRows] = React.useState([{
    value: 100, isDisable: false, arithmeticOperator: '+',
  },
  {
    value: 30, isDisable: false, arithmeticOperator: '+',
  },
  {
    value: 7, isDisable: false, arithmeticOperator: '-',
  }])

  const addRow = () => {
    const updatedRows = [
      ...rows,
      { value: 0, isDisable: false, arithmeticOperator: '+', }
    ]
    setRows(updatedRows)
  }
  const deleteRow = (index) => {
    const updatedRows = [...rows]
    updatedRows.splice(index, 1)
    setRows(updatedRows)
  }
  const onChangeValue = (index, key, value) => {
    let updatedRows = rows;
    updatedRows[index][key] = value;
    setRows([...updatedRows])
  }
  const disableRow = (index) => {
    let updatedRows = rows;
    updatedRows[index]['isDisable'] = !updatedRows[index]['isDisable'];
    setRows([...updatedRows])
  }

  const calculateSum = () => {
    let sum = 0;
    rows.forEach(item => {
      if (!item.isDisable) {
        sum = item.arithmeticOperator === '+' ? sum + parseInt(item.value) : sum - parseInt(item.value)
      }
    })
    return sum
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Calculator</h2>
        <div >
          <div>
            <button className='btn_style add' onClick={addRow}>Add row</button>
          </div>
          <ul>
            {rows.map((item, i) => <li key={i} style={{ marginBottom: 5 }}>
              <select className='select_style' value={item.arithmeticOperator}
                onChange={(e) => onChangeValue(i, 'arithmeticOperator', e.target.value)}>
                {arithmeticOperators.map((op, ind) => <option key={ind}
                  value={op.value}>{op.label}</option>)}
              </select>
              <input className='input_style' type="number" value={item.value}
                onChange={(e) => onChangeValue(i, 'value', e.target.value)} />
              <button className='btn_style delete' onClick={() => deleteRow(i)}>Delete</button>
              <span className='btn_style disable'
                style={item.isDisable ? { backgroundColor: 'green' } : { backgroundColor: 'rgb(228, 147, 65)' }}
                onClick={() => disableRow(i)} disabled={item.isDisable}>
                {item.isDisable ? 'Enable' : 'Disable'}
              </span>
            </li>)}

          </ul>
          <div>
            Result: {calculateSum()}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
