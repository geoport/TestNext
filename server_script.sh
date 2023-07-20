sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install certbot python3-certbot-nginx python3-certbot-apache -y
sudo certbot certonly --nginx -d beta.soilprime.com
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo apt-get install docker-compose -y
sudo docker-compose up --build
