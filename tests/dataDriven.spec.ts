import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import * as XLSX from 'xlsx';

// ✅ JSON import works only if tsconfig.json has "resolveJsonModule": true
// Path corrected to match your folder structure (tests/test-data/jsonData.json)
import testData from './test-data/jsonData.json';

test('read data from json', async ({ page }) => {
  console.log(testData);
  console.log(JSON.stringify(testData));
  // Alternative if JSON import fails:
  // const rawData = fs.readFileSync('tests/test-data/jsonData.json', 'utf-8');
  // const parsedData = JSON.parse(rawData);
  // console.log(parsedData);
});

test('read data from csv', async ({ page }) => {
  type userdata = {
    userName: string;
    password: string;
    index: number;
    expected: string;
  };

  // ✅ Path corrected to tests/test-data/users.csv
  const file = fs.readFileSync('tests/test-data/users.csv');
  const data: userdata[] = parse(file, { columns: true });
  console.log(JSON.stringify(data));
});

test('read data from excel', async ({ page }) => {
  // ✅ Path corrected to tests/test-data/Book1.xlsx
  const file = XLSX.readFile('tests/test-data/Book1.xlsx');
  const sheet = file.Sheets['Sheet1'];
  const data = XLSX.utils.sheet_to_json(sheet);
  console.log(JSON.stringify(data));
});
