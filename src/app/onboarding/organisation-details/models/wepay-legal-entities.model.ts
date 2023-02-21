export interface Address {
  city: string;
  country: string;
  line1: string;
  postal_code: string;
  region: string;
}

export interface TradedExchanges {}

export interface PublicOwnership {
  is_publicly_traded: boolean;
  is_subsidiary: boolean;
  parent_company_name?: any;
  primary_exchange?: any;
  traded_exchanges: TradedExchanges;
}

export interface Controller {
  attest_time: number;
  original_ip: string;
}

export interface Attestation {
  attester_type: string;
  controller: Controller;
}

export interface Address2 {
  city: string;
  country: string;
  line1: string;
  postal_code: string;
  region: string;
}

export interface Name {
  first: string;
  last: string;
}

export interface US {
  social_security_number_is_present: boolean;
}

export interface PersonalCountryInfo {
  US: US;
}

export interface Phone {
  country_code: string;
  phone_number: string;
}

export interface Controller {
  reference_id: string;
  address: Address2;
  date_of_birth_is_present: boolean;
  email: string;
  name: Name;
  personal_country_info: PersonalCountryInfo;
  phone: Phone;
  job_title: string;
}

export interface US2 {
  employer_identification_number: string;
}

export interface EntityCountryInfo {
  US: US2;
  country_of_formation: string;
  operates_in_sanctioned_countries: string[];
  year_of_formation: number;
}

export interface Owner {
  id: string;
  path?: any;
  resource: string;
}

export interface TermsOfService {
  acceptance_time: number;
  original_ip: string;
  terms_of_service_version: string;
}

export interface AssociationTypes {
  contractual_obligation: boolean;
  donor: boolean;
  funding_recipient: boolean;
  other: string;
  parent_organization: boolean;
  program_affiliation: boolean;
  resource_delivery_provider: boolean;
  transfer_retention_or_expenditure: boolean;
}

export interface Affiliation0 {
  name: string;
  countries: string[];
  association_types: AssociationTypes;
}

export interface Affiliations {
  affiliation_0: Affiliation0;
}

export interface Entities {
  art_and_culture: boolean;
  education: boolean;
  individual: boolean;
  labor_union: boolean;
  other: string;
  political_organization: boolean;
  religious: boolean;
  social_service_and_economic_development: boolean;
}

export interface Geographies {
  local: boolean;
  regional: boolean;
  national: boolean;
  international: string[];
}

export interface SignificantBeneficiaries {
  affiliations: Affiliations;
  entities: Entities;
  geographies: Geographies;
  non_domestic_location_beneficiaries: string[];
}

export interface SignificantDonors {
  corporate_entity: boolean;
  endowment_fund: boolean;
  government: boolean;
  individual: boolean;
  institutional: boolean;
  other: string;
  other_charitable_organization: boolean;
}

export interface LegalEntity {
  additional_representatives?: any;
  address?: Address;
  public_ownership?: PublicOwnership;
  attestation?: Attestation;
  controller?: Controller;
  account_controller?: any;
  controller_type?: string;
  country: string;
  create_time?: number;
  custom_data?: any;
  api_version?: string;
  description?: string;
  entity_country_info?: EntityCountryInfo;
  entity_name?: string;
  email?: string;
  id?: string;
  owner?: Owner;
  path?: string;
  phone?: any;
  primary_url?: string;
  preferred_locale?: string;
  resource?: string;
  terms_of_service?: TermsOfService;
  reference_id?: any;
  significant_beneficiaries?: SignificantBeneficiaries;
  significant_donors?: SignificantDonors;
  enterprise_customer_id?: string;
}
