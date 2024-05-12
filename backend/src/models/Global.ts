/**
 * 后端的全局变量
 */

import { Collection, Db, MongoClient, OptionalId } from "mongodb";
import { Logger } from "tsrpc";
import { BackConfig } from "./BackConfig";
import { DbEditor } from "../shared/collectionType/DbEditor";
import { DbUser } from "../shared/collectionType/DbUser";
import { MongodbPersistence } from "y-mongodb-provider";

export class Global {
    static db: Db;
    static mongodbPersistence: MongodbPersistence;

    // 初始化数据库
    static async init(logger?: Logger) {
        logger?.log("开始连接数据库...");
        const client = await new MongoClient(BackConfig.mongoDb).connect();
        logger?.log("数据库连接成功");
        // 获取数据库实例 数据库名字: BasicInfo
        this.db = client.db("BasicInfo");

        // 初始化mongodbPersistence
        const persistence = new MongodbPersistence(BackConfig.mongoDb, {
            flushSize: 100,
            multipleCollections: true,
        });
        this.mongodbPersistence = persistence;
    }

    // 自行实现一个.cllection方法
    static collection<T extends keyof DbCollectionType>(col: T): Collection<OptionalId<DbCollectionType[T]>> {
        return this.db.collection(col);
    }

}

// 通过表结构映射定义一个接口
// 这样做的好处是能利用typescript的类型检查从而避免一些表名拼写错误
export interface DbCollectionType {
    // 表名: 表类型
    Editor: DbEditor; // 示例
    // 用户信息
    User: DbUser;
}