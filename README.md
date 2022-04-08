# 解析属性表达式

> 解析属性表达式从对象中读取属性

```javascript
const parserProperty = require("parser-property");
// 普通对象
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
console.log(parserProperty(obj, 'message')); // 操作成功
console.log(parserProperty(obj, '[message]')); // 操作成功
console.log(parserProperty(obj, '["message"]')); // 操作成功
console.log(parserProperty(obj, '[`message`]')); // 操作成功
console.log(parserProperty([123], '0', )); // 123
console.log(parserProperty([123], '[0]')); // 123
console.log(parserProperty([123], '["0"]')); // 123
console.log(parserProperty([123], '[`0`]')); // 123

console.log(parserProperty(obj, `data[0]`));
console.log(parserProperty(obj, `data[0].fileUrl`)); // /g001/M00/01/27/oYYBAGHazNyAd74OAAAA-aHMoL0330.txt
console.log(parserProperty(obj, 'data[`1`].clientIp')); // 58.16.15.245

console.log(parserProperty(obj, 'obj1.a')); // [ { b: 'c', d: { e: [Array] } } ]
console.log(parserProperty(obj, 'obj1.a[0].b')); // c
console.log(parserProperty(obj, 'obj1.a["0"].d.e[0]')); // 1
console.log(parserProperty(obj, 'obj1.a["0"].d.e[1]')); // undefined
console.log(parserProperty(obj, 'obj1.a["0"].d.e[`0`].c')); // undefined
// 复杂对象
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
console.log(parserProperty(otherObj, 'a[1][0].b.d[1].e["hello_world"]')); // hello_worrld
console.log(parserProperty(otherObj, 'a[1][`0`].b.d["1"].e["f"]')); // hello
console.log(parserProperty(otherObj, 'a[1][`0`].b.d["0"]')); // 0
```
