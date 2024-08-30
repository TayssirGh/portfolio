this [article](https://github.com/MicrosoftDocs/azure-docs/blob/main/articles/static-web-apps/custom-domain-azure-dns.md) was helpful ☺️
# Justification of resources
## 1 - Resource Group

   
*   **Purpose**: Creates an Azure Resource Group.
*    **Importance**: A Resource Group in Azure acts as a container that holds related resources for your Azure solution. It allows you to manage all resources within that group as a single entity.
## 2 - DNS Zone
* **Purpose**: This resource creates a DNS Zone in Azure for my domain.
* **Importance**: A DNS Zone is used to manage DNS records for a specific domain. By creating a DNS Zone in Azure, you can control DNS settings like A records, CNAMEs, etc., within Azure's DNS management service.
## 3 - A Record (Address Record)
```hcl
resource "azurerm_dns_a_record" "a_record" {
name                = "@"
zone_name           = azurerm_dns_zone.dns_zone.name
resource_group_name = azurerm_resource_group.rg.name
ttl                 = 300
records             = ["185.199.108.153", "185.199.109.153", "185.199.110.153", "185.199.111.153"]
}
```
* **Purpose**: Creates an A record in my DNS Zone.

* **Importance**: An A record maps a domain (like tayssirghanmi.com) to an IP address. In this case, it maps the root domain (@) to the IP addresses of GitHub Pages' servers. This allows visitors to access my GitHub Pages site via my custom domain.

* **TTL**: The Time-To-Live (TTL) is set to 300 seconds (5 minutes). It determines how long DNS resolvers cache the record before checking for updates.
### 4 - CNAME Record (Canonical Name Record):
```hcl
resource "azurerm_dns_cname_record" "cname_record" {
name                = "www"
zone_name           = azurerm_dns_zone.dns_zone.name
resource_group_name = azurerm_resource_group.rg.name
ttl                 = 300
record              = "tayssirgh.github.io"
}
```
* **Purpose**: Creates a CNAME record in your DNS Zone.
* **Importance**: A CNAME record maps one domain to another. Here, it maps www.tayssirghanmi.com to your GitHub Pages domain (tayssirgh.github.io). This allows www.tayssirghanmi.com to redirect to my GitHub Pages site.
### 5 - Domain Registration Using Azure App Service Domain
* **Purpose**: Registers a domain name with Azure.

* **Importance**: This resource handles the actual purchase and registration of my custom domain. The contact information provided here is used for domain registration purposes and must be accurate.

* **Contact Details**: These are required by the domain registration authority (ICANN) and must be provided for domain ownership verification.

