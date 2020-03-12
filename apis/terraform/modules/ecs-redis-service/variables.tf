variable "stage" {
  type        = string
}

variable "domain" {
  type        = string
  description = "domain name, for example http://ec2-18-136-37-156.ap-southeast-1.compute.amazonaws.com"
}

variable "sub_domain" {
  type        = string
  description = "sub domain name, for example whoami"
  default = "redis"
}

variable "cluster_id" {
  description = "The ECS cluster ID"
  type        = string
}

variable "repository_url" {
  description = "repository url"
  type        = string
}