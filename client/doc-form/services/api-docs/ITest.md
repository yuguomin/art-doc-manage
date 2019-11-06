1. 测试的api

#### detail

| 类别 | 详情 |
| --- | --- |
| request-method | post |
| request-url | /test/api_one |

#### params

| 参数名 | 类型 | 说明 | parents | 示例 | 值选项 | rename |
| --- | --- | --- | ------- | --- | --- | ------ |
| id | number |  | data | 商品id |  | |
| name | string |  | data | 大全 |  | |

#### explain

| 参数名 | 类型 | 说明 | parents | 示例 | 值选项 | rename |
| --- | --- | --- | ------- | --- | --- | ------ |
| page_title | string | 标题 | data | 首页 |  | |
| list | array(object) | 列表 | data | [] |  | |
| status | number |  | data.list | 0 | on:1,off:0 | |

#### example

```json
{
    "code": 0,
    "msg": "用户卡列表"
}
```