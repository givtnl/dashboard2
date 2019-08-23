import { UrlSerializer, DefaultUrlSerializer, UrlTree } from '@angular/router';

export default class CustomUrlSerializer implements UrlSerializer {
    private _defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

    parse(url: string): UrlTree {
        // Use the default serializer.
        return this._defaultUrlSerializer.parse(url);
    }

    serialize(tree: UrlTree): string {
        return this._defaultUrlSerializer.serialize(tree).replace('+', '%2B');
    }
}