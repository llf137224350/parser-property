# 解析属性表达式

> 解析属性表达式从对象中读取属性

```javascript
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
console.log(parserProperty('message', obj)); // 操作成功
console.log(parserProperty('[message]', obj)); // 操作成功
console.log(parserProperty('["message"]', obj)); // 操作成功
console.log(parserProperty('[`message`]', obj)); // 操作成功
console.log(parserProperty('0', [123])); // 123
console.log(parserProperty('[0]', [123])); // 123
console.log(parserProperty('["0"]', [123])); // 123
console.log(parserProperty('[`0`]', [123])); // 123

console.log(parserProperty(`data[0]`, obj));
console.log(parserProperty(`data[0].fileUrl`, obj)); // /g001/M00/01/27/oYYBAGHazNyAd74OAAAA-aHMoL0330.txt
console.log(parserProperty('data[`1`].clientIp', obj)); // 58.16.15.245

console.log(parserProperty('obj1.a', obj)); // [ { b: 'c', d: { e: [Array] } } ]
console.log(parserProperty('obj1.a[0].b', obj)); // c
console.log(parserProperty('obj1.a["0"].d.e[0]', obj)); // 1
console.log(parserProperty('obj1.a["0"].d.e[1]', obj)); // undefined
console.log(parserProperty('obj1.a["0"].d.e[`0`].c', obj)); // undefined

```
