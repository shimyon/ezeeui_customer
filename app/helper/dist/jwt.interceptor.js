"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JwtInterceptor = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor(authService) {
        this.authService = authService;
        this.isRefreshing = false;
        this.refreshTokenSubject = new rxjs_1.BehaviorSubject(null);
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        if (this.authService.getHeaderToken()) {
            this.authService.getHeaderToken().then(function (token) {
                request = _this.addToken(request, token);
            });
        }
        return next.handle(request).pipe(operators_1.catchError(function (error) {
            if (error instanceof http_1.HttpErrorResponse && error.status === 401) {
                return _this.handle401Error(request, next);
            }
            else {
                return rxjs_1.throwError(error);
            }
        }));
    };
    JwtInterceptor.prototype.addToken = function (request, token) {
        return request.clone({
            setHeaders: {
                'Authorization': "Bearer " + token
            }
        });
    };
    JwtInterceptor.prototype.handle401Error = function (request, next) {
        var _this = this;
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            return this.authService.refreshToken().pipe(operators_1.switchMap(function (token) {
                _this.isRefreshing = false;
                _this.refreshTokenSubject.next(token.jwt);
                return next.handle(_this.addToken(request, token.jwt));
            }));
        }
        else {
            return this.refreshTokenSubject.pipe(operators_1.filter(function (token) { return token != null; }), operators_1.take(1), operators_1.switchMap(function (jwt) {
                return next.handle(_this.addToken(request, jwt));
            }));
        }
    };
    JwtInterceptor = __decorate([
        core_1.Injectable()
    ], JwtInterceptor);
    return JwtInterceptor;
}());
exports.JwtInterceptor = JwtInterceptor;
