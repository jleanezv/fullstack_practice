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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobResolver = void 0;
const Job_1 = require("../entities/Job");
const type_graphql_1 = require("type-graphql");
let JobResolver = exports.JobResolver = class JobResolver {
    jobs({ em }) {
        return em.find(Job_1.Job, {});
    }
    job(id, { em }) {
        return em.findOne(Job_1.Job, { id });
    }
    async createJob(title, { em }) {
        const job = em.create(Job_1.Job, {
            title,
            createdAt: "",
            updatedAt: ""
        });
        await em.persistAndFlush(job);
        return job;
    }
    async updateJob(id, title, { em }) {
        const job = await em.findOne(Job_1.Job, { id });
        if (!job) {
            return null;
        }
        if (typeof title !== "undefined") {
            job.title = title;
            await em.persistAndFlush(job);
        }
        return job;
    }
    async deleteJob(id, { em }) {
        try {
            await em.nativeDelete(Job_1.Job, { id });
            return true;
        }
        catch (_a) {
            return false;
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Job_1.Job]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "jobs", null);
__decorate([
    (0, type_graphql_1.Query)(() => Job_1.Job, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "job", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Job_1.Job),
    __param(0, (0, type_graphql_1.Arg)("title")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "createJob", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Job_1.Job, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("title", () => String, { nullable: true })),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "updateJob", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "deleteJob", null);
exports.JobResolver = JobResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], JobResolver);
//# sourceMappingURL=job.js.map