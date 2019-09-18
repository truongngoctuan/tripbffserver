
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

resource "aws_network_interface" "foo" {
  subnet_id = aws_subnet.mesh-vpc-subnet1.id
  # private_ips = ["172.16.10.100"]

  tags = {
    Name = "primary_network_interface"
  }
}

resource "aws_network_interface" "foo2" {
  subnet_id = aws_subnet.mesh-vpc-subnet2.id
  # private_ips = ["172.16.10.100"]

  tags = {
    Name = "primary_network_interface"
  }
}

module "ec2-profile" {
  source = "../instance-profile"
  name   = var.namespace
}

resource "aws_instance" "one" {
  ami           = data.aws_ami.amazon_linux_ecs.id
  instance_type = "t2.micro"

  # security_groups             = [aws_security_group.mesh-vpc-security-group.id]
  iam_instance_profile        = module.ec2-profile.this_iam_instance_profile_id
  user_data                   = data.template_file.user_data.rendered
  key_name                    = "tripbff-ec2-key-pair" # todo abstract this to var
  # associate_public_ip_address = true
  vpc_security_group_ids = [aws_security_group.mesh-vpc-security-group.id]
  subnet_id = "${aws_subnet.mesh-vpc-subnet1.id}"

  # network_interface {
  #   network_interface_id = "${aws_network_interface.foo.id}"
  #   device_index         = 0
  # }

  # network_interface {
  #   network_interface_id = "${aws_network_interface.foo2.id}"
  #   device_index         = 1
  # }

  tags = {
    Environment = var.stage
    Cluster     = var.namespace
  }
}

data "template_file" "user_data" {
  template = file("${path.module}/user-data.sh")

  vars = {
    cluster_name = "${var.namespace}-${var.stage}"
  }
}
