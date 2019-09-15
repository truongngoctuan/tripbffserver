variable "cluster_id" {
  type        = "string"
  description = "ECS cluster name"
}
variable "ecs_cluster_name" {
  type        = "string"
  description = "ECS cluster name"
}

variable "ecs_cluster_region" {
  type        = "string"
  description = "ECS cluster region"
}

variable "log_level" {
  type        = "string"
  default     = "INFO"
  description = "Traefk log level. See https://docs.traefik.io/configuration/logs/"
}

variable "log_format" {
  type        = "string"
  default     = "common"
  description = "Traefk log format. See https://docs.traefik.io/configuration/logs/"
}
