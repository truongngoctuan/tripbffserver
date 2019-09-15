variable "cluster_id" {
  description = "The ECS cluster ID"
  type        = string
}

variable "repository_url" {
  description = "repository url"
  type        = string
}

variable "lottie_web_repository_url" {
  description = "lottie web repository url"
  type        = string
}

variable "mongodb" {
  description = "mongodb connection string"
  type        = string
}

variable "api_redis_gateway" {
  description = "api gateway, with an assumption from traefik"
  type        = string
  # default     = "18.140.37.188"
}

variable "api_redis_gateway_port" {
  description = "api gateway, with an assumption from traefik"
  type        = number
  # default     = "6379"
}

variable "api_trip_api_gateway" {
  description = "api gateway, with an assumption from traefik"
  type        = string
  # default     = "18.140.37.188"
}

variable "api_trip_api_gateway_port" {
  description = "api gateway, with an assumption from traefik"
  type        = number
  # default     = "8000"
}

variable "api_lottie_web_gateway" {
  description = "api gateway, with an assumption from traefik"
  type        = string
  # default     = "18.140.37.188"
}

variable "api_lottie_web_gateway_port" {
  description = "api gateway, with an assumption from traefik"
  type        = number
  # default     = "4050"
}
