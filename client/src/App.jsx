import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { CalculatorButton } from './components/UI/CalculatorButton';


function App() {
  const [example, setExample] = useState('');
  const operations = ['/', '*', '-', '+']

  function IsOperationInExample(str) {
    for (let op of operations) {
      if (str.includes(op)) {
        return true;
      }
    }
    return false;
  }

  function IsCorrectExample(str) {
    if (!IsOperationInExample(example)) {
      alert("В примере нет операции");
      return false;
    }
    if (!IsDigitalPostfix(example)) {
      alert("После операции должно быть число");
      return false;
    }
    return true;
  }

  function IsDigitalPostfix(str) {
    for (let i = 0; i <= 9; i++) {
      if (str.endsWith(i)) {
        return true;
      }
    }
    return false;
  }

  function ParceExample(example, ind) {
    return [example.slice(0, ind), example.slice(ind + 1)];
  }

  function CalculateResult(example) {
    console.log(example)
    let leftDigit;
    let rightDigit;
    if (example.includes("+") || example.includes("-")) {
      let sumInd = example.indexOf("+");
      let diffInd = example.indexOf("-");
      if (sumInd === -1) {
        sumInd = Infinity;
      }
      if (diffInd === -1) {
        diffInd = Infinity;
      }
      [leftDigit, rightDigit] = ParceExample(example, Math.min(sumInd, diffInd));
      leftDigit = CalculateResult(leftDigit);
      rightDigit = CalculateResult(rightDigit);
      if (sumInd < diffInd) {
        return +leftDigit + +rightDigit;
      }
      return +leftDigit - +rightDigit;
    }
    if (example.includes("*") || example.includes("/")) {
      let multipleInd = example.indexOf("*");
      let divisionInd = example.indexOf("/");
      if (multipleInd === -1) {
        multipleInd = Infinity;
      }
      if (divisionInd === -1) {
        divisionInd = Infinity;
      }
      [leftDigit, rightDigit] = ParceExample(example, Math.min(multipleInd, divisionInd));
      leftDigit = CalculateResult(leftDigit);
      rightDigit = CalculateResult(rightDigit);
      if (multipleInd < divisionInd) {
        return +leftDigit * +rightDigit;
      }
      return +leftDigit / +rightDigit;
    }
    return example
  }

  function AddOperationInExample(newChar) {
    if (operations.includes(newChar)) {
      if (!IsDigitalPostfix(example)) {
        alert("Перед введением операции необходимо ввести число");
        return;
      }
    }
    UpdateEXample(newChar);
  }

  function UpdateEXample(newChar) {
    setExample(example + newChar)
  }

  function SetExampleResult() {
    if (!IsCorrectExample) {
      return;
    }
    let result = CalculateResult(example);
    setExample(result);
  }

  function ClearExample() {
    setExample('')
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ paddingY: 4 }}>
        <Stack
          spacing={3}
          sx={{
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              Калькулятор
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Мини-приложение для закрепления React и MUI.
            </Typography>
          </Box>

          <Box
            sx={{
              padding: 2,
              width: '100%',
              maxWidth: 360,
              border: '3px solid',
              borderColor: 'divider',
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Stack spacing={1}>
              <Typography
                sx={{
                  width: '100%',
                  fontSize: 36,
                }}
              >
                {example}
              </Typography>
              <Stack direction="row" spacing={1}>
                <CalculatorButton onClick={() => ClearExample()}>C</CalculatorButton>
              </Stack>
              <Stack direction="row" spacing={1}>
                <CalculatorButton onClick={() => { UpdateEXample('1') }}>1</CalculatorButton>
                <CalculatorButton onClick={() => { UpdateEXample('2') }}>2</CalculatorButton>
                <CalculatorButton onClick={() => { UpdateEXample('3') }}>3</CalculatorButton>
                <CalculatorButton onClick={() => { AddOperationInExample('/') }}>/</CalculatorButton>
              </Stack>
              <Stack direction="row" spacing={1}>
                <CalculatorButton onClick={() => { UpdateEXample('4') }}>4</CalculatorButton>
                <CalculatorButton onClick={() => { UpdateEXample('5') }}>5</CalculatorButton>
                <CalculatorButton onClick={() => { UpdateEXample('6') }}>6</CalculatorButton>
                <CalculatorButton onClick={() => { AddOperationInExample('*') }}>*</CalculatorButton>
              </Stack>
              <Stack direction="row" spacing={1}>
                <CalculatorButton onClick={() => { UpdateEXample('7') }}>7</CalculatorButton>
                <CalculatorButton onClick={() => { UpdateEXample('8') }}>8</CalculatorButton>
                <CalculatorButton onClick={() => { UpdateEXample('9') }}>9</CalculatorButton>
                <CalculatorButton onClick={() => { AddOperationInExample('-') }}>-</CalculatorButton>
              </Stack>
              <Stack direction="row" spacing={1}>
                <CalculatorButton onClick={() => { AddOperationInExample('.') }}>.</CalculatorButton>
                <CalculatorButton onClick={() => { UpdateEXample('0') }}>0</CalculatorButton>
                <CalculatorButton onClick={() => { SetExampleResult() }}>=</CalculatorButton>
                <CalculatorButton onClick={() => { AddOperationInExample('+') }}>+</CalculatorButton>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Container>
  )
}

export default App