cd $(dirname $0)

# set up .env
if [ ! -f .env ]
then
  echo "DATABASE_HOST=\"\"" >> .env
  echo "DATABASE_PORT=" >> .env
  echo "DATABASE_USER=\"\"" >> .env
  echo "DATABASE_PASS=\"\"" >> .env
  echo -e "DATABASE_NAME=\"\"\n" >> .env
  
  echo "NUM_OF_CORES=1" >> .env
  echo "POWER_OF_CORE=8" >> .env
  echo "PUE=1.2" >> .env
  echo "CARBON_INTENSITY=436" >> .env
  echo "CONST_CORE_USAGE=1.2" >> .env
fi

# set up java runner
mkdir -p /tmp/sandbox
gcc src/java-runner/run.c -Wall -o /tmp/sandbox/run
