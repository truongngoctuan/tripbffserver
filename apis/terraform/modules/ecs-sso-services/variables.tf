variable "cluster_id" {
  description = "The ECS cluster ID"
  type        = string
}

variable "repository_url" {
  description = "repository url for sso service"
  type        = string
}

variable "mongodb" {
  description = "mongodb connection string"
  type = string
}