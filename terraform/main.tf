provider "azurerm" {
  features {}
  subscription_id = "74822dc6-4697-42f7-b9cf-366ecb7211d9"
}

resource "azurerm_resource_group" "rg" {
  name     = "dns-resource-group"
  location = "West Europe"
}

resource "azurerm_dns_zone" "dns_zone" {
  name                = "tayssirghanmi.com"
  resource_group_name = azurerm_resource_group.rg.name
}

resource "azurerm_dns_a_record" "a_record" {
  name                = "@"
  zone_name           = azurerm_dns_zone.dns_zone.name
  resource_group_name = azurerm_resource_group.rg.name
  ttl                 = 300
  records             = ["185.199.108.153", "185.199.109.153", "185.199.110.153", "185.199.111.153"]
}

resource "azurerm_dns_cname_record" "cname_record" {
  name                = "www"
  zone_name           = azurerm_dns_zone.dns_zone.name
  resource_group_name = azurerm_resource_group.rg.name
  ttl                 = 300
  record              = "tayssirgh.github.io"
}

