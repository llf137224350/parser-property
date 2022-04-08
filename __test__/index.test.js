const obj = {
  message: '操作成功',
  code: 0,
  obj1: {
    a: [
      {
        b: 'c',
        _d_c_1: {
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
  expect(parserProperty(obj, 'message')).toBe(`操作成功`);
});

test('方括号属性读取对象', () => {
  const parserProperty = require('../');
  expect(parserProperty(obj, '[message]')).toBe(`操作成功`);
});

test('方括号属性加引号读取对象', () => {
  const parserProperty = require('../');
  expect(parserProperty(obj, '["message"]')).toBe(`操作成功`);
});

test('直接写索引读取数组', () => {
  const parserProperty = require('../');
  expect(parserProperty([123], '0')).toBe(123);
});

test('方括号属性读取数组', () => {
  const parserProperty = require('../');
  expect(parserProperty([123], '[0]')).toBe(123);
});

test('方括号属性加引号读取对象', () => {
  const parserProperty = require('../');
  expect(parserProperty([123], '["0"]')).toBe(123);
});

test('读取对象中的数组', () => {
  const parserProperty = require('../');
  expect(parserProperty(obj, 'data')).toEqual([
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
  expect(parserProperty(obj, 'data[0]')).toEqual({
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
  expect(parserProperty(obj, 'data[0].fileUrl')).toBe('/g001/M00/01/27/oYYBAGHazNyAd74OAAAA-aHMoL0330.txt');
});

test('读取对象中的数组指定索引对应对象中的属性-2', () => {
  const parserProperty = require('../');
  expect(parserProperty(obj, 'data["1"].clientIp')).toBe('58.16.15.245');
});

test('读取二级对象属性-1', () => {
  const parserProperty = require('../');
  expect(parserProperty(obj, 'obj1.a')).toEqual([
    {
      b: 'c',
      _d_c_1: {
        e: [1]
      }
    }
  ]);
});

test('读取二级对象属性-2', () => {
  const parserProperty = require('../');
  expect(parserProperty(obj, 'obj1.a[0]')).toEqual({
    b: 'c',
    _d_c_1: {
      e: [1]
    }
  });
});

test('读取多级对象属性 - 1', () => {
  const parserProperty = require('../');
  expect(parserProperty(obj, 'obj1.a[0]._d_c_1.e[0]')).toBe(1);
});

test('读取多级对象属性 - 2', () => {
  const parserProperty = require('../');
  expect(parserProperty(obj, 'obj1.a[0]._d_c_1.e[1]')).toBe(undefined);
});

test('读取多级对象属性 - 3', () => {
  const parserProperty = require('../');
  expect(parserProperty(obj, 'obj1.a[0]._d_c_1.e[0].c')).toBe(undefined);
});

const otherObj = {
  a: [0, [
    {
      b: {
        c: 2,
        d: [0, {
          e: {
            f: 'hello',
            'hello_world': 'hello_world'
          }
        }
        ]
      }
    }]]
};

test('复杂表达式 - 1', () => {
  const parserProperty = require('../');
  expect(parserProperty(otherObj, 'a[1][0].b.d[1].e["hello_world"]')).toBe('hello_world');
});

test('复杂表达式 - 2', () => {
  const parserProperty = require('../');
  expect(parserProperty(otherObj, 'a[1][`0`].b.d["1"].e["f"]')).toBe('hello');
});

test('复杂表达式 - 3', () => {
  const parserProperty = require('../');
  expect(parserProperty(otherObj, 'a[1][`0`].b.d["0"]')).toBe(0);
});
