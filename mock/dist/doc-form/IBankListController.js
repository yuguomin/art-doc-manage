"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
let IBankListController = class IBankListController {
    pbCardList() {
        return {
            code: 0,
            msg: '用户卡列表',
            data: {
                bank_list: [{
                        card_id: '1',
                        customer_id: '2',
                        card_num: '************0378',
                        card_short_num: '0378',
                        card_type: '2',
                        is_default: '1',
                        bank_id: '17',
                        bank_name: '中国工商银行',
                        bank_short_name: '工行',
                        bank_code: 'ICBC',
                        bank_status: '1',
                        bank_type: '1',
                        bank_pic: 'http://credit-card-1251122539.cossh.myqcloud.com/credit_card/upload/2018-12-11/20181211/7a68287c861e6d6b4fe39fe836940fe6.png',
                        bank_desc: '',
                        bank_propaganda_pic: '',
                        bank_info: '牛牛银行是啥银行',
                        bank_hot_sort: '12',
                        bank_url: 'https://www.baidu.com/'
                    }, {
                        card_id: '2',
                        customer_id: '2',
                        card_num: '************3333',
                        card_short_num: '3333',
                        card_type: '2',
                        is_default: '0',
                        bank_id: '18',
                        bank_name: '中国农业银行',
                        bank_short_name: '农行',
                        bank_code: 'ABC',
                        bank_status: '1',
                        bank_type: '1',
                        bank_pic: 'http://credit-card-1251122539.cossh.myqcloud.com/credit_card/upload/2018-12-11/20181211/e0dfb0148e9e348d8c8c815c940adead.png',
                        bank_desc: '',
                        bank_propaganda_pic: '',
                        bank_info: '牛牛银行是啥银行',
                        bank_hot_sort: '12',
                        bank_url: 'https://www.baidu.com/'
                    }, {
                        card_id: '3',
                        customer_id: '2',
                        card_num: '************9559',
                        card_short_num: '9559',
                        card_type: '2',
                        is_default: '0',
                        bank_id: '18',
                        bank_name: '中国农业银行',
                        bank_short_name: '农行',
                        bank_code: 'ABC',
                        bank_status: '1',
                        bank_type: '1',
                        bank_pic: 'http://credit-card-1251122539.cossh.myqcloud.com/credit_card/upload/2018-12-11/20181211/e0dfb0148e9e348d8c8c815c940adead.png',
                        bank_desc: '',
                        bank_propaganda_pic: '',
                        bank_info: '牛牛银行是啥银行',
                        bank_hot_sort: '12',
                        bank_url: 'https://www.baidu.com/'
                    }]
            }
        };
    }
};
__decorate([
    routing_controllers_1.Get('/pb/card/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IBankListController.prototype, "pbCardList", null);
IBankListController = __decorate([
    routing_controllers_1.Controller('/doc-form')
], IBankListController);
exports.default = IBankListController;
