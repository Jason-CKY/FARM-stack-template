.DEFAULT_GOAL := help

# declares .PHONY which will run the make command even if a file of the same name exists
.PHONY: help
help:			## Help command
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: lint
lint:			## Lint check
	docker run --rm -v $(PWD):/src:Z \
	--workdir=/src odinuge/yapf:latest yapf \
	--style '{based_on_style: pep8, dedent_closing_brackets: true, coalesce_brackets: true}' \
	--no-local-style --verbose --recursive --diff --parallel backend

.PHONY: format
format:			## Format code in place to conform to lint check
	docker run --rm -v $(PWD):/src:Z \
	--workdir=/src odinuge/yapf:latest yapf \
	--style '{based_on_style: pep8, dedent_closing_brackets: true, coalesce_brackets: true}' \
	--no-local-style --verbose --recursive --in-place --parallel backend

.PHONY: pyflakes
pyflakes:		## Pyflakes check for any unused variables/classes
	docker run --rm -v $(PWD):/src:Z \
	--workdir=/src python:3.8 \
	/bin/bash -c "pip install --upgrade pyflakes && python -m pyflakes /src && echo 'pyflakes passed!'"

.PHONY: build
build:		## rebuild all the images in the docker-compose file
	docker-compose --env-file config/database.env up --build -d

.PHONY: start
start:		## deploy api with models in mlflow and monitoring deployed
	docker-compose --env-file config/database.env up -d

.PHONY: stop
stop:		## bring down all hosted services
	docker-compose --env-file config/database.env down

.PHONY: destroy
destroy:		## Bring down all hosted services with their volumes
	docker-compose --env-file config/database.env down -v
