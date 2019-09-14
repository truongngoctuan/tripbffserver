# setup simple vpc https://medium.com/meshstudio/automating-ecs-deployments-with-terraform-1146736b7688
resource "aws_vpc" "mesh-vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = "true"

  tags = {
    Name = "mesh-vpc"
  }
}
resource "aws_subnet" "mesh-vpc-subnet1" {
  vpc_id            = "${aws_vpc.mesh-vpc.id}"
  cidr_block        = "10.0.0.0/24"
  availability_zone = "ap-southeast-1a"

  tags = {
    Name = "mesh-vpc-subnet"
  }
}

resource "aws_subnet" "mesh-vpc-subnet2" {
  vpc_id            = "${aws_vpc.mesh-vpc.id}"
  cidr_block        = "10.0.1.0/24"
  availability_zone = "ap-southeast-1b"

  tags = {
    Name = "mesh-vpc-subnet"
  }
}

resource "aws_security_group" "mesh-vpc-security-group" {
  name        = "mesh-vpc-security-group"
  description = "Allow HTTP, HTTPS, and SSH"
  vpc_id      = "${aws_vpc.mesh-vpc.id}"

  // HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  // HTTPS
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  // SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  // custom ports for ECS service
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_route_table" "mesh-vpc-route-table" {
  vpc_id = "${aws_vpc.mesh-vpc.id}"

  route {
    cidr_block = "10.0.0.0/0"
    gateway_id = "${aws_internet_gateway.mesh-vpc-internet-gateway.id}"
  }

  tags = {
    Name = "mesh-vpc-route-table"
  }
}

resource "aws_route_table_association" "mesh-vpc-route-table-association1" {
  subnet_id      = "${aws_subnet.mesh-vpc-subnet1.id}"
  route_table_id = "${aws_route_table.mesh-vpc-route-table.id}"
}

resource "aws_route_table_association" "mesh-vpc-route-table-association2" {
  subnet_id      = "${aws_subnet.mesh-vpc-subnet2.id}"
  route_table_id = "${aws_route_table.mesh-vpc-route-table.id}"
}

# resource "aws_network_acl" "mesh-vpc-network-acl" {
#   vpc_id     = "${aws_vpc.mesh-vpc.id}"
#   subnet_ids = ["${aws_subnet.mesh-vpc-subnet1.id}", "${aws_subnet.mesh-vpc-subnet2.id}"]

#   // HTTP
#   ingress {
#     rule_no    = 100
#     action     = "allow"
#     from_port  = 80
#     to_port    = 80
#     protocol   = "tcp"
#     cidr_block = "0.0.0.0/0"
#   }

#   // HTTPS
#   ingress {
#     rule_no    = 110
#     action     = "allow"
#     from_port  = 443
#     to_port    = 443
#     protocol   = "tcp"
#     cidr_block = "0.0.0.0/0"
#   }

#   // SSH
#   ingress {
#     rule_no    = 120
#     action     = "allow"
#     from_port  = 22
#     to_port    = 22
#     protocol   = "tcp"
#     cidr_block = "0.0.0.0/0"
#   }

#   egress {
#     rule_no    = 200
#     protocol   = "tcp"
#     action     = "allow"
#     cidr_block = "0.0.0.0/0"
#     from_port  = 80
#     to_port    = 80
#   }

  # egress {
  #   protocol   = "tcp"
  #   rule_no    = 200
  #   action     = "allow"
  #   cidr_block = "10.3.0.0/18"
  #   from_port  = 443
  #   to_port    = 443
  # }

#   egress {
#     rule_no    = 210
#     protocol   = "-1"
#     action     = "allow"
#     cidr_block = "0.0.0.0/0"
#     from_port  = 0
#     to_port    = 0
#   }

#   tags = {
#     Name = "mesh-vpc-network-acl"
#   }
# }

resource "aws_internet_gateway" "mesh-vpc-internet-gateway" {
  vpc_id = "${aws_vpc.mesh-vpc.id}"

  tags = {
    Name = "mesh-vpc-internet-gateway"
  }
}


