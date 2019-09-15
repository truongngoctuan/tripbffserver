output "eip_public_ip" {
  value = aws_eip.example.public_ip
}

output "eip_private_ip" {
  value = aws_eip.example.private_ip
}