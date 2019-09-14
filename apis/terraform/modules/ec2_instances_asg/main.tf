module "ec2-profile" {
  source = "../ecs-instance-profile"
  name   = var.namespace
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

  name = "${var.namespace}-${var.stage}"

  # Launch configuration
  lc_name = "${var.namespace}-${var.stage}"

  image_id                    = data.aws_ami.amazon_linux_ecs.id
  instance_type               = "t2.nano"
  security_groups             = [aws_security_group.mesh-vpc-security-group.id]
  iam_instance_profile        = module.ec2-profile.this_iam_instance_profile_id
  user_data                   = data.template_file.user_data.rendered
  key_name                    = "tripbff-ec2-key-pair"
  associate_public_ip_address = true

  # Auto scaling group
  asg_name            = "${var.namespace}-${var.stage}"
  vpc_zone_identifier = [aws_subnet.mesh-vpc-subnet1.id, aws_subnet.mesh-vpc-subnet2.id]
  # vpc_zone_identifier       =  module.vpc.public_subnets
  health_check_type         = "EC2"
  min_size                  = 0
  max_size                  = 1
  desired_capacity          = 1
  wait_for_capacity_timeout = 0

  tags = [
    {
      key                 = "Environment"
      value               = var.stage
      propagate_at_launch = true
    },
    {
      key                 = "Cluster"
      value               = var.namespace
      propagate_at_launch = true
    },
  ]
}

data "template_file" "user_data" {
  template = file("${path.module}/user-data.sh")

  vars = {
    cluster_name = var.namespace
  }
}
