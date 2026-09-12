import { ListlocoEntityBase } from '../ListlocoEntityBase';
import type { ListlocoSDK } from '../ListlocoSDK';
import type { Control } from '../types';
import type { Localize, LocalizeCreateData } from '../ListlocoTypes';
declare class LocalizeEntity extends ListlocoEntityBase<Localize> {
    constructor(client: ListlocoSDK, entopts: any);
    make(this: LocalizeEntity): LocalizeEntity;
    create(this: any, reqdata?: LocalizeCreateData, ctrl?: Control): Promise<LocalizeEntity>;
}
export { LocalizeEntity };
