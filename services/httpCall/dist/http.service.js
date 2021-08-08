"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.HttpService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var native_actions_1 = require("../../app/utils/native-actions");
var HttpService = /** @class */ (function () {
    function HttpService(nativeStorage, http, toaster, loader) {
        var _this = this;
        this.nativeStorage = nativeStorage;
        this.http = http;
        this.toaster = toaster;
        this.loader = loader;
        this.API_BASE = environment_1.environment.API_URL;
        this.setToken = function (returnToken) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nativeStorage.setNative(native_actions_1.ACTION_TYPE.ACCESS_TOKEN, { token: returnToken }).then(function (res) {
                            return res;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.getToken = function () { return __awaiter(_this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nativeStorage.getNative(native_actions_1.ACTION_TYPE.ACCESS_TOKEN)];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, token];
                }
            });
        }); };
        this.httpCall = function (isLoading) {
            if (isLoading === void 0) { isLoading = true; }
            _this.http.setDataSerializer('json');
            if (isLoading) {
                _this.loader.show();
            }
            return {
                get: function (url, payload, headers) {
                    console.log(' ====== PAYLOAD ====== ', payload);
                    return new Promise(function (resolve, reject) {
                        _this.http.get(url, payload, headers).then(function (res) {
                            if (isLoading) {
                                _this.loader.dismiss();
                            }
                            resolve(res);
                        })["catch"](function (err) {
                            _this.printError(err);
                            if (isLoading) {
                                _this.loader.dismiss();
                            }
                            reject(err);
                        });
                    });
                },
                post: function (url, payload, headers) {
                    console.log(' ====== PAYLOAD ====== ', payload);
                    return new Promise(function (resolve, reject) {
                        _this.http.post(url, payload, headers).then(function (res) {
                            if (isLoading) {
                                _this.loader.dismiss();
                            }
                            console.log('Post Response', res);
                            resolve(res);
                        })["catch"](function (err) {
                            _this.printError(err);
                            if (isLoading) {
                                _this.loader.dismiss();
                            }
                            reject(err);
                        });
                    });
                },
                put: function (url, payload, headers) {
                    console.log(' ====== PAYLOAD ====== ', payload);
                    return new Promise(function (resolve, reject) {
                        _this.http.put(url, payload, headers).then(function (res) {
                            if (isLoading) {
                                _this.loader.dismiss();
                            }
                            resolve(res);
                        })["catch"](function (err) {
                            _this.printError(err);
                            if (isLoading) {
                                _this.loader.dismiss();
                            }
                            reject(err);
                        });
                    });
                },
                "delete": function (url, payload, headers) {
                    console.log(' ====== PAYLOAD ====== ', payload);
                    return new Promise(function (resolve, reject) {
                        _this.http["delete"](url, payload, headers).then(function (res) {
                            if (isLoading) {
                                _this.loader.dismiss();
                            }
                            resolve(res);
                        })["catch"](function (err) {
                            _this.printError(err);
                            if (isLoading) {
                                _this.loader.dismiss();
                            }
                            reject(err);
                        });
                    });
                }
            };
        };
        this.getHeaderToken = function () { return __awaiter(_this, void 0, void 0, function () {
            var headerToken, header;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        return [4 /*yield*/, this.nativeStorage.getNative(native_actions_1.ACTION_TYPE.ACCESS_TOKEN)];
                    case 1:
                        headerToken = _a.sent();
                        header = {
                            Authorization: 'Bearer ' + headerToken
                        };
                        return [2 /*return*/, header];
                }
            });
        }); };
        //this.loader.dismiss();
    }
    HttpService.prototype.printError = function (err) {
        var message;
        console.log(': ====  ERROR ==== ', err, ' === STATUS ==== ', err.status);
        var error = JSON.parse(err.error);
        if (err.status === 401) {
            message = error.message.message;
        }
        else if (err.status === 409) {
            message = error.message;
        }
        else if (err.status === 400) {
            message = error.errors[0];
        }
        else {
            message = 'Something went wrong.';
        }
        var toaster = {
            header: 'Opps!',
            message: message,
            position: 'top'
        };
        // this.toaster.show(toaster);
    };
    HttpService.prototype.successMessage = function (res, success) {
        var message;
        console.log('success response', res);
        var response = typeof (res) === 'object' ? JSON.parse(res.data) : res.data;
        console.log('convert data', response);
        if (res.status === 200) {
            if (response.ok) {
                message = success;
            }
            else {
                message = response.msg.emailError;
            }
        }
        else {
            message = success;
        }
        var toaster = {
            header: '',
            message: message,
            position: 'top'
        };
        this.toaster.show(toaster);
    };
    HttpService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
