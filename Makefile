.PHONY: run fe-exec be-exec stop

# Start all services
run:
	docker-compose up

run-no-cache:
	docker-compose build --no-cache fe && docker-compose up db be fe

# Execute shell in frontend container (uses sh because Alpine Linux doesn't have bash)
fe-exec:
	docker-compose exec fe sh

# Execute bash in backend container (Ruby image includes bash)
be-exec:
	docker-compose exec be bash

# Stop all services
stop:
	docker-compose down
