variable "domain" {
  type        = "string"
  description = "domain name, for example http://ec2-18-136-37-156.ap-southeast-1.compute.amazonaws.com"
}

variable "sub_domain" {
  type        = "string"
  description = "sub domain name, for example whoami"
  default = "trip-api"
}

variable "cluster_id" {
  description = "The ECS cluster ID"
  type        = string
}

variable "repository_url" {
  description = "repository url"
  type        = string
}

variable "mongodb" {
  description = "mongodb connection string"
  type        = string
}

variable "api_redis_gateway" {
  description = "api gateway, with an assumption from traefik"
  type        = string
  default     = "18.140.37.188"
}

variable "api_redis_gateway_port" {
  description = "api gateway, with an assumption from traefik"
  type        = number
  # default     = "6379"
}

# TODO not sure if these 2 needed ????
variable "api_trip_api_gateway" {
  description = "api gateway, with an assumption from traefik"
  type        = string
  default     = "18.140.37.188"
}

variable "api_trip_api_gateway_port" {
  description = "api gateway, with an assumption from traefik"
  type        = number
  # default     = "8000"
}
