export interface PayoutBank {
    account_number: string;
    account_type: string;
    routing_number: string;
}

export interface PayoutMethod {
    custom_data?: any;
    id?:string;
    legal_entity_id: string;
    nickname: string;
    payout_bank_us?: PayoutBank;
    payout_bank_ca?: PayoutBank;
    payout_bank_gb?: PayoutBank;
    type: string;
}



