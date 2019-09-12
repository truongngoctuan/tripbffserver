locals {
  region    = "ap-southeast-1"
  namespace = "tripbff"
  stage     = "dev"

  # This is the convention we use to know what belongs to each other
  resources_name = "${local.namespace}-${local.stage}"
}

#----- ECS  Services--------

# We have one ECS cluster that instances will register with
resource "aws_ecs_cluster" "cluster" {
  name = local.namespace
}

module "ecs-sso-services" {
  source     = "../ecs-sso-services"
  cluster_id = aws_ecs_cluster.cluster.id
  repository_url = var.sso_repository_url
  mongodb = var.sso_mongodb
}

module "ec2-profile" {
  source = "../ecs-instance-profile"
  name   = local.namespace
}

# follow this to tracking why EC2 does not link with ECS service (ami is not correct) https://stackoverflow.com/questions/46578949/terraform-ecs-registered-container-instance-is-showing-0/46582013
#For now we only use the AWS ECS optimized ami <https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-optimized_AMI.html>
data "aws_ami" "amazon_linux_ecs" {
  most_recent = true
  owners      = ["amazon"]


  filter {
    name   = "owner-alias"
    values = ["amazon"]
  }

  filter {
    name   = "name"
    values = ["amzn2-ami-ecs-hvm*"]
  }
}

module "this" {
  source  = "terraform-aws-modules/autoscaling/aws"
  version = "~> 3.0"

  name = local.resources_name

  # Launch configuration
  lc_name = local.resources_name

  image_id                    = data.aws_ami.amazon_linux_ecs.id
  instance_type               = "t2.nano"
  security_groups             = [aws_security_group.mesh-vpc-security-group.id]
  iam_instance_profile        = module.ec2-profile.this_iam_instance_profile_id
  user_data                   = data.template_file.user_data.rendered
  key_name                    = "tripbff-ec2-key-pair"
  associate_public_ip_address = true

  # Auto scaling group
  asg_name            = local.resources_name
  vpc_zone_identifier = [aws_subnet.mesh-vpc-subnet1.id, aws_subnet.mesh-vpc-subnet1.id]
  # vpc_zone_identifier       =  module.vpc.public_subnets
  health_check_type         = "EC2"
  min_size                  = 0
  max_size                  = 1
  desired_capacity          = 1
  wait_for_capacity_timeout = 0

  tags = [
    {
      key                 = "Environment"
      value               = local.stage
      propagate_at_launch = true
    },
    {
      key                 = "Cluster"
      value               = local.namespace
      propagate_at_launch = true
    },
  ]
}

data "template_file" "user_data" {
  template = file("${path.module}/user-data.sh")

  vars = {
    cluster_name = local.namespace
  }
}
