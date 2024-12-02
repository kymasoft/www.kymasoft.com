.DEFAULT_GOAL := help

.PHONY: help clean lint build test package run check verify fmt install

IMAGE ?= www-kymasoft-com
TAG ?= local
COMPOSE ?= docker compose
VERIFY_SERVICE ?= verify
RUN_SERVICE ?= site
help:
	@printf '%s\n' \
		'clean    remove generated outputs and temporary state' \
		'lint     static checks' \
		'build    compile or assemble artifacts' \
		'test     deterministic automated test suite' \
		'package  produce distributable artifact or image' \
		'run      execute the system in a target runtime' \
		'check    aggregate fast verification' \
		'verify   aggregate release-style verification' \
		'fmt      rewrite code or metadata into the required format' \
		'install  install project dependencies'

clean:
	rm -rf public resources node_modules .hugo_build.lock

lint:
	$(COMPOSE) run --rm $(VERIFY_SERVICE) bash -lc "npm ci && npm run lint"

build:
	$(COMPOSE) run --rm $(VERIFY_SERVICE) bash -lc "npm ci && npm run build"

test:
	$(COMPOSE) run --rm $(VERIFY_SERVICE) bash -lc "npm ci && npm run build && npm run test"

package:
	docker build --tag $(IMAGE):$(TAG) .

run:
	$(COMPOSE) up --build $(RUN_SERVICE)

check:
	$(COMPOSE) run --rm $(VERIFY_SERVICE)

verify:
	$(COMPOSE) run --rm $(VERIFY_SERVICE)

fmt:
	$(COMPOSE) run --rm $(VERIFY_SERVICE) bash -lc "npm ci && npm run format"

install:
	$(COMPOSE) run --rm $(VERIFY_SERVICE) bash -lc "npm ci"
