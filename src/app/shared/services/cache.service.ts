import { Injectable } from "@angular/core";

interface CacheItem {
    lastUpdatedTime: Date;
    expiresIn: number;
    object: any;
}

export class CacheService {
    constructor(private storage: Storage) { }

    public setItem(key: string, object: any, expiresInMinutes: number) {
        let item: CacheItem = { lastUpdatedTime: new Date(), expiresIn: expiresInMinutes * 60000, object: object };
        this.storage.setItem(key, JSON.stringify(item));
    }

    public getItem<T>(key: string): T {
        let item: CacheItem;
        try {
            item = JSON.parse(key) as CacheItem;
        } catch {
            return null;
        }
        if (Date.now() > item.lastUpdatedTime.getTime() + item.expiresIn)
            //cache expired
            return null;
        else
            return item.object as T;
    }
}