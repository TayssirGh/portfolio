variable "resource_group_name" {
  description = "The name of the resource group."
  type        = string
  default     = "dns-rg"
}

variable "location" {
  description = "The Azure location where resources will be created."
  type        = string
  default     = "West Europe"
}

variable "domain_name" {
  description = "The domain name to register."
  type        = string
  default     = "tayssirghanmi.com"
}

variable "contact_details" {
  description = "Contact details for domain registration."
  type = object({
    first_name   = string
    last_name    = string
    email        = string
    address1     = string
    city         = string
    state        = string
    postal_code  = string
    country_code = string
    phone_number = string
  })
  default = {
    first_name   = "Tayssir"
    last_name    = "Ghanmi"
    email        = "tayssir.ghanmi@eniso.u-sousse.tn"
    address1     = "01"
    city         = "Manzel Bourguiba"
    state        = "Bizerte"
    postal_code  = "7050"
    country_code = "TN"
    phone_number = "+21693272679"
  }
}
