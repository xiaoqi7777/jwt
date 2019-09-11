import subStr from '../../code/string/lesson2'
test('subStr(00110011)', () => {
  expect(subStr('00110011')).toEqual(['0011', '01', '1100', '10', '0011', '01'])
})
test('subStr(0110011)', () => {
  expect(subStr('0110011')).toEqual(['01', '1100', '10', '0011', '01'])
})