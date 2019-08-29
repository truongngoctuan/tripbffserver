docker run --name prometheus -d -p 9090:9090 --volume="$PWD/config":/etc/config prom/prometheus --config.file=/etc/config/prometheus.yml
