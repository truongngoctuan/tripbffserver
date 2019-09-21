resource "aws_eip" "example" {
  vpc = true
}

resource "aws_eip_association" "eip_assoc" {
  instance_id   = "${aws_instance.one.id}"
  allocation_id = "${aws_eip.example.id}"
}