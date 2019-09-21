output "eip_public_ip" {
  value = aws_eip.example.public_ip
}

output "private_ip" {
  value = aws_instance.one.private_ip
}