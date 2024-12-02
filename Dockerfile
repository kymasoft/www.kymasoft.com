FROM node:22-bookworm-slim

ARG HUGO_VERSION=0.158.0
ARG HUGO_SHA256=b63b49c2961f6f9f761368f790c34f26b62c4b17dc915f014db6885f7cd5681f

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl git \
  && curl -fsSL -o /tmp/hugo.deb "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb" \
  && echo "${HUGO_SHA256}  /tmp/hugo.deb" | sha256sum --check --status \
  && apt-get install -y /tmp/hugo.deb \
  && rm -f /tmp/hugo.deb \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

CMD ["bash"]
