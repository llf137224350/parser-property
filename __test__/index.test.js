const obj = {
  message: '操作成功',
  code: 0,
  obj1: {
    a: [
      {
        b: 'c',
        d: {
          e: [1]
        }
      }
    ]
  },
  data: [
    {
      fileType: 1,
      fileName: 'M00/01/27/oYYBAGHazNyAd74OAAAA-aHMoL0330.txt',
      fileGroup: 'g001',
      fileUrl: '/g001/M00/01/27/oYYBAGHazNyAd74OAAAA-aHMoL0330.txt',
      clientIp: '58.16.15.244',
      addTime: '2022-01-09 19:54:04'
    },
    {
      fileType: 1,
      fileName: 'M00/01/27/oYYBAGHazNyAd74OAAAA-aHMoL0330.txt',
      fileGroup: 'g001',
      fileUrl: '/g001/M00/01/27/oYYBAGHazNyAd74OAAAA-aHMoL0330.txt',
      clientIp: '58.16.15.245',
      addTime: '2022-01-09 19:54:04'
    }
  ]
};

test('直接写属性读取对象', () => {
  const parserProperty = require('../');
  expect(parserProperty('message', obj)).toBe(`操作成功`);
});

test('方括号属性读取对象', () => {
  const parserProperty = require('../');
  expect(parserProperty('[message]', obj)).toBe(`操作成功`);
});

test('方括号属性加引号读取对象', () => {
  const parserProperty = require('../');
  expect(parserProperty('["message"]', obj)).toBe(`操作成功`);
});

test('直接写索引读取数组', () => {
  const parserProperty = require('../');
  expect(parserProperty('0', [123])).toBe(123);
});

test('方括号属性读取数组', () => {
  const parserProperty = require('../');
  expect(parserProperty('[0]', [123])).toBe(123);
});

test('方括号属性加引号读取对象', () => {
  const parserProperty = require('../');
  expect(parserProperty('["0"]', [123])).toBe(123);
});

test('读取对象中的数组', () => {
  const parserProperty = require('../');
  expect(parserProperty('data', obj)).toEqual([
    {
      fileType: 1,
      fileName: 'M00/01/27/oYYBAGHazNyAd74OAAAA-aHMoL0330.txt',
      fileGroup: 'g001',
      fileUrl: '/g001/M00/01/27/oYYBAGHazNyAd74OAAAA-aHMoL0330.txt',
      clientIp: '58.16.15.244',
      addTime: '2022-01-09 19:54:04'
    },
    {
      fileType: 1,
      fileName: 'M00/01/27/oYYBAGHazNyAd74OAAAA-aHMoL0330.txt',
      fileGroup: 'g001',
      fileUrl: '/g001/M00/01/27/oYYBAGHazNyAd74OAAAA-aHMoL0330.txt',
      clientIp: '58.16.15.245',
      addTime: '2022-01-09 19:54:04'
    }
  ]);
});

test('读取对象中的数组指定索引', () => {
  const parserProperty = require('../');
  expect(parserProperty('data[0]', obj)).toEqual({
    fileType: 1,
    fileName: 'M00/01/27/oYYBAGHazNyAd74OAAAA-aHMoL0330.txt',
    fileGroup: 'g001',
    fileUrl: '/g001/M00/01/27/oYYBAGHazNyAd74OAAAA-aHMoL0330.txt',
    clientIp: '58.16.15.244',
    addTime: '2022-01-09 19:54:04'
  });
});

test('读取对象中的数组指定索引对应对象中的属性-1', () => {
  const parserProperty = require('../');
  expect(parserProperty('data[0].fileUrl', obj)).toBe('/g001/M00/01/27/oYYBAGHazNyAd74OAAAA-aHMoL0330.txt');
});

test('读取对象中的数组指定索引对应对象中的属性-2', () => {
  const parserProperty = require('../');
  expect(parserProperty('data["1"].clientIp', obj)).toBe('58.16.15.245');
});

test('读取二级对象属性-1', () => {
  const parserProperty = require('../');
  expect(parserProperty('obj1.a', obj)).toEqual([
    {
      b: 'c',
      d: {
        e: [1]
      }
    }
  ]);
});

// console.log(parserProperty('obj1.a[0].b', obj)); // c
test('读取二级对象属性-2', () => {
  const parserProperty = require('../');
  expect(parserProperty('obj1.a[0]', obj)).toEqual({
    b: 'c',
    d: {
      e: [1]
    }
  });
});

test('读取多级对象属性 - 1', () => {
  const parserProperty = require('../');
  expect(parserProperty('obj1.a[0].d.e[0]', obj)).toBe(1);
});

test('读取多级对象属性 - 2', () => {
  const parserProperty = require('../');
  expect(parserProperty('obj1.a[0].d.e[1]', obj)).toBe(undefined);
});

test('读取多级对象属性 - 3', () => {
  const parserProperty = require('../');
  expect(parserProperty('obj1.a[0].d.e[0].c', obj)).toBe(undefined);
});
