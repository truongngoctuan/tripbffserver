
# Specify the provider and access details
provider "aws" {
  shared_credentials_file = "$HOME/.aws/credentials"
  profile                 = "tripbff-test"
  region                  = var.aws_region
}