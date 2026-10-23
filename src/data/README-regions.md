# 행정구역 데이터

- `regions.json` — 시도 → 시군구 → 읍면동(법정동, 리·폐지 제외). 출처: npm `cronozen-region-codes`(Apache-2.0, 행정표준코드 법정동)
  형식: `[{ c: 시도코드, n: 시도명, s: [{ c: 시군구코드, n: 시군구명, u: [읍면동명...] }] }]`
- `sigungu-shapes.json` — 시군구 경계(단순화). 현재 위치(좌표) → 시군구 판별용, 서버에서만 사용. 출처: npm `korea-sigungu-geocoding`(MIT)
  형식: `[{ c: 시군구코드, n: 시군구명, s: 시도명, r: [[[경도, 위도], ...], ...] }]`
