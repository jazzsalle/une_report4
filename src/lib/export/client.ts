"use client";
import type { ReportContent } from "@/lib/types";
import { buildHwpx } from "./hwpx";
import { buildDocx } from "./docx";

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function downloadBytes(bytes: Uint8Array, filename: string, type: string) {
  downloadBlob(new Blob([bytes as BlobPart], { type }), filename);
}

let templateCache: ArrayBuffer | null = null;
export async function loadTemplate() {
  if (templateCache) return templateCache;
  const res = await fetch("/templates/report-template.hwpx");
  if (!res.ok) throw new Error("템플릿을 불러올 수 없습니다.");
  templateCache = await res.arrayBuffer();
  return templateCache;
}

export async function makeHwpx(c: ReportContent) {
  return buildHwpx(await loadTemplate(), c);
}

export async function exportHwpx(c: ReportContent, filename: string) {
  downloadBytes(await makeHwpx(c), `${filename}.hwpx`, "application/hwp+zip");
}

export async function exportDocx(c: ReportContent, filename: string) {
  downloadBlob(await buildDocx(c), `${filename}.docx`);
}

export function bytesToBase64(bytes: Uint8Array) {
  let s = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) s += String.fromCharCode(...bytes.subarray(i, i + chunk));
  return btoa(s);
}

export function base64ToBytes(b64: string) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
