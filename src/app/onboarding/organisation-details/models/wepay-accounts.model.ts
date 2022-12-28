export interface USD {
    balance: number;
    incoming_pending: number;
    outgoing_pending: number;
    reserve: number;
}

export interface Currencies {
    USD: USD;
}

export interface Beneficiary {
    id: string;
    resource: string;
    path: string;
}

export interface IncomingPayments {
    accepted_methods: string[];
}

export interface Industry {
    category_detail?: string;
    merchant_category_code: string;
}

export interface Owner {
    id: string;
    path: string;
    resource: string;
}

export interface USD2 {
    next_payout_time: number;
    payout_method_id: string;
    period: string;
}

export interface Currencies2 {
    USD: USD2;
}

export interface Payout {
    currencies: Currencies2;
    default_currency: string;
}

export interface OtherFees {
    debit_failure_fee?: any;
}

export interface USD3 {
    credit_card?: any;
    payment_bank?: any;
    recurring_fee?: any;
    other_fees: OtherFees;
}

export interface Currencies3 {
    USD: USD3;
}

export interface Pricing {
    currencies: Currencies3;
}

export interface ReferralDetails {
    name: string;
    email: string;
    standard_id: string;
    coupon_code?: string;
}

export interface Account {
    legal_entity_id: string;
    beneficiary_legal_entity_id?:string;
    custom_data?: any;
    description?: string;
    incoming_payments?: IncomingPayments;
    industry?: Industry;
    name?: string;
    payout?: Payout;
    platform_onboarding_time?: any;
    pricing?: Pricing;
    projected_monthly_transaction_volume?: number;
    reference_id?: any;
    referral_details?: ReferralDetails;
    referral_partner?:string;
    statement_description?: string;
    owner?: Owner;
    path?: string;
    create_time?: number;
    api_version?: string;
    beneficiary?: Beneficiary;
    documents?: any[];
    id?: string;
    resource?: string; 
}



