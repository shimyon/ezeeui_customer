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
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var jwt_decode_1 = require("jwt-decode");
var native_actions_1 = require("src/app/utils/native-actions");
var operators_1 = require("rxjs/operators");
var AuthService = /** @class */ (function () {
    function AuthService(plt, $native, $http, $api) {
        var _this = this;
        this.plt = plt;
        this.$native = $native;
        this.$http = $http;
        this.$api = $api;
        this.authSubject = new rxjs_1.BehaviorSubject(null);
        this.userActionOnline = new rxjs_1.BehaviorSubject(null);
        this.plt.ready().then(function () {
            _this.getToken();
        });
    }
    AuthService.prototype.getToken = function () {
        var _this = this;
        this.$native.getNative(native_actions_1.ACTION_TYPE.ACCESS_TOKEN).then(function (token) {
            if (typeof (token) === "string") {
                _this.decodedToken = _this.getDecodedAccessToken(token);
                _this.accessToken = token;
                _this.userName = _this.decodedToken.UserName;
                if (_this.decodedToken.exp < new Date().getTime() / 1000) {
                    _this.authSubject.next(true);
                }
                else {
                    _this.authSubject.next(false);
                }
            }
            else {
                _this.authSubject.next(false);
            }
        });
    };
    AuthService.prototype.getDecodedAccessToken = function (token) {
        try {
            return jwt_decode_1["default"](token);
        }
        catch (Error) {
            return null;
        }
    };
    AuthService.prototype.getHeaderToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$native.getNative(native_actions_1.ACTION_TYPE.ACCESS_TOKEN)];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    AuthService.prototype.getRefershtoken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$native.getNative(native_actions_1.ACTION_TYPE.REFRESH_TOKEN_KEY)];
                    case 1:
                        refreshToken = _a.sent();
                        return [2 /*return*/, refreshToken];
                }
            });
        });
    };
    AuthService.prototype.refreshToken = function () {
        var _this = this;
        //  let decodeData=this.getDecodedAccessToken(await this.getHeaderToken())
        //  let data= this.$native.getNative(ACTION_TYPE.REFRESH_TOKEN_KEY).then(refreshToken=>{
        //    return refreshToken;
        //   })
        var payload = {
            userName: this.userName,
            accessToken: this.getHeaderToken(),
            refreshToken: this.getRefershtoken()
        };
        return this.$http.post(this.$api.goTo().refreshToken(), payload).pipe(operators_1.tap(function (tokens) {
            _this.$native.setNative(native_actions_1.ACTION_TYPE.REFRESH_TOKEN_KEY, tokens["refreshToken"]);
            _this.$native.setNative(native_actions_1.ACTION_TYPE.ACCESS_TOKEN, tokens["accessToken"]);
        }));
    };
    // To Check LoggedIn state
    AuthService.prototype.isLoggedIn = function () {
        return this.authSubject.asObservable();
    };
    // To checkUser Status
    /// check this service used user online and offline
    AuthService.prototype.checkUserStatus = function (status) {
        var _this = this;
        this.$native.getNative(native_actions_1.ACTION_TYPE.ACCESS_TOKEN).then(function (res) {
            if (res.token) {
                _this.decodedToken = _this.getDecodedAccessToken(res.token);
                if (_this.decodedToken.exp < new Date().getTime() / 1000) {
                    _this.userActionOnline.next(null);
                }
                else {
                    _this.userActionOnline.next(status);
                }
            }
        });
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
