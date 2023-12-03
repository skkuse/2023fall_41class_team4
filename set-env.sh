cd $(dirname $0)

if [ ! -f backend/.env ]
then
  echo "DATABASE_HOST=\"\"" >> backend/.env
  echo "DATABASE_PORT=" >> backend/.env
  echo "DATABASE_USER=\"\"" >> backend/.env
  echo "DATABASE_PASS=\"\"" >> backend/.env
  echo -e "DATABASE_NAME=\"\"\n" >> backend/.env
  
  echo "NUM_OF_CORES=1" >> backend/.env
  echo "POWER_OF_CORE=1" >> backend/.env
  echo "PUE=1.2" >> backend/.env
fi