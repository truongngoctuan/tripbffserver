# http://ec2-18-136-37-156.ap-southeast-1.compute.amazonaws.com
variable "domain" {
  type        = string
  description = "domain name, for example http://ec2-18-136-37-156.ap-southeast-1.compute.amazonaws.com"
}

variable "cluster_id" {
  type        = string
  description = "ECS cluster name"
}