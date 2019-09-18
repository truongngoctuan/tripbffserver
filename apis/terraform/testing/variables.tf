variable "aws_region" {
  description = "The AWS region things are created in"
  default     = "ap-southeast-1"
}

# ---------SSO------------
variable "sso_repository_url" {
  default = "883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/sso"
}

variable "redis_repository_url" {
  default = "883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/redis"
}

variable "trip_api_repository_url" {
  default = "883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/trip-api"
}

variable "infographic_repository_url" {
  default = "883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/infographic"
}

variable "lottie_web_repository_url" {
  default = "883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/lottie-web"
}