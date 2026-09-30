#!/usr/bin/env bash
# s4ngg-portfolio(main)의 현재 HEAD 스냅샷을 s4ngg.github.io(GitHub Pages, 개인 도메인)로 미러 배포한다.
#
# 왜 일반 git push 대신 스냅샷 방식인가:
# 이 저장소의 기존 커밋 히스토리를 그대로 새 원격에 처음 push하면
# "did not receive expected object ..." 로 index-pack이 실패하는 문제가 있었다.
# fsck는 통과하는데 전송만 실패하는 걸로 봐서 과거 델타 체인 쪽 문제로 추정되고,
# 히스토리를 스쿼시(단일 커밋)해서 push하면 문제없이 성공한다.
# Pages는 배포 타깃일 뿐 개발 히스토리를 가질 필요가 없으므로, 매번 현재 상태를
# 스냅샷 떠서 force-push하는 방식을 택했다. 실제 개발 히스토리는 origin(GitHub)에만 남는다.
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PAGES_REMOTE="https://github.com/s4ngg/s4ngg.github.io.git"
TMP_DIR="$(mktemp -d)"

cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT

cd "$REPO_DIR"
git archive HEAD | (mkdir -p "$TMP_DIR/site" && tar -x -C "$TMP_DIR/site")

cd "$TMP_DIR/site"
git init -q
git checkout -q -b main
git add -A
git commit -q -m "sync: $(cd "$REPO_DIR" && git rev-parse --short HEAD) 스냅샷 배포"
git push --force "$PAGES_REMOTE" main:main

echo "s4ngg.github.io 배포 완료 (source: $(cd "$REPO_DIR" && git rev-parse --short HEAD))"
