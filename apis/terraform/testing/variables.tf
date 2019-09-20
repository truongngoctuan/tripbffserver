variable "region" {
  description = "The AWS region things are created in"
  default     = "ap-southeast-1"
}

variable "aws_id" {
  type        = "string"
  description = "AWS_ACCESS_KEY_ID"
  default = "AKIA43HXFY3XFFFG5GRX"
}

variable "aws_key" {
  type        = "string"
  description = "AWS_SECRET_ACCESS_KEY"
  default = "J2bWDomom6mwL8UZEtLvaTvyMMjnwphxs5ifM1rf"
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