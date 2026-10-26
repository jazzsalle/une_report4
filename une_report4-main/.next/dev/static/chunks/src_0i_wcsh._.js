(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/(app)/s/[id]/sop/KindIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KindIcon",
    ()=>KindIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/megaphone.mjs [app-client] (ecmascript) <export default as Megaphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$split$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Split$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/split.mjs [app-client] (ecmascript) <export default as Split>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.mjs [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sop/kind.ts [app-client] (ecmascript)");
;
;
;
;
function KindIcon({ kind, size = 30 }) {
    const icon = size * 0.55;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        title: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KIND_LABEL"][kind],
        "aria-label": __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KIND_LABEL"][kind],
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex shrink-0 items-center justify-center", kind === "decision" && "rotate-45 rounded-md bg-warning-weak text-warning", kind === "propagation" && "rounded-full bg-info-weak text-info", kind === "process" && "rounded-full bg-canvas text-sub"),
        style: {
            width: size,
            height: size
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(kind === "decision" && "-rotate-45"),
            children: kind === "decision" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$split$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Split$3e$__["Split"], {
                size: icon
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/KindIcon.tsx",
                lineNumber: 22,
                columnNumber: 32
            }, this) : kind === "propagation" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__["Megaphone"], {
                size: icon
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/KindIcon.tsx",
                lineNumber: 22,
                columnNumber: 81
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"], {
                size: icon
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/KindIcon.tsx",
                lineNumber: 22,
                columnNumber: 109
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/s/[id]/sop/KindIcon.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/s/[id]/sop/KindIcon.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = KindIcon;
var _c;
__turbopack_context__.k.register(_c, "KindIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MissionDetail",
    ()=>MissionDetail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.mjs [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.mjs [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.mjs [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash.mjs [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.mjs [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/nanoid/index.browser.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$82d2c0__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:82d2c0 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$397c0f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:397c0f [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FieldView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FieldView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2f$lib$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/qrcode/lib/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$s$2f5b$id$5d2f$sop$2f$SopWorkspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$s$2f5b$id$5d2f$sop$2f$RecipientPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$recipients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sop/recipients.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$s$2f5b$id$5d2f$sop$2f$KindIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/s/[id]/sop/KindIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sop/kind.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
/** 매뉴얼 전파대상 문구와 비슷한 전파그룹 추천 */ function recommended(groups, hints) {
    const text = hints.join(" ");
    const keys = [
        [
            /구·군|구군|시·군|시군|구청|군청/,
            /구·군|시·군/
        ],
        [
            /유관|경찰|소방|기상|군부대|사단|한전|한국전력/,
            /유관/
        ],
        [
            /시장|부시장|도지사|부지사|본부장|지휘/,
            /지휘부/
        ],
        [
            /상황실|자연재난|재난안전|상황관리|재난공무원/,
            /상황관리/
        ],
        [
            /산림|진화|산불/,
            /산불|진화/
        ]
    ];
    const ids = new Set();
    keys.forEach(([hint, group])=>{
        if (hint.test(text)) groups.filter((g)=>group.test(g.name)).forEach((g)=>ids.add(g.id));
    });
    return ids;
}
function MissionDetail({ mission: m, mode, running, started, editable, me, contacts, situationId, onChange, onDelete, onDone, dispatches, preview }) {
    _s();
    const [picking, setPicking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confirmSend, setConfirmSend] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sendError, setSendError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sent, setSent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [confirmDelete, setConfirmDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newDetail, setNewDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sending, startSend] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    // 발송 방법 (P-20) — 둘 다 고를 수 있고 기본은 문자
    const [ways, setWays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        sms: true,
        email: false
    });
    const set = (patch, immediate = false)=>onChange({
            ...m,
            ...patch
        }, immediate);
    const st = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$s$2f5b$id$5d2f$sop$2f$SopWorkspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSION_STATUS"][m.status];
    const recipients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MissionDetail.useMemo[recipients]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$recipients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRecipients"])(contacts, m.propagation)
    }["MissionDetail.useMemo[recipients]"], [
        contacts,
        m.propagation
    ]);
    const rec = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MissionDetail.useMemo[rec]": ()=>recommended(contacts.groups, m.propagation.targetHint)
    }["MissionDetail.useMemo[rec]"], [
        contacts.groups,
        m.propagation.targetHint
    ]);
    const now = ()=>new Date().toISOString();
    const edit = editable && mode === "edit";
    const run = editable && mode === "run";
    /** 전파 내용·조치 기록을 고칠 수 있음 — SOP는 실행 종료 후에도 언제나 수정 가능 */ const writable = editable;
    // 상황전파 영역은 상황전파 임무에만 (P-19). 이미 보낸 기록이 있으면 종류와 상관없이 보인다
    const isProp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["missionKind"])(m) === "propagation";
    const showProp = isProp || !!m.propagation.sentAt || dispatches.length > 0;
    // 주 버튼은 흐름 순서대로 하나: 착수 → 전파 → 조치 완료 (P-18·P-19)
    const sendFirst = isProp && m.status === "doing" && !m.propagation.sentAt;
    const recGroups = contacts.groups.filter((g)=>rec.has(g.id) && !m.propagation.groupIds.includes(g.id));
    const addGroup = (gid)=>set({
            propagation: {
                ...m.propagation,
                groupIds: [
                    ...m.propagation.groupIds,
                    gid
                ]
            }
        }, true);
    // 고른 발송 방법으로 연락처가 있는 수신자만 보낸다
    const reachable = recipients.filter((r)=>ways.sms && r.phone || ways.email && r.email);
    const setStatus = (status)=>{
        const patch = {
            status
        };
        if (status === "doing" && !m.startedAt) patch.startedAt = now();
        if (status === "done" || status === "skipped") {
            patch.doneAt = now();
            if (!m.startedAt) patch.startedAt = now();
            if (!m.assignee) patch.assignee = me;
            // 조치결과가 비어 있으면 수행한 세부항목으로 정리
            if (status === "done" && !m.result.trim()) {
                const done = m.details.filter((d)=>d.done).map((d)=>d.text);
                if (done.length) patch.result = done.join("\n");
            }
        }
        if (status === "done") onDone?.();
        if (status === "todo") {
            patch.startedAt = undefined;
            patch.doneAt = undefined;
        }
        set(patch, true);
    };
    const removeTarget = (kind, id)=>set({
            propagation: {
                ...m.propagation,
                [kind]: (m.propagation[kind] ?? []).filter((x)=>x !== id)
            }
        }, true);
    const addDetail = ()=>{
        if (!newDetail.trim()) return;
        set({
            details: [
                ...m.details,
                {
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])(6),
                    text: newDetail.trim(),
                    done: false
                }
            ]
        });
        setNewDetail("");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full flex-col",
        "data-tour": "mission-detail",
        children: [
            m.group && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-line-weak bg-canvas px-6 py-2.5 text-[15px] font-semibold text-sub",
                children: [
                    "[",
                    m.group.code,
                    "] ",
                    m.group.name
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                lineNumber: 134,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-3 border-b border-line-weak px-6 py-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$s$2f5b$id$5d2f$sop$2f$KindIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KindIcon"], {
                        kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["missionKind"])(m),
                        size: 34
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    edit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "min-w-0 flex-1 rounded-md border border-line px-3 py-1.5 text-[20px] font-bold outline-none focus:border-primary",
                        value: m.title,
                        placeholder: "임무명",
                        onChange: (e)=>set({
                                title: e.target.value
                            })
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "min-w-0 flex-1 text-[21px] font-bold",
                        children: m.title
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this),
                    m.condition && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                        tone: "orange",
                        children: m.condition
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 150,
                        columnNumber: 25
                    }, this),
                    started && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                        tone: st.tone,
                        children: st.label
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 151,
                        columnNumber: 21
                    }, this),
                    m.startedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[16px] text-sub",
                        children: [
                            "착수 ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtTime"])(m.startedAt)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 152,
                        columnNumber: 25
                    }, this),
                    edit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "sm",
                        onClick: ()=>setConfirmDelete(true),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                size: 17
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this),
                            " 임무 삭제"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "scroll-thin min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-5",
                children: [
                    !started && !edit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-md bg-info-weak px-4 py-3 text-info",
                        children: "실행 전입니다. 「SOP 실행 시작」을 누르면 착수·완료·전파를 기록할 수 있습니다."
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Group, {
                        title: "임무 정보",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 rounded-lg bg-canvas p-5",
                            children: [
                                edit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                    label: "임무 종류",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: [
                                            "process",
                                            "decision",
                                            "propagation"
                                        ].map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>set({
                                                        kind: k
                                                    }, true),
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex h-11 items-center gap-2 rounded-md border px-4 font-medium", (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["missionKind"])(m) === k ? "border-primary bg-primary-weak text-primary-strong" : "border-line bg-white hover:border-primary"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$s$2f5b$id$5d2f$sop$2f$KindIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KindIcon"], {
                                                        kind: k,
                                                        size: 24
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 23
                                                    }, this),
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KIND_LABEL"][k]
                                                ]
                                            }, k, true, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 173,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 171,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 170,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                    label: "임무내용",
                                    children: edit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        rows: 2,
                                        className: "input",
                                        value: m.content,
                                        onChange: (e)=>set({
                                                content: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 190,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "leading-relaxed",
                                        children: m.content || "-"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 192,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 188,
                                    columnNumber: 13
                                }, this),
                                [
                                    [
                                        "주관",
                                        m.lead,
                                        (v)=>set({
                                                lead: v
                                            })
                                    ],
                                    [
                                        "지원",
                                        m.support.join(", "),
                                        (v)=>set({
                                                support: v.split(/,\s*/)
                                            })
                                    ],
                                    [
                                        "협업기관",
                                        m.collab.join(", "),
                                        (v)=>set({
                                                collab: v.split(/,\s*/)
                                            })
                                    ]
                                ].map(([label, value, onSet])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                        label: label,
                                        children: edit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "input",
                                            value: value,
                                            onChange: (e)=>onSet(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                            lineNumber: 203,
                                            columnNumber: 25
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: value || "-"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                            lineNumber: 203,
                                            columnNumber: 109
                                        }, this)
                                    }, label, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 202,
                                        columnNumber: 15
                                    }, this)),
                                m.notes && m.notes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                    label: "비고",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-1 leading-snug",
                                        children: m.notes.map((n, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    "※ ",
                                                    n
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 210,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 208,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 207,
                                    columnNumber: 15
                                }, this),
                                m.resources.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                    label: "필요자원",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: m.resources.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                tone: "gray",
                                                children: r
                                            }, r, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 219,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 217,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 216,
                                    columnNumber: 15
                                }, this),
                                m.ref && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                    label: "매뉴얼 원문",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `/manual/${encodeURIComponent(m.ref.docId)}#page=${m.ref.pdfIndex + 1}`,
                                        target: "_blank",
                                        rel: "noopener",
                                        className: "inline-flex items-center gap-1.5 font-medium text-primary hover:underline",
                                        children: [
                                            "p.",
                                            m.ref.page,
                                            " 열기 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 235,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 229,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 228,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                            lineNumber: 168,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Group, {
                        title: `수행 확인 ${m.details.length ? `${m.details.filter((d)=>d.done).length}/${m.details.length}` : ""}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-1",
                                children: m.details.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex items-start gap-3 rounded-md px-2 py-1.5 hover:bg-canvas",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                className: "mt-1 h-5 w-5 shrink-0 accent-primary",
                                                checked: d.done,
                                                disabled: !run || !running,
                                                onChange: (e)=>set({
                                                        details: m.details.map((x)=>x.id === d.id ? {
                                                                ...x,
                                                                done: e.target.checked,
                                                                doneAt: e.target.checked ? now() : undefined
                                                            } : x),
                                                        ...m.status === "todo" && e.target.checked ? {
                                                            status: "doing",
                                                            startedAt: m.startedAt ?? now()
                                                        } : {}
                                                    }, m.status === "todo" && e.target.checked)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 247,
                                                columnNumber: 17
                                            }, this),
                                            edit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "min-w-0 flex-1 rounded border border-transparent px-1.5 py-0.5 leading-relaxed outline-none hover:border-line focus:border-primary",
                                                value: d.text,
                                                onChange: (e)=>set({
                                                        details: m.details.map((x)=>x.id === d.id ? {
                                                                ...x,
                                                                text: e.target.value
                                                            } : x)
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 267,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex-1 whitespace-pre-line leading-relaxed", d.done && "text-sub"),
                                                children: d.text
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 273,
                                                columnNumber: 19
                                            }, this),
                                            d.doneAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[15px] text-mute",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtTime"])(d.doneAt).split(" ")[1]
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 275,
                                                columnNumber: 30
                                            }, this),
                                            edit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "mt-0.5 rounded p-1 text-mute hover:bg-danger-weak hover:text-danger",
                                                onClick: ()=>set({
                                                        details: m.details.filter((x)=>x.id !== d.id)
                                                    }),
                                                "aria-label": "세부항목 삭제",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                    lineNumber: 282,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 277,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, d.id, true, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 246,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                lineNumber: 244,
                                columnNumber: 11
                            }, this),
                            !m.details.length && !edit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sub",
                                children: "세부항목 없음"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                lineNumber: 288,
                                columnNumber: 42
                            }, this),
                            edit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "input",
                                        "data-tour": "detail-add",
                                        placeholder: "세부항목 추가",
                                        value: newDetail,
                                        onChange: (e)=>setNewDetail(e.target.value),
                                        onKeyDown: (e)=>e.key === "Enter" && !e.nativeEvent.isComposing && addDetail()
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 291,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        disabled: !newDetail.trim(),
                                        onClick: addDetail,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 300,
                                                columnNumber: 17
                                            }, this),
                                            " 추가"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 299,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                lineNumber: 290,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 243,
                        columnNumber: 9
                    }, this),
                    showProp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-lg border border-line-weak bg-canvas/60 p-5",
                        "data-tour": "propagation",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-[18px] font-bold",
                                        children: "상황전파"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 310,
                                        columnNumber: 13
                                    }, this),
                                    m.propagation.sentAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[16px] font-medium text-sub",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtTime"])(m.propagation.sentAt),
                                            " 전파 · ",
                                            (m.propagation.sentTo ?? []).length,
                                            "명"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 312,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                lineNumber: 309,
                                columnNumber: 11
                            }, this),
                            m.propagation.targetHint.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3 text-[16px] text-sub",
                                children: [
                                    "매뉴얼 전파대상 · ",
                                    m.propagation.targetHint.join(", ")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                lineNumber: 318,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                rows: 3,
                                className: "input",
                                placeholder: "전파 내용",
                                disabled: !writable,
                                value: m.propagation.message,
                                onChange: (e)=>set({
                                        propagation: {
                                            ...m.propagation,
                                            message: e.target.value
                                        }
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                lineNumber: 320,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-2 font-medium",
                                        children: "전파 대상"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 329,
                                        columnNumber: 13
                                    }, this),
                                    contacts.contacts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-2 rounded-md bg-warning-weak px-4 py-3 text-warning",
                                        children: [
                                            "등록된 연락망이 없습니다.",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "/contacts",
                                                className: "font-bold underline",
                                                children: "연락망 관리"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 333,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 331,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$s$2f5b$id$5d2f$sop$2f$RecipientPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SelectionChips"], {
                                                b: contacts,
                                                sel: m.propagation,
                                                onRemove: writable ? removeTarget : undefined
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 339,
                                                columnNumber: 15
                                            }, this),
                                            editable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                disabled: !writable,
                                                onClick: ()=>setPicking(true),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                                        size: 17
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                        lineNumber: 342,
                                                        columnNumber: 19
                                                    }, this),
                                                    " ",
                                                    recipients.length ? "대상 변경" : "전파 대상 선택"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 341,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 338,
                                        columnNumber: 13
                                    }, this),
                                    writable && recGroups.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 flex flex-wrap items-center gap-2",
                                        "data-tour": "rec-groups",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[16px] text-sub",
                                                children: "추천 전파그룹"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 348,
                                                columnNumber: 17
                                            }, this),
                                            recGroups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>addGroup(g.id),
                                                    className: "flex h-10 items-center gap-1 rounded-full border border-dashed border-primary px-3.5 font-medium text-primary hover:bg-primary-weak",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                            lineNumber: 355,
                                                            columnNumber: 21
                                                        }, this),
                                                        " ",
                                                        g.name
                                                    ]
                                                }, g.id, true, {
                                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 347,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                lineNumber: 328,
                                columnNumber: 11
                            }, this),
                            run && running && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex items-center justify-end gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[16px] text-sub",
                                        children: [
                                            "수신 ",
                                            recipients.length,
                                            "명"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 364,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: sendFirst ? "primary" : "secondary",
                                        "data-tour": "propagate-send",
                                        disabled: !recipients.length || !m.propagation.message.trim() || sending,
                                        onClick: ()=>setConfirmSend(true),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                size: 17
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 371,
                                                columnNumber: 17
                                            }, this),
                                            " ",
                                            m.propagation.sentAt ? "다시 전파" : "전파"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 365,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                lineNumber: 363,
                                columnNumber: 13
                            }, this),
                            editable && !running && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-right text-[16px] text-sub",
                                children: "전파는 SOP 실행 중에 보낼 수 있습니다"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                lineNumber: 376,
                                columnNumber: 13
                            }, this),
                            dispatches.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResponseTable, {
                                dispatches: dispatches,
                                canAck: editable,
                                busy: sending,
                                onAck: (did)=>startSend(async ()=>{
                                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$82d2c0__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["ackDispatch"])(situationId, did);
                                        window.dispatchEvent(new Event("r4:refresh"));
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                lineNumber: 379,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 308,
                        columnNumber: 9
                    }, this),
                    (started || run) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Group, {
                        title: "조치 기록",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-4 md:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "조치결과",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                rows: 4,
                                                className: "input",
                                                placeholder: "수행한 조치 결과",
                                                disabled: !writable,
                                                value: m.result,
                                                onChange: (e)=>set({
                                                        result: e.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 400,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                            lineNumber: 399,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                            label: "피해·복구 조치",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                rows: 4,
                                                className: "input",
                                                placeholder: "피해 발생 및 조치 내용",
                                                disabled: !writable,
                                                value: m.damage,
                                                onChange: (e)=>set({
                                                        damage: e.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 410,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                            lineNumber: 409,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 398,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    label: "실제 담당자",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "input max-w-[360px]",
                                        disabled: !writable,
                                        placeholder: me,
                                        value: m.assignee,
                                        onChange: (e)=>set({
                                                assignee: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 421,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 420,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                            lineNumber: 397,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 396,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            run && running && (m.status === "todo" || m.status === "doing") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-end gap-2 border-t border-line-weak px-6 py-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "primary",
                    "data-tour": "mission-done",
                    onClick: ()=>setStatus("done"),
                    children: [
                        "다음 ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                            lineNumber: 438,
                            columnNumber: 16
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                    lineNumber: 437,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                lineNumber: 436,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$s$2f5b$id$5d2f$sop$2f$RecipientPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RecipientPicker"], {
                open: picking,
                onClose: ()=>setPicking(false),
                contacts: contacts,
                value: m.propagation,
                recommended: rec,
                hint: m.propagation.targetHint,
                onSave: (v)=>{
                    set({
                        propagation: {
                            ...m.propagation,
                            ...v
                        }
                    }, true);
                    setPicking(false);
                }
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                lineNumber: 443,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                open: confirmSend,
                onClose: ()=>setConfirmSend(false),
                title: "상황전파",
                width: 960,
                footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        sendError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mr-auto self-center text-danger",
                            children: sendError
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                            lineNumber: 463,
                            columnNumber: 27
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: ()=>setConfirmSend(false),
                            children: "취소"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                            lineNumber: 464,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "primary",
                            disabled: sending || !reachable.length,
                            onClick: ()=>startSend(async ()=>{
                                    setSendError(null);
                                    try {
                                        const channels = [
                                            ...ways.sms ? [
                                                "SMS"
                                            ] : [],
                                            ...ways.email ? [
                                                "EMAIL"
                                            ] : []
                                        ];
                                        const r = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$397c0f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["propagate"])(situationId, m.id, m.propagation.message, channels);
                                        onChange(r.mission);
                                        setConfirmSend(false);
                                        setSent(r.links);
                                        window.dispatchEvent(new Event("r4:refresh"));
                                    } catch (e) {
                                        setSendError(e instanceof Error ? e.message : "보내지 못했습니다.");
                                    }
                                }),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                    size: 17
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 484,
                                    columnNumber: 15
                                }, this),
                                " ",
                                reachable.length,
                                "명에게 전파"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                            lineNumber: 465,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                    lineNumber: 462,
                    columnNumber: 11
                }, this),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-6 md:grid-cols-[1fr_340px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "mb-2 font-bold",
                                    children: "전파 내용"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 491,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "whitespace-pre-line rounded-md bg-canvas p-4 leading-relaxed",
                                    children: m.propagation.message
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 492,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "mb-2 mt-5 font-bold",
                                    children: "발송 방법"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 493,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-5",
                                    children: [
                                        [
                                            "sms",
                                            "문자"
                                        ],
                                        [
                                            "email",
                                            "이메일"
                                        ]
                                    ].map(([k, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex cursor-pointer items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    className: "h-5 w-5 accent-primary",
                                                    checked: ways[k],
                                                    onChange: (e)=>setWays((w)=>({
                                                                ...w,
                                                                [k]: e.target.checked
                                                            }))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                    lineNumber: 502,
                                                    columnNumber: 19
                                                }, this),
                                                label
                                            ]
                                        }, k, true, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                            lineNumber: 501,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 494,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "mb-2 mt-5 font-bold",
                                    children: [
                                        "수신 ",
                                        recipients.length,
                                        "명"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 512,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "scroll-thin max-h-[300px] divide-y divide-line-weak overflow-y-auto rounded-md border border-line-weak",
                                    children: recipients.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex flex-wrap items-center gap-x-3 gap-y-0.5 px-3 py-2 text-[16px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: r.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                    lineNumber: 516,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sub",
                                                    children: r.unit
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                    lineNumber: 517,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-auto flex flex-wrap justify-end gap-x-3 tabular-nums text-sub",
                                                    children: [
                                                        ways.sms && (r.phone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: r.phone
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                            lineNumber: 519,
                                                            columnNumber: 45
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-danger",
                                                            children: "전화번호 없음"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                            lineNumber: 519,
                                                            columnNumber: 70
                                                        }, this)),
                                                        ways.email && (r.email ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: r.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                            lineNumber: 520,
                                                            columnNumber: 47
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-danger",
                                                            children: "이메일 없음"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                            lineNumber: 520,
                                                            columnNumber: 72
                                                        }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                    lineNumber: 518,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, r.id, true, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                            lineNumber: 515,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 513,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-[15px] text-sub",
                                    children: "수신자마다 응답 링크가 함께 발송됩니다."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 525,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                            lineNumber: 490,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "mb-2 font-bold",
                                    children: "현장 담당자 화면"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 528,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto h-[560px] w-[300px] overflow-hidden rounded-[36px] border-[10px] border-ink bg-white shadow-xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "scroll-thin h-full overflow-y-auto",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FieldView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldView"], {
                                            data: {
                                                orgName: preview.orgName,
                                                situationTitle: preview.situationTitle,
                                                missionTitle: m.title,
                                                message: m.propagation.message,
                                                name: recipients[0]?.name ?? "담당자",
                                                sentAt: new Date().toISOString(),
                                                readAt: null,
                                                doneAt: null,
                                                note: "",
                                                noteAt: null,
                                                ackAt: null
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                            lineNumber: 531,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 530,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 529,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                            lineNumber: 527,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                    lineNumber: 489,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                lineNumber: 456,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                open: !!sent,
                onClose: ()=>setSent(null),
                title: "전파 완료",
                width: 760,
                footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "primary",
                    onClick: ()=>setSent(null),
                    children: "확인"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                    lineNumber: 558,
                    columnNumber: 11
                }, this),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 text-[16px] text-sub",
                        children: "문자·메일 발송 모듈 연계 전입니다. 아래 링크를 현장 담당자에게 보내면 응답을 받을 수 있습니다."
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 563,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "scroll-thin max-h-[440px] divide-y divide-line-weak overflow-y-auto rounded-md border border-line-weak",
                        children: (sent ?? []).map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SentLink, {
                                l: l
                            }, l.id, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                lineNumber: 568,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 566,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                lineNumber: 552,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                open: confirmDelete,
                onClose: ()=>setConfirmDelete(false),
                title: "임무 삭제",
                width: 440,
                footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: ()=>setConfirmDelete(false),
                            children: "취소"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                            lineNumber: 580,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "danger",
                            onClick: ()=>{
                                setConfirmDelete(false);
                                onDelete();
                            },
                            children: "삭제"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                            lineNumber: 581,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                    lineNumber: 579,
                    columnNumber: 11
                }, this),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[18px]",
                    children: m.title
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                    lineNumber: 593,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                lineNumber: 573,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
_s(MissionDetail, "/g9954qecFNAlxiGKaZe9qZVcvM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c = MissionDetail;
/** 묶음 제목 (임무 정보 · 수행 확인 · 조치 기록) */ function Group({ title, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "mb-3 text-[18px] font-bold",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                lineNumber: 603,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
        lineNumber: 602,
        columnNumber: 5
    }, this);
}
_c1 = Group;
/** 임무 정보 한 줄 — 레이블 왼쪽 고정 폭 회색, 값 검정 */ function InfoRow({ label, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1 sm:flex-row sm:gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shrink-0 font-medium text-sub sm:w-[96px]",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                lineNumber: 613,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0 flex-1 text-ink",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                lineNumber: 614,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
        lineNumber: 612,
        columnNumber: 5
    }, this);
}
_c2 = InfoRow;
/** 현장 응답 현황 — 사람마다 한 줄, 칸에 시각 (P-22) */ function ResponseTable({ dispatches, canAck, busy, onAck }) {
    const hm = (v)=>v ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtTime"])(v).split(" ")[1] : null;
    const read = dispatches.filter((d)=>d.readAt).length;
    const done = dispatches.filter((d)=>d.doneAt).length;
    const waiting = dispatches.filter((d)=>d.note && !d.ackAt).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 flex flex-wrap items-center gap-x-2 font-medium",
                children: [
                    "현장 응답",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-normal text-sub",
                        children: [
                            "수신 ",
                            read,
                            " · 완료 ",
                            done,
                            " / ",
                            dispatches.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 639,
                        columnNumber: 9
                    }, this),
                    waiting > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold text-warning",
                        children: [
                            "· 확인 대기 ",
                            waiting
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 642,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                lineNumber: 637,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto rounded-md border border-line-weak bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-[16px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-canvas text-left text-sub",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2 font-medium",
                                        children: "이름 · 소속"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 648,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2 font-medium",
                                        children: "수신"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 649,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2 font-medium",
                                        children: "완료"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 650,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2 font-medium",
                                        children: "현장 조치사항"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 651,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2 font-medium",
                                        children: "상황실 확인"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                        lineNumber: 652,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                lineNumber: 647,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                            lineNumber: 646,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "divide-y divide-line-weak",
                            children: dispatches.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "align-top",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "whitespace-nowrap px-3 py-2.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: d.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                    lineNumber: 659,
                                                    columnNumber: 19
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sub",
                                                    children: d.unit
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                    lineNumber: 659,
                                                    columnNumber: 65
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                            lineNumber: 658,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "whitespace-nowrap px-3 py-2.5 tabular-nums",
                                            children: hm(d.readAt) ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-mute",
                                                children: "미수신"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 661,
                                                columnNumber: 93
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                            lineNumber: 661,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "whitespace-nowrap px-3 py-2.5 tabular-nums",
                                            children: hm(d.doneAt) ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-mute",
                                                children: "미완료"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 662,
                                                columnNumber: 93
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                            lineNumber: 662,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "min-w-[200px] whitespace-pre-line px-3 py-2.5 leading-snug",
                                            children: d.note || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-mute",
                                                children: "-"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 663,
                                                columnNumber: 103
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                            lineNumber: 663,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "whitespace-nowrap px-3 py-2.5 tabular-nums",
                                            children: d.ackAt ? hm(d.ackAt) : canAck ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                disabled: !d.note || busy,
                                                onClick: ()=>onAck(d.id),
                                                children: "확인"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 668,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-mute",
                                                children: "-"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                                lineNumber: 672,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                            lineNumber: 664,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, d.id, true, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                    lineNumber: 657,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                            lineNumber: 655,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                    lineNumber: 645,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                lineNumber: 644,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
        lineNumber: 636,
        columnNumber: 5
    }, this);
}
_c3 = ResponseTable;
function Field({ label, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 font-medium text-sub",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                lineNumber: 687,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
        lineNumber: 686,
        columnNumber: 5
    }, this);
}
_c4 = Field;
/** 발송된 수신자 링크 + QR */ function SentLink({ l }) {
    _s1();
    const [qr, setQr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const url = ("TURBOPACK compile-time truthy", 1) ? window.location.origin + "/m/" + l.token : "TURBOPACK unreachable";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "px-3 py-2.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium",
                        children: l.name
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 701,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sub",
                        children: l.unit
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 702,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tabular-nums text-sub",
                        children: l.phone
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 703,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-auto flex gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                onClick: async ()=>{
                                    await navigator.clipboard.writeText(url).catch(()=>{});
                                    setCopied(true);
                                    setTimeout(()=>setCopied(false), 1500);
                                },
                                children: copied ? "복사됨" : "링크 복사"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                lineNumber: 705,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                onClick: async ()=>setQr(qr ? null : await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2f$lib$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].toDataURL(url, {
                                        margin: 1,
                                        width: 180
                                    })),
                                children: "QR"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                lineNumber: 715,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: url,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "inline-flex h-9 items-center rounded-md border border-line px-3 text-[15px] hover:border-primary",
                                children: "열기"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                                lineNumber: 718,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                        lineNumber: 704,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                lineNumber: 700,
                columnNumber: 7
            }, this),
            qr && // eslint-disable-next-line @next/next/no-img-element
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: qr,
                alt: l.name + " 응답 링크 QR",
                className: "mt-2 h-[180px] w-[180px]"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
                lineNumber: 730,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx",
        lineNumber: 699,
        columnNumber: 5
    }, this);
}
_s1(SentLink, "639FZrzBmN+QS/ffJli5NQjS1eU=");
_c5 = SentLink;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "MissionDetail");
__turbopack_context__.k.register(_c1, "Group");
__turbopack_context__.k.register(_c2, "InfoRow");
__turbopack_context__.k.register(_c3, "ResponseTable");
__turbopack_context__.k.register(_c4, "Field");
__turbopack_context__.k.register(_c5, "SentLink");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RecipientPicker",
    ()=>RecipientPicker,
    "SelectionChips",
    ()=>SelectionChips
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$complex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-complex.mjs [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.mjs [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$recipients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sop/recipients.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const WAYS = [
    {
        value: "group",
        label: "전파그룹"
    },
    {
        value: "unit",
        label: "조직·부서"
    },
    {
        value: "person",
        label: "담당자"
    }
];
function toggle(list, id) {
    return list.includes(id) ? list.filter((x)=>x !== id) : [
        ...list,
        id
    ];
}
function SelectionChips({ b, sel, onRemove }) {
    const items = [
        ...b.groups.filter((g)=>sel.groupIds.includes(g.id)).map((g)=>({
                kind: "groupIds",
                id: g.id,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                label: g.name
            })),
        ...b.units.filter((u)=>(sel.unitIds ?? []).includes(u.id)).map((u)=>({
                kind: "unitIds",
                id: u.id,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$complex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"],
                label: u.name
            })),
        ...b.contacts.filter((c)=>sel.contactIds.includes(c.id)).map((c)=>({
                kind: "contactIds",
                id: c.id,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"],
                label: `${c.name} ${c.title}`.trim()
            }))
    ];
    if (!items.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap gap-2",
        children: items.map((it)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex h-10 items-center gap-1.5 rounded-md border border-primary bg-primary-weak pl-3 pr-2 font-medium text-primary-strong",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(it.icon, {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this),
                    it.label,
                    onRemove && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "rounded p-0.5 hover:bg-white",
                        "aria-label": `${it.label} 빼기`,
                        onClick: ()=>onRemove(it.kind, it.id),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                            lineNumber: 50,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                        lineNumber: 49,
                        columnNumber: 13
                    }, this),
                    !onRemove && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-1"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                        lineNumber: 53,
                        columnNumber: 25
                    }, this)
                ]
            }, it.kind + it.id, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c = SelectionChips;
function UnitRow({ b, id, depth, sel, openSet, onOpen, onToggle, inherited }) {
    const u = b.units.find((x)=>x.id === id);
    const kids = b.units.filter((x)=>x.parentId === id);
    const count = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$recipients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unitMembers"])(b, id).length;
    const on = inherited || sel.unitIds.includes(id);
    const isOpen = openSet.has(id);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 border-b border-line-weak py-1.5",
                style: {
                    paddingLeft: depth * 24
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("rounded p-1 text-sub hover:bg-canvas", !kids.length && "invisible"),
                        onClick: ()=>onOpen(id),
                        "aria-label": "펼치기",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                            size: 18,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("transition", isOpen && "rotate-90")
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex flex-1 cursor-pointer items-center gap-3 py-1.5", inherited && "cursor-default opacity-70"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                className: "h-5 w-5 accent-primary",
                                checked: on,
                                disabled: inherited || !count,
                                onChange: ()=>onToggle(id)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold",
                                children: u.name
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-auto pr-2 text-sub",
                                children: [
                                    count,
                                    "명"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            isOpen && kids.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UnitRow, {
                    b: b,
                    id: k.id,
                    depth: depth + 1,
                    sel: sel,
                    openSet: openSet,
                    onOpen: onOpen,
                    onToggle: onToggle,
                    inherited: on
                }, k.id, false, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                    lineNumber: 98,
                    columnNumber: 11
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c1 = UnitRow;
function RecipientPicker({ open, onClose, contacts: b, value, recommended, hint = [], onSave }) {
    _s();
    const [sel, setSel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        contactIds: [],
        groupIds: [],
        unitIds: []
    });
    const [way, setWay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("group");
    const [q, setQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [openSet, setOpenSet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [prevOpen, setPrevOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (open !== prevOpen) {
        setPrevOpen(open);
        if (open) {
            setSel({
                contactIds: value.contactIds,
                groupIds: value.groupIds,
                unitIds: value.unitIds ?? []
            });
            setQ("");
            setWay("group");
            setOpenSet(new Set(b.units.filter((u)=>!u.parentId).map((u)=>u.id)));
        }
    }
    const unitName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RecipientPicker.useMemo[unitName]": ()=>new Map(b.units.map({
                "RecipientPicker.useMemo[unitName]": (u)=>[
                        u.id,
                        u.name
                    ]
            }["RecipientPicker.useMemo[unitName]"]))
    }["RecipientPicker.useMemo[unitName]"], [
        b.units
    ]);
    const people = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RecipientPicker.useMemo[people]": ()=>{
            const k = q.trim();
            return b.contacts.filter({
                "RecipientPicker.useMemo[people]": (c)=>!k || `${c.name} ${c.title} ${c.duty} ${unitName.get(c.unitId) ?? ""}`.includes(k)
            }["RecipientPicker.useMemo[people]"]);
        }
    }["RecipientPicker.useMemo[people]"], [
        b.contacts,
        q,
        unitName
    ]);
    const total = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$recipients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRecipients"])(b, sel).length;
    // 그룹·조직으로 이미 들어간 사람
    const viaOthers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$recipients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recipientIds"])(b, {
        ...sel,
        contactIds: []
    });
    const toggleUnit = (id)=>setSel((s)=>{
            if (s.unitIds.includes(id)) return {
                ...s,
                unitIds: s.unitIds.filter((x)=>x !== id)
            };
            // 상위 조직을 고르면 하위 조직 개별 선택은 정리
            const sub = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$recipients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unitTree"])(b.units, id));
            return {
                ...s,
                unitIds: [
                    ...s.unitIds.filter((x)=>!sub.has(x)),
                    id
                ]
            };
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
        open: open,
        onClose: onClose,
        title: "전파 대상 선택",
        width: 760,
        footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "mr-auto self-center text-[18px] font-bold",
                    children: [
                        "수신 ",
                        total,
                        "명"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                    lineNumber: 163,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: onClose,
                    children: "취소"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                    lineNumber: 164,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "primary",
                    onClick: ()=>onSave(sel),
                    children: "적용"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                    lineNumber: 165,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
            lineNumber: 162,
            columnNumber: 9
        }, this),
        children: [
            hint.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 rounded-md bg-canvas px-4 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium text-sub",
                        children: "매뉴얼 전파대상"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this),
                    " · ",
                    hint.join(", ")
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                lineNumber: 172,
                columnNumber: 9
            }, this),
            b.contacts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 rounded-md bg-warning-weak px-4 py-4 text-warning",
                children: [
                    "등록된 연락망이 없습니다.",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/contacts",
                        className: "font-bold underline",
                        children: "연락망 관리"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                        lineNumber: 179,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                lineNumber: 177,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 empty:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectionChips, {
                    b: b,
                    sel: sel,
                    onRemove: (kind, id)=>setSel((s)=>({
                                ...s,
                                [kind]: s[kind].filter((x)=>x !== id)
                            }))
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                value: way,
                onChange: setWay,
                items: WAYS
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "scroll-thin mt-4 h-[46vh] min-h-[280px] overflow-y-auto pr-1",
                children: [
                    way === "group" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-2 sm:grid-cols-2",
                        children: [
                            b.groups.map((g)=>{
                                const on = sel.groupIds.includes(g.id);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSel((s)=>({
                                                ...s,
                                                groupIds: toggle(s.groupIds, g.id)
                                            })),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex h-14 items-center gap-2 rounded-md border px-4 text-left font-semibold transition", on ? "border-primary bg-primary text-white" : "border-line bg-white hover:border-primary"),
                                    children: [
                                        on ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                            lineNumber: 202,
                                            columnNumber: 25
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                            size: 18,
                                            className: "text-sub"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                            lineNumber: 202,
                                            columnNumber: 47
                                        }, this),
                                        g.name,
                                        !on && recommended.has(g.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "shrink-0 whitespace-nowrap rounded bg-warning-weak px-1.5 text-[14px] text-warning",
                                            children: "추천"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                            lineNumber: 204,
                                            columnNumber: 52
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("ml-auto font-medium", on ? "text-white" : "text-sub"),
                                            children: [
                                                g.memberIds.length,
                                                "명"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                            lineNumber: 205,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, g.id, true, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                    lineNumber: 194,
                                    columnNumber: 17
                                }, this);
                            }),
                            !b.groups.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "py-10 text-center text-sub",
                                children: "등록된 전파그룹이 없습니다"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                lineNumber: 209,
                                columnNumber: 34
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                        lineNumber: 190,
                        columnNumber: 11
                    }, this),
                    way === "unit" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: b.units.filter((u)=>!u.parentId).map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UnitRow, {
                                b: b,
                                id: u.id,
                                depth: 0,
                                sel: sel,
                                openSet: openSet,
                                inherited: false,
                                onOpen: (id)=>setOpenSet((s)=>new Set(toggle(Array.from(s), id))),
                                onToggle: toggleUnit
                            }, u.id, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                lineNumber: 217,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    way === "person" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        size: 18,
                                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-sub"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                        lineNumber: 234,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "input pl-10",
                                        placeholder: "이름·직위·부서 검색",
                                        value: q,
                                        onChange: (e)=>setQ(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                        lineNumber: 235,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "divide-y divide-line-weak",
                                children: [
                                    people.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex items-center gap-3 py-2.5", viaOthers.has(p.id) ? "opacity-60" : "cursor-pointer"),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    className: "h-5 w-5 accent-primary",
                                                    checked: viaOthers.has(p.id) || sel.contactIds.includes(p.id),
                                                    disabled: viaOthers.has(p.id),
                                                    onChange: ()=>setSel((s)=>({
                                                                ...s,
                                                                contactIds: toggle(s.contactIds, p.id)
                                                            }))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                                    lineNumber: 240,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: p.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: p.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-auto text-sub",
                                                    children: unitName.get(p.unitId)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, p.id, true, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                            lineNumber: 239,
                                            columnNumber: 17
                                        }, this)),
                                    !people.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "py-10 text-center text-sub",
                                        children: "찾는 담당자가 없습니다"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                        lineNumber: 252,
                                        columnNumber: 34
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                                lineNumber: 237,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                        lineNumber: 232,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/s/[id]/sop/RecipientPicker.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
_s(RecipientPicker, "jnnnNtHIxyRUWx+72tFHGAF5xfc=");
_c2 = RecipientPicker;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "SelectionChips");
__turbopack_context__.k.register(_c1, "UnitRow");
__turbopack_context__.k.register(_c2, "RecipientPicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SopFlow",
    ()=>SopFlow,
    "laneOf",
    ()=>laneOf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.mjs [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.mjs [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.mjs [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.mjs [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sop/kind.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$badges$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/badges.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function laneOf(m) {
    return m.stage.trim() ? m.stage.trim() : m.phase === "복구" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STEP_LABEL"].수습복구 : "직접 추가";
}
const byLane = (a, b)=>a === "직접 추가" ? 1 : b === "직접 추가" ? -1 : a.localeCompare(b);
function SopFlow({ missions, selected, started, ended, editing, onSelect, onMove, onAdd, onBig }) {
    _s();
    const current = started && !ended ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentMission"])(missions) : undefined;
    const groups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SopFlow.useMemo[groups]": ()=>{
            const lanes = Array.from(new Set(missions.map(laneOf))).sort(byLane);
            let no = 0;
            const nos = new Map();
            lanes.forEach({
                "SopFlow.useMemo[groups]": (l)=>missions.filter({
                        "SopFlow.useMemo[groups]": (m)=>laneOf(m) === l && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOnDemand"])(m)
                    }["SopFlow.useMemo[groups]"]).forEach({
                        "SopFlow.useMemo[groups]": (m)=>nos.set(m.id, ++no)
                    }["SopFlow.useMemo[groups]"])
            }["SopFlow.useMemo[groups]"]);
            return lanes.map({
                "SopFlow.useMemo[groups]": (label)=>{
                    const all = missions.filter({
                        "SopFlow.useMemo[groups].all": (m)=>laneOf(m) === label
                    }["SopFlow.useMemo[groups].all"]);
                    return {
                        label,
                        main: all.filter({
                            "SopFlow.useMemo[groups]": (m)=>!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOnDemand"])(m)
                        }["SopFlow.useMemo[groups]"]),
                        onDemand: all.filter(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOnDemand"]),
                        nos
                    };
                }
            }["SopFlow.useMemo[groups]"]);
        }
    }["SopFlow.useMemo[groups]"], [
        missions
    ]);
    const firstOnDemand = groups.find((g)=>g.onDemand.length)?.label;
    // 현재 임무가 보이도록
    const box = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const focus = current?.id;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SopFlow.useEffect": ()=>{
            if (!focus) return;
            box.current?.querySelector(`[data-mid="${focus}"]`)?.scrollIntoView({
                block: "nearest",
                behavior: "smooth"
            });
        }
    }["SopFlow.useEffect"], [
        focus
    ]);
    const row = (m, no)=>{
        const kind = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["missionKind"])(m);
        const st = m.status;
        const cur = current?.id === m.id;
        // 생략 + 미완료(완료했지만 수행 확인 미체크)는 회색으로
        const dim = st === "skipped" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$badges$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnfinished"])(m);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-mid": m.id,
            role: "button",
            tabIndex: 0,
            onClick: ()=>onSelect(m.id),
            onKeyDown: (e)=>e.key === "Enter" && onSelect(m.id),
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("relative mx-2 flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 outline-none transition focus-visible:ring-2 focus-visible:ring-white/60", selected === m.id && !cur ? "bg-white/15" : "hover:bg-white/10"),
            children: [
                no === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2", st === "done" ? "border-[#fb923c] bg-[#fb923c] text-[#0e1240]" : "border-dashed border-[#fb923c] text-[#fdba74]"),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                        lineNumber: 91,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                    lineNumber: 85,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "relative z-[1] mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex h-7 w-7 items-center justify-center border-[3px] text-[13px] font-bold text-white", kind === "decision" ? "rotate-45 rounded-[5px]" : "rounded-full", cur ? "border-white bg-[#ff3d8b] shadow-[0_0_12px_rgba(255,61,139,.7)]" : dim ? "border-white/40 bg-white/20 text-white/60" : st === "done" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("bg-[#4f8cff]", kind === "decision" ? "border-[#fbbf24]" : kind === "propagation" ? "border-[#22d3ee]" : "border-white") : kind === "decision" ? "border-[#fbbf24] bg-[#141a52]" : kind === "propagation" ? "border-[#22d3ee] bg-[#141a52]" : "border-white/70 bg-[#141a52]"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(kind === "decision" && "-rotate-45"),
                            children: no
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                            lineNumber: 112,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                        lineNumber: 95,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                    lineNumber: 94,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0 flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("leading-snug", cur ? "inline-block rounded-full bg-[#ff3d8b] px-3 py-1 font-bold text-white shadow-[0_0_16px_rgba(255,61,139,.6)]" : dim ? "text-white/40" : st === "done" ? "font-semibold text-white" : "text-white/80"),
                            children: m.title || "제목 없음"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this),
                        m.condition && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-0.5 text-[15px] font-semibold text-[#fdba74]",
                            children: m.condition
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                            lineNumber: 131,
                            columnNumber: 27
                        }, this),
                        (m.startedAt || m.doneAt) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-0.5 text-[15px] text-white/60",
                            children: [
                                m.startedAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtTime"])(m.startedAt) : "",
                                m.doneAt ? ` ~ ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtTime"])(m.doneAt).split(" ")[1]}` : m.startedAt ? " ~" : ""
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                            lineNumber: 133,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this),
                editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "flex shrink-0 flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "rounded p-0.5 text-white/70 hover:bg-white/15 hover:text-white",
                            "aria-label": "위로",
                            onClick: (e)=>(e.stopPropagation(), onMove(m.id, -1)),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                                lineNumber: 142,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                            lineNumber: 141,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "rounded p-0.5 text-white/70 hover:bg-white/15 hover:text-white",
                            "aria-label": "아래로",
                            onClick: (e)=>(e.stopPropagation(), onMove(m.id, 1)),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                                lineNumber: 145,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                            lineNumber: 144,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                    lineNumber: 140,
                    columnNumber: 11
                }, this)
            ]
        }, m.id, true, {
            fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-tour": "sop-flow",
        className: "flex max-h-[520px] flex-col overflow-hidden rounded-[var(--radius-card)] bg-[radial-gradient(ellipse_at_top_left,#22307a_0%,#141a52_45%,#0e1240_100%)] text-white xl:h-full xl:max-h-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 px-5 pb-2 pt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-[19px] font-bold",
                        children: "SOP 흐름도"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Legend, {}, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBig,
                        className: "ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/25 text-white/80 hover:bg-white/10 hover:text-white",
                        "aria-label": "크게 보기",
                        title: "크게 보기",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: box,
                className: "scroll-thin min-h-0 flex-1 overflow-y-auto pb-3",
                children: groups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sticky top-0 z-10 bg-[#141a52]/95 px-5 py-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-block rounded-full bg-[#4f8cff] px-3 py-0.5 text-[15px] font-bold text-white",
                                    children: g.label
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                                    lineNumber: 174,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "pointer-events-none absolute bottom-5 left-[35px] top-5 w-0.5 bg-white/25"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                                        lineNumber: 178,
                                        columnNumber: 15
                                    }, this),
                                    g.main.map((m)=>row(m, g.nos.get(m.id) ?? null))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                                lineNumber: 176,
                                columnNumber: 13
                            }, this),
                            g.onDemand.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-tour": g.label === firstOnDemand ? "ondemand" : undefined,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 px-5 pb-1.5 pt-3 text-[15px] font-bold text-[#fdba74]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                                                lineNumber: 184,
                                                columnNumber: 19
                                            }, this),
                                            " 필요시 임무"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                                        lineNumber: 183,
                                        columnNumber: 17
                                    }, this),
                                    g.onDemand.map((m)=>row(m, null))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                                lineNumber: 182,
                                columnNumber: 15
                            }, this)
                        ]
                    }, g.label, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-white/15 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    className: "w-full",
                    onClick: onAdd,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                            lineNumber: 195,
                            columnNumber: 13
                        }, this),
                        " 임무 추가"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                    lineNumber: 194,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                lineNumber: 193,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
        lineNumber: 154,
        columnNumber: 5
    }, this);
}
_s(SopFlow, "xkqlnhCBGm7a9ljkjhImBQ2XTJY=");
_c = SopFlow;
/** 「ⓘ」 표시 안내 — 누르면 범례 말풍선 (P-15) */ function Legend() {
    _s1();
    const box = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Legend.useEffect": ()=>{
            if (!open) return;
            const down = {
                "Legend.useEffect.down": (e)=>!box.current?.contains(e.target) && setOpen(false)
            }["Legend.useEffect.down"];
            const key = {
                "Legend.useEffect.key": (e)=>e.key === "Escape" && setOpen(false)
            }["Legend.useEffect.key"];
            window.addEventListener("mousedown", down);
            window.addEventListener("keydown", key);
            return ({
                "Legend.useEffect": ()=>{
                    window.removeEventListener("mousedown", down);
                    window.removeEventListener("keydown", key);
                }
            })["Legend.useEffect"];
        }
    }["Legend.useEffect"], [
        open
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: box,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": "표시 안내",
                "aria-expanded": open,
                onClick: ()=>setOpen(!open),
                className: "inline-flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                    lineNumber: 227,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 top-10 z-30 w-48 space-y-2.5 rounded-xl bg-white p-4 text-[16px] text-ink shadow-[0_16px_40px_rgba(0,0,0,.35)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                        className: "block",
                        children: "표시 안내"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                        lineNumber: 231,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "h-4 w-4 rounded-full bg-[#4f8cff]"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, this),
                            " 완료"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                        lineNumber: 232,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-0.5 h-3.5 w-3.5 rotate-45 rounded-[3px] border-[3px] border-[#fbbf24]"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                                lineNumber: 236,
                                columnNumber: 13
                            }, this),
                            " 상황판단"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                        lineNumber: 235,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "h-4 w-4 rounded-full border-[3px] border-[#22d3ee]"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                                lineNumber: 239,
                                columnNumber: 13
                            }, this),
                            " 상황전파"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                        lineNumber: 238,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "h-3 w-6 rounded-full bg-[#ff3d8b]"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                                lineNumber: 242,
                                columnNumber: 13
                            }, this),
                            " 현재 임무"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                        lineNumber: 241,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
                lineNumber: 230,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx",
        lineNumber: 219,
        columnNumber: 5
    }, this);
}
_s1(Legend, "0eQjFXYdgpZK+Y00o9kb0bs0QCI=");
_c1 = Legend;
var _c, _c1;
__turbopack_context__.k.register(_c, "SopFlow");
__turbopack_context__.k.register(_c1, "Legend");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MISSION_STATUS",
    ()=>MISSION_STATUS,
    "SopWorkspace",
    ()=>SopWorkspace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$visible$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/use-visible-refresh.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.mjs [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eraser.mjs [app-client] (ecmascript) <export default as Eraser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.mjs [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.mjs [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.mjs [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.mjs [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square.mjs [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$f47563__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:f47563 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$12820b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:12820b [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$fda4e9__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:fda4e9 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$757cf7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:757cf7 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$2c033d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:2c033d [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$b053a7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:b053a7 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$0588fe__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:0588fe [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$640728__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:640728 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$37bd26__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:37bd26 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sop/kind.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$convert$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sop/convert.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$s$2f5b$id$5d2f$sop$2f$MissionDetail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/s/[id]/sop/MissionDetail.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$s$2f5b$id$5d2f$sop$2f$Timeline$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/s/[id]/sop/Timeline.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$s$2f5b$id$5d2f$sop$2f$SopFlow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/s/[id]/sop/SopFlow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$targets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sop/targets.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const MISSION_STATUS = {
    todo: {
        label: "대기",
        tone: "gray"
    },
    doing: {
        label: "진행 중",
        tone: "blue"
    },
    done: {
        label: "완료",
        tone: "green"
    },
    skipped: {
        label: "생략",
        tone: "orange"
    }
};
/** 세 영역(흐름 · 임무 상세 · 수행 이력)은 화면 높이에 맞추고 각자 안쪽에서 스크롤 (P-16) */ const PANE = "xl:h-[calc(100vh-300px)] xl:min-h-[560px]";
function SopWorkspace({ id, sop, editable, me, events, contacts, title, orgName, dispatches }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [missions, setMissions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(sop?.missions ?? []);
    const missionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(missions);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SopWorkspace.useEffect": ()=>{
            missionsRef.current = missions;
        }
    }["SopWorkspace.useEffect"], [
        missions
    ]);
    // 처음 고를 임무: 실행 중이면 흐름 분홍(현재 임무)과 같은 임무, 아니면 첫 임무
    const pickFirst = (list)=>(sop?.startedAt && !sop?.endedAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentMission"])(list)?.id : undefined) ?? list[0]?.id ?? null;
    const [sel, setSel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "SopWorkspace.useState": ()=>pickFirst(sop?.missions ?? [])
    }["SopWorkspace.useState"]);
    const [busy, start] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const [confirmEnd, setConfirmEnd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confirmReset, setConfirmReset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [adding, setAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [genError, setGenError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const timers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    // 기본은 보기(실행) 화면, 고칠 때만 「SOP 편집」 (P-11). 실행을 한 번 종료하면 재개해도 편집 불가 (P-04)
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const bc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const notify = ()=>bc.current?.postMessage({
            type: "changed"
        });
    // 따라하기: 말풍선이 가리키는 임무를 고른다 (코드로)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SopWorkspace.useEffect": ()=>{
            const on = {
                "SopWorkspace.useEffect.on": (e)=>{
                    const code = e.detail;
                    const m = missionsRef.current.find({
                        "SopWorkspace.useEffect.on.m": (x)=>x.code === code || x.code === `BSN-${code}`
                    }["SopWorkspace.useEffect.on.m"]);
                    if (m) setSel(m.id);
                }
            }["SopWorkspace.useEffect.on"];
            window.addEventListener("r4-tour-select", on);
            return ({
                "SopWorkspace.useEffect": ()=>window.removeEventListener("r4-tour-select", on)
            })["SopWorkspace.useEffect"];
        }
    }["SopWorkspace.useEffect"], []);
    // 크게 보기 창에서 임무를 누르면 여기서 그 임무를 고른다
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SopWorkspace.useEffect": ()=>{
            const ch = new BroadcastChannel((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$targets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sopChannel"])(id));
            bc.current = ch;
            ch.onmessage = ({
                "SopWorkspace.useEffect": (e)=>{
                    if (e.data.type === "select") setSel(e.data.id);
                }
            })["SopWorkspace.useEffect"];
            return ({
                "SopWorkspace.useEffect": ()=>ch.close()
            })["SopWorkspace.useEffect"];
        }
    }["SopWorkspace.useEffect"], [
        id
    ]);
    /** 크게 보기 — 가로 흐름도 새 창 (상황실 큰 화면용, P-13) */ const openBig = ()=>window.open(`/board/${id}`, `sop-board-${id}`, "width=1280,height=820")?.focus();
    const select = (mid)=>{
        setSel(mid);
        bc.current?.postMessage({
            type: "select",
            id: mid
        });
    };
    // 조치 완료 → 다음 현재 임무(흐름 분홍과 같은 기준)를 고른다. 흐름은 왼쪽에 고정이라 화면 이동 없음
    const next = ()=>{
        // 완료 처리가 아직 상태에 반영되기 전이라 방금 완료한 임무(선택 중인 임무)는 뺀다
        const n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentMission"])(missions, sel);
        if (n) select(n.id);
    };
    // 서버 값이 바뀌면(다시 생성, 다른 사람의 저장) 동기화 — 내가 고치는 중(저장 대기)인 임무는 내 것을 유지
    const serverKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SopWorkspace.useMemo[serverKey]": ()=>`${sop?.generatedAt}|${JSON.stringify(sop?.missions ?? [])}`
    }["SopWorkspace.useMemo[serverKey]"], [
        sop
    ]);
    const [prevKey, setPrevKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(serverKey);
    if (serverKey !== prevKey) {
        setPrevKey(serverKey);
        const fresh = sop?.missions ?? [];
        setMissions((cur)=>fresh.map((m)=>timers.current.has(m.id) ? cur.find((x)=>x.id === m.id) ?? m : m));
        setSel(fresh.some((m)=>m.id === sel) ? sel : pickFirst(fresh));
    }
    const running = !!sop?.startedAt && !sop?.endedAt;
    const ended = !!sop?.endedAt;
    const frozen = ended || !!sop?.firstEndedAt;
    // 편집 중에 다른 창에서 실행을 종료했으면 편집을 닫는다
    if (frozen && editing) setEditing(false);
    // 실행 중에는 현장 응답·다른 사람의 저장을 주기적으로 받아온다 (화면이 보일 때만)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$visible$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVisibleRefresh"])(15000, running);
    const counts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SopWorkspace.useMemo[counts]": ()=>{
            const c = {
                todo: 0,
                doing: 0,
                done: 0,
                skipped: 0
            };
            // 필요시 임무는 실행했을 때만 센다
            missions.filter(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$kind$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["counted"]).forEach({
                "SopWorkspace.useMemo[counts]": (m)=>c[m.status]++
            }["SopWorkspace.useMemo[counts]"]);
            return c;
        }
    }["SopWorkspace.useMemo[counts]"], [
        missions
    ]);
    const current = missions.find((m)=>m.id === sel) ?? null;
    /** 내용 수정은 0.8초 뒤 저장, 상태 변경은 즉시 저장 후 이력 갱신 */ const update = (m, immediate = false)=>{
        setMissions((list)=>list.some((x)=>x.id === m.id) ? list.map((x)=>x.id === m.id ? m : x) : [
                ...list,
                m
            ]);
        const t = timers.current.get(m.id);
        if (t) clearTimeout(t);
        if (immediate) {
            timers.current.delete(m.id);
            start(async ()=>{
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$b053a7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["saveMission"])(id, m);
                router.refresh();
                notify();
            });
        } else {
            timers.current.set(m.id, setTimeout(()=>{
                timers.current.delete(m.id);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$b053a7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["saveMission"])(id, m).then(notify);
            }, 800));
        }
    };
    /** 저장 대기 중인 내용 수정을 바로 저장 (실행 종료·편집 종료 전) */ const flushSaves = ()=>Promise.all([
            ...timers.current.entries()
        ].map(([mid, t])=>{
            clearTimeout(t);
            timers.current.delete(mid);
            const m = missionsRef.current.find((x)=>x.id === mid);
            return m ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$b053a7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["saveMission"])(id, m) : undefined;
        }));
    /** 같은 대응단계 안에서 한 칸 위/아래로 */ const move = (mid, dir)=>{
        const i = missions.findIndex((m)=>m.id === mid);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= missions.length) return;
        const nextList = [
            ...missions
        ];
        [nextList[i], nextList[j]] = [
            nextList[j],
            nextList[i]
        ];
        setMissions(nextList);
        start(async ()=>{
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$37bd26__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["reorderMissions"])(id, nextList.map((m)=>m.id));
            notify();
        });
    };
    const remove = (mid)=>{
        setMissions((l)=>l.filter((m)=>m.id !== mid));
        setSel(missions.find((m)=>m.id !== mid)?.id ?? null);
        start(async ()=>{
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$f47563__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["deleteMission"])(id, mid);
            notify();
        });
    };
    const act = (fn)=>start(async ()=>{
            await fn();
            router.refresh();
            notify();
        });
    /** 다시 생성 (편집 모드, 실행 전만) — T3Q 호출이 실패하면 화면에 알린다 */ const generate = ()=>{
        setGenError(null);
        start(async ()=>{
            const r = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$fda4e9__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["generateSop"])(id);
            if (r.error) return setGenError(r.error);
            router.refresh();
            notify();
        });
    };
    // SOP가 없는 상황 — SOP는 상황정보 등록(이어서 작성)에서 만든다 (N-05)
    if (!sop) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            className: "py-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Empty"], {
                    children: "생성된 SOP가 없습니다."
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                    lineNumber: 258,
                    columnNumber: 9
                }, this),
                editable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[17px]",
                            children: "상황정보 등록에서 SOP를 생성하세요."
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                            lineNumber: 261,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/new?resume=${id}`,
                            className: "inline-flex h-14 items-center gap-1.5 rounded-md bg-primary px-7 text-[18px] font-medium text-white transition hover:bg-primary-strong",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                    lineNumber: 266,
                                    columnNumber: 15
                                }, this),
                                " 상황정보 등록으로"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                            lineNumber: 262,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                    lineNumber: 260,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
            lineNumber: 257,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "flex flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-x-4 gap-y-1.5",
                                children: [
                                    editing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        tone: "orange",
                                        children: "편집 중"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                        lineNumber: 281,
                                        columnNumber: 15
                                    }, this) : running ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        tone: "blue",
                                        children: "실행 중"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                        lineNumber: 283,
                                        columnNumber: 15
                                    }, this) : ended ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        tone: "green",
                                        children: "실행 종료"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                        lineNumber: 285,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        tone: "gray",
                                        children: "실행 전"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                        lineNumber: 287,
                                        columnNumber: 15
                                    }, this),
                                    sop.startedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[16px] text-sub",
                                        children: [
                                            "시작 ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtDateTime"])(sop.startedAt),
                                            sop.endedAt && ` · 종료 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtTime"])(sop.endedAt)}`
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                        lineNumber: 290,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[17px] font-medium",
                                        children: [
                                            "완료 ",
                                            counts.done,
                                            " · 진행 중 ",
                                            counts.doing,
                                            " · 대기 ",
                                            counts.todo,
                                            " · 생략 ",
                                            counts.skipped
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                        lineNumber: 295,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-x-3 gap-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        tone: "gray",
                                        children: sop.source === "t3q" ? "AI" : "기본 SOP"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                        lineNumber: 300,
                                        columnNumber: 13
                                    }, this),
                                    sop.manual && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1.5 text-[16px] text-sub",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                size: 17
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                                lineNumber: 303,
                                                columnNumber: 17
                                            }, this),
                                            sop.manual.replace(/\s*\([^)]*\)\s*$/, ""),
                                            " 기준"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                        lineNumber: 302,
                                        columnNumber: 15
                                    }, this),
                                    sop.centralStandard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[16px] font-semibold text-warning",
                                        children: "지역 매뉴얼 없음 — 중앙 표준매뉴얼의 지자체 공통 역할만 담겨 있습니다"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                        lineNumber: 308,
                                        columnNumber: 15
                                    }, this),
                                    sop.deptMatched === false && !sop.centralStandard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[16px] font-semibold text-warning",
                                        children: "요청 부서 없음 — 초기대응부서 기준"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                        lineNumber: 311,
                                        columnNumber: 15
                                    }, this),
                                    genError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[16px] font-semibold text-danger",
                                        children: genError
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                        lineNumber: 313,
                                        columnNumber: 26
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                lineNumber: 299,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this),
                    editable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-auto flex flex-wrap gap-2",
                        children: editing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                !sop.startedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    disabled: busy,
                                    onClick: generate,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                            lineNumber: 322,
                                            columnNumber: 21
                                        }, this),
                                        " 다시 생성"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                    lineNumber: 321,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "primary",
                                    "data-tour": "edit-done",
                                    onClick: ()=>{
                                        setEditing(false);
                                        start(async ()=>{
                                            await flushSaves();
                                            router.refresh();
                                            notify();
                                        });
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                            lineNumber: 337,
                                            columnNumber: 19
                                        }, this),
                                        " 편집 종료"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                    lineNumber: 325,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                            lineNumber: 319,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                !frozen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    "data-tour": "sop-edit",
                                    onClick: ()=>setEditing(true),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                            size: 17
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                            lineNumber: 344,
                                            columnNumber: 21
                                        }, this),
                                        " SOP 편집"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                    lineNumber: 343,
                                    columnNumber: 19
                                }, this),
                                !sop.startedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "primary",
                                    disabled: busy || !missions.length,
                                    "data-tour": "sop-start",
                                    onClick: ()=>act(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$0588fe__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["startSop"])(id)),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                            lineNumber: 354,
                                            columnNumber: 21
                                        }, this),
                                        " SOP 실행 시작"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                    lineNumber: 348,
                                    columnNumber: 19
                                }, this),
                                running && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    disabled: busy,
                                    onClick: ()=>setConfirmEnd(true),
                                    "data-tour": "sop-end",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                            lineNumber: 359,
                                            columnNumber: 21
                                        }, this),
                                        " 실행 종료"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                    lineNumber: 358,
                                    columnNumber: 19
                                }, this),
                                sop.startedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    disabled: busy,
                                    onClick: ()=>setConfirmReset(true),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__["Eraser"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                            lineNumber: 364,
                                            columnNumber: 21
                                        }, this),
                                        " SOP 초기화"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                    lineNumber: 363,
                                    columnNumber: 19
                                }, this),
                                ended && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            disabled: busy,
                                            onClick: ()=>act(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$757cf7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["reopenSop"])(id)),
                                            "data-tour": "sop-reopen",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 23
                                                }, this),
                                                " 실행 재개"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                            lineNumber: 369,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "primary",
                                            disabled: busy,
                                            onClick: ()=>start(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$640728__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["createReport"])(id)),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                                    lineNumber: 377,
                                                    columnNumber: 23
                                                }, this),
                                                " 상황일지 작성"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                            lineNumber: 372,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                    lineNumber: 368,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                            lineNumber: 341,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                        lineNumber: 317,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-5 xl:grid-cols-[minmax(300px,340px)_minmax(0,1fr)_minmax(300px,360px)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: PANE,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$s$2f5b$id$5d2f$sop$2f$SopFlow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SopFlow"], {
                            missions: missions,
                            selected: sel,
                            started: !!sop.startedAt,
                            ended: ended,
                            editing: editing && editable,
                            onSelect: select,
                            onMove: move,
                            onAdd: ()=>setAdding(true),
                            onBig: openBig
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                            lineNumber: 390,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: `flex min-h-[560px] flex-col overflow-hidden ${PANE}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-b border-line-weak px-6 py-3.5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-[19px] font-bold",
                                    children: "임무 상세"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                    lineNumber: 405,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                lineNumber: 404,
                                columnNumber: 11
                            }, this),
                            current ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-h-0 flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$s$2f5b$id$5d2f$sop$2f$MissionDetail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MissionDetail"], {
                                    mission: current,
                                    mode: editing ? "edit" : "run",
                                    dispatches: dispatches.filter((d)=>d.missionId === current.id),
                                    preview: {
                                        orgName,
                                        situationTitle: title
                                    },
                                    running: running,
                                    started: !!sop.startedAt,
                                    editable: editable,
                                    me: me,
                                    contacts: contacts,
                                    situationId: id,
                                    onChange: update,
                                    onDone: next,
                                    onDelete: ()=>remove(current.id)
                                }, current.id, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                    lineNumber: 409,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                lineNumber: 408,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Empty"], {
                                children: "임무를 선택하세요."
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                lineNumber: 427,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                        lineNumber: 403,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: PANE,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$s$2f5b$id$5d2f$sop$2f$Timeline$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timeline"], {
                            id: id,
                            events: events,
                            editable: editable
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                            lineNumber: 432,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                        lineNumber: 431,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                lineNumber: 388,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                open: confirmEnd,
                onClose: ()=>setConfirmEnd(false),
                title: "SOP 실행 종료",
                width: 480,
                footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: ()=>setConfirmEnd(false),
                            children: "취소"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                            lineNumber: 443,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "primary",
                            disabled: busy,
                            onClick: ()=>{
                                setConfirmEnd(false);
                                act(async ()=>{
                                    await flushSaves();
                                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$12820b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["endSop"])(id);
                                });
                            },
                            children: "종료"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                            lineNumber: 444,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                    lineNumber: 442,
                    columnNumber: 11
                }, this),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[18px]",
                        children: [
                            "완료 ",
                            counts.done,
                            " · 진행 중 ",
                            counts.doing,
                            " · 대기 ",
                            counts.todo,
                            " · 생략 ",
                            counts.skipped
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                        lineNumber: 460,
                        columnNumber: 9
                    }, this),
                    counts.todo + counts.doing > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2",
                        children: "진행 중·대기 임무는 상황일지 「7. 향후 계획」에 들어갑니다."
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                        lineNumber: 464,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                lineNumber: 436,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                open: confirmReset,
                onClose: ()=>setConfirmReset(false),
                title: "SOP 초기화",
                width: 560,
                footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: ()=>setConfirmReset(false),
                            children: "취소"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                            lineNumber: 475,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "danger",
                            disabled: busy,
                            onClick: ()=>{
                                setConfirmReset(false);
                                act(async ()=>{
                                    await flushSaves();
                                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$2c033d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["resetSop"])(id);
                                });
                            },
                            children: "초기화"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                            lineNumber: 476,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                    lineNumber: 474,
                    columnNumber: 11
                }, this),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "break-keep text-[18px] font-semibold",
                        children: "SOP를 실행 전으로 되돌립니다. 임무 목록은 그대로 두고, 다시 편집할 수 있습니다."
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                        lineNumber: 492,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 rounded-md bg-danger-weak px-5 py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-semibold text-danger",
                                children: "지워지는 것"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                lineNumber: 494,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-1 list-disc pl-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "임무 진행 상태 · 수행 확인 · 조치결과"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                        lineNumber: 496,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "상황전파 기록과 현장 응답 (보낸 응답 링크는 더 이상 열리지 않음)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                        lineNumber: 497,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "수행 이력의 실행 · 임무 · 전파 기록"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                        lineNumber: 498,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                lineNumber: 495,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                        lineNumber: 493,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 rounded-md bg-canvas px-5 py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-semibold",
                                children: "그대로 남는 것"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                lineNumber: 502,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1",
                                children: "작성한 상황일지 · 상황 기록 · 상황 정보 · 기상특보"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                                lineNumber: 503,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                        lineNumber: 501,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                lineNumber: 468,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AddMission, {
                open: adding,
                onClose: ()=>setAdding(false),
                onAdd: (m)=>{
                    update(m, true);
                    setSel(m.id);
                    setAdding(false);
                }
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                lineNumber: 507,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
        lineNumber: 275,
        columnNumber: 5
    }, this);
}
_s(SopWorkspace, "82f9skmc4hQHOrEfLozz4y/o5t8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$visible$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVisibleRefresh"]
    ];
});
_c = SopWorkspace;
/** 임무 추가 — 임무명과 대응·복구만 정해 직접 추가 (내용은 추가 뒤 임무 상세에서 채운다) */ function AddMission({ open, onClose, onAdd }) {
    _s1();
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("대응");
    const add = ()=>{
        if (!title.trim()) return;
        onAdd({
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sop$2f$convert$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emptyMission"])(phase),
            title: title.trim()
        });
        setTitle("");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
        open: open,
        onClose: onClose,
        title: "임무 추가",
        width: 640,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: "input",
                    placeholder: "임무명",
                    value: title,
                    onChange: (e)=>setTitle(e.target.value),
                    onKeyDown: (e)=>e.key === "Enter" && !e.nativeEvent.isComposing && add()
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                    lineNumber: 540,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    className: "input w-32",
                    value: phase,
                    onChange: (e)=>setPhase(e.target.value),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            children: "대응"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                            lineNumber: 552,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            children: "복구"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                            lineNumber: 553,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                    lineNumber: 547,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "primary",
                    disabled: !title.trim(),
                    onClick: add,
                    children: "추가"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
                    lineNumber: 555,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
            lineNumber: 539,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/s/[id]/sop/SopWorkspace.tsx",
        lineNumber: 538,
        columnNumber: 5
    }, this);
}
_s1(AddMission, "Mlk6xXE4QB0xszOdkYmdTmncP1k=");
_c1 = AddMission;
var _c, _c1;
__turbopack_context__.k.register(_c, "SopWorkspace");
__turbopack_context__.k.register(_c1, "AddMission");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(app)/s/[id]/sop/Timeline.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Timeline",
    ()=>Timeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.mjs [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$a61139__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:a61139 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$24fee7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:24fee7 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const TYPE = {
    start: {
        label: "업무",
        tone: "gray"
    },
    weather: {
        label: "기상",
        tone: "blue"
    },
    change: {
        label: "변경",
        tone: "orange"
    },
    sop: {
        label: "SOP",
        tone: "blue"
    },
    mission: {
        label: "조치",
        tone: "green"
    },
    propagate: {
        label: "전파",
        tone: "blue"
    },
    record: {
        label: "기록",
        tone: "orange"
    },
    response: {
        label: "현장",
        tone: "green"
    },
    report: {
        label: "일지",
        tone: "gray"
    }
};
const PLACEHOLDER = {
    상황: "예) 하천 수위 상승, 하부도로 통제 검토",
    피해: "예) ○○동 주택 2동 침수, 인명피해 없음",
    대피: "예) ○○동 저지대 주민 12세대 25명 대피",
    통제: "예) ○○ 지하차도 차량 통제 (14:20~)",
    자원투입: "예) 양수기 12대, 공무원 20명 투입",
    응급복구: "예) ○○로 토사 제거 완료"
};
function Timeline({ id, events, editable }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pending, start] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Timeline.useEffect": ()=>{
            const h = {
                "Timeline.useEffect.h": ()=>router.refresh()
            }["Timeline.useEffect.h"];
            window.addEventListener("r4:refresh", h);
            return ({
                "Timeline.useEffect": ()=>window.removeEventListener("r4:refresh", h)
            })["Timeline.useEffect"];
        }
    }["Timeline.useEffect"], [
        router
    ]);
    const list = [
        ...events
    ].reverse().filter((e)=>filter === "all" || e.type === "record");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "flex max-h-[560px] min-h-[420px] flex-col overflow-hidden xl:h-full xl:max-h-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-line-weak px-5 pb-3 pt-3.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-[19px] font-bold",
                                children: "수행 이력"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            editable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                className: "ml-auto",
                                onClick: ()=>setOpen(true),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 17
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                                        lineNumber: 64,
                                        columnNumber: 15
                                    }, this),
                                    " 기록 추가"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex gap-1 text-[15px]",
                        children: [
                            [
                                "all",
                                "전체"
                            ],
                            [
                                "record",
                                "기록"
                            ]
                        ].map(([k, l])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setFilter(k),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("rounded px-2.5 py-1", filter === k ? "bg-tab text-white" : "text-sub hover:bg-canvas"),
                                children: l
                            }, k, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: "scroll-thin min-h-0 flex-1 overflow-y-auto px-5 pb-4",
                children: list.map((e)=>{
                    const t = TYPE[e.type] ?? TYPE.start;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "group flex gap-3 border-b border-line-weak py-3.5 last:border-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-[86px] shrink-0 pt-0.5 text-[15px] text-sub",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtTime"])(e.at)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                tone: t.tone,
                                                children: e.type === "record" ? String(e.meta?.kind ?? "기록") : t.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                                                lineNumber: 93,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: e.type === "record" ? "" : e.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                                                lineNumber: 94,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                                        lineNumber: 92,
                                        columnNumber: 17
                                    }, this),
                                    e.body && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 line-clamp-3 whitespace-pre-line text-[16px] text-sub",
                                        children: e.body
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                                        lineNumber: 96,
                                        columnNumber: 28
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                                lineNumber: 91,
                                columnNumber: 15
                            }, this),
                            editable && e.type === "record" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "invisible self-start text-mute hover:text-danger group-hover:visible",
                                onClick: ()=>start(async ()=>(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$24fee7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["deleteRecord"])(id, e.id), router.refresh())),
                                "aria-label": "기록 삭제",
                                disabled: pending,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                                    lineNumber: 105,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                                lineNumber: 99,
                                columnNumber: 17
                            }, this)
                        ]
                    }, e.id, true, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                        lineNumber: 89,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RecordModal, {
                id: id,
                open: open,
                onClose: ()=>setOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(Timeline, "biJ5Ww8La0hfEalndcnfNM4IwgM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c = Timeline;
/** 기록 추가 창 — 종류(기본 「상황」) · 내용 · 시각 → 추가하면 이력 맨 위 */ function RecordModal({ id, open, onClose }) {
    _s1();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [kind, setKind] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("상황");
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [at, setAt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [pending, start] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const close = ()=>{
        if (pending) return;
        setText("");
        setAt("");
        setKind("상황");
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
        open: open,
        onClose: close,
        title: "기록 추가",
        width: 600,
        footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: close,
                    disabled: pending,
                    children: "취소"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                    lineNumber: 139,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "primary",
                    disabled: !text.trim() || pending,
                    onClick: ()=>start(async ()=>{
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$a61139__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addRecord"])(id, kind, text, at || undefined);
                            router.refresh();
                            setText("");
                            setAt("");
                            setKind("상황");
                            onClose();
                        }),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                            size: 17
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                            lineNumber: 156,
                            columnNumber: 13
                        }, this),
                        " 추가"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                    lineNumber: 142,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
            lineNumber: 138,
            columnNumber: 9
        }, this),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 font-medium",
                children: "기록 종류"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex flex-wrap gap-2",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RECORD_KINDS"].map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setKind(k),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("h-11 rounded-md border px-4 font-medium", kind === k ? "border-primary bg-primary-weak text-primary-strong" : "border-line hover:border-primary"),
                        children: k
                    }, k, false, {
                        fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 font-medium",
                children: "내용"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                rows: 3,
                className: "input",
                placeholder: PLACEHOLDER[kind],
                value: text,
                onChange: (e)=>setText(e.target.value)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 mt-4 font-medium",
                children: "기록 시각"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "datetime-local",
                className: "input max-w-[320px]",
                value: at || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toLocalInput"])(new Date()),
                onChange: (e)=>setAt(e.target.value)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/s/[id]/sop/Timeline.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_s1(RecordModal, "msmfI1gVKYr+93X3QJ6lO1skhtk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c1 = RecordModal;
var _c, _c1;
__turbopack_context__.k.register(_c, "Timeline");
__turbopack_context__.k.register(_c1, "RecordModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/actions/data:0588fe [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "startSop",
    ()=>$$RSC_SERVER_ACTION_4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40ad67b72da656572753874e8400b6f49218b38f38":{"name":"startSop"}},"src/app/actions/situation.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40ad67b72da656572753874e8400b6f49218b38f38", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "startSop");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/actions/data:12820b [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "endSop",
    ()=>$$RSC_SERVER_ACTION_5
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40497513a1aedb3483bea6e375487713b25a7acd2a":{"name":"endSop"}},"src/app/actions/situation.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40497513a1aedb3483bea6e375487713b25a7acd2a", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "endSop");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/actions/data:24fee7 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteRecord",
    ()=>$$RSC_SERVER_ACTION_14
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"6025d7f1996065a7c60850c36a84fed7d33967162e":{"name":"deleteRecord"}},"src/app/actions/situation.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("6025d7f1996065a7c60850c36a84fed7d33967162e", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "deleteRecord");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/actions/data:2c033d [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resetSop",
    ()=>$$RSC_SERVER_ACTION_7
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"409ffcfaabe61f1e6d0f15c6a8d1e71c4746a7c0a3":{"name":"resetSop"}},"src/app/actions/situation.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("409ffcfaabe61f1e6d0f15c6a8d1e71c4746a7c0a3", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "resetSop");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/actions/data:37bd26 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reorderMissions",
    ()=>$$RSC_SERVER_ACTION_10
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"609353be0d46bc5a1776e2dc2a48bbe0b006a191d9":{"name":"reorderMissions"}},"src/app/actions/situation.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("609353be0d46bc5a1776e2dc2a48bbe0b006a191d9", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "reorderMissions");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/actions/data:397c0f [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "propagate",
    ()=>$$RSC_SERVER_ACTION_11
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"78321d6fdab7591f1d25bdadbff6019dad5da79fc9":{"name":"propagate"}},"src/app/actions/situation.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("78321d6fdab7591f1d25bdadbff6019dad5da79fc9", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "propagate");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/actions/data:3bcd64 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fieldRespond",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"70ba1090f782d3b166896acf1d94ce3cca0b6c550f":{"name":"fieldRespond"}},"src/app/actions/field.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("70ba1090f782d3b166896acf1d94ce3cca0b6c550f", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "fieldRespond");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/actions/data:640728 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createReport",
    ()=>$$RSC_SERVER_ACTION_15
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"400951e545c57e3a59e423f21688c87cf1962ac103":{"name":"createReport"}},"src/app/actions/situation.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("400951e545c57e3a59e423f21688c87cf1962ac103", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "createReport");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/actions/data:757cf7 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reopenSop",
    ()=>$$RSC_SERVER_ACTION_6
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40d34fb311cc1f35b1cabff8956fec6afebb5853f1":{"name":"reopenSop"}},"src/app/actions/situation.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40d34fb311cc1f35b1cabff8956fec6afebb5853f1", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "reopenSop");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/actions/data:82d2c0 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ackDispatch",
    ()=>$$RSC_SERVER_ACTION_12
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"60e8d2e6989221057e31ebd3fa614938577564ce95":{"name":"ackDispatch"}},"src/app/actions/situation.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60e8d2e6989221057e31ebd3fa614938577564ce95", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "ackDispatch");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/actions/data:a61139 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addRecord",
    ()=>$$RSC_SERVER_ACTION_13
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"78630b5e1733132b17d5e7b6936bee408fb25d46c4":{"name":"addRecord"}},"src/app/actions/situation.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("78630b5e1733132b17d5e7b6936bee408fb25d46c4", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addRecord");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/actions/data:b053a7 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "saveMission",
    ()=>$$RSC_SERVER_ACTION_8
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"6089419f125567e12ebd9c22248031377d18d45de9":{"name":"saveMission"}},"src/app/actions/situation.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("6089419f125567e12ebd9c22248031377d18d45de9", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "saveMission");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/actions/data:f47563 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteMission",
    ()=>$$RSC_SERVER_ACTION_9
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"6021e673016c22d4f026c7da8b8285d895950862b6":{"name":"deleteMission"}},"src/app/actions/situation.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("6021e673016c22d4f026c7da8b8285d895950862b6", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "deleteMission");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/actions/data:fda4e9 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateSop",
    ()=>$$RSC_SERVER_ACTION_3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"401d304a905e19418d795340bc10dc09a7c3cb0844":{"name":"generateSop"}},"src/app/actions/situation.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("401d304a905e19418d795340bc10dc09a7c3cb0844", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "generateSop");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/FieldView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldView",
    ()=>FieldView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$visible$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/use-visible-refresh.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/megaphone.mjs [app-client] (ecmascript) <export default as Megaphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.mjs [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$3bcd64__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:3bcd64 [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function hm(d) {
    if (!d) return "";
    return new Intl.DateTimeFormat("ko-KR", {
        timeZone: "Asia/Seoul",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
    }).format(new Date(d));
}
function FieldView({ data, token }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [note, setNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(data.note);
    const [pending, start] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const live = !!token;
    // 상황실 확인 여부를 주기적으로 갱신 (화면이 보일 때만)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$visible$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVisibleRefresh"])(20000, live);
    const act = (kind)=>live && start(async ()=>{
            setError(null);
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$3bcd64__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["fieldRespond"])(token, kind, kind === "note" ? note : undefined);
                router.refresh();
            } catch (e) {
                setError(e instanceof Error ? e.message : "보내지 못했습니다.");
            }
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-full bg-canvas text-ink",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-tab px-5 pb-5 pt-4 text-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-[15px] text-white/80",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__["Megaphone"], {
                                size: 17
                            }, void 0, false, {
                                fileName: "[project]/src/components/FieldView.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            " 재난 상황전파 · ",
                            data.orgName
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FieldView.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mt-1 text-[21px] font-bold leading-snug",
                        children: data.situationTitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/FieldView.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/FieldView.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-xl bg-white p-5 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[15px] text-sub",
                                children: [
                                    data.name,
                                    "님 · ",
                                    hm(data.sentAt),
                                    " 수신"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FieldView.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-1 text-[19px] font-bold leading-snug",
                                children: data.missionTitle
                            }, void 0, false, {
                                fileName: "[project]/src/components/FieldView.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 whitespace-pre-line rounded-lg bg-primary-weak p-4 text-[17px] leading-relaxed",
                                children: data.message
                            }, void 0, false, {
                                fileName: "[project]/src/components/FieldView.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FieldView.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Step, {
                        no: 1,
                        label: "수신 확인",
                        at: data.readAt,
                        onClick: ()=>act("read"),
                        busy: pending || !live
                    }, void 0, false, {
                        fileName: "[project]/src/components/FieldView.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    !data.readAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "px-1 text-[16px] text-sub",
                        children: "수신 확인을 누르면 조치사항·임무 완료를 할 수 있습니다"
                    }, void 0, false, {
                        fileName: "[project]/src/components/FieldView.tsx",
                        lineNumber: 75,
                        columnNumber: 26
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-xl bg-white p-5 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mb-2 text-[18px] font-bold",
                                children: "조치사항"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FieldView.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                rows: 4,
                                value: note,
                                disabled: !live || pending || !data.readAt,
                                onChange: (e)=>setNote(e.target.value),
                                placeholder: "현장 조치 내용을 입력하세요",
                                className: "w-full rounded-lg border border-line p-3 text-[17px] leading-relaxed outline-none focus:border-primary"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FieldView.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>act("note"),
                                disabled: !live || pending || !data.readAt || !note.trim() || note === data.note,
                                className: "mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-xl border border-primary bg-white text-[18px] font-bold text-primary disabled:border-line disabled:text-mute",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FieldView.tsx",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, this),
                                    " 조치사항 보내기"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FieldView.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            data.noteAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-[15px] text-sub",
                                children: [
                                    hm(data.noteAt),
                                    " 보냄"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/FieldView.tsx",
                                lineNumber: 94,
                                columnNumber: 27
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-[15px] text-danger",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/components/FieldView.tsx",
                                lineNumber: 95,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FieldView.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Step, {
                        no: 2,
                        label: "임무 완료",
                        at: data.doneAt,
                        onClick: ()=>act("done"),
                        busy: pending || !live || !data.readAt
                    }, void 0, false, {
                        fileName: "[project]/src/components/FieldView.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    data.noteAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("px-1 text-center text-[16px]", data.ackAt ? "font-semibold text-success" : "text-sub"),
                        children: data.ackAt ? `✓ 상황실 확인 완료 · ${hm(data.ackAt)}` : "상황실 확인 대기 중"
                    }, void 0, false, {
                        fileName: "[project]/src/components/FieldView.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/FieldView.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/FieldView.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_s(FieldView, "p0wEnlleKe9anjQwwuTJ1lNBUdk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$visible$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVisibleRefresh"]
    ];
});
_c = FieldView;
function Step({ no, label, at, onClick, busy }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: !!at || busy,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex h-16 w-full items-center gap-3 rounded-xl px-5 text-left text-[19px] font-bold transition", at ? "bg-success-weak text-success" : "bg-primary text-white active:bg-primary-strong disabled:bg-line"),
        children: [
            at ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                size: 26
            }, void 0, false, {
                fileName: "[project]/src/components/FieldView.tsx",
                lineNumber: 134,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex h-8 w-8 items-center justify-center rounded-full bg-white/25 text-[17px]",
                children: no
            }, void 0, false, {
                fileName: "[project]/src/components/FieldView.tsx",
                lineNumber: 136,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/FieldView.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            at && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[15px] font-medium",
                children: hm(at)
            }, void 0, false, {
                fileName: "[project]/src/components/FieldView.tsx",
                lineNumber: 139,
                columnNumber: 14
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/FieldView.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
_c1 = Step;
var _c, _c1;
__turbopack_context__.k.register(_c, "FieldView");
__turbopack_context__.k.register(_c1, "Step");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/badges.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LevelBadge",
    ()=>LevelBadge,
    "SopStateLabel",
    ()=>SopStateLabel,
    "isUnfinished",
    ()=>isUnfinished,
    "situationHref",
    ()=>situationHref,
    "sopState",
    ()=>sopState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
;
function isUnfinished(m) {
    return m.status === "done" && m.details.length > 0 && m.details.some((d)=>!d.done);
}
function sopState(sop) {
    if (!sop) return "none";
    if (sop.endedAt) return "ended";
    if (sop.startedAt) return "running";
    return "ready";
}
const SOP_STATE = {
    none: {
        label: "미생성",
        dot: "bg-placeholder"
    },
    ready: {
        label: "실행 전",
        dot: "bg-mute"
    },
    running: {
        label: "실행 중",
        dot: "bg-primary"
    },
    ended: {
        label: "실행 종료",
        dot: "bg-success"
    }
};
function SopStateLabel({ sop }) {
    const s = SOP_STATE[sopState(sop)];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-2 whitespace-nowrap font-medium",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("size-2.5 shrink-0 rounded-full", s.dot)
            }, void 0, false, {
                fileName: "[project]/src/components/badges.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            s.label
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/badges.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = SopStateLabel;
/** 위기경보 배지: 관심 파랑 · 주의 노랑 · 경계 주황 · 심각 빨강 */ const LEVEL = {
    관심: "bg-primary-weak text-primary-strong",
    주의: "bg-level-yellow-weak text-level-yellow",
    경계: "bg-level-orange-weak text-level-orange",
    심각: "bg-danger-weak text-danger"
};
function LevelBadge({ level, prefix }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("inline-flex h-7 shrink-0 items-center whitespace-nowrap rounded px-2.5 text-[14px] font-semibold", LEVEL[level] ?? "bg-canvas text-sub"),
        children: [
            prefix && `${prefix} `,
            level
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/badges.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_c1 = LevelBadge;
function situationHref(s) {
    return s.sop ? `/s/${s.id}/sop` : `/new?resume=${s.id}`;
}
var _c, _c1;
__turbopack_context__.k.register(_c, "SopStateLabel");
__turbopack_context__.k.register(_c1, "LevelBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/busan-flood.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = JSON.parse("{\"source\":\"부산광역시 「풍수해(태풍·호우·대설) 재난」 현장조치 행동매뉴얼 (관리번호 자연재난-1, 2026.7., 주관: 시민안전실 자연재난과)\",\"actions\":[{\"code\":\"BSN-FL-001\",\"manualCode\":\"1-1\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\",\"대설\"],\"title\":\"기상정보모니터링\",\"content\":\"기상정보수시확인\",\"details\":[\"태풍 예상진로 확인: 태풍연구센터(typhoon.or.kr) 한·미·일 예상진로 수시 확인, 방재기상정보시스템 위성·레이더 영상\",\"호우예비특보 현황 확인: NDMS 전파(행정안전부→재난안전상황실→구·군 재난담당자), SMS 전파(재난안전상황실→시·구·군 재난담당자)\",\"기상자문관 기상전망 전파(메신저: 기상자문관→자연재난과 담당자→구·군 재난부서, 1주일 전망)\",\"방재기상플랫폼(dmdw.kma.go.kr) 활용\"],\"lead\":\"재난안전상황실\",\"support\":[\"자연재난과\"],\"collab\":[\"기상청(기상자문관)\"],\"propagateTo\":[\"자연재난과\",\"시·구·군 재난담당자\"],\"propagateMsg\":\"\",\"resources\":[\"방재기상정보시스템\",\"태풍연구센터\",\"NDMS\",\"SMS\",\"방재기상플랫폼\",\"기상자문관\"],\"damageMeasures\":[],\"nd\":true,\"page\":41},{\"code\":\"BSN-FL-002\",\"manualCode\":\"2-1\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"기상특보상황보고(시장, 부시장)\",\"content\":\"기상특보시장․부시장보고\",\"details\":[\"기상특보 현황 중심 1장 보고서 작성·보고(자연재난과장→시장 / 자연재난팀장→행정부시장)\",\"기상특보 현황, 실·국·본부장 대책회의 개최 등 방침 결정\",\"기상특보 발표내용 휴대전화(SMS) 통보(재난안전상황실→시장·부시장)\",\"주말·공휴일·일과후 특보 시: 상황팀장이 회의 주재자에게 즉시 보고 → 주재자가 상황판단회의 개최 또는 즉시 비상단계 돌입 결정\",\"긴급 시: 자연재난과장(부재시 팀장)이 기상·피해(예상)·부서별 대처상황 보고, 주재자 지시로 상황판단회의 갈음(대면 또는 유선)\"],\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\"],\"collab\":[],\"propagateTo\":[\"시장\",\"행정부시장\"],\"propagateMsg\":\"기상특보 현황 1장 보고서(붙임 2-1-①: 태풍현황 및 전망, 대처상황-비상근무·안전점검·취약계층·홍보, 향후계획)\",\"resources\":[\"SMS\",\"1장 보고서 양식(붙임 2-1-①)\"],\"damageMeasures\":[],\"nd\":true,\"page\":42},{\"code\":\"BSN-FL-003\",\"manualCode\":\"2-2\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"기상특보전파(시민, 유관기관)\",\"content\":\"기상특보다양한수단통한전파\",\"details\":[\"UMS 휴대전화 문자(SMS) 발송\",\"One-Click TV 자막방송 요청(KBS·MBC·KNN 등 7개 방송사)\",\"재해·홍보·교통 문자전광판 및 BIT 문자 표출(유관기관 협조요청)\",\"재난경보방송(민방위경보시설·경고방송장치)\",\"전자팩스로 아파트관리소 내부방송 요청\",\"홈페이지·SNS 게시(풍수해 유형별 시민행동요령 파일 첨부-미디어담당관)\",\"긴급통신수단 공동주파수로 경찰청·소방본부 등 15개 기관 공유\",\"긴급재난문자(CBS)는 행정안전부가 재난유형·지역에 따라 발송\",\"기상상황에 따라 홍보매체 선택적 활용\"],\"lead\":\"자연재난과\",\"support\":[\"홍보담당관\",\"공보담당관\",\"미디어담당관\"],\"collab\":[\"교통정보서비스센터\",\"부산시설공단\",\"부산교통공사\"],\"propagateTo\":[\"공무원·기자·시민(신청자)(UMS 문자)\",\"KBS·MBC·KNN 등 7개 방송사(One-Click 자막)\",\"시민(재해·홍보·교통 문자전광판, BIT, 재난경보방송, 전자팩스→아파트 내부방송, 홈페이지·SNS)\",\"경찰청·소방본부 등 15개 기관(긴급통신수단 공동주파수)\",\"부산교통공사·부산시설공단(홍보요청 공문)\"],\"propagateMsg\":\"○월 ○일 ○시 (태풍, 호우) (예비특보, 주의보, 경보)가 발효 됨에 따라, 시설물, 어선·선박 관리 등 안전사고가 없도록 주의 하시기 바랍니다. / (전광판·BIT·SNS) ○월 ○일 ○시 (태풍, 호우) (예비특보, 주의보, 경보) 발효! (호우, 태풍, 강풍, 풍랑)로 인한 피해가 없도록 주의 바람\",\"resources\":[\"UMS(재난문자발송시스템)\",\"One-Click 재난상황전파시스템\",\"재해·홍보·교통 문자전광판\",\"버스정보시스템(BIT)\",\"민방위경보시설·경고방송장치\",\"전자팩스\",\"홈페이지·SNS\",\"긴급통신수단(PS-LTE/공동주파수)\"],\"damageMeasures\":[],\"nd\":true,\"page\":44},{\"code\":\"BSN-FL-004\",\"manualCode\":\"3-1\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\",\"대설\"],\"title\":\"(초기) 상황판단회의개최\",\"content\":\"상황판단회의개최준비․진행․정리\",\"details\":[\"개최시기: 강풍주의보·호우예비특보 발표 시, 적설예보(필요시) - 기상상황에 따라 수시 개최\",\"주재: 자연재난과장 / 참석: 재난 유형별 지원부서 팀장, 경찰, 소방, 구·군\",\"회의 체크리스트 확인(준비항목·역할분담, 공통 1-1-①)\",\"회의 개최 보고(1장 보고서, 긴급시 구두보고)\",\"회의 개최 통보(공문, 긴급시 SMS-참석자 개인, NDMS-구·군)\",\"회의자료 작성(말씀자료, 주요 재해취약시설 체크사항, 진행순서·사회자 시나리오, 좌석배치도·참석자 현황)\",\"참석대상자 참석 확인(개별 유선, 30분전·10분전)\",\"재대본 회의실 세팅(회의 PPT·영상회의·기상영상 3단 분할, 영상회의시스템 구동·구·군 접속 확인, 명패·물 세팅)\",\"회의 결과보고(회의 직후 결재, 비상근무 여부 포함)\",\"회의 결과 통보(비상근무 실시, 재해취약지 점검 지시 등)\",\"비상근무 사전예고(행정포털, SMS)\"],\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\",\"기상특보별지원부서\"],\"collab\":[\"기상청(기상자문관)\",\"소방재난본부등\"],\"propagateTo\":[\"재난 유형별 지원부서 팀장\",\"경찰\",\"소방\",\"구·군\"],\"propagateMsg\":\"\",\"resources\":[\"재대본 회의실(15층)\",\"영상회의시스템\",\"공통 1-1 회의서식\"],\"damageMeasures\":[],\"nd\":true,\"page\":45},{\"code\":\"BSN-FL-005\",\"manualCode\":\"3-2\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"기상특보에따른대응지시\",\"content\":\"구․군, 전부서, 유관기관전파, 대응지시\",\"details\":[\"기상특보 수신(방재기상정보시스템, NDMS 행정안전부→시, SMS 재난안전상황실→담당자)\",\"기상특보 전파 및 대응철저 공문 발송(자연재난과): 재해취약지·소관시설물 안전점검 등 매뉴얼에 따른 재난대비활동 철저 지시(구·군, 전부서, 유관기관)\",\"(구·군) NDMS 대응지시(재난안전상황실→구·군), NDMS 불가 기관은 Fax 발송\",\"민원 징후 접수 시 즉시 재난소관부서로 전달(접수시간, 접수자 인적사항, 발생 일시·장소·현상·원인·현장조치·피해가능성 확인)\",\"(필요시) 징후 확인: 현장 확인(담당자 방문·외부전문가 지원), 유관기관(부산기상청, 부산경찰청 경비과·상황실, 부산소방 방호조사과·상황실)과 정보 공유\"],\"lead\":\"재난안전상황실\",\"support\":[\"자연재난과\",\"전부서\"],\"collab\":[\"구․군\",\"유관기관\"],\"propagateTo\":[\"구·군\",\"전부서\",\"유관기관\"],\"propagateMsg\":\"붙임 3-2-① 공문 예시: 집중호우 대비 재해우려지역 등 안전관리 철저(상황관리·현장조치 중점사항)\",\"resources\":[\"방재기상정보시스템\",\"NDMS\",\"SMS\",\"Fax\",\"방재기상플랫폼\"],\"damageMeasures\":[\"산간·계곡·해안가·캠핑장·낚시터 등 위험지역 예찰·안전조치\",\"하천변 산책로·저지대·지하차도·둔치주차장 예찰 및 사전통제, 수방자재 전진배치\",\"산사태·급경사지 예찰, 출입통제, 필요시 대피명령\",\"상수도·우오수관로·맨홀 등 지하시설물 침수 인명사고 대비\",\"위험징후 발견 시 즉각 응급조치·주민 사전대피\",\"해안가·방파제·하천 재난안전선 설치 및 출입통제\",\"간판·옥외광고물 결박·고정\"],\"nd\":true,\"page\":46},{\"code\":\"BSN-FL-006\",\"manualCode\":\"3-3\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"비상연락체계확인\",\"content\":\"유관기관, 방재시설담당자, 재대본근무자등\",\"details\":[\"공문 수·발신 불가 대비 팩스번호 확인\",\"관계부서 비상연락망(p.25), 유관기관 비상연락망(p.27) 확인\",\"유관기관, 방재시설물 담당자, 재대본 비상근무자 연락체계 확인\"],\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\",\"재대본근무부서\"],\"collab\":[\"재난안전대책본부근무유관기관\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"비상연락망(관계부서·유관기관)\",\"팩스\"],\"damageMeasures\":[],\"nd\":true,\"page\":49},{\"code\":\"BSN-FL-007\",\"manualCode\":\"3-4\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"비상근무자확인, 비상연락망정비\",\"content\":\"재대본비상근무자, 전직원비상연락망확인\",\"details\":[\"기상특보 단계별 재대본 근무조·비상근무자 확인\",\"행정포털(업무게시판)에 금회 비상근무조 공지\",\"비상근무자 변경(전보·휴직·파견 등) 요청 접수(서무→자연재난과) 및 UMS 반영\",\"전직원 근무조별 비상연락망 확인 요청(행정포털 게시), 변경사항(근무조·휴대전화) 통보 후 UMS 반영\",\"정비기간 경과 후 게시물 삭제\"],\"lead\":\"자연재난과\",\"support\":[\"전부서\"],\"collab\":[\"유관기관\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"행정포털\",\"UMS\",\"재대본 명단\"],\"damageMeasures\":[],\"nd\":true,\"page\":50},{\"code\":\"BSN-FL-008\",\"manualCode\":\"3-5\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\",\"대설\"],\"title\":\"재난안전대책본부가동\",\"content\":\"상황판단회의결과에따른재대본가동\",\"details\":[\"초기대응(재대본 준비) 근무: 재난상황관리반(자연재난과 2, 재난상황실 3)\",\"근무자 임무: 구·군 재대본 가동현황·비상근무 여부 확인(구·군별 담당자 지정), 기상특보 대처상황(안전조치 내역) 자료 취합·보고\",\"상황판단회의 직후 시민안전실장 보고\",\"비상소집 SMS 통보(재난상황관리반)\",\"재대본 회의실 세팅(초기대응 근무 알림 PPT, 기상영상 3단분할, 명패·재난대응행동수칙 책자)\",\"비상소집 응소부 비치·응소자 서명(공통 1-2-①)\",\"기상특보 대처상황보고(구·군→시→행정안전부)\"],\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\"],\"collab\":[],\"propagateTo\":[\"재난상황관리반 근무자(SMS)\"],\"propagateMsg\":\"\",\"resources\":[\"SMS\",\"재대본 회의실\",\"응소부\",\"재난대응행동수칙 책자\"],\"damageMeasures\":[],\"nd\":true,\"page\":51},{\"code\":\"BSN-FL-009\",\"manualCode\":\"3-6\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"관련기관대비태세확인\",\"content\":\"구․군영상회의, 유관기관지원체계확인\",\"details\":[\"구·군 영상회의(필요시): 구·군 중점 대처사항 확인·공유(주재 자연재난과장, 필요시 실장)\",\"영상회의 개최 보고(1장 보고서, 공통 1-3-①)\",\"영상회의 개최 통보(원칙 공문, 예외 NDMS·메신저·SMS) 및 보고서식 송부\",\"구·군 보고자료 취합(구·군별 사전조치 및 대처계획, 공통 1-3-②)\",\"회의자료 작성(인사·마무리말씀 공통 1-3-③, 진행순서·시나리오 공통 1-3-④)\",\"영상회의 접속 확인(30분전·10분전)\",\"기상상황에 따른 보고 대상 구·군 선정\",\"유관기관 협력체계 점검 요청(주간 공문 / 야간·공휴일 팩스)\"],\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\"],\"collab\":[\"구․군\",\"유관기관\"],\"propagateTo\":[\"구·군 재난담당과장\",\"유관기관\"],\"propagateMsg\":\"붙임 3-6-① 호우예비특보 발효에 따른 유관기관 협조 요청 공문(유관기관 주요 임무: 육군53사단(응급복구 인력·장비), KT부산본부(통신 응급복구), 한국전력(전기), 한국가스안전공사(가스), 한국농어촌공사(저수지·양배수장), 부산교통공사(비상수송), 대한적십자사(피해신고 핫라인·복구인력), 교육청(휴교·등하교 안전), 부산지방기상청(기상정보), 부산경찰청(교통통제))\",\"resources\":[\"영상회의시스템\",\"공문·팩스\"],\"damageMeasures\":[],\"nd\":true,\"page\":52},{\"code\":\"BSN-FL-010\",\"manualCode\":\"3-7\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"재해취약지등안전점검지시\",\"content\":\"소관부서, 구․군, 행정지원책임관점검등\",\"details\":[\"기상정보 수집·전파(단기·중기·태풍예보, 예비특보·특보·기상속보 예의주시)\",\"침수·강풍·풍랑 등 풍수해 취약시설·지역 및 방재시설 점검·예찰(자연재해위험개선지구, 해일위험지구, 특정관리대상지역, 인명피해 우려지역 등)\",\"재해취약지 구·군 및 현장행정지원 책임관 중복점검, 점검결과 복명서 제출(지역담당팀장)\",\"방재시설물(펌프장·수문·유수지·예경보시설 등) 점검, 사전배수\",\"부서별 소관시설(산사태 우려지, 공사장, 대형간판 등) 점검\",\"침수취약시설·지역 접근제한·교통통제·대피(필요시) 지시\",\"둔치주차장 차량 침수 대응(등급별: 예비특보·주의보·경보 시 통제·이동, 위험알림 문자, 견인)\",\"침수 우려시 예·경보 사전 안내방송 지시\",\"침수 우려시 현장책임관·현장관리관 담당지역 현장 출동(지하차도 등급별 관리기준)\"],\"lead\":\"자연재난과\",\"support\":[\"업무소관부서\",\"행정지원책임관지정부서\"],\"collab\":[\"구․군\"],\"propagateTo\":[\"구·군\",\"현장행정지원 책임관\",\"소관부서\",\"차량 소유자(위험알림 문자)\"],\"propagateMsg\":\"\",\"resources\":[\"재난안전선·안전펜스\",\"수방자재(양수기, 마대 등)\",\"CCTV\",\"예경보시설\"],\"damageMeasures\":[\"호우·태풍 피해 예상 시설물 예찰 및 사전통제\",\"침수·산사태·하천범람 위험징후 발견 시 사전대피(대피권고·대피명령)\",\"옥외광고물·공사장(타워크레인)·첨탑 등 낙하위험물 고정·제거·결박\",\"해안 저지대 침수방지, 방파제·해안도로 사전 접근통제\",\"선박·어선 대피 및 입출항 통제, 어망·어구·수산증양식시설 결박·고정\",\"만조 대비 해안가 저지대 재난안전선 설치·주민 사전대피\",\"지하공간 차단 조치 및 사전대피 권고(수방자재 전진배치)\",\"둔치주차장 차량 이동·견인(재난안전법 제40조·제42조)\"],\"nd\":true,\"page\":54},{\"code\":\"BSN-FL-011\",\"manualCode\":\"3-8\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\",\"대설\"],\"title\":\"재난자원점검지시\",\"content\":\"수방자재․응급복구장비점검, 비축량파악\",\"details\":[\"주요장비(양수기, 배수펌프, 비상발전기) 보유현황·관리책임자 지정·연료상태 확인, 시험운전\",\"물자(제설제, 모래주머니, 포대, 묶음줄, 말목, 덮개) 비축량·상태 확인\",\"재해구호물품·의약품·방역물자·방제물자 비축량·상태 확인\",\"응급복구 장비(포클레인, 불도저, 페이로더, 청소차, 집게차, 덤프트럭, 분뇨수거차, 앰뷸런스, 비상급수차) 지정내역 및 구·군간 응원체계 확인\",\"수방자재 상습침수지역 등 재해취약지 인근 전진배치, 가동(관리)책임자 지정\",\"주요 수방장비 점검결과 제출(구·군→시, 붙임 3-8-①)\"],\"lead\":\"자연재난과\",\"support\":[\"복지정책과\",\"보건위생과\",\"건설안전사업소\"],\"collab\":[\"구․군\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"양수기\",\"배수펌프(수중펌프)\",\"비상발전기\",\"제설제\",\"모래주머니·포대·묶음줄·말목·덮개\",\"재해구호물품\",\"의약품·방역·방제물자\",\"포클레인·덤프트럭 등 응급복구장비\"],\"damageMeasures\":[],\"nd\":true,\"page\":59},{\"code\":\"BSN-FL-012\",\"manualCode\":\"3-9\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"피해조사단교육\",\"content\":\"피해조사단(60명) 사전교육\",\"details\":[\"태풍 한반도 북상 우려 시 실시(필요시)\",\"피해조사단 편성내역 확인(소관부처별 전문직렬 직원 60명)\",\"조사단 변동사항(결원·전보·휴직) 확인 및 변경 요청\",\"사전교육 건의(내부결재)·교육장소 확보·실시 통보\",\"교육내용: 조사대상(사유시설, 5천만원 이하 공공시설), 조사요령, NDMS 입력방법(행안부 PPT)\"],\"lead\":\"자연재난과\",\"support\":[\"피해조사단구성부서\"],\"collab\":[],\"propagateTo\":[\"피해조사단 소속부서\"],\"propagateMsg\":\"\",\"resources\":[\"피해조사단 60명\",\"NDMS\"],\"damageMeasures\":[],\"nd\":true,\"page\":61},{\"code\":\"BSN-FL-013\",\"manualCode\":\"3-10\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"기상특보대응상황보고\",\"content\":\"기상특보조치사항행정안전부보고\",\"details\":[\"기상특보 대응지시 수신(NDMS: 행정안전부→재난안전상황실/재대본; 재대본 구성 전에는 재난안전상황실 처리)\",\"구·군에 기상특보 조치사항 제출 요청(NDMS)\",\"구·군 조치사항 보고 접수(구·군→재난안전상황실/재대본)\",\"구·군 자료 취합 후 행정안전부 보고(NDMS) - 자연재난과장이 취합·작성자 지정\",\"중대본 발표시간 1시간 전까지 제출(매일 05·10·17·22시)\",\"인명피해현황은 소방재난본부 확인 후 제출\"],\"lead\":\"재난안전상황실\",\"support\":[],\"collab\":[\"구․군\"],\"propagateTo\":[\"행정안전부(NDMS)\"],\"propagateMsg\":\"\",\"resources\":[\"NDMS\"],\"damageMeasures\":[],\"nd\":true,\"page\":63},{\"code\":\"BSN-FL-014\",\"manualCode\":\"3-11\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"이재민임시주거시설현황, 비상연락망점검\",\"content\":\"이재민임시주거시설지정현황․연락처확인\",\"details\":[\"이재민 임시주거시설 지정 협약내역 확인(특히 사유시설) - 시 복지정책과→구·군 사회복지과\",\"임시주거시설 관리기관 비상연락(상황실, 지정 책임관리자) 확인\"],\"lead\":\"복지정책과\",\"support\":[],\"collab\":[\"이재민임시주거시설 지정기관(교육청등)\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"이재민 임시주거시설 목록\"],\"damageMeasures\":[],\"nd\":false,\"page\":64},{\"code\":\"BSN-FL-015\",\"manualCode\":\"3-12\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"재해구호유관기관비상연락망확인\",\"content\":\"재해구호협회등비상연락망확인\",\"details\":[\"재해구호 유관기관(전국재해구호협회, 대한적십자사) 비상연락망 정비(p.26)\"],\"lead\":\"복지정책과\",\"support\":[],\"collab\":[\"전국재해구호협회\",\"대한적십자사\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"nd\":false,\"page\":65},{\"code\":\"BSN-FL-016\",\"manualCode\":\"3-13\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"통신사비상연락체계확인등\",\"content\":\"비상연락망확인, 긴급복구반운영요청\",\"details\":[\"통신사(KT, 이동통신3사) 비상연락망 확인(당직실, 상황실)\",\"(필요시) 통신시설 피해 응급복구 담당 자체 긴급복구반 편성·운영 요청(공문)\",\"긴급복구 외주업체 비상연락망 확인\"],\"lead\":\"인공지능소프트웨어과\",\"support\":[],\"collab\":[\"KT 등\"],\"propagateTo\":[\"KT·이동통신3사\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"nd\":false,\"page\":66},{\"code\":\"BSN-FL-017\",\"manualCode\":\"3-14\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(도로안전과) 소관시설물안전점검등지시\",\"content\":\"도로공사장, 해안도로점검, 침수도로사전통제\",\"details\":[\"도로 공사장: 현장관리소장 등 안전관리책임자 상주, 수방자재·장비 비축·전진배치, 공사장내 배수로 확보·지장물 제거, (강풍) 안전펜스·비계·공사자재 고정·결박\",\"해안도로·해상도로·교량: 관리기관(부산시설공단, 북항아이브릿지) 안전점검·응급조치, 통행제한기준 해당 시 교통통제\",\"하상도로·지하차도: 측구·배수로 정비, 유수 장애물 제거상태 확인\",\"도로·교통통제 상황 보고(구·군·경찰→시 재대본: 통제구간·시간·방법·현장책임자)\",\"도로상황팀 운영(19명: 도로관리팀1, 구·군16, 건설안전시험사업소1, 부산시설공단1)\",\"(공공하수인프라과) 하수관거·측구·배수구 점검\"],\"lead\":\"도로안전과\",\"support\":[\"도로관리소관부서\",\"교통정보서비스센터\"],\"collab\":[\"부산시설공단\",\"북항아이브릿지(주)\",\"구·군등\"],\"propagateTo\":[\"시 재대본(통제상황 보고)\",\"공사발주부서(SMS·유선)\"],\"propagateMsg\":\"\",\"resources\":[\"수방자재·장비\",\"교통정보서비스센터 통제상황 게시(its.busan.go.kr)\"],\"damageMeasures\":[\"침수우려도로 사전통제\",\"공사장 배수로 확보·지장물 제거\",\"강풍 대비 공사자재 고정·결박\",\"교량 통행제한·교통통제\"],\"nd\":false,\"page\":67},{\"code\":\"BSN-FL-018\",\"manualCode\":\"3-15\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(푸른숲도시과) 소관시설물안전점검등지시\",\"content\":\"산사태취약지안점검검, 가로수전도방지등\",\"details\":[\"산사태 발생 징후 지속 모니터링(산림청 산사태예측정보, 읍·면·동 단위)\",\"산사태취약지역 긴급 안전점검·응급조치 지시(시→구·군), 측구·배수로 정비·유수 장애물 제거\",\"(호우시) 낙석 등 안전사고 우려 숲길 현황 파악, 통제·안내표지판 전진배치 검토\",\"(태풍 관통 예상시) 가로수·공원수 전도방지 지지대 설치, 고정·결박 지시\"],\"lead\":\"푸른숲도시과\",\"support\":[],\"collab\":[\"구․군\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"산림청 산사태정보시스템\",\"안내표지판\"],\"damageMeasures\":[\"산사태취약지역 응급조치\",\"숲길 접근통제\",\"가로수·공원수 전도방지\"],\"nd\":false,\"page\":68},{\"code\":\"BSN-FL-019\",\"manualCode\":\"3-16\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(건축정책과) 소관시설물안전점검등지시\",\"content\":\"건축공사장․노후주택안전점검및응급조치\",\"details\":[\"공사현장: 현장관리소장 등 안전관리책임자 상주(SMS 통보), 수방자재·장비 전진배치, 배수로 확보, (강풍) 안전펜스·비계·공사자재 고정·결박\",\"노후주택: 붕괴가능성 관찰, (붕괴우려시) 주민 사전대피명령 검토, 재난안전선 설치 등 접근통제, 버팀목 보강·모래주머니 설치 등 응급조치\",\"고층건물 유리창 파손 대비 홍보(창틀 고정, 테이핑, 젖은 신문지) - 구·군(팩스·SMS)→아파트 관리소→구내방송\",\"(도시공공디자인담당관) 강풍 시 옥외광고물 점검·고정 등 안전조치\"],\"lead\":\"건설행정과\",\"support\":[],\"collab\":[\"구․군\"],\"propagateTo\":[\"구·군\",\"아파트 관리사무소(구내방송)\"],\"propagateMsg\":\"\",\"resources\":[\"재난안전선\",\"버팀목·모래주머니\"],\"damageMeasures\":[\"노후주택 접근통제·응급조치\",\"공사장 안전조치\",\"옥외광고물 고정·결박\",\"유리창 파손 예방 홍보\"],\"nd\":false,\"page\":69},{\"code\":\"BSN-FL-020\",\"manualCode\":\"3-17\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(농축산유통과) 소관시설물안전점검등지시\",\"content\":\"농축산시설, 양수기가동확인, 방제물품확인\",\"details\":[\"농작물·농축산시설 피해예방 홍보(논 물꼬·배수로 정비, 비닐하우스 주변 배수로 정비, 강풍 대비 버팀목 보강) - 시→구·군→이장·작목반(SMS)→마을앰프방송\",\"양·배수장, 배수문, 저수지 방류량 조절 요청(시→구·군→시설관리자, 농어촌공사: 주간 공문/야간 SMS)\",\"(배수용) 양수기 가동여부 점검: 관리책임자 지정·비상연락망·연료 확인, 시험가동\",\"(병충해) 방제용 농약 등 비축량 확인 지시\"],\"lead\":\"농축산유통과\",\"support\":[],\"collab\":[\"구․군\",\"한국농어촌공사\"],\"propagateTo\":[\"구·군\",\"이장·작목반(SMS)\",\"마을앰프방송\",\"한국농어촌공사\"],\"propagateMsg\":\"\",\"resources\":[\"양수기\",\"방제용 농약\"],\"damageMeasures\":[\"농업시설 배수로 정비·버팀목 보강\",\"저수지 방류량 조절\"],\"nd\":false,\"page\":70},{\"code\":\"BSN-FL-021\",\"manualCode\":\"3-18\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(수산정책과) 소관시설물안전점검등지시\",\"content\":\"수산증양식시설, 어항시설, 어선등안전조치지시\",\"details\":[\"수산증양식시설·어항시설·어로시설·어선 등 피해예방조치 홍보(시→구·군→이장·어촌계·수협(SMS)→마을앰프방송)\",\"구·군별 현지지도반 편성 준비(활동계획, 근무조 편성, 비상연락망)\",\"유관기관(해양경찰 출·입항신고소, 어업정보통신국, 수협) 비상연락망 확인 지시\"],\"lead\":\"수산정책과\",\"support\":[\"수산진흥과\"],\"collab\":[\"구․군\"],\"propagateTo\":[\"이장·어촌계·수협(SMS)\",\"마을앰프방송\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[\"수산증양식시설·어선 피해예방조치\"],\"nd\":false,\"page\":71},{\"code\":\"BSN-FL-022\",\"manualCode\":\"3-19\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(미래에너지산업과) 비상연락체계, 긴급복구반편성등\",\"content\":\"기반시설(전력·가스) 복구반비상연락망확인\",\"details\":[\"한국전력, 한국가스공사 비상연락체계 확인(당직실, 상황실)\",\"긴급복구반 편성·운영 협조 요청\"],\"lead\":\"미래에너지산업과\",\"support\":[],\"collab\":[\"한국전력공사\",\"한국가스공사\",\"구·군\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"nd\":false,\"page\":72},{\"code\":\"BSN-FL-023\",\"manualCode\":\"3-20\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(교통혁신과) 교통유관기관시설물점검등지시\",\"content\":\"교통공사, 버스․택시조합, 시설공단등지시\",\"details\":[\"교통유관기관(부산교통공사, 부산김해경전철, 버스·마을버스·택시조합, 부산시설공단, 교통시설 유지보수업체) 비상연락망(당직실·상황실) 확인\",\"기상상황 전파 및 시설물 점검·정비 지시(철도시설, 공영주차장, 교통신호시설)\"],\"lead\":\"교통혁신과\",\"support\":[\"대중교통과\",\"교통정보서비스센터\"],\"collab\":[\"부산교통공사\",\"부산시설공단\",\"조합\"],\"propagateTo\":[\"교통유관기관\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"nd\":false,\"page\":73},{\"code\":\"BSN-FL-024\",\"manualCode\":\"3-21\",\"manualStage\":\"1단계 징후감지\",\"stage\":\"관심\",\"phase\":\"대비\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(하천관리과) 하천시설물점검등지시\",\"content\":\"하천산책로통제등지시\",\"details\":[\"호우예비특보 발효 시 구·군에서 하천 진·출입 즉시 차단(필요시 특보 전 선제 통제) - 하천 안전사고 예방대책 매뉴얼(2023.10.)\",\"하천 진·출입 통제상황 보고(단체대화방·비상연락망, 구·군→부산시)\",\"CCTV·하천변 방송시설·재난문자로 친수공간 시민 대피 안내·계도\",\"부산 도시침수통합정보시스템으로 하천 수위 관측\"],\"lead\":\"하천관리과\",\"support\":[\"재난안전상황실\"],\"collab\":[\"구․군\"],\"propagateTo\":[\"부산시(통제상황 보고)\",\"친수공간 시민(방송·재난문자)\"],\"propagateMsg\":\"\",\"resources\":[\"CCTV\",\"하천변 방송시설\",\"도시침수통합정보시스템\"],\"damageMeasures\":[\"하천 산책로 진·출입 통제\",\"친수공간 시민 대피 안내\"],\"nd\":false,\"page\":74},{\"code\":\"BSN-FL-025\",\"manualCode\":\"4-1\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"기상특보접수\",\"content\":\"기상특보접수및전파\",\"details\":[\"접수수단: 상황전파메신저(NDMS) 중대본→시 상황실→구·군 상황실, 방재기상정보시스템(afso.kma.go.kr) 특보 통보문, 기상청 유선통보(예비특보·특보 발표 전)\",\"재난문자발송시스템(UMS) 접속→전송그룹 선택→메시지 제목·내용 입력→즉시발송\",\"전송 결과 확인(실패·대기 메시지 확인·재전송)\"],\"lead\":\"재난안전상황실\",\"support\":[\"자연재난과\"],\"collab\":[\"기상청(기상자문관)\"],\"propagateTo\":[\"구·군 상황실(NDMS)\",\"재난공무원(UMS)\"],\"propagateMsg\":\"\",\"resources\":[\"NDMS\",\"방재기상정보시스템\",\"UMS\"],\"damageMeasures\":[],\"nd\":true,\"page\":76},{\"code\":\"BSN-FL-026\",\"manualCode\":\"5-1\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"기상특보상황보고(시장, 부시장)\",\"content\":\"기상특보상황․조치사항시장․부시장보고\",\"details\":[\"기상특보 현황 중심 1장 보고서 작성·보고(자연재난과장→시장 / 자연재난팀장→행정부시장)\",\"기상특보 현황, 실·국·본부장 대책회의 개최 등 방침 결정\",\"기상특보 발표내용 휴대전화(SMS) 통보(재난안전상황실→시장·부시장)\",\"주말·공휴일·일과후 특보 시: 상황팀장이 회의 주재자에게 즉시 보고 → 주재자가 상황판단회의 개최 또는 즉시 비상단계 돌입 결정\",\"긴급 시: 자연재난과장(부재시 팀장)이 기상·피해(예상)·부서별 대처상황 보고, 주재자 지시로 상황판단회의 갈음(대면 또는 유선)\"],\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\"],\"collab\":[],\"propagateTo\":[\"시장\",\"행정부시장\"],\"propagateMsg\":\"\",\"resources\":[\"SMS\",\"1장 보고서\"],\"damageMeasures\":[],\"nd\":true,\"page\":77},{\"code\":\"BSN-FL-027\",\"manualCode\":\"5-2\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\",\"대설\"],\"title\":\"기상특보전파(시민, 유관기관)\",\"content\":\"기상특보다양한수단통한전파\",\"details\":[\"UMS·One-Click(7개 방송사)·문자전광판·BIT·재난경보방송·전자팩스·홈페이지·SNS·긴급통신수단으로 다매체 전파\",\"긴급재난문자(CBS)는 행정안전부 발송\",\"부산교통공사·부산시설공단 홍보요청 공문 별도 통보\",\"홈페이지·SNS에 풍수해 유형별 시민행동요령 첨부(홍보담당관)\",\"기상상황(태풍·호우 강도, 적설량)에 따라 매체 선택 활용\"],\"lead\":\"자연재난과\",\"support\":[\"홍보담당관\",\"공보담당관\",\"미디어담당관\"],\"collab\":[\"교통정보서비스센터\",\"부산시설공단\",\"부산교통공사\"],\"propagateTo\":[\"공무원·기자·시민(신청자)(UMS 문자)\",\"KBS·MBC·KNN 등 7개 방송사(One-Click 자막)\",\"시민(재해·홍보·교통 문자전광판, BIT, 재난경보방송, 전자팩스→아파트 내부방송, 홈페이지·SNS)\",\"경찰청·소방본부 등 15개 기관(긴급통신수단 공동주파수)\",\"부산교통공사·부산시설공단(홍보요청 공문)\"],\"propagateMsg\":\"○월 ○일 ○시 (태풍, 호우) (예비특보, 주의보, 경보)가 발효 됨에 따라, 시설물, 어선·선박 관리 등 안전사고가 없도록 주의 하시기 바랍니다. / (전광판·BIT·SNS) ○월 ○일 ○시 (태풍, 호우) (예비특보, 주의보, 경보) 발효! (호우, 태풍, 강풍, 풍랑)로 인한 피해가 없도록 주의 바람\",\"resources\":[\"UMS(재난문자발송시스템)\",\"One-Click 재난상황전파시스템\",\"재해·홍보·교통 문자전광판\",\"버스정보시스템(BIT)\",\"민방위경보시설·경고방송장치\",\"전자팩스\",\"홈페이지·SNS\",\"긴급통신수단(PS-LTE/공동주파수)\"],\"damageMeasures\":[],\"nd\":true,\"page\":78},{\"code\":\"BSN-FL-028\",\"manualCode\":\"5-3\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"상황전파및보고\",\"content\":\"위험예보및사전조지활동\",\"details\":[\"위험예보 정보 확인: 댐 방류 사전예고제(한국수자원공사·홍수통제소, 최소 24시간 전 예고), 산사태 위험예보(최대 12시간 전, sansatai.forest.go.kr), 예비특보·특보·기상속보\",\"산사태 예측정보: 토양함수지수 80% 주의보, 100% 경보 → 시장·군수·구청장이 상황판단회의로 예·경보 발령 결정\",\"상황전파: 구·군→읍·면·동(마을단위 민간관리자), 지원부서·협업기관(소방·경찰), CBS·방송·SNS·전화·팩스·민방위경보·자동음성통보·확성기·순찰차 등 모든 수단\",\"위험예보 대상지역 협의체 구성(댐·저수지·보 하류, 산사태 취약지역 주민·지자체)\",\"댐 방류 대응: 예찰 강화, 시설물 점검, 사전 방류 등 저수율 조절, 재해 예·경보 발령 및 주민대피\",\"현장 출동 지시·요청: 읍면동 담당자 출동, 소관부서(도로안전과·교통혁신과·공공하수인프라과 등) 및 협업기관(소방·경찰) 출동 지원요청\"],\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\",\"푸른숲도시과\",\"낙동강관리본부\",\"하천관리과\"],\"collab\":[\"기상청\",\"한국수자원공사\",\"홍수통제소\",\"산림청\"],\"propagateTo\":[\"구·군\",\"읍·면·동 마을단위 주민대피 민간관리자(이장 등)\",\"지원부서\",\"협업기관(소방·경찰)\",\"주민(CBS·방송·SNS·민방위경보 등)\"],\"propagateMsg\":\"\",\"resources\":[\"산사태정보시스템\",\"방재기상정보시스템\",\"민방위경보시스템\",\"자동우량경보시설\"],\"damageMeasures\":[\"댐·저수지 사전방류·방류량 조절\",\"산사태 예측지역 사전 주민대피·출입통제\",\"재해 예·경보 발령\"],\"nd\":true,\"page\":79},{\"code\":\"BSN-FL-029\",\"manualCode\":\"6-1\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\",\"대설\"],\"title\":\"상황판단및대책회의개최\",\"content\":\"상황판단및대책회의개최준비․진행․정리\",\"details\":[\"개최시기: 기상특보 발표 시(수시)\",\"태풍예비특보·호우주의보·적설량 1~3cm: 시민안전실장 주재 - 자연재난과장, 복지정책과장, 도로안전과장(대설), 건축정책과장, 교통혁신과장(대설), 하천관리과장, 공공하수인프라과장, 푸른숲도시과장, 수산정책과장(대설), 농축산유통과장(대설), 낙동강관리본부 공원관리부장, 도시공공디자인담당관·해운항만과장·관광정책과장(태풍), 재난안전상황실 팀장, 유관기관 파견근무자\",\"부산소방재난본부·부산경찰청·남해지방해양경찰청·53사단·구·군 영상회의 참여\",\"회의 체크리스트 확인(준비항목·역할분담, 공통 1-1-①)\",\"회의 개최 보고(1장 보고서, 긴급시 구두보고)\",\"회의 개최 통보(공문, 긴급시 SMS-참석자 개인, NDMS-구·군)\",\"회의자료 작성(말씀자료, 주요 재해취약시설 체크사항, 진행순서·사회자 시나리오, 좌석배치도·참석자 현황)\",\"참석대상자 참석 확인(개별 유선, 30분전·10분전)\",\"재대본 회의실 세팅(회의 PPT·영상회의·기상영상 3단 분할, 영상회의시스템 구동·구·군 접속 확인, 명패·물 세팅)\",\"회의 결과보고(회의 직후 결재, 비상근무 여부 포함)\",\"회의 결과 통보(비상근무 실시, 재해취약지 점검 지시 등)\",\"(부)시장 주재 시 언론보도자료 작성(자연재난과→홍보·공보담당관, 공통 1-1-⑧)\"],\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\",\"실․국․본부주무부서\"],\"collab\":[\"기상청(기상자문관)\",\"유관기관\"],\"propagateTo\":[\"실·국·본부 주무부서\",\"구·군(NDMS)\",\"유관기관\",\"언론(보도자료)\"],\"propagateMsg\":\"\",\"resources\":[\"재대본 회의실\",\"영상회의시스템\"],\"damageMeasures\":[],\"nd\":true,\"page\":82},{\"code\":\"BSN-FL-030\",\"manualCode\":\"6-2\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"기상특보에따른대응지시\",\"content\":\"구․군, 전부서, 유관기관전파, 대응지시\",\"details\":[\"기상특보 수신(방재기상정보시스템, NDMS 행정안전부→시, SMS 재난안전상황실→담당자)\",\"기상특보 전파 및 대응철저 공문 발송(자연재난과): 재해취약지·소관시설물 안전점검 등 매뉴얼에 따른 재난대비활동 철저 지시(구·군, 전부서, 유관기관)\",\"(구·군) NDMS 대응지시(재난안전상황실→구·군), NDMS 불가 기관은 Fax 발송\"],\"lead\":\"재난안전상황실\",\"support\":[\"자연재난과\",\"전부서\"],\"collab\":[\"구․군\",\"유관기관\"],\"propagateTo\":[\"구·군\",\"전부서\",\"유관기관\"],\"propagateMsg\":\"붙임 6-2-① 호우주의보 발표에 따른 재난대응활동 철저(공문): 재해취약지 사전점검·예찰, 비상근무 강화, 근무자 현황 제출, 재난상황보고서(최초·중간·최종) 즉시 보고\",\"resources\":[\"NDMS\",\"Fax\",\"방재기상정보시스템\"],\"damageMeasures\":[\"산사태 위험지·급경사지·대형공사장·침수우려지·지하차도·노후건물 예찰 및 보강·정비\",\"인명피해우려지역 재난안전선 설치 등 출입통제\",\"산사태 위험지·급경사지 배수로 준설, 고사목 제거\",\"주요 수방자재(양수기·배수펌프·비상발전기) 가동 확인 및 전진배치\",\"대규모 공사장 배수처리기능 확보\",\"예·경보시스템·문자전광판·민방위경보·SNS·케이블방송으로 특보·행동요령 홍보\"],\"nd\":true,\"page\":94},{\"code\":\"BSN-FL-031\",\"manualCode\":\"6-3\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\",\"대설\"],\"title\":\"재난안전대책본부운영강화\",\"content\":\"재난안전대책본부비상근무강화\",\"details\":[\"재대본 근무: 태풍예비특보-시민안전실 8명+태풍 지원 15개 부서(15명) / 호우주의보-시민안전실 8명+호우 지원 12개 부서(12명) / 적설 1~3cm-시민안전실 8명+대설 지원 4개 부서(4명)\",\"재난상황관리반: 구·군 재대본 가동현황 확인·미응소자 응소 독려, 행정안전부 기상특보 대처상황보고 자료 취합\",\"비상지원반: 소관사항 안전점검·응급조치 지시, 피해내역 파악(반원→부서·구·군)\",\"상황판단회의 직후 시민안전실장 결재(재대본 운영강화 포함)\",\"비상소집 SMS 통보(재난상황관리반·비상지원반), 가능 시 공문\",\"행정포털 게시(특보현황, 비상근무조, 응소)\",\"재대본 세팅(알림 PPT, 명패, 재난대응행동수칙 책자), 응소부 비치·서명(공통 1-2-①)\",\"기상특보 대처상황보고(구·군→시→행정안전부, 05·10·17·22시)\"],\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\",\"기상특보지원부서\"],\"collab\":[],\"propagateTo\":[\"재난상황관리반\",\"비상지원반(지원부서)\",\"행정포털\"],\"propagateMsg\":\"붙임 6-3-① 위기경보 수준 격상(주의→경계) 및 지대본 비상1단계 근무 발령 알림 공문 + 시민안전실장 지시사항(침수대비·주민대피·상황전파 철저)\",\"resources\":[\"재난문자시스템(SMS)\",\"행정포털\",\"응소부\"],\"damageMeasures\":[],\"nd\":true,\"page\":96},{\"code\":\"BSN-FL-032\",\"manualCode\":\"6-4\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"관련기관대비태세확인\",\"content\":\"구․군영상회의, 유관기관지원체계확인\",\"details\":[\"구·군 재난담당국장 영상회의(주재 시민안전실장): 구·군 중점 대처사항 확인·공유\",\"영상회의 개최 보고(1장 보고서, 공통 1-3-①)\",\"영상회의 개최 통보(원칙 공문, 예외 NDMS·메신저·SMS) 및 보고서식 송부\",\"구·군 보고자료 취합(구·군별 사전조치 및 대처계획, 공통 1-3-②)\",\"회의자료 작성(인사·마무리말씀 공통 1-3-③, 진행순서·시나리오 공통 1-3-④)\",\"영상회의 접속 확인(30분전·10분전)\",\"기상상황에 따른 보고 대상 구·군 선정\",\"유관기관 협력체계 점검 요청(주간 공문 / 야간·공휴일 팩스)\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[\"육군 제53사단\",\"KT부산본부\",\"한국전력공사 부산울산본부\",\"한국가스안전공사 부산광역본부\",\"한국농어촌공사 김해양산부산지사\",\"부산교통공사\",\"대한적십자사 부산광역시지사\",\"부산광역시교육청\",\"부산지방기상청\",\"부산경찰청\",\"구·군\"],\"propagateTo\":[\"구·군 재난담당국장\",\"유관기관\"],\"propagateMsg\":\"붙임 6-4-① 태풍 북상 및 집중호우에 따른 유관기관 협조 요청 공문(유관기관 주요 임무: 육군53사단(응급복구 인력·장비), KT부산본부(통신 응급복구), 한국전력(전기), 한국가스안전공사(가스), 한국농어촌공사(저수지·양배수장), 부산교통공사(비상수송), 대한적십자사(피해신고 핫라인·복구인력), 교육청(휴교·등하교 안전), 부산지방기상청(기상정보), 부산경찰청(교통통제))\",\"resources\":[],\"damageMeasures\":[],\"nd\":true,\"page\":98},{\"code\":\"BSN-FL-033\",\"manualCode\":\"6-5\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"재해취약지등안전점검강화\",\"content\":\"재해취약지구․군, 행정지원책임관중첩점검등\",\"details\":[\"현장 행정지원 책임관 재해취약지 점검 결정(상황판단회의) 및 지시(주간 공문/야간·공휴일 행정포털·SMS)\",\"책임관 현황·재해취약지 목록·위치도·복명서 통보(공통 1-4-①)\",\"현장 행정지원 지역담당관(지정 팀장) 현장점검, 복명서 제출(공통 1-4-②)\",\"점검결과 문제점 위주 시민안전실장 보고 및 구·군·책임관 부서 통보, 응급조치 결과보고\",\"구·군 자체 별도점검(중첩점검)\",\"배수펌프장(수문·유수지) 사전배수·비상근무 확인(공통 1-4-③), 저수지 사전방류 요청(한국농어촌공사)\",\"재해 예경보시스템 시험방송(문자전광판, 우량경보시설, 경보방송시설, 민방위경보시설)\",\"부서별 소관시설(산사태위험지구, 급경사지, 자연재해위험지구, 지하차도, 하상도로) 별도 점검\",\"감독시설(대형공사장, 대형간판, 어항, 수산증양식시설, 어선, 농축산시설) 점검 지시(SMS·협회·작목반·어촌계 활용)\"],\"lead\":\"자연재난과\",\"support\":[\"현장행정지원책임관지정부서\"],\"collab\":[\"구․군\",\"유관기관\"],\"propagateTo\":[\"현장 행정지원 책임관\",\"구·군\",\"소관부서\",\"한국농어촌공사\"],\"propagateMsg\":\"\",\"resources\":[\"재해취약지 목록·위치도\",\"복명서 서식\",\"배수펌프장\",\"예경보시스템\"],\"damageMeasures\":[\"인명·재산피해 우려지 응급조치(출입통제)\",\"배수펌프장 사전배수\",\"저수지 사전방류\",\"부서별 소관시설 재점검\"],\"nd\":true,\"page\":100},{\"code\":\"BSN-FL-034\",\"manualCode\":\"6-6\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"재난자원점검및전진배치지시\",\"content\":\"수방자재․응급복구장비점검, 비축량파악\",\"details\":[\"주요장비(양수기·배수펌프·비상발전기) 보유현황·관리책임자·연료 확인, 시험운전\",\"모래주머니·포대·묶음줄·말목·덮개 비축량·상태 확인\",\"재해구호물품·의약품·방역·방제물자 확인\",\"응급복구장비 지정내역·구·군간 응원체계 확인(재난관리시스템 자원관리분야)\",\"수방자재 상습침수지역 등 재해취약지 인근 전진배치, 가동(관리)책임자 지정·운영\"],\"lead\":\"자연재난과\",\"support\":[\"복지정책과\",\"건설안전사업소\"],\"collab\":[\"구․군\",\"유관기관\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"양수기\",\"배수펌프\",\"비상발전기\",\"모래주머니 등 수방자재\",\"응급복구장비\",\"재해구호물품\"],\"damageMeasures\":[],\"nd\":true,\"page\":101},{\"code\":\"BSN-FL-035\",\"manualCode\":\"6-7\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"기상특보대응상황보고\",\"content\":\"기상특보조치사항행정안전부보고\",\"details\":[\"기상특보 대응지시 수신(NDMS: 행정안전부→재난안전상황실/재대본; 재대본 구성 전에는 재난안전상황실 처리)\",\"구·군에 기상특보 조치사항 제출 요청(NDMS)\",\"구·군 조치사항 보고 접수(구·군→재난안전상황실/재대본)\",\"구·군 자료 취합 후 행정안전부 보고(NDMS) - 자연재난과장이 취합·작성자 지정\",\"중대본 발표시간 1시간 전까지 제출(매일 05·10·17·22시)\",\"인명피해현황은 소방재난본부 확인 후 제출\"],\"lead\":\"재난안전상황실\",\"support\":[\"자연재난과\"],\"collab\":[\"구․군\"],\"propagateTo\":[\"행정안전부(NDMS)\"],\"propagateMsg\":\"\",\"resources\":[\"NDMS\"],\"damageMeasures\":[],\"nd\":true,\"page\":102},{\"code\":\"BSN-FL-036\",\"manualCode\":\"6-8\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"재해구호물자현황등점검\",\"content\":\"재해구호물자․긴급구매업체현황파악\",\"details\":[\"재해구호물자 통합정보시스템상 현황 및 실제 비축현황 파악(응급구호세트, 취사구호세트, 개별구호물품)\",\"보관창고 관리자 연락처 확인\",\"구호물품 전달 인력(자율방재단, 자원봉사센터) 확인\",\"긴급구매업체(사전 구매선) 현황 파악\"],\"lead\":\"복지정책과\",\"support\":[],\"collab\":[\"구․군\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"재해구호물자 통합정보시스템\",\"응급·취사구호세트\",\"개별구호물품\"],\"damageMeasures\":[],\"nd\":false,\"page\":103},{\"code\":\"BSN-FL-037\",\"manualCode\":\"6-9\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"이재민발생현황파악․보고\",\"content\":\"이재민현황취합보고\",\"details\":[\"이재민 발생현황 보고(구·군→재대본→복지정책과)\",\"호우주의보 피해발생 보고 시 이재민 발생현황 함께 보고\"],\"lead\":\"복지정책과\",\"support\":[],\"collab\":[\"구․군\"],\"propagateTo\":[\"재대본\",\"복지정책과\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"nd\":false,\"page\":104},{\"code\":\"BSN-FL-038\",\"manualCode\":\"6-10\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"통신사긴급복구반편성․운영확인등\",\"content\":\"피해파악․응급복구요청, 긴급복구반운영확인\",\"details\":[\"통신시설 피해 접수(재대본)→통신사 피해사실·응급복구 요청→조치완료 후 보고(통신사→재대본)\",\"통신사 자체 긴급복구반 편성·운영 및 외주업체 활동 여부 확인\",\"PS-LTE 지원 및 운영(자연재난과)\"],\"lead\":\"인공지능소프트웨어과\",\"support\":[],\"collab\":[\"통신사\"],\"propagateTo\":[\"통신사\"],\"propagateMsg\":\"\",\"resources\":[\"PS-LTE\"],\"damageMeasures\":[\"통신시설 응급복구 요청\"],\"nd\":false,\"page\":105},{\"code\":\"BSN-FL-039\",\"manualCode\":\"6-11\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(도로안전과) 소관시설물안전조치강화지시\",\"content\":\"도로․교통통제, 우회도로지정안내등\",\"details\":[\"도로 공사장 안전관리책임자 상주 확인, 수방자재·장비 전진배치, 배수로 확보, (강풍) 자재 고정·결박\",\"해안·해상도로·교량 안전점검·응급조치, 통행제한기준 해당 시 교통통제(부산시설공단, 북항아이브릿지)\",\"하상도로·지하차도 측구·배수로 정비, 침수우려 상시 모니터링\",\"교통통제지역 우회도로 지정·안내(현장관리자 배치, 안내표지판)\",\"도로·교통통제 상황 보고(구·군·경찰→시 재대본)\",\"지하차도 차량 차단(경고) 시스템 단계별 운영: 예비특보-24시간 체제·설비 점검 / 호우주의보-관리인력 배치·전광판 경계표시·필요시 차단 / 호우경보-현장 배치·차단·진입통제 방송·경광등 / 종료 시 원상복구\",\"온천천 하상도로 강수량별 통제대책 참고\"],\"lead\":\"도로안전과\",\"support\":[\"부산경찰청\",\"교통정보서비스센터\"],\"collab\":[\"부산시설공단\",\"북항아이브릿지(주) 등\"],\"propagateTo\":[\"시 재대본\",\"관할 경찰서(차량통제)\",\"도로 이용자(전광판·방송)\"],\"propagateMsg\":\"\",\"resources\":[\"지하차도 차단기·수위계·전광판·경광등·방송설비\",\"안내표지판\",\"수방자재\"],\"damageMeasures\":[\"지하차도·하상도로 차량 차단\",\"교량 통행제한\",\"우회도로 지정·안내\",\"공사장 안전조치\"],\"nd\":false,\"page\":106},{\"code\":\"BSN-FL-040\",\"manualCode\":\"6-12\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(푸른숲도시과) 소관시설물안전조치강화지시\",\"content\":\"산사태취약지역등 사전점검보완\",\"details\":[\"산사태 징후 지속 모니터링(산림청 산사태예측정보)\",\"산사태취약지역 측구·배수로 정비, 유수 장애물 제거(시→구·군)\",\"산사태위험지역 주민 대피 준비: 주민 비상연락망 정비, 대피장소·관리자 연락망 확인, 대피명령 시 대피장소 홍보\",\"낙석 위험 숲길 통제·현장관리자 배치·안내표지판\",\"(태풍 관통 예상) 가로수·공원수 전도방지 지지대·결박\",\"산사태 취약지역 및 임도피해지역 확인, 산림·재난부서 공동 대응체계, 산사태 예보 시 산사태 현장조치 행동매뉴얼 적용\",\"안전점검반 편성(반장 현장책임관-공무원, 반원 현장관리관-이·통장·주민대표·자율방재단), 현장관리관증 발급\",\"산사태 피해 예상지역 사전통제(도로 포함), 필요시 필수요원 소집·비상근무\"],\"lead\":\"푸른숲도시과\",\"support\":[],\"collab\":[\"구·군\"],\"propagateTo\":[\"구·군\",\"산사태위험지역 주민\"],\"propagateMsg\":\"\",\"resources\":[\"산사태정보시스템\",\"안내표지판\",\"현장관리관증\"],\"damageMeasures\":[\"산사태취약지역 점검·응급조치\",\"숲길 접근통제\",\"가로수 전도방지\",\"산사태 우려지역 사전통제·주민대피 준비\"],\"nd\":false,\"page\":114},{\"code\":\"BSN-FL-041\",\"manualCode\":\"6-13\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(건축정책과) 소관시설물안전조치강화지시\",\"content\":\"건축공사장안전조치, 아파트유리창안전조치등\",\"details\":[\"공사현장 안전관리책임자 상주 확인(SMS), 수방자재 전진배치, 배수로 확보, (강풍) 자재 고정·결박\",\"노후주택 붕괴가능성 관찰, 붕괴우려 시 사전대피명령 검토, 재난안전선 접근통제, 버팀목·모래주머니 응급조치\",\"고층건물 유리창 파손 대비 홍보(구·군→아파트 관리소→구내방송)\"],\"lead\":\"건설행정과\",\"support\":[],\"collab\":[\"구․군\"],\"propagateTo\":[\"구·군\",\"아파트 관리사무소\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[\"건축공사장 안전조치\",\"노후주택 접근통제·응급조치\",\"아파트 유리창 안전조치 방송\"],\"nd\":false,\"page\":116},{\"code\":\"BSN-FL-042\",\"manualCode\":\"6-14\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(농축산유통과) 소관시설물안전조치강화지시\",\"content\":\"농축산시설안전점검․응급조치실시등\",\"details\":[\"농작물·농축산시설 피해예방 홍보(물꼬·배수로 정비, 버팀목 보강) - 이장·작목반 SMS→마을앰프\",\"양·배수장·배수문·저수지 방류량 조절 요청(농어촌공사)\",\"배수용 양수기 침수우려지역 전진배치\"],\"lead\":\"농축산유통과\",\"support\":[],\"collab\":[\"구·군\",\"한국농어촌공사\"],\"propagateTo\":[\"이장·작목반\",\"한국농어촌공사\"],\"propagateMsg\":\"\",\"resources\":[\"배수용 양수기\"],\"damageMeasures\":[],\"nd\":false,\"page\":117},{\"code\":\"BSN-FL-043\",\"manualCode\":\"6-15\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(수산정책과) 소관시설물안전조치강화지시\",\"content\":\"수산증양식시설, 어항시설, 어선등안전조치지시\",\"details\":[\"수산증양식·어항·어로시설·어선 피해예방조치 홍보(이장·어촌계·수협 SMS→마을앰프)\",\"구·군별 현지지도반 편성 확인·활동 지시, 피해예방조치 이행 점검\",\"해양경찰 안전센터·출장소(광안리·송정·영도·남항·다대·감천·명지)와 기상특보 전파 및 어선 입출항 통제 협업\"],\"lead\":\"수산정책과\",\"support\":[\"수산진흥과\"],\"collab\":[\"구·군\",\"부산해양경찰서(안전센터·출장소)\"],\"propagateTo\":[\"이장·어촌계·수협\",\"해양경찰 안전센터·출장소\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[\"어선 입출항 통제\",\"수산시설 피해예방조치\"],\"nd\":false,\"page\":118},{\"code\":\"BSN-FL-044\",\"manualCode\":\"23-1\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(교통혁신과) 소관시설물안전조치강화지시\",\"content\":\"교통신호기응급복구, 교통소통대책시행등\",\"details\":[\"교통시설물·장비 점검·정비 강화 지시(부산교통공사, 버스·택시·마을버스 조합, 유지보수업체)\",\"(피해발생시) 산사태·도로함몰·터널붕괴 등 돌발상황 VMS·BIT 전파\",\"(피해발생시) 교통신호시설 피해파악·응급복구, 경찰 협조 교통소통대책\",\"(피해발생시) 경찰·교통봉사대 인력지원 교통소통대책\"],\"lead\":\"교통혁신과\",\"support\":[\"대중교통과\",\"교통정보서비스센터\"],\"collab\":[\"(버스․택시)조합\",\"부산교통공사등\"],\"propagateTo\":[\"시민(VMS·BIT)\"],\"propagateMsg\":\"\",\"resources\":[\"교통전광판(VMS)\",\"버스정보시스템(BIT)\"],\"damageMeasures\":[\"교통신호시설 응급복구\",\"교통소통대책\"],\"nd\":false,\"page\":119},{\"code\":\"BSN-FL-045\",\"manualCode\":\"6-16\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"후방의료기관현황등확인\",\"content\":\"후방의료기관현황, 비상연락망확인\",\"details\":[\"200병상 이상 후방의료기관 현황 파악, 비상연락망 확인\"],\"lead\":\"건강정책과\",\"support\":[],\"collab\":[\"후방의료기관지정병원\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"후방의료기관(200병상 이상)\"],\"damageMeasures\":[],\"nd\":false,\"page\":120},{\"code\":\"BSN-FL-046\",\"manualCode\":\"6-17\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"재해쓰레기처리자원확인등\",\"content\":\"재해쓰레기처리인력․장비현황파악등\",\"details\":[\"집게차·폐기물 운반트럭 보유현황 및 민간자원 확인\",\"재해쓰레기 처리 유관기관 비상연락망 확인(인력: 군부대·경찰·적십자사 / 장비: 쓰레기 수거업체)\"],\"lead\":\"자원순환과\",\"support\":[],\"collab\":[\"구·군\",\"군부대\",\"경찰\",\"대한적십자사\",\"쓰레기 수거업체\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"집게차\",\"폐기물 운반트럭\"],\"damageMeasures\":[],\"nd\":false,\"page\":121},{\"code\":\"BSN-FL-047\",\"manualCode\":\"6-18\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"대시민홍보및언론보도대응\",\"content\":\"언론모니터링, 기상특보전파, 보도자료제공등\",\"details\":[\"주요도로 교통통제·우회도로 지정 현황 홈페이지·TV자막·SNS 홍보(뉴미디어담당관)\",\"사망자·부상자 발생현황 전파\",\"언론보도 모니터링(과장보도·오보) 및 정정보도 요구, 보도자료 배포·브리핑(공보담당관)\",\"기상특보·시민행동요령 TV자막·SNS 전파(자연재난과 행동요령 파일 제공)\",\"시장·부시장 주재 상황판단 및 대책회의 시 보도자료 제공\"],\"lead\":\"공보담당관\",\"support\":[\"홍보담당관\"],\"collab\":[\"자연재난과\"],\"propagateTo\":[\"시민(TV자막·SNS·홈페이지)\",\"언론사\"],\"propagateMsg\":\"\",\"resources\":[\"TV자막\",\"SNS\",\"보도자료\"],\"damageMeasures\":[],\"nd\":false,\"page\":122},{\"code\":\"BSN-FL-048\",\"manualCode\":\"40-1\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(필요시) 주민대피\",\"content\":\"인명피해우려지역대피담당자대기 지시→사전대피조치지시\",\"details\":[\"사전대피 상황 판단: 위기징후 감지, 급경사지·산사태우려지·노후주택·노후축대 징후, 위험예보(댐 방류·산사태) 수신, 재난 임박, 야간·산간·인구유입 등 대피 곤란 조건\",\"위험구역 설정(재난안전법 제41조, 시장·군수·구청장/지역통제단장, 풍수해 재해우려지역 우선 검토) 및 금지·제한 행위 게시·안내(마을앰프·자동음성통보·문자전광판·지역TV·라디오)\",\"취약계층(사회적·위치적) 현황 파악, 외딴집 거동불편자 누락 방지, 보호자 연락처·자력대피 가능여부·대피수단 확인, 재해약자 조력자 지정\",\"특보 확대 우려 시 취약계층 비상연락망 즉시 가동, (필요시) 취약계층 사전대피 지시\",\"사전대피 결정: 대상·범위(주민, 자동차·선박), 안전 대피로, 협업체계(군부대·경찰서·재해구호협회·적십자·의료기관·교육지원청·자율방재단·수송차량), 대피요원 배치, 대피소 운영(안정성·수용성·접근성·공공성·편리성)\",\"사전대피 알림(방송·확성기·CBS·자동음성·문자통보·앰프·전화·이동차량·FAX·SNS·홈페이지)\",\"재난총괄담당관이 현장책임관(읍면동장)에 사전대피 지원 지시, 현장관리관(대피안내요원) 지정, 현장상황 지속 파악·보고\",\"사전대피자 이동 지원(대피경로 유도, 차량 확보, 교통통제-경찰), 안전 확보(대피장소 개방·안전성 확인, 위급환자 협조요청), 재해구호계획에 따른 구호\"],\"lead\":\"자연재난과\",\"support\":[\"공보담당관\",\"미디어담당관\"],\"collab\":[\"구·군\",\"군부대\",\"경찰서\",\"전국재해구호협회\",\"대한적십자사\",\"의료기관\",\"교육지원청\",\"지역자율방재단\"],\"propagateTo\":[\"주민(CBS·방송·앰프 등)\",\"현장책임관(읍면동장)\",\"현장관리관\",\"협업기관(군·경찰·적십자·의료기관·교육지원청)\"],\"propagateMsg\":\"(재난문자 표준문안) (사전 대피권고) ○○:○○ ○○지역 호우 피해 우려. ○○일대 주민들께 안전한 장소로 미리 대피할 것을 권고합니다. [기관명]\",\"resources\":[\"대피소\",\"수송차량\",\"주민대피 안내도\",\"현장관리관증\"],\"damageMeasures\":[\"위험구역 설정\",\"인명피해 우려지역 주민 사전대피\"],\"nd\":true,\"page\":123},{\"code\":\"BSN-FL-049\",\"manualCode\":\"40-5\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"주민대피(필요시)\",\"content\":\"대피명령지시\",\"details\":[\"대피안내 방송(경보·사이렌·방송, 안전취약계층 고려 수어·외국어·자막 활용)\",\"지자체 담당자·유관기관에 대피명령(재난안전법 제40조: 발령일시·발령지역·대피장소)\",\"주민대피 경보발령 방송 문안 작성(재난유형·피해형태별 행동요령 포함)\",\"주민대피 시행 시 행정안전부 통보(중앙재난안전상황실 044-205-1540/1704, 자연재난대응과)\",\"대피소·임시대피소·대피로 안내 표지판 규격(어두운 노랑 바탕·검정 글씨, 하단 2m 이상)\"],\"lead\":\"자연재난과\",\"support\":[\"공보담당관\",\"미디어담당관\"],\"collab\":[\"KBS\"],\"propagateTo\":[\"주민\",\"지자체 담당자·유관기관\",\"행정안전부 중앙재난안전상황실\"],\"propagateMsg\":\"재난「○○」의 영향으로 ○○이 예상되어 주민의 생명과 신체를 보호하기 위하여 「재난 및 안전관리 기본법」 제40조에 따라 주민 대피명령을 발령하오니 해당 지역 주민과 당해 지역 안에 있는 주민은 관계공무원의 유도에 따라 신속히 대피하여 주시기 바랍니다. 1. 발령일시 2. 발령지역 3. 대피장소\",\"resources\":[\"민방위경보·사이렌·방송설비\",\"대피소 표지판\"],\"damageMeasures\":[\"주민 대피명령 발령\"],\"nd\":true,\"page\":129},{\"code\":\"BSN-FL-050\",\"manualCode\":\"40-10\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"주민대피(필요시)\",\"content\":\"안전취약계층의특성별대피시고려사항\",\"details\":[\"안전취약계층 유형별 특성 고려(시각·청각·시청각중복·언어·지체·내부·지적·정신·고차뇌기능·발달장애인 등)\",\"유형별 정보전달 방법(문자·수어·그림·지도 등) 및 대피유도(보행지원) 담당 사전 지정\",\"시청각중복장애인 통역사·보조인 대피소 파견, 의약품·의료기기 휴대 지원\"],\"lead\":\"자연재난과\",\"support\":[\"복지정책과\"],\"collab\":[\"KBS부산방송국\"],\"propagateTo\":[\"안전취약계층\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"nd\":true,\"page\":133},{\"code\":\"BSN-FL-051\",\"manualCode\":\"40-11\",\"manualStage\":\"2단계 초기대응\",\"stage\":\"주의\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"주민대피(필요시)\",\"content\":\"안전취약계층대피계획수립및대피\",\"details\":[\"복지부서 협의로 재난우려지역 안전취약계층 현황 조사(외딴집 거동불편자, 보호자 연락처, 자력대피 가능여부, 대피수단), DB 구축·정기 갱신\",\"취약계층별 대피담당자 복수 지정(1차: 지역주민·공무원·유관기관 직원 / 2차: 수시 현장확인 가능한 공무원)\",\"대피담당자: 행동요령 전달(문자·유선·방문), 대피 지원, 상황관리·보고\",\"대피수단은 지자체 공용차량 우선 지정, 사전 동선 파악\",\"대피소 선정: 침수·범람에 안전한 마을회관 등, 장애인 접근·화장실 배려 시설, 비상의약품 비치, 필요시 응급의료·중증장애인 지원 전문인력\"],\"lead\":\"자연재난과\",\"support\":[\"복지정책과\"],\"collab\":[],\"propagateTo\":[\"안전취약계층(문자·유선·방문)\"],\"propagateMsg\":\"\",\"resources\":[\"지자체 공용차량\",\"비상의약품\",\"취약계층 DB\"],\"damageMeasures\":[],\"nd\":true,\"page\":145},{\"code\":\"BSN-FL-052\",\"manualCode\":\"7-1\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"기상특보접수\",\"content\":\"기상특보접수및전파\",\"details\":[\"접수수단: 상황전파메신저(NDMS) 중대본→시 상황실→구·군 상황실, 방재기상정보시스템(afso.kma.go.kr) 특보 통보문, 기상청 유선통보(예비특보·특보 발표 전)\",\"재난문자발송시스템(UMS) 접속→전송그룹 선택→메시지 제목·내용 입력→즉시발송\",\"전송 결과 확인(실패·대기 메시지 확인·재전송)\"],\"lead\":\"재난안전상황실\",\"support\":[\"자연재난과\"],\"collab\":[\"기상청(기상자문관)\"],\"propagateTo\":[\"구·군 상황실(NDMS)\",\"재난공무원(UMS)\"],\"propagateMsg\":\"\",\"resources\":[\"NDMS\",\"방재기상정보시스템\",\"UMS\"],\"damageMeasures\":[],\"nd\":true,\"page\":148},{\"code\":\"BSN-FL-053\",\"manualCode\":\"8-1\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"기상특보상황보고(시장, 부시장)\",\"content\":\"기상특보상황․조치사항시장․부시장보고\",\"details\":[\"기상특보 현황 중심 1장 보고서 작성·보고(자연재난과장→시장 / 자연재난팀장→행정부시장)\",\"기상특보 현황, 실·국·본부장 대책회의 개최 등 방침 결정\",\"기상특보 발표내용 휴대전화(SMS) 통보(재난안전상황실→시장·부시장)\",\"주말·공휴일·일과후 특보 시: 상황팀장이 회의 주재자에게 즉시 보고 → 주재자가 상황판단회의 개최 또는 즉시 비상단계 돌입 결정\",\"긴급 시: 자연재난과장(부재시 팀장)이 기상·피해(예상)·부서별 대처상황 보고, 주재자 지시로 상황판단회의 갈음(대면 또는 유선)\"],\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\"],\"collab\":[],\"propagateTo\":[\"시장\",\"행정부시장\"],\"propagateMsg\":\"붙임 8-1-① 호우주의보 대처상황 보고(1보): 기상특보, 강수현황(구·군별), 피해현황, 통제상황, 조치상황(비상근무 인원·전광판 홍보·예찰활동), 향후계획\",\"resources\":[\"SMS\",\"1장 보고서\"],\"damageMeasures\":[],\"nd\":true,\"page\":149},{\"code\":\"BSN-FL-054\",\"manualCode\":\"8-2\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"기상특보전파(시민, 유관기관)\",\"content\":\"기상특보다양한수단통한전파\",\"details\":[\"UMS·One-Click(7개 방송사)·문자전광판·BIT·재난경보방송·전자팩스·홈페이지·SNS·긴급통신수단으로 다매체 전파\",\"긴급재난문자(CBS)는 행정안전부 발송\",\"부산교통공사·부산시설공단 홍보요청 공문 별도 통보\",\"홈페이지·SNS에 풍수해 유형별 시민행동요령 첨부(홍보담당관)\"],\"lead\":\"자연재난과\",\"support\":[\"홍보담당관\",\"공보담당관\",\"미디어담당관\"],\"collab\":[\"교통정보서비스센터\",\"부산시설공단\",\"부산교통공사\"],\"propagateTo\":[\"공무원·기자·시민(신청자)(UMS 문자)\",\"KBS·MBC·KNN 등 7개 방송사(One-Click 자막)\",\"시민(재해·홍보·교통 문자전광판, BIT, 재난경보방송, 전자팩스→아파트 내부방송, 홈페이지·SNS)\",\"경찰청·소방본부 등 15개 기관(긴급통신수단 공동주파수)\",\"부산교통공사·부산시설공단(홍보요청 공문)\"],\"propagateMsg\":\"○월 ○일 ○시 (태풍, 호우) (예비특보, 주의보, 경보)가 발효 됨에 따라, 시설물, 어선·선박 관리 등 안전사고가 없도록 주의 하시기 바랍니다. / (전광판·BIT·SNS) ○월 ○일 ○시 (태풍, 호우) (예비특보, 주의보, 경보) 발효! (호우, 태풍, 강풍, 풍랑)로 인한 피해가 없도록 주의 바람\",\"resources\":[\"UMS(재난문자발송시스템)\",\"One-Click 재난상황전파시스템\",\"재해·홍보·교통 문자전광판\",\"버스정보시스템(BIT)\",\"민방위경보시설·경고방송장치\",\"전자팩스\",\"홈페이지·SNS\",\"긴급통신수단(PS-LTE/공동주파수)\"],\"damageMeasures\":[],\"nd\":true,\"page\":151},{\"code\":\"BSN-FL-055\",\"manualCode\":\"8-3\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\",\"대설\"],\"title\":\"상황판단및대책회의개최\",\"content\":\"상황판단및대책회의개최준비․진행․정리\",\"details\":[\"호우경보·태풍주의보·경보·적설량 3cm 이상: 시장(행정부시장) 주재 - 실·국·본부장, 구·군 부단체장(재난국장), 유관기관·단체 파견근무자\",\"소방재난본부·부산경찰청·남해지방해양경찰청·육군53사단·구·군 영상회의 참여\",\"※ 호우·대설 2단계: 13개 협업기능반 실국장 / 태풍 비상2·3단계, 호우·대설 비상3단계: 전 실국장 참석(p.23)\",\"회의 체크리스트 확인(준비항목·역할분담, 공통 1-1-①)\",\"회의 개최 보고(1장 보고서, 긴급시 구두보고)\",\"회의 개최 통보(공문, 긴급시 SMS-참석자 개인, NDMS-구·군)\",\"회의자료 작성(말씀자료, 주요 재해취약시설 체크사항, 진행순서·사회자 시나리오, 좌석배치도·참석자 현황)\",\"참석대상자 참석 확인(개별 유선, 30분전·10분전)\",\"재대본 회의실 세팅(회의 PPT·영상회의·기상영상 3단 분할, 영상회의시스템 구동·구·군 접속 확인, 명패·물 세팅)\",\"회의 결과보고(회의 직후 결재, 비상근무 여부 포함)\",\"회의 결과 통보(비상근무 실시, 재해취약지 점검 지시 등)\",\"(부)시장 주재 시 언론보도자료 작성(자연재난과→공보담당관)\"],\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\",\"실․국․본부주무부서\"],\"collab\":[\"기상청(기상자문관)\",\"유관기관\"],\"propagateTo\":[\"실·국·본부장\",\"구·군 부단체장\",\"유관기관\",\"언론\"],\"propagateMsg\":\"\",\"resources\":[\"재대본 회의실\",\"영상회의시스템\"],\"damageMeasures\":[],\"nd\":true,\"page\":152},{\"code\":\"BSN-FL-056\",\"manualCode\":\"8-4\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\",\"대설\"],\"title\":\"기상특보에따른대응지시\",\"content\":\"구․군, 전부서, 유관기관전파, 대응지시\",\"details\":[\"기상특보 수신(방재기상정보시스템, NDMS 행정안전부→시, SMS 재난안전상황실→담당자)\",\"기상특보 전파 및 대응철저 공문 발송(자연재난과): 재해취약지·소관시설물 안전점검 등 매뉴얼에 따른 재난대비활동 철저 지시(구·군, 전부서, 유관기관)\",\"(구·군) NDMS 대응지시(재난안전상황실→구·군), NDMS 불가 기관은 Fax 발송\",\"공문(야간·공휴일)·NDMS 발송 불가 기관은 협업기관 Fax 활용: 부산지방기상청(특보 공유), 교육청(임시주거시설), 53사단(인력·장비), 부산교통공사(비상수송), 한전·가스안전공사(응급조치), 농어촌공사(사전배수), 적십자(구호·인력), KT(통신)\"],\"lead\":\"재난안전상황실\",\"support\":[\"자연재난과\"],\"collab\":[\"구․군\",\"유관기관\",\"전부서\"],\"propagateTo\":[\"구·군\",\"전부서\",\"유관기관(Fax)\"],\"propagateMsg\":\"붙임 8-4-① 태풍경보에 따른 인명피해 예방활동 철저 당부 공문\",\"resources\":[\"NDMS\",\"Fax\"],\"damageMeasures\":[\"소하천·세월교·징검다리 등 인명피해 우려지역 재난안전선 설치·출입통제\",\"하천변 둔치·하상도로·지하차도 등 침수우려도로 예찰 및 경찰 협조 출입통제\",\"산사태 우려지역·붕괴우려 급경사지 예찰 강화, 위험징후 시 응급조치·주민대피\",\"해안가·갯바위·방파제 출입통제\",\"강풍 대비 옥외광고물(간판) 결박·보강\",\"노후저수지 이상징후 시 하류 주민대피\",\"저지대 철도역사·주택·공장·상가 침수방지시설(방수판)·양수기 전진배치\"],\"nd\":true,\"page\":154},{\"code\":\"BSN-FL-057\",\"manualCode\":\"8-5\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\",\"대설\"],\"title\":\"재난안전대책본부운영강화\",\"content\":\"재난안전대책본부비상근무강화\",\"details\":[\"재대본 근무: 상황단계별(기상특보 유형별) 상황근무 기준(p.22)에 따른 비상근무(비상2단계: 상황관리반 13명+협업기능반 26~27명+유관기관, 태풍은 전직원 1/10조 추가)\",\"상황판단회의 직후 시민안전실장 결재(운영강화 포함)\",\"비상소집 SMS: 13개 협업기능별 실무반·유관기관, 가능 시 공문\",\"행정포털 게시(특보현황, 비상근무조, 응소)\",\"재대본 세팅(알림 PPT, 명패, 재난대응행동수칙 책자-실무반), 응소부 서명(공통 1-2-①)\",\"기상특보 대처상황보고(구·군→시→행정안전부, 05·10·17·22시), 소관부처별·구·군별 피해현황 파악\"],\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\",\"기상특보지원부서\"],\"collab\":[],\"propagateTo\":[\"13개 협업기능별 실무반\",\"유관기관\"],\"propagateMsg\":\"\",\"resources\":[\"재난문자시스템(SMS)\",\"행정포털\",\"응소부\"],\"damageMeasures\":[],\"nd\":true,\"page\":156},{\"code\":\"BSN-FL-058\",\"manualCode\":\"8-6\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\",\"대설\"],\"title\":\"전직원1/10 비상근무명령\",\"content\":\"전직원1/10 비상근무지시\",\"details\":[\"비상근무 바인더 확인 후 비상근무조 확정(호우 3단계, 태풍 2단계, 대설 2단계 시 1/10)\",\"해당 근무조에 SMS 비상응소명령(재난문자시스템)\",\"행정포털 게시(특보현황, 근무조 현황, 응소부 출력·서명, 근무요령, 공통 1-2-①)\",\"비상근무 실시 현황 파악(사무실 근무), 필요 시 현장지원\"],\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\"],\"collab\":[],\"propagateTo\":[\"전직원 해당 비상근무조(SMS)\"],\"propagateMsg\":\"\",\"resources\":[\"재난문자시스템\",\"행정포털\",\"응소부\"],\"damageMeasures\":[],\"nd\":true,\"page\":159},{\"code\":\"BSN-FL-059\",\"manualCode\":\"8-7\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"관련기관대응태세확인\",\"content\":\"구․군영상회의, 유관기관지원체계확인\",\"details\":[\"(필요시) 구·군 부단체장 영상회의(주재 시장): 구·군 중점 대처사항 확인·공유\",\"영상회의 개최 보고(자연재난과장→시장, 공통 1-3-①)\",\"영상회의 개최 통보(원칙 공문, 예외 NDMS·메신저·SMS) 및 보고서식 송부\",\"구·군 보고자료 취합(구·군별 사전조치 및 대처계획, 공통 1-3-②)\",\"회의자료 작성(인사·마무리말씀 공통 1-3-③, 진행순서·시나리오 공통 1-3-④)\",\"영상회의 접속 확인(30분전·10분전)\",\"기상상황에 따른 보고 대상 구·군 선정\",\"유관기관 협력체계 강화 요청(주간 공문/야간·공휴일 팩스), 유관기관 근무자 재대본 비상근무 요청\"],\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\"],\"collab\":[\"육군 제53사단\",\"KT부산본부\",\"한국전력공사 부산울산본부\",\"한국가스안전공사 부산광역본부\",\"한국농어촌공사 김해양산부산지사\",\"부산교통공사\",\"대한적십자사 부산광역시지사\",\"부산광역시교육청\",\"부산지방기상청\",\"부산경찰청\",\"구·군\"],\"propagateTo\":[\"구·군 부단체장\",\"유관기관\"],\"propagateMsg\":\"붙임 8-7-① 태풍경보 발효에 따른 유관기관 협조 요청: 응소대상(부산지방기상청, 53사단, 교육청, KT, 한전, 부산교통공사, 가스안전공사, 적십자, 농어촌공사 각 1명), 응소장소 시청 15층 재대본, 소관분야 예방·응급복구·피해조사 지원\",\"resources\":[],\"damageMeasures\":[],\"nd\":true,\"page\":160},{\"code\":\"BSN-FL-060\",\"manualCode\":\"8-8\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"재해취약지등안전조치지시\",\"content\":\"인적․물적피해최소화대책시행\",\"details\":[\"인명피해 우려지역(해일·월파 우려지역, 침수지역, 산사태위험지역) 접근통제 지시·현황파악, 미실시 지역 통제 지시(교통통제: 경찰)\",\"재해예경보시스템 방송(민방위경보시설·경보방송시설) 요청(재난안전상황실)\",\"배수펌프장 가동 여부 확인·가동 지시(하천관리과), 비상근무자 정위치 점검\",\"수방자재·응급복구장비 가동 지시, (필요시) 자재·장비 행정응원 요청\",\"재대본 피해상황 접수(실무반·시민·경찰·소방·공무원, 공통 1-5-①) → 구·군·소관부서 전파·응급조치 지시 → 결과 확인(응급구조: 소방)\",\"현장 행정지원책임관 활용 통보(재해취약지 점검·응급조치 지원), 구·군 지원요청 시 지원 명령(주간 공문/야간 SMS), 감사관 복무점검 요청\"],\"lead\":\"자연재난과\",\"support\":[\"현장행정지원책임관지정부서\",\"부산경찰청\",\"소방재난본부\"],\"collab\":[\"구․군\",\"유관기관\"],\"propagateTo\":[\"구·군\",\"소관부서\",\"현장 행정지원 책임관\",\"주민(재해예경보 방송)\"],\"propagateMsg\":\"\",\"resources\":[\"배수펌프장\",\"수방자재\",\"응급복구장비\",\"민방위경보시설\",\"재난신고 접수대장(공통 2-5-①)\"],\"damageMeasures\":[\"인명피해우려지역 접근통제\",\"배수펌프장 가동\",\"피해발생지역 응급조치\",\"자재·장비 행정응원\"],\"nd\":true,\"page\":162},{\"code\":\"BSN-FL-061\",\"manualCode\":\"8-9\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"유관기관협력체계가동지시\",\"content\":\"응급조치등유관기관지원체계가동\",\"details\":[\"유관기관 업무지원체계: 육군53사단(응급복구 인력·장비), KT부산본부(통신 응급복구), 한국전력(전기), 한국가스안전공사(가스), 한국농어촌공사(저수지·양배수장), 부산교통공사(비상수송), 대한적십자사(피해신고 핫라인·복구인력), 교육청(휴교·등하교 안전), 부산지방기상청(기상정보), 부산경찰청(교통통제)\",\"재대본 피해상황 접수(공통 1-5-①) → 응급조치 필요사항 유관기관 전파·조치요청 → 유관기관 비상작업반·외주업체 작업 지시 → 인력·장비·물자 부족 시 지원요청(유관기관→시) → 조치결과 확인\"],\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\"],\"collab\":[\"육군 제53사단\",\"KT부산본부\",\"한국전력공사 부산울산본부\",\"한국가스안전공사 부산광역본부\",\"한국농어촌공사 김해양산부산지사\",\"부산교통공사\",\"대한적십자사 부산광역시지사\",\"부산광역시교육청\",\"부산지방기상청\",\"부산경찰청\",\"구·군\"],\"propagateTo\":[\"육군 제53사단\",\"KT부산본부\",\"한국전력공사 부산울산본부\",\"한국가스안전공사 부산광역본부\",\"한국농어촌공사 김해양산부산지사\",\"부산교통공사\",\"대한적십자사 부산광역시지사\",\"부산광역시교육청\",\"부산지방기상청\",\"부산경찰청\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[\"Life-line(전기·가스·통신) 응급조치 요청\",\"피해지역 교통통제 요청(경찰)\",\"인력·장비·물자 응원 요청\"],\"nd\":true,\"page\":163},{\"code\":\"BSN-FL-062\",\"manualCode\":\"8-10\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"현장상황관리관(행정안전부) 활동지원\",\"content\":\"행정안전부파견현장상황관리관 지원\",\"details\":[\"행정안전부 현장상황관리관 파견 통보 접수\",\"사무처리 지원(청사 출입, 사무공간, 컴퓨터·인터넷)\",\"방문 재해취약지 추천·위치도 지원\",\"(필요시) 재해현장 방문 차량 배차, 재해취약지 안내요원 배치\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[\"구․군\",\"유관기관\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"차량\",\"사무공간·PC\"],\"damageMeasures\":[],\"nd\":true,\"page\":164},{\"code\":\"BSN-FL-063\",\"manualCode\":\"8-11\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"구․군, 실무반별피해현황파악지시\",\"content\":\"시간대별피해현황파악요청\",\"details\":[\"재대본 근무 실무반원별 책임 구·군 지정(상황총괄반장)\",\"책임 구·군 피해현황 파악(메신저·유선), 피해현황 서식·담당자 현황 제공(공통 1-6-①)\",\"파악한 피해현황 재난상황관리반에 제출\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[\"구․군\",\"유관기관\"],\"propagateTo\":[\"구·군\",\"재난상황관리반\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"nd\":true,\"page\":165},{\"code\":\"BSN-FL-064\",\"manualCode\":\"8-12\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"기상특보대응상황보고\",\"content\":\"기상특보조치사항행정안전부보고\",\"details\":[\"기상특보 대응지시 수신(NDMS: 행정안전부→재난안전상황실/재대본; 재대본 구성 전에는 재난안전상황실 처리)\",\"구·군에 기상특보 조치사항 제출 요청(NDMS)\",\"구·군 조치사항 보고 접수(구·군→재난안전상황실/재대본)\",\"구·군 자료 취합 후 행정안전부 보고(NDMS) - 자연재난과장(부재시 상황총괄반장)이 취합·작성자 지정\",\"중대본 발표시간 1시간 전까지 제출(매일 05·10·17·22시)\",\"인명피해현황은 소방재난본부 확인 후 제출\"],\"lead\":\"재난안전상황실\",\"support\":[],\"collab\":[\"구․군\"],\"propagateTo\":[\"행정안전부(NDMS)\"],\"propagateMsg\":\"\",\"resources\":[\"NDMS\"],\"damageMeasures\":[],\"nd\":true,\"page\":166},{\"code\":\"BSN-FL-065\",\"manualCode\":\"11-1\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"이재민임시주거시설가동지시\",\"content\":\"(이재민발생시)이재민임시주거시설사용지시\",\"details\":[\"이재민 발생 시 보고(구·군→시)\",\"임시주거시설 관리자 연락·사용 협조, 현장관리자(안내요원) 배치\",\"전기·통신·가스 설치 협조(유관기관), 환기·조명·보온장치, 화장실·간이목욕실·급수시설 지원\",\"이재민 급식·세탁 지원 협의(대한적십자사 부산광역시지사)\",\"이재민 수용현황 작성·비치(인적사항·연락처)\",\"감염병 대응: 독립공간 우선 활용, 출입자 관리·소독·위생관리·거리두기 등(코로나19 지침)\"],\"lead\":\"복지정책과\",\"support\":[],\"collab\":[\"교육청\",\"임시주거시설 지정건축물소유자\"],\"propagateTo\":[\"임시주거시설 관리자\",\"대한적십자사\",\"유관기관(전기·통신·가스)\"],\"propagateMsg\":\"\",\"resources\":[\"이재민 임시주거시설\",\"조명·보온장치\",\"간이목욕실·급수시설\"],\"damageMeasures\":[],\"nd\":false,\"page\":167},{\"code\":\"BSN-FL-066\",\"manualCode\":\"11-2\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"이재민구호물자지원\",\"content\":\"(이재민발생시)이재민구호물자지원\",\"details\":[\"구호물자 지원 대상 현황 확인(구·군→시), 재해구호물자 통합정보시스템 입력\",\"지원물자 확인(응급구호세트, 취사구호세트, 개별구호물품), 사전구매선에서 생필품 구입\",\"반출: 소량-구·군 보관창고 / 대량-재해구호협회 함양물류센터 요청\",\"부족 시 인근 구·군·시 지원 요청\",\"전달: 지역자율방재단·통장단·적십자 자원봉사자 활용\"],\"lead\":\"복지정책과\",\"support\":[],\"collab\":[\"대한적십자사(부산광역시지사)\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"재해구호물자 통합정보시스템\",\"응급·취사구호세트\",\"개별구호물품\",\"함양물류센터\"],\"damageMeasures\":[],\"nd\":false,\"page\":180},{\"code\":\"BSN-FL-067\",\"manualCode\":\"11-3\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"이재민발생현황파악․보고\",\"content\":\"이재민현황취합보고\",\"details\":[\"이재민 발생현황 보고(구·군→재대본→복지정책과, 재해구호계획에 따름)\",\"피해발생 보고 시 이재민 현황 함께 보고\"],\"lead\":\"복지정책과\",\"support\":[],\"collab\":[\"구․군\"],\"propagateTo\":[\"재대본\",\"복지정책과\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"nd\":false,\"page\":181},{\"code\":\"BSN-FL-068\",\"manualCode\":\"15-1\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"통신사긴급복구반편성․운영확인등\",\"content\":\"피해파악․응급복구요청, 긴급복구반운영확인\",\"details\":[\"통신시설 피해 접수→통신사 응급복구 요청→조치 후 보고(통신사→재대본)\",\"통신사 자체 긴급복구반·외주업체 활동 확인\",\"피해현장 통신두절 신고·보고 접수, 위성전화기·무선통신(HAM) 등으로 피해현장 긴급통신체계 재가동, 통신시설 응급복구 요청\"],\"lead\":\"인공지능소프트웨어과\",\"support\":[],\"collab\":[\"통신사\"],\"propagateTo\":[\"통신사\"],\"propagateMsg\":\"\",\"resources\":[\"위성전화기\",\"무선통신(HAM)\",\"PS-LTE\"],\"damageMeasures\":[\"통신시설 응급복구\",\"통신두절지역 긴급통신체계 가동\"],\"nd\":false,\"page\":182},{\"code\":\"BSN-FL-069\",\"manualCode\":\"16-1\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\",\"대설\"],\"title\":\"(도로안전과) 소관시설물응급조치실시\",\"content\":\"도로통제, 우회도로지정안내등\",\"details\":[\"상습침수 하상도로·지하차도 목록 확인, 구·군 사전통제 확인\",\"해안도로 소관기관 통제내역 확인\",\"교통통제지역 우회도로 지정·안내(현장관리자, 안내표지판)\",\"강설·낙하물·파손 등 위험 시 도로 긴급 통행제한 후 경찰서 통보(도로법 제76조)\",\"교통통제 상황 보고(구·군→시 재대본: 구간·시간·방법·현장책임자)\",\"유관기관: 부산경찰청 교통과(교통통제 주관), 부산시설공단(광안·영도·남항대교), 북항아이브릿지(부산항대교)\"],\"lead\":\"도로안전과\",\"support\":[\"부산경찰청\",\"교통정보서비스센터\"],\"collab\":[\"부산시설공단\",\"북항아이브릿지(주) 등\"],\"propagateTo\":[\"시 재대본\",\"경찰서\"],\"propagateMsg\":\"\",\"resources\":[\"안내표지판\"],\"damageMeasures\":[\"하상도로·지하차도 통제\",\"해안도로 통제\",\"우회도로 지정\",\"도로 긴급 통행제한\"],\"nd\":false,\"page\":183},{\"code\":\"BSN-FL-070\",\"manualCode\":\"16-2\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(푸른숲도시과) 소관시설물응급조치실시\",\"content\":\"산사태취약지역응급조치, 숲길통제등\",\"details\":[\"산사태취약지역 측구·배수로 확보, 유수 장애물 제거\",\"산사태 우려 시 주민대피명령 발령 요청, 대피소·대피인원 확인, 대피주민 지원대책 시행 요청\",\"낙석 위험 숲길 통제·현장관리자·안내표지판 확인, 미실시지역 조치 지시\",\"(태풍 관통 시) 전도 가로수·공원수 신속 제거(2차 피해 방지)\"],\"lead\":\"푸른숲도시과\",\"support\":[],\"collab\":[\"구․군\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[\"산사태취약지역 응급조치\",\"주민대피명령 요청\",\"숲길 통제\",\"전도 가로수 제거\"],\"nd\":false,\"page\":184},{\"code\":\"BSN-FL-071\",\"manualCode\":\"16-3\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(농축산유통과) 소관시설물응급조치실시\",\"content\":\"농축산시설피해최소화응급조치실시등\",\"details\":[\"양·배수장·배수문·저수지 방류량 조절 요청(시→구·군→관리자 SMS / 농어촌공사 주간 공문·야간 SMS)\",\"배수용 양수기 가동 배수 지시(시 공문·NDMS→구·군 SMS→관리책임자)\"],\"lead\":\"농축산유통과\",\"support\":[],\"collab\":[\"구․군\",\"한국농어촌공사\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"배수용 양수기\"],\"damageMeasures\":[\"저수지 방류량 조절\",\"양수기 배수\"],\"nd\":false,\"page\":185},{\"code\":\"BSN-FL-072\",\"manualCode\":\"18-1\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"전기․가스공급중단언론전파\",\"content\":\"전기․가스시설피해로공급중단TV 보도\",\"details\":[\"한국전력·한국가스안전공사 등을 통한 전기·가스 공급중단 사실 접수\",\"원클릭 시스템으로 7개 지역방송사 자막방송 요청(재대본→재난안전상황실→방송사)\"],\"lead\":\"미래에너지산업과\",\"support\":[],\"collab\":[\"구군\",\"유관기관\",\"7개지역방송사\"],\"propagateTo\":[\"7개 지역방송사(자막)\"],\"propagateMsg\":\"\",\"resources\":[\"One-Click 시스템\"],\"damageMeasures\":[],\"nd\":false,\"page\":186},{\"code\":\"BSN-FL-073\",\"manualCode\":\"24-1\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(교통혁신과) 소관시설물응급조치지시\",\"content\":\"교통신호기응급복구, 교통소통대책시행등\",\"details\":[\"(피해발생시) 산사태·도로함몰·터널붕괴 등 돌발상황 VMS·BIT 전파\",\"교통신호시설 피해파악·응급복구, 경찰 협조 교통소통대책\",\"경찰·교통봉사대 인력지원 교통소통대책\",\"교통통제구간 버스 우회노선·임시정류장 지정\",\"비상수송대책 시행·홍보(대중교통 증편·연장운행, 대체교통수단 투입)\"],\"lead\":\"교통혁신과\",\"support\":[\"대중교통과\",\"교통정보서비스센터\"],\"collab\":[\"(버스․택시)조합\",\"부산교통공사등\"],\"propagateTo\":[\"시민(VMS·BIT)\"],\"propagateMsg\":\"\",\"resources\":[\"VMS\",\"BIT\",\"대체교통수단\"],\"damageMeasures\":[\"교통신호시설 응급복구\",\"버스 우회노선·임시정류장\",\"비상수송대책\"],\"nd\":false,\"page\":187},{\"code\":\"BSN-FL-074\",\"manualCode\":\"27-1\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"현장응급의료체계가동지시\",\"content\":\"현장응급의료소설치, 사상자파악등\",\"details\":[\"신속대응반(구·군 보건소 응급의료인력) 재난현장 출동 지시\",\"현장응급의료소 설치·운영 요청(긴급구조통제단장→보건소장; 분류반→응급처치반→이송반)\",\"종합병원·응급의료기관에 의료인력·장비 지원 요청\",\"사망자·부상자, 입원병원·영안실 현황 파악·보고\",\"병원별 수용능력 확인 후 부상자 분산 이송, 원거리·응급수술 시 헬기 요청\",\"병원별 시신 수용규모 파악 후 운구\"],\"lead\":\"보건위생과\",\"support\":[\"건강정책과\"],\"collab\":[\"구․군\",\"소방재난본부\"],\"propagateTo\":[\"구·군 보건소\",\"의료기관\"],\"propagateMsg\":\"\",\"resources\":[\"현장응급의료소\",\"헬기\",\"의료장비\"],\"damageMeasures\":[\"사상자 현황 파악·이송\"],\"nd\":false,\"page\":188},{\"code\":\"BSN-FL-075\",\"manualCode\":\"41-1\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(필요시) 통제활동\",\"content\":\"교통통제\",\"details\":[\"교통통제 권한: 시장·군수·구청장, 통제단장(위임 시 소방 지휘대장)\",\"풍수해 발생지역 주변 교통통제(경찰서 협조)\",\"침수우려 취약도로 통제: 수위정보 제공(지자체·도로관리청)→교통통제(도로관리청·경찰)→통제 홍보(TV·VMS·SNS·SMS)\",\"통행주의보(순찰차 대기·통제 준비)/통행경보(차단시설 전면통제·우회) - 도로법 제58조, 도로교통법 제6조\",\"하천수위 상승·하수역류로 침수(우려) 도로·하상도로·지하차도 통제 요청\",\"제3통제선(현장주변) 교통외근요원 배치, 긴급차량 통로 확보\",\"통제상황 실시간 전파(교통방송, 교통정보 전광판, 입간판)\"],\"lead\":\"자연재난과\",\"support\":[\"부산경찰청\"],\"collab\":[\"부산경찰청\",\"도로관리청\"],\"propagateTo\":[\"운전자·시민(교통방송·VMS·SNS·SMS·입간판)\",\"경찰서\"],\"propagateMsg\":\"\",\"resources\":[\"차단기\",\"재난안전선\",\"입간판\",\"VMS\"],\"damageMeasures\":[\"침수도로 교통통제\",\"현장주변 교통통제·우회\"],\"nd\":true,\"page\":189},{\"code\":\"BSN-FL-076\",\"manualCode\":\"41-2\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"재난현장교통소통확보\",\"content\":\"교통통제, 교통소통확보\",\"details\":[\"징후감시 활동 강화(기상정보·특보 수집, 피해지역 파악, 치안유지)\",\"치안상황실 중심 보고체계, 도로관리청 등 연락체제 유지\",\"인명피해 우려지역 순찰차 순찰\",\"하상도로·지하차도·해안도로·파손도로 등 긴급 교통통제(도로교통법 제6조)\",\"우회도로 지정·협의\",\"교통두절지역 파악·시 재대본 수시 보고\",\"주민대피명령 시 인력·장비 지원\",\"신호기 고장 시 교통경찰·안전도우미 배치\",\"사망자 인적사항 파악 후 재대본 보고\",\"긴급 시 교통통제 우선 실시 후 도로관리청(도로안전과·구·군) 통보\"],\"lead\":\"부산경찰청\",\"support\":[],\"collab\":[\"도로관리소관부서(도로관리청)\"],\"propagateTo\":[\"시 재대본\",\"도로관리청\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[\"긴급 교통통제\",\"우회도로 지정\",\"주민대피 지원\"],\"nd\":false,\"page\":191},{\"code\":\"BSN-FL-077\",\"manualCode\":\"44-2\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"구조․구급․수색활동전개\",\"content\":\"인명구조, 응급조치, 후송, 실종자수색등\",\"details\":[\"침수·전도 등 피해신고 긴급출동·안전확보 응급조치\",\"119종합상황실 접수 피해신고내역 8시간 단위 재대본 보고(요청시 수시)\",\"실종자 수색·인명구조·응급조치·부상자 후송(경찰·해경과 업무분담)\",\"긴급구조현장지휘소 설치·운영 및 통신 지원\",\"인력·장비 부족 시 타시도 헬기·구조대 응원 요청\",\"사망자·중상자 수용 병원 우선 확보\"],\"lead\":\"소방재난본부\",\"support\":[],\"collab\":[\"구․군\",\"경찰\",\"해양경찰\"],\"propagateTo\":[\"재대본(8시간 단위 보고)\"],\"propagateMsg\":\"\",\"resources\":[\"헬기\",\"구조대\",\"현장지휘소\"],\"damageMeasures\":[\"인명구조·수색\",\"부상자 후송\"],\"nd\":false,\"page\":192},{\"code\":\"BSN-FL-078\",\"manualCode\":\"24-5\",\"manualStage\":\"3단계 비상대응\",\"stage\":\"경계\",\"phase\":\"대응\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"도시철도안전확보\",\"content\":\"지하역사우수유입차단등응급조치\",\"details\":[\"교통공사 자체 대응매뉴얼에 따른 비상근무 강화\",\"지하역사 입구 차수판 설치, 양수기·배수펌프 가동 배수\",\"도시철도 건설공사장 배수로 확보·강풍 피해예방 조치\"],\"lead\":\"대중교통과\",\"support\":[],\"collab\":[],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"차수판\",\"양수기\",\"배수펌프\"],\"damageMeasures\":[\"지하역사 빗물 유입 차단\",\"도시철도 공사장 안전조치\"],\"nd\":false,\"page\":193},{\"code\":\"BSN-FL-079\",\"manualCode\":\"9-1\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"기상특보해제접수\",\"content\":\"기상특보해제상황접수\",\"details\":[\"기상특보 해제 접수(NDMS 중대본→시 상황실→구·군 상황실·시 재난대응담당자, 방재기상정보시스템, 기상청 유선통보)\",\"UMS로 기상특보 해제 전파(전송그룹 선택→발송→실패·대기 확인)\"],\"lead\":\"재난안전상황실\",\"support\":[\"자연재난과\"],\"collab\":[],\"propagateTo\":[\"구·군 상황실\",\"재난공무원(UMS)\"],\"propagateMsg\":\"\",\"resources\":[\"NDMS\",\"UMS\"],\"damageMeasures\":[],\"nd\":true,\"page\":195},{\"code\":\"BSN-FL-080\",\"manualCode\":\"9-2\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"재해취약지사후점검, 피해현황파악지시\",\"content\":\"2차피해방지점검, 피해확인순찰실시등\",\"details\":[\"재해취약지 사후점검 지시: 붕괴우려지역(산사태·급경사지) 순찰, 응급복구(원칙 구·군 자체점검, 필요시 현장 행정지원 책임관 지원)\",\"관내 피해상황 파악 지시(구·군·부서별 피해·응급복구 현황)\",\"피해사항 재대본 보고(구·군 부서·읍면동→구·군 재난부서→재대본 / 시 본청·사업소→재대본, 공통 1-6-①)\",\"피해접수 현황 취합(구·군·소방재난본부→재대본)\",\"소관부서 조치사항 이행 공문: 피해지역 방역(자율방역단), 임시적환장 설치·운영, 배수펌프장 배수구 재해쓰레기 우선 제거, 이재민 구호, 사상자·병원 후송현황 파악\",\"119 토목구조대(대한토목학회, 24시간 051-512-0119) 기술자문 활용\"],\"lead\":\"자연재난과\",\"support\":[\"전부서\"],\"collab\":[\"구․군\"],\"propagateTo\":[\"구·군\",\"전부서\"],\"propagateMsg\":\"붙임 9-2-① 호우경보 해제에 대비한 사후조치 철저(지반 연약, 예찰·추가피해 보고, 침수지 방역)\",\"resources\":[\"자율방역단\",\"임시적환장\",\"119 토목구조대\"],\"damageMeasures\":[\"2차 피해 방지 순찰·응급복구\",\"침수지 방역\",\"재해쓰레기 제거\",\"이재민 구호\",\"사상자 현황 파악\"],\"nd\":true,\"page\":196},{\"code\":\"BSN-FL-081\",\"manualCode\":\"9-3\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"구․군피해현황취합․보고\",\"content\":\"구․군피해현황주기적취합․보고\",\"details\":[\"구·군 재대본·소방재난본부 피해 접수현황 주기적 보고(엑셀, 공통 1-6-①)\",\"재난상황관리반 자료 취합·정리\",\"주요 피해상황 1장 보고서 작성·보고(자연재난과장→시장)\"],\"lead\":\"자연재난과\",\"support\":[\"전부서\"],\"collab\":[\"구․군\"],\"propagateTo\":[\"시장\"],\"propagateMsg\":\"붙임 9-3-① 호우 대처상황 보고: 기상현황, 강수현황, 피해상황, 통제상황, 대처상황(재대본 가동·회의·재난문자·홍보), 향후계획\",\"resources\":[],\"damageMeasures\":[],\"nd\":true,\"page\":199},{\"code\":\"BSN-FL-082\",\"manualCode\":\"9-4\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"전직원비상근무해제\",\"content\":\"비상근무해제SMS 통보, 행정포털게시\",\"details\":[\"비상근무 해제 방침: 시장 보고 후 시민안전실장 전결(시장 1장 피해현황 보고 시 포함)\",\"해당 비상근무조 SMS 해제 통보(재난문자시스템)\",\"행정포털 게시(특보 해제, 비상근무 종료, 응소부 처리)\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[\"비상근무조(SMS)\",\"행정포털\"],\"propagateMsg\":\"\",\"resources\":[\"재난문자시스템\",\"행정포털\"],\"damageMeasures\":[],\"nd\":true,\"page\":201},{\"code\":\"BSN-FL-083\",\"manualCode\":\"9-5\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"피해상황점검회의\",\"content\":\"피해상황점검회의개최\",\"details\":[\"중대 피해 시 기상특보 해제 후 3시간 이내 개최, 시장(행정부시장) 주재\",\"참석: 실·국·본부장, 자연재난과장, 유관기관, 부단체장(구·군 영상회의)\",\"내용: 주요 피해내역·응급조치 현황 공유, 부서·구·군별 피해확인 당부, 조치사항·향후계획(현장방문계획)\",\"회의 체크리스트 확인(준비항목·역할분담, 공통 1-1-①)\",\"회의 개최 보고(1장 보고서, 긴급시 구두보고)\",\"회의 개최 통보(공문, 긴급시 SMS-참석자 개인, NDMS-구·군)\",\"회의자료 작성(말씀자료, 주요 재해취약시설 체크사항, 진행순서·사회자 시나리오, 좌석배치도·참석자 현황)\",\"참석대상자 참석 확인(개별 유선, 30분전·10분전)\",\"재대본 회의실 세팅(회의 PPT·영상회의·기상영상 3단 분할, 영상회의시스템 구동·구·군 접속 확인, 명패·물 세팅)\",\"회의 결과 통보(회의 직후)\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[\"실·국·본부장\",\"구·군 부단체장\",\"유관기관\"],\"propagateMsg\":\"\",\"resources\":[\"재대본 회의실\",\"영상회의시스템\"],\"damageMeasures\":[],\"nd\":true,\"page\":202},{\"code\":\"BSN-FL-084\",\"manualCode\":\"9-6\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"피해복구대책회의\",\"content\":\"피해복구대책회의개최\",\"details\":[\"중대 피해 시 기상특보 해제 후 6시간 이내 개최, 시장(행정부시장) 주재\",\"참석: 실·국·본부장, 자연재난과장, 유관기관, 부단체장(구·군 영상회의)\",\"내용: 주요 피해·응급조치 공유, 담화문 발표, 특별재난지역 선포 건의, 부서별 피해복구 사무 조정\",\"회의 체크리스트 확인(준비항목·역할분담, 공통 1-1-①)\",\"회의 개최 보고(1장 보고서, 긴급시 구두보고)\",\"회의 개최 통보(공문, 긴급시 SMS-참석자 개인, NDMS-구·군)\",\"회의자료 작성(말씀자료, 주요 재해취약시설 체크사항, 진행순서·사회자 시나리오, 좌석배치도·참석자 현황)\",\"참석대상자 참석 확인(개별 유선, 30분전·10분전)\",\"재대본 회의실 세팅(회의 PPT·영상회의·기상영상 3단 분할, 영상회의시스템 구동·구·군 접속 확인, 명패·물 세팅)\",\"회의 결과 통보(회의 직후)\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[\"실·국·본부장\",\"구·군\",\"유관기관\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[\"피해조사 및 NDMS 입력(공공시설 7일, 사유시설 10일 이내)\",\"중앙합동피해조사\",\"국비지원·특별재난구역 선포 결정\"],\"nd\":true,\"page\":207},{\"code\":\"BSN-FL-085\",\"manualCode\":\"9-7\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"피해복구구․군영상회의\",\"content\":\"구․군영상회의개최준비\",\"details\":[\"구·군 재난담당과장 영상회의(주재 행정부시장·시민안전실장): 복구일정·피해조사 요령 교육, 애로사항 청취\",\"영상회의 개최 보고(1장 보고서, 공통 1-3-①)\",\"영상회의 개최 통보(원칙 공문, 예외 NDMS·메신저·SMS) 및 보고서식 송부\",\"구·군 보고자료 취합(구·군별 사전조치 및 대처계획, 공통 1-3-②)\",\"회의자료 작성(인사·마무리말씀 공통 1-3-③, 진행순서·시나리오 공통 1-3-④)\",\"영상회의 접속 확인(30분전·10분전)\",\"기상상황에 따른 보고 대상 구·군 선정\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[\"구․군\"],\"propagateTo\":[\"구·군 부단체장·재난담당과장\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"nd\":true,\"page\":213},{\"code\":\"BSN-FL-086\",\"manualCode\":\"14-1\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"피해현장․복구현장방문\",\"content\":\"시장․부시장등피해현장․복구현장방문\",\"details\":[\"구·군 피해 접수현황 중 주요 피해지역 추출, 방문계획 수립·보고(1장 보고서)\",\"해당 구·군·기관 방문계획 통보, 비서실 의전 협조\",\"현장방문 언론보도자료 제공\",\"VIP·총리·장관·국회 방문: 방문일정 접수, 보고, 의전·차량·오찬 준비, 피해현황 PPT(기획담당관 협조), 시장 건의자료(특별재난구역 선포 지원 등)\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[\"구․군\"],\"propagateTo\":[\"구·군\",\"비서실\",\"언론\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"nd\":true,\"page\":214},{\"code\":\"BSN-FL-087\",\"manualCode\":\"14-2\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"복구단계유관기관협력체계가동지원\",\"content\":\"피해복구인력․장비지원, 시설응급복구협조\",\"details\":[\"복구 유관기관 협력: 부산경찰청(경찰관기동대 인력), 53사단(인력·장비), 부산교통공사(증편·연장운행), 한전(전력), 가스안전공사(가스), KT(통신), 적십자(재난구호봉사단), 부산시설공단(도로포장·수송장비)\",\"응급복구 인력·장비 수요파악(시→구·군) 및 동원가능 자원 파악(시→사업소·유관기관)\",\"인력·장비 수요-공급 연계 종합지원계획 수립·통보\",\"인력·장비 투입현황 수시 파악·보고\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[\"부산경찰청\",\"육군 제53사단\",\"부산교통공사\",\"한국전력공사\",\"한국가스안전공사\",\"KT 부산본부\",\"대한적십자사\",\"부산시설공단\"],\"propagateTo\":[\"구·군\",\"사업소\",\"유관기관\"],\"propagateMsg\":\"\",\"resources\":[\"군 병력·장비\",\"경찰관기동대\",\"덤프트럭·굴삭기·청소차\"],\"damageMeasures\":[],\"nd\":true,\"page\":216},{\"code\":\"BSN-FL-088\",\"manualCode\":\"14-3\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"구․군응급복구비지원\",\"content\":\"구․군응급복구비용지원\",\"details\":[\"행정안전부 응급복구 특별교부세·재난관리기금 지원에 따른 복구비 교부\",\"응급복구비 지원계획 행정안전부 통보, 시 자체 지원계획 수립\",\"구·군 응급복구비 수요조사(구·군→시)\",\"구·군별 특별교부세·재난관리기금 배분계획 수립\",\"시비 보조금 교부 통보\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"특별교부세\",\"재난관리기금\",\"예비비\"],\"damageMeasures\":[\"구·군 응급복구비 지원\"],\"nd\":true,\"page\":218},{\"code\":\"BSN-FL-089\",\"manualCode\":\"14-4\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"피해복구일일상황보고\",\"content\":\"피해복구현황일일상황보고\",\"details\":[\"복구현황 일일상황보고서 보고(시장·부시장)\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[\"시장\",\"부시장\"],\"propagateMsg\":\"붙임 14-4-① 피해복구 현황 일일상황보고: 피해 접수현황(구·군별), 인명피해, 재산피해(공공·사유), 인력·장비 동원현황, 주요 조치사항\",\"resources\":[],\"damageMeasures\":[],\"nd\":true,\"page\":219},{\"code\":\"BSN-FL-090\",\"manualCode\":\"14-5\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"당정긴급재난대책회의\",\"content\":\"당정긴급재난대책회의개최\",\"details\":[\"당정 대책회의 일정 접수(정당 시당→기획담당관→자연재난과)\",\"회의계획 시장 보고(1장)\",\"피해현황·복구계획 중심 자료 작성(기획담당관 경유)\",\"의원별 지적·요청사항 중심 결과보고\",\"부서별 소관사항 세부실행계획 수립·시행 통보\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"nd\":true,\"page\":221},{\"code\":\"BSN-FL-091\",\"manualCode\":\"14-6\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"담화문발표\",\"content\":\"시장명의담화문발표\",\"details\":[\"피해주민 위로·복구인력 격려 담화문 발표 건의(1장)\",\"담화문 문안 작성·시장 보고\",\"담화문 언론 보도자료 제공\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[\"시민\",\"언론\"],\"propagateMsg\":\"붙임 14-6-① 시장 담화문 예시(피해 위로, 특별재난지역 선포 노력, 라이프라인 우선 복구, 인력·장비 집중투입, 근본대책)\",\"resources\":[],\"damageMeasures\":[],\"nd\":true,\"page\":222},{\"code\":\"BSN-FL-092\",\"manualCode\":\"14-7\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"언론인터뷰, 대담참가\",\"content\":\"TV, 라디오방송인터뷰, 대담참석준비\",\"details\":[\"TV·라디오 피해복구 인터뷰 요청 접수\",\"대상자·일정 협의(시장·부시장은 1장 보고, 비서실 통보)\",\"사전 질문 답변자료 작성·제출\",\"(대담 시) 비서실 의전 요청\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"nd\":true,\"page\":225},{\"code\":\"BSN-FL-093\",\"manualCode\":\"14-8\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"재난안전대책본부해산\",\"content\":\"재대본임무종료에따른재대본해산\",\"details\":[\"구·군·부서별 피해 취합 완료 후 시장 보고(1장, 재대본 해산 포함)\",\"시장 보고 후 결재(전결권자 시민안전실장)\",\"재대본 실무반 SMS 비상근무 해제 통보, 응소부 서명 확인\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[\"재대본 실무반(SMS)\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"nd\":true,\"page\":226},{\"code\":\"BSN-FL-094\",\"manualCode\":\"14-9\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"피해조사지원재대본가동\",\"content\":\"피해조사지원위한재대본재가동\",\"details\":[\"비상근무 범위 건의(자연재난과→재대본, 시민안전실장 결재)\",\"해당 부서 공문·비상근무조 SMS 통보\",\"행정포털 비상근무 실시 게시\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[\"해당 부서\",\"비상근무조\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"nd\":true,\"page\":227},{\"code\":\"BSN-FL-095\",\"manualCode\":\"14-10\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"신속한피해신고처리지시및지원\",\"content\":\"기한내피해신고, NDMS 입력처리요청\",\"details\":[\"사유시설 피해: 신고 접수(피해자→구·군) 및 NDMS 입력 10일 이내 → 현장조사·확인 → 피해확정 → 복구계획 확정 → 지급조건 조회 → 재난지원금 지급 → 지급실태 점검(5개월 내)\",\"공공시설 피해: 신고 접수 및 NDMS 입력 7일 이내 → 현장확인·피해확정 → 복구계획 확정\",\"피해조사 인력지원: 우심피해 구·군 지원, 실·국·본부별 동원인원 통보\",\"피해주민 간접지원(납세 감면, 상하수도·전기요금 감면, 농기계 수리, 융자) 원스톱 지원 실적 제출(구·군→시→행정안전부)\",\"재난심리회복 대상자 발굴(구·군→시)·통보(시→대한적십자사 부산광역시지사), 재난심리회복지원센터 상담\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[\"구·군\",\"대한적십자사\",\"재난심리회복지원센터\"],\"propagateTo\":[\"구·군\",\"대한적십자사 부산광역시지사\"],\"propagateMsg\":\"\",\"resources\":[\"NDMS\",\"재난지원금\"],\"damageMeasures\":[\"사유시설 재난지원금 지급\",\"공공시설 피해 복구계획\",\"간접지원(감면·융자)\",\"재난심리회복 지원\"],\"nd\":true,\"page\":228},{\"code\":\"BSN-FL-096\",\"manualCode\":\"14-11\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"피해조사단운영\",\"content\":\"피해조사단현장조사및NDMS 입력\",\"details\":[\"재난피해조사단 운영계획 수립(구성·추진일정) 및 조사계획 통보(시→구·군)\",\"피해조사단 구·군 피해현장 확인\",\"피해조사 결과 제출(조사단→자연재난과)\",\"NDMS 입력내역과 피해조사 결과 대조·확인\",\"피해조사단 교육·NDMS 입력 순회교육, 인력 보강\"],\"lead\":\"자연재난과\",\"support\":[\"피해조사단소속부서\"],\"collab\":[],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"피해조사단(60명)\",\"NDMS\"],\"damageMeasures\":[],\"nd\":true,\"page\":229},{\"code\":\"BSN-FL-097\",\"manualCode\":\"14-12\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"중앙재난피해조사단현장조사지원\",\"content\":\"중앙재난피해조사단활동지원\",\"details\":[\"중앙합동조사 실시계획 접수(행정안전부→시) 및 통보(시→구·군)\",\"지원계획 수립·통보\",\"교육장소 제공(피해조사·복구계획 수립 방법)\",\"현장조사 안내요원 구성·지원\",\"조사공간·청사 출입·무료주차·컴퓨터·프린터 지원\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[\"행정안전부(중앙재난피해합동조사단)\",\"구·군\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"nd\":true,\"page\":230},{\"code\":\"BSN-FL-098\",\"manualCode\":\"14-13\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"특별재난지역선포건의\",\"content\":\"특별재난지역선포대정부건의\",\"details\":[\"피해액 기준금액 초과 시 구·군→시 자연재난과 건의 요청\",\"구·군 요청 취합 후 시장 결재\",\"시→행정안전부 건의\",\"시장 행정안전부 방문, 부산지역 국회의원 활용\",\"절차: 지역재대본부장(시장)→중앙안전관리위원회(국무총리)→대통령(선포·공고)\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[\"구․군\"],\"propagateTo\":[\"행정안전부\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"nd\":true,\"page\":231},{\"code\":\"BSN-FL-099\",\"manualCode\":\"14-14\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"복구계획수립․시행\",\"content\":\"항구복구계획수립․시행,\",\"details\":[\"중앙피해조사단 확인 거친 확정 피해내역 NDMS 입력\",\"복구계획 확정 통보 접수(행정안전부→자연재난과)\",\"시 복구계획 시장 방침 결정\",\"시 복구계획 통보(자연재난과→피해시설 소관부서·구·군)\",\"복구재원 예비비 확보 요청\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[\"피해시설 소관부서\",\"구·군\"],\"propagateMsg\":\"\",\"resources\":[\"예비비\"],\"damageMeasures\":[\"항구복구계획 수립·시행\"],\"nd\":true,\"page\":232},{\"code\":\"BSN-FL-100\",\"manualCode\":\"14-15\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"대처상황결과보고\",\"content\":\"기상특보대처과정피드백보고\",\"details\":[\"기상특보 대처과정 문제점 발견·개선방안 결과보고서 작성(기상특보 상황, 주요 대처사항, 주요 피해내역, 문제점 및 대책, 비상근무자 대체휴무)\",\"재대본 근무자·전직원 비상근무자 대체휴무 통보\",\"문제점 관련 부서 통보(개선 요청)\"],\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[],\"propagateMsg\":\"붙임 14-15-① 태풍 대처상황 결과보고 예시(상황관리·인명시설물자동원·상황전파(홍보) 분야 등)\",\"resources\":[],\"damageMeasures\":[],\"nd\":true,\"page\":233},{\"code\":\"BSN-FL-101\",\"manualCode\":\"13-1\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"합동분향소운영․관리\",\"content\":\"합동분향소설치․운영․관리\",\"details\":[\"합동분향소 설치계획 수립(장소, 운영기간, 안내요원 동원근무)\",\"운영계획 통보(지원근무 알림)\",\"분향소 제작·설치(계약·회계)\",\"운영물품(생화·생수·영정액자) 구입, 안내요원 급식 지원\"],\"lead\":\"총무과\",\"support\":[],\"collab\":[],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"합동분향소 물품\"],\"damageMeasures\":[],\"nd\":false,\"page\":238},{\"code\":\"BSN-FL-102\",\"manualCode\":\"12-1\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"이재민구호\",\"content\":\"이재민수용, 급식지원, 구호물자지원등\",\"details\":[\"일시대피자·이재민 발생 상황 파악·보고(구·군 재대본→시 재대본)\",\"임시주거시설 지정(규모·접근성·수용인원), 전기·가스·통신 설치, 의료지원반 의료서비스, 방역·소독, 수용현황 보고\",\"대한적십자사에 급식·세탁·급수 지원 요청\",\"(필요시) 심리상담사 배치, 심리지원 대상 통보(구·군→시→적십자), 재난심리지원센터 상담\",\"재해구호물자 반출·지급(자율방재단), 인접 시·도 행정응원, 사전구매선 구입\",\"재해구호기금 지원(구호물자·응급구호비, 협력자 보상금)\",\"의연금품 모집 허가 및 지급(구·군 대상자 확정→시 취합→재해구호협회 개인 계좌입금)\",\"연고 없는 사망자 장례 시행(노인복지과), 장례비는 재난지원금\"],\"lead\":\"복지정책과\",\"support\":[],\"collab\":[\"대한적십자사\",\"교육청\"],\"propagateTo\":[\"대한적십자사\",\"전국재해구호협회\"],\"propagateMsg\":\"\",\"resources\":[\"임시주거시설\",\"재해구호물자\",\"재해구호기금\",\"의연금\"],\"damageMeasures\":[\"이재민 수용·급식·세탁·의료·심리지원\",\"사망자 장례 지원\"],\"nd\":false,\"page\":239},{\"code\":\"BSN-FL-103\",\"manualCode\":\"15-2\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"통신시설복구추진\",\"content\":\"피해파악, 응급복구, 피해지역통신지원등\",\"details\":[\"통신시설 피해 접수현황 파악, 긴급수리 요청(시→통신사)\",\"피해지역 통화 불통 대시민 홍보(TV·라디오·인터넷)\",\"이재민 임시주거시설 무료전화 설치 지원 요청\",\"통화 불능 시 공중전화 설치·임시전화 접수처 운영 요청\",\"기지국 피해 시 이동형 기지국 지원 요청\"],\"lead\":\"인공지능소프트웨어과\",\"support\":[],\"collab\":[\"KT\",\"이동통신3사\"],\"propagateTo\":[\"시민(TV·라디오·인터넷)\",\"통신사\"],\"propagateMsg\":\"\",\"resources\":[\"이동형 기지국\",\"임시·공중전화\"],\"damageMeasures\":[\"통신시설 응급복구\",\"피해지역 임시통신 지원\"],\"nd\":false,\"page\":240},{\"code\":\"BSN-FL-104\",\"manualCode\":\"18-1\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"전기․가스시설복구추진\",\"content\":\"피해파악, 응급복구, 피해지역긴급지원등\",\"details\":[\"한전·가스안전공사·도시가스 응급복구 인력·자재·장비 지원 요청 시 지원\",\"이재민 임시주거시설 전기·가스 가공급시설 설치 요청\",\"전기·가스 공급중단 지역 현황 파악 후 TV자막·라디오 전파\"],\"lead\":\"미래에너지산업과\",\"support\":[],\"collab\":[\"한국전력\",\"한국가스안전공사\",\"부산도시가스\"],\"propagateTo\":[\"시민(TV자막·라디오)\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[\"전기·가스시설 응급복구\",\"임시주거시설 에너지 공급\"],\"nd\":false,\"page\":241},{\"code\":\"BSN-FL-105\",\"manualCode\":\"24-2\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"(교통혁신과) 소관시설물피해복구\",\"content\":\"교통신호기응급복구, 교통소통대책시행등\",\"details\":[\"교통신호시설 피해파악·응급복구, 경찰 협조 교통소통대책\",\"경찰·교통봉사대 인력 교통관리 지원 요청\",\"비상수송대책 시행·홍보(증편·연장운행, 대체교통수단)\"],\"lead\":\"교통혁신과\",\"support\":[\"대중교통과\",\"교통정보서비스센터\"],\"collab\":[\"(버스․택시)조합\",\"부산교통공사등\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[\"교통신호시설 복구\",\"비상수송대책\"],\"nd\":false,\"page\":242},{\"code\":\"BSN-FL-106\",\"manualCode\":\"27-2\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"현장응급의료체계가동\",\"content\":\"현장응급의료소설치, 사상자파악등\",\"details\":[\"신속대응반(보건소) 출동 지시\",\"현장응급의료소 인력(군의관·공중보건의)·의료장비 지원 요청, 방역물자 부족 시 인접 시·도 응원\",\"사상자·입원병원·영안실 현황 파악·보고\",\"병원 수용능력 확인 후 부상자 분산 이송, 헬기 요청\",\"시신 운구(소방재난본부 협조)\",\"침수지역 (자율)방역반 가동 지시\",\"감염병 방지 대시민 홍보(손씻기 등)\",\"희귀혈액 긴급 확보 TV자막·라디오·인터넷·SNS 홍보\"],\"lead\":\"보건위생과\",\"support\":[\"건강정책과\"],\"collab\":[\"구․군\",\"소방재난본부\"],\"propagateTo\":[\"시민(TV·라디오·SNS)\",\"구·군 보건소\"],\"propagateMsg\":\"\",\"resources\":[\"현장응급의료소\",\"방역물자\",\"헬기\"],\"damageMeasures\":[\"침수지역 방역\",\"사상자 이송·관리\"],\"nd\":false,\"page\":243},{\"code\":\"BSN-FL-107\",\"manualCode\":\"34-1\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"재난쓰레기처리\",\"content\":\"임시적환장운영지시, 인력․장비지원등\",\"details\":[\"토사유출 지역 환경미화원 동원 청소\",\"재해쓰레기 예상규모 고려 임시적환장 동별 설치 지시\",\"재해쓰레기 발생현황 취합·보고\",\"처리 인력(공무원·군부대·경찰·자원봉사자)·장비(집게차·덤프트럭) 지원 요청\",\"매립장 무상반입 협조\",\"무단투기 감시단 운영\"],\"lead\":\"자원순환과\",\"support\":[],\"collab\":[\"구․군\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"집게차\",\"덤프트럭\",\"임시적환장\"],\"damageMeasures\":[\"재해쓰레기 수거·처리\",\"지상오염지역 청소\"],\"nd\":false,\"page\":244},{\"code\":\"BSN-FL-108\",\"manualCode\":\"38-1\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"자원봉사자운영․관리\",\"content\":\"자원봉사자모집․운영․관리\",\"details\":[\"부산광역시 자원봉사센터 예산·인력·장비 지원\",\"자원봉사자 모집(TV자막·자원봉사포털·SNS·오프라인), 분류·교육·배치\",\"1365 포털로 수요기관-봉사자 매칭\",\"투입현황 파악·보고\",\"봉사자 보험가입·급식 지원\",\"대규모 투입 시 현장안내소 설치·운영\"],\"lead\":\"자치행정과\",\"support\":[],\"collab\":[\"구․군\",\"자원봉사센터\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"1365 자원봉사포털\",\"자원봉사센터\"],\"damageMeasures\":[],\"nd\":false,\"page\":245},{\"code\":\"BSN-FL-109\",\"manualCode\":\"42-1\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"재난피해지역질서유지\",\"content\":\"인명피해파악, 질서유지, 인력지원등\",\"details\":[\"경찰관서 접수 인명피해 현황 재대본 보고, 사망자 신원 파악 협조\",\"재난피해지역 범죄예방 순찰 강화\",\"사상자 수용병원 경찰병력 배치, 의무경찰 등 복구 인력지원\"],\"lead\":\"부산경찰청\",\"support\":[],\"collab\":[\"해양경찰청\",\"소방재난본부\"],\"propagateTo\":[\"재대본\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"nd\":false,\"page\":246},{\"code\":\"BSN-FL-110\",\"manualCode\":\"47-1\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"대시민홍보및보도지원\",\"content\":\"언론보도모니터링, 보도지원\",\"details\":[\"인명피해 현황·안치병원·입원병원 TV·SNS 전파(뉴미디어담당관)\",\"교통통제·우회도로 현황 홍보\",\"유언비어 매체 확인, 해명자료 작성(소관부서→공보담당관)\",\"36개 언론사 보도 모니터링(오보·과장보도), 해명·설명자료\",\"브리핑·기자간담회 개최 지원\",\"현장 프레스센터 설치, 구·군 협조 재난현장 취재 지원\",\"복구계획·현장방문·미담사례 보도자료 제공(소관부서→공보담당관→언론사)\"],\"lead\":\"공보담당관\",\"support\":[],\"collab\":[],\"propagateTo\":[\"시민(TV·SNS)\",\"언론사\"],\"propagateMsg\":\"\",\"resources\":[\"프레스센터\"],\"damageMeasures\":[],\"nd\":false,\"page\":247},{\"code\":\"BSN-FL-111\",\"manualCode\":\"21-1\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"군병력및장비지원\",\"content\":\"복구지원위한군병력및장비지원\",\"details\":[\"병력·장비 지원 요청(구·군→시→사단): 응급복구, 재해쓰레기·토사 제거, 가재도구 정리\",\"사단은 시급성 등 우선순위 고려하여 지원 결정 후 통보\"],\"lead\":\"육군제53사단\",\"support\":[\"자연재난과\"],\"collab\":[],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"군 병력\",\"군 장비(버스·트럭·구급차)\"],\"damageMeasures\":[\"응급복구\",\"토사·재해쓰레기 제거\"],\"nd\":true,\"page\":248},{\"code\":\"BSN-FL-112\",\"manualCode\":\"24-3\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"도시철도비상교통대책시행\",\"content\":\"도시철도증편운행, 시장연장등실시\",\"details\":[\"역사 침수 시 경찰 협조 출입통제, 양수기·배수펌프 총동원 배수\",\"도시철도 운행중단 TV자막·SNS·라디오 전파\",\"시내버스 증편·연장, 임시정류장, 전세버스 투입 등 비상수송대책 요청(교통공사→시)\",\"시내버스 운행 곤란 시 도시철도 증편·연장운행(시→교통공사)\"],\"lead\":\"부산교통공사\",\"support\":[\"대중교통과\"],\"collab\":[\"시내버스․마을버스조합\"],\"propagateTo\":[\"시민(TV자막·SNS·라디오)\"],\"propagateMsg\":\"\",\"resources\":[\"양수기\",\"배수펌프\",\"전세버스\"],\"damageMeasures\":[\"침수역사 응급조치\",\"비상수송대책\"],\"nd\":false,\"page\":249},{\"code\":\"BSN-FL-113\",\"manualCode\":\"11-4\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"재해복구인력지원\",\"content\":\"무료봉사단통한급식, 세탁등지원\",\"details\":[\"이재민 구호물품(생필품) 전달\",\"이재민 무료급식·세탁 지원\",\"피해복구현장 적십자 무료봉사단 인력 지원\"],\"lead\":\"대한적십자사(부산지사)\",\"support\":[\"복지정책과\"],\"collab\":[],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[\"이재민 구호\",\"복구인력 지원\"],\"nd\":false,\"page\":250},{\"code\":\"BSN-FL-114\",\"manualCode\":\"15-3\",\"manualStage\":\"4단계 수습·복구\",\"stage\":\"심각\",\"phase\":\"복구\",\"hazard\":[\"호우\",\"태풍\"],\"title\":\"통신시설복구\",\"content\":\"통신시설응급복구, 통신장애지원등\",\"details\":[\"기지국 등 통신시설 응급복구\",\"이재민 임시주거시설 무료전화 가설\",\"통신두절지역 이동형 기지국 투입\",\"통신피해 복구현황 재대본 수시 보고\"],\"lead\":\"KT부산본부\",\"support\":[\"인공지능소프트웨어과\"],\"collab\":[],\"propagateTo\":[\"재대본\"],\"propagateMsg\":\"\",\"resources\":[\"이동형 기지국\"],\"damageMeasures\":[\"통신시설 응급복구\"],\"nd\":false,\"page\":251}]}");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/busan-process.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = JSON.parse("{\"source\":\"부산시 풍수해 재난 현장조치 행동매뉴얼(26.7.6.) 재난대응 프로세스(p.34) + 행동카드\",\"stages\":[{\"step\":\"징후감지\",\"label\":\"1단계 징후감지\",\"alert\":[\"관심\",\"주의\"],\"missions\":[{\"code\":\"1\",\"name\":\"기상특보(태풍정보․호우예비특보․적설예보) 접수\",\"actions\":[{\"code\":\"1-1\",\"name\":\"기상정보 모니터링\",\"details\":[\"기상자문관, 방재기상정보시스템, 태풍연구센터 등 활용\",\"레이더 및 위성영상, 태풍경로 수시 확인\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"기상정보수시확인\",\"lead\":\"재난안전상황실\",\"support\":[\"자연재난과\"],\"collab\":[\"기상청(기상자문관)\"],\"propagateTo\":[\"자연재난과\",\"시·구·군 재난담당자\"],\"propagateMsg\":\"\",\"resources\":[\"방재기상정보시스템\",\"태풍연구센터\",\"NDMS\",\"SMS\",\"방재기상플랫폼\",\"기상자문관\"],\"damageMeasures\":[],\"page\":41}}]},{\"code\":\"2\",\"name\":\"기상특보(태풍정보․호우예비특보․적설예보) 보고․전파\",\"actions\":[{\"code\":\"2-1\",\"name\":\"기상특보 상황보고(시장, 부시장)\",\"details\":[\"기상특보 현황 중심 1장 보고서 작성·보고(자연재난과장→시장 / 자연재난팀장→행정부시장)\",\"기상특보 현황, 실·국·본부장 대책회의 개최 등 방침 결정\",\"기상특보 발표내용 휴대전화(SMS) 통보(재난안전상황실→시장·부시장)\",\"주말·공휴일·일과후 특보 시: 상황팀장이 회의 주재자에게 즉시 보고 → 주재자가 상황판단회의 개최 또는 즉시 비상단계 돌입 결정\",\"긴급 시: 자연재난과장(부재시 팀장)이 기상·피해(예상)·부서별 대처상황 보고, 주재자 지시로 상황판단회의 갈음(대면 또는 유선)\"],\"notes\":[\"SMS 별도통보\"],\"condition\":\"\",\"card\":{\"content\":\"기상특보시장․부시장보고\",\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\"],\"collab\":[],\"propagateTo\":[\"시장\",\"행정부시장\"],\"propagateMsg\":\"기상특보 현황 1장 보고서(붙임 2-1-①: 태풍현황 및 전망, 대처상황-비상근무·안전점검·취약계층·홍보, 향후계획)\",\"resources\":[\"SMS\",\"1장 보고서 양식(붙임 2-1-①)\"],\"damageMeasures\":[],\"page\":42}},{\"code\":\"2-2\",\"name\":\"기상특보 전파(시민, 유관기관)\",\"details\":[\"지역방송(One-Click), 홈페이지, SNS, UMS, 경보방송\",\"(교통․재해․시정홍보)전광판, 버스정보시스템(BIT)\",\"긴급통신수단(PS-LTE 또는 단톡방) 활용한 유관기관 기상특보 공유\",\"전자팩스 아파트 관리사무소 발송(내부방송)\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"기상특보다양한수단통한전파\",\"lead\":\"자연재난과\",\"support\":[\"홍보담당관\",\"공보담당관\",\"미디어담당관\"],\"collab\":[\"교통정보서비스센터\",\"부산시설공단\",\"부산교통공사\"],\"propagateTo\":[\"공무원·기자·시민(신청자)(UMS 문자)\",\"KBS·MBC·KNN 등 7개 방송사(One-Click 자막)\",\"시민(재해·홍보·교통 문자전광판, BIT, 재난경보방송, 전자팩스→아파트 내부방송, 홈페이지·SNS)\",\"경찰청·소방본부 등 15개 기관(긴급통신수단 공동주파수)\",\"부산교통공사·부산시설공단(홍보요청 공문)\"],\"propagateMsg\":\"○월 ○일 ○시 (태풍, 호우) (예비특보, 주의보, 경보)가 발효 됨에 따라, 시설물, 어선·선박 관리 등 안전사고가 없도록 주의 하시기 바랍니다. / (전광판·BIT·SNS) ○월 ○일 ○시 (태풍, 호우) (예비특보, 주의보, 경보) 발효! (호우, 태풍, 강풍, 풍랑)로 인한 피해가 없도록 주의 바람\",\"resources\":[\"UMS(재난문자발송시스템)\",\"One-Click 재난상황전파시스템\",\"재해·홍보·교통 문자전광판\",\"버스정보시스템(BIT)\",\"민방위경보시설·경고방송장치\",\"전자팩스\",\"홈페이지·SNS\",\"긴급통신수단(PS-LTE/공동주파수)\"],\"damageMeasures\":[],\"page\":44}}]},{\"code\":\"3\",\"name\":\"기상특보(태풍정보․호우예비특보․강풍주의보․적설예보) 대응\",\"actions\":[{\"code\":\"3-1\",\"name\":\"(초기)상황판단회의 개최\",\"details\":[\"(호우예비특보) 호우 지원부서(12) 팀장(자연재난과장)\",\"(강풍주의보) 강풍 지원부서(10) 팀장(자연재난과장)\",\"(적설예보) 대설 지원부서(4) 팀장(자연재난과장)\",\"(필요시)비상근무 사전예고(행정포털, SMS 통보)\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"상황판단회의개최준비․진행․정리\",\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\",\"기상특보별지원부서\"],\"collab\":[\"기상청(기상자문관)\",\"소방재난본부등\"],\"propagateTo\":[\"재난 유형별 지원부서 팀장\",\"경찰\",\"소방\",\"구·군\"],\"propagateMsg\":\"\",\"resources\":[\"재대본 회의실(15층)\",\"영상회의시스템\",\"공통 1-1 회의서식\"],\"damageMeasures\":[],\"page\":45}},{\"code\":\"3-2\",\"name\":\"기상특보에 따른 대응 지시\",\"details\":[\"구․군, 부서별, 유관기관별 조치사항 매뉴얼에 따른 이행\",\"주간(공문), 야간(NDMS, SMS, Fax)\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"구․군, 전부서, 유관기관전파, 대응지시\",\"lead\":\"재난안전상황실\",\"support\":[\"자연재난과\",\"전부서\"],\"collab\":[\"구․군\",\"유관기관\"],\"propagateTo\":[\"구·군\",\"전부서\",\"유관기관\"],\"propagateMsg\":\"붙임 3-2-① 공문 예시: 집중호우 대비 재해우려지역 등 안전관리 철저(상황관리·현장조치 중점사항)\",\"resources\":[\"방재기상정보시스템\",\"NDMS\",\"SMS\",\"Fax\",\"방재기상플랫폼\"],\"damageMeasures\":[\"산간·계곡·해안가·캠핑장·낚시터 등 위험지역 예찰·안전조치\",\"하천변 산책로·저지대·지하차도·둔치주차장 예찰 및 사전통제, 수방자재 전진배치\",\"산사태·급경사지 예찰, 출입통제, 필요시 대피명령\",\"상수도·우오수관로·맨홀 등 지하시설물 침수 인명사고 대비\",\"위험징후 발견 시 즉각 응급조치·주민 사전대피\",\"해안가·방파제·하천 재난안전선 설치 및 출입통제\",\"간판·옥외광고물 결박·고정\"],\"page\":46}},{\"code\":\"3-3,3-4\",\"name\":\"비상연락체계 확인\",\"details\":[\"유관기관, 방재시설물 담당자, 재대본 비상근무자 확인\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"유관기관, 방재시설담당자, 재대본근무자등\",\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\",\"재대본근무부서\"],\"collab\":[\"재난안전대책본부근무유관기관\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"비상연락망(관계부서·유관기관)\",\"팩스\"],\"damageMeasures\":[],\"page\":49}},{\"code\":\"3-5\",\"name\":\"비상근무(시민안전실) 실시\",\"details\":[\"상황관리(자연재난과 2, 재난상황실 3) 근무(SMS 응소명령)\",\"상황관리 및 상황보고(자료 취합․보고)\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"상황판단회의결과에따른재대본가동\",\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\"],\"collab\":[],\"propagateTo\":[\"재난상황관리반 근무자(SMS)\"],\"propagateMsg\":\"\",\"resources\":[\"SMS\",\"재대본 회의실\",\"응소부\",\"재난대응행동수칙 책자\"],\"damageMeasures\":[],\"page\":51}},{\"code\":\"3-6\",\"name\":\"관련기관 대비태세 확인\",\"details\":[\"구․군 재난담당과장 영상회의(자연재난과장)\",\"유관기관 지원체계 확인(공문, 팩스 발송)\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"구․군영상회의, 유관기관지원체계확인\",\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\"],\"collab\":[\"구․군\",\"유관기관\"],\"propagateTo\":[\"구·군 재난담당과장\",\"유관기관\"],\"propagateMsg\":\"붙임 3-6-① 호우예비특보 발효에 따른 유관기관 협조 요청 공문(유관기관 주요 임무: 육군53사단(응급복구 인력·장비), KT부산본부(통신 응급복구), 한국전력(전기), 한국가스안전공사(가스), 한국농어촌공사(저수지·양배수장), 부산교통공사(비상수송), 대한적십자사(피해신고 핫라인·복구인력), 교육청(휴교·등하교 안전), 부산지방기상청(기상정보), 부산경찰청(교통통제))\",\"resources\":[\"영상회의시스템\",\"공문·팩스\"],\"damageMeasures\":[],\"page\":52}},{\"code\":\"3-7\",\"name\":\"재해취약지 등 안전점검 지시\",\"details\":[\"재해취약지 구․군, 현장행정지원 책임관 중복점검\",\"재해취약지 점검결과 복명서 제출(지역담당팀장)\",\"방재시설물(펌프장,수문,유수지,예․경보시설등) 점검, 사전배수\",\"부서별 소관시설(산사태 우려지, 공사장, 대형간판 등) 점검\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"소관부서, 구․군, 행정지원책임관점검등\",\"lead\":\"자연재난과\",\"support\":[\"업무소관부서\",\"행정지원책임관지정부서\"],\"collab\":[\"구․군\"],\"propagateTo\":[\"구·군\",\"현장행정지원 책임관\",\"소관부서\",\"차량 소유자(위험알림 문자)\"],\"propagateMsg\":\"\",\"resources\":[\"재난안전선·안전펜스\",\"수방자재(양수기, 마대 등)\",\"CCTV\",\"예경보시설\"],\"damageMeasures\":[\"호우·태풍 피해 예상 시설물 예찰 및 사전통제\",\"침수·산사태·하천범람 위험징후 발견 시 사전대피(대피권고·대피명령)\",\"옥외광고물·공사장(타워크레인)·첨탑 등 낙하위험물 고정·제거·결박\",\"해안 저지대 침수방지, 방파제·해안도로 사전 접근통제\",\"선박·어선 대피 및 입출항 통제, 어망·어구·수산증양식시설 결박·고정\",\"만조 대비 해안가 저지대 재난안전선 설치·주민 사전대피\",\"지하공간 차단 조치 및 사전대피 권고(수방자재 전진배치)\",\"둔치주차장 차량 이동·견인(재난안전법 제40조·제42조)\"],\"page\":54}},{\"code\":\"3-8\",\"name\":\"재난자원 점검 지시\",\"details\":[\"수방․제설자재, 응급복구장비 가동 확인, 비축량․연료 파악\",\"재해구호물품, 의약품, 방역물자, 방제물자 등 확인\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"수방자재․응급복구장비점검, 비축량파악\",\"lead\":\"자연재난과\",\"support\":[\"복지정책과\",\"보건위생과\",\"건설안전사업소\"],\"collab\":[\"구․군\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"양수기\",\"배수펌프(수중펌프)\",\"비상발전기\",\"제설제\",\"모래주머니·포대·묶음줄·말목·덮개\",\"재해구호물품\",\"의약품·방역·방제물자\",\"포클레인·덤프트럭 등 응급복구장비\"],\"damageMeasures\":[],\"page\":59}},{\"code\":\"3-9\",\"name\":\"피해조사단 교육\",\"details\":[\"피해조사단 교육 ＊태풍 한반도 북상 우려시\",\"신속한 재난피해조사 위한 조사단(60명) 사전 교육\"],\"notes\":[],\"condition\":\"태풍 한반도 북상 우려시\",\"card\":{\"content\":\"피해조사단(60명) 사전교육\",\"lead\":\"자연재난과\",\"support\":[\"피해조사단구성부서\"],\"collab\":[],\"propagateTo\":[\"피해조사단 소속부서\"],\"propagateMsg\":\"\",\"resources\":[\"피해조사단 60명\",\"NDMS\"],\"damageMeasures\":[],\"page\":61}},{\"code\":\"3-10\",\"name\":\"기상특보 대응상황 행정안전부 보고\",\"details\":[\"구․군→재난안전상황실, 재대본→행정안전부\"],\"notes\":[\"재대본 구성 전 재난안전상황실에서 보고\"],\"condition\":\"\",\"card\":{\"content\":\"기상특보조치사항행정안전부보고\",\"lead\":\"재난안전상황실\",\"support\":[],\"collab\":[\"구․군\"],\"propagateTo\":[\"행정안전부(NDMS)\"],\"propagateMsg\":\"\",\"resources\":[\"NDMS\"],\"damageMeasures\":[],\"page\":63}}]}]},{\"step\":\"초기대응\",\"label\":\"2단계 초기대응\",\"alert\":[\"주의\"],\"missions\":[{\"code\":\"4\",\"name\":\"기상특보(태풍예비특보, 호우주의보, 적설량 예보) 접수\",\"actions\":[{\"code\":\"4-1\",\"name\":\"기상특보 접수\",\"details\":[\"기상자문관, NDMS, 방재기상정보시스템, 태풍연구센터\",\"레이더 및 위성영상, 태풍경로 수시 확인\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"기상특보접수및전파\",\"lead\":\"재난안전상황실\",\"support\":[\"자연재난과\"],\"collab\":[\"기상청(기상자문관)\"],\"propagateTo\":[\"구·군 상황실(NDMS)\",\"재난공무원(UMS)\"],\"propagateMsg\":\"\",\"resources\":[\"NDMS\",\"방재기상정보시스템\",\"UMS\"],\"damageMeasures\":[],\"page\":76}}]},{\"code\":\"5\",\"name\":\"기상특보(태풍예비특보, 호우주의보, 적설량 예보) 보고․전파\",\"actions\":[{\"code\":\"5-1\",\"name\":\"기상특보 상황보고(시장, 부시장)\",\"details\":[\"기상특보 현황 중심 1장 보고서 작성·보고(자연재난과장→시장 / 자연재난팀장→행정부시장)\",\"기상특보 현황, 실·국·본부장 대책회의 개최 등 방침 결정\",\"기상특보 발표내용 휴대전화(SMS) 통보(재난안전상황실→시장·부시장)\",\"주말·공휴일·일과후 특보 시: 상황팀장이 회의 주재자에게 즉시 보고 → 주재자가 상황판단회의 개최 또는 즉시 비상단계 돌입 결정\",\"긴급 시: 자연재난과장(부재시 팀장)이 기상·피해(예상)·부서별 대처상황 보고, 주재자 지시로 상황판단회의 갈음(대면 또는 유선)\"],\"notes\":[\"SMS 별도통보\"],\"condition\":\"\",\"card\":{\"content\":\"기상특보상황․조치사항시장․부시장보고\",\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\"],\"collab\":[],\"propagateTo\":[\"시장\",\"행정부시장\"],\"propagateMsg\":\"\",\"resources\":[\"SMS\",\"1장 보고서\"],\"damageMeasures\":[],\"page\":77}},{\"code\":\"5-2\",\"name\":\"기상특보 전파(시민, 유관기관)\",\"details\":[\"지역방송(One-Click), 홈페이지, SNS, UMS, 재난경보방송\",\"(교통․재해․시정홍보)전광판, 버스정보시스템(BIT) 활용\",\"긴급통신수단(PS-LTE 또는 단톡방) 활용한 유관기관 기상특보 공유\",\"전자팩스 아파트 관리사무소 발송(내부방송)\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"기상특보다양한수단통한전파\",\"lead\":\"자연재난과\",\"support\":[\"홍보담당관\",\"공보담당관\",\"미디어담당관\"],\"collab\":[\"교통정보서비스센터\",\"부산시설공단\",\"부산교통공사\"],\"propagateTo\":[\"공무원·기자·시민(신청자)(UMS 문자)\",\"KBS·MBC·KNN 등 7개 방송사(One-Click 자막)\",\"시민(재해·홍보·교통 문자전광판, BIT, 재난경보방송, 전자팩스→아파트 내부방송, 홈페이지·SNS)\",\"경찰청·소방본부 등 15개 기관(긴급통신수단 공동주파수)\",\"부산교통공사·부산시설공단(홍보요청 공문)\"],\"propagateMsg\":\"○월 ○일 ○시 (태풍, 호우) (예비특보, 주의보, 경보)가 발효 됨에 따라, 시설물, 어선·선박 관리 등 안전사고가 없도록 주의 하시기 바랍니다. / (전광판·BIT·SNS) ○월 ○일 ○시 (태풍, 호우) (예비특보, 주의보, 경보) 발효! (호우, 태풍, 강풍, 풍랑)로 인한 피해가 없도록 주의 바람\",\"resources\":[\"UMS(재난문자발송시스템)\",\"One-Click 재난상황전파시스템\",\"재해·홍보·교통 문자전광판\",\"버스정보시스템(BIT)\",\"민방위경보시설·경고방송장치\",\"전자팩스\",\"홈페이지·SNS\",\"긴급통신수단(PS-LTE/공동주파수)\"],\"damageMeasures\":[],\"page\":78}},{\"code\":\"5-3\",\"name\":\"재해우려지역 위험예보 확인 및 사전조치 활동\",\"details\":[\"위험예보 정보 확인: 댐 방류 사전예고제(한국수자원공사·홍수통제소, 최소 24시간 전 예고), 산사태 위험예보(최대 12시간 전, sansatai.forest.go.kr), 예비특보·특보·기상속보\",\"산사태 예측정보: 토양함수지수 80% 주의보, 100% 경보 → 시장·군수·구청장이 상황판단회의로 예·경보 발령 결정\",\"상황전파: 구·군→읍·면·동(마을단위 민간관리자), 지원부서·협업기관(소방·경찰), CBS·방송·SNS·전화·팩스·민방위경보·자동음성통보·확성기·순찰차 등 모든 수단\",\"위험예보 대상지역 협의체 구성(댐·저수지·보 하류, 산사태 취약지역 주민·지자체)\",\"댐 방류 대응: 예찰 강화, 시설물 점검, 사전 방류 등 저수율 조절, 재해 예·경보 발령 및 주민대피\",\"현장 출동 지시·요청: 읍면동 담당자 출동, 소관부서(도로안전과·교통혁신과·공공하수인프라과 등) 및 협업기관(소방·경찰) 출동 지원요청\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"위험예보및사전조지활동\",\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\",\"푸른숲도시과\",\"낙동강관리본부\",\"하천관리과\"],\"collab\":[\"기상청\",\"한국수자원공사\",\"홍수통제소\",\"산림청\"],\"propagateTo\":[\"구·군\",\"읍·면·동 마을단위 주민대피 민간관리자(이장 등)\",\"지원부서\",\"협업기관(소방·경찰)\",\"주민(CBS·방송·SNS·민방위경보 등)\"],\"propagateMsg\":\"\",\"resources\":[\"산사태정보시스템\",\"방재기상정보시스템\",\"민방위경보시스템\",\"자동우량경보시설\"],\"damageMeasures\":[\"댐·저수지 사전방류·방류량 조절\",\"산사태 예측지역 사전 주민대피·출입통제\",\"재해 예·경보 발령\"],\"page\":79}}]},{\"code\":\"6\",\"name\":\"기상특보(태풍예비특보, 호우주의보, 적설량 예보) 대응\",\"actions\":[{\"code\":\"6-1\",\"name\":\"상황판단 및 대책회의 개최\",\"details\":[\"(태풍예비특보,호우주의보) 태풍(15) 및 호우(12) 지원부서장(시민안전실장)\",\"(강풍경보) 강풍(10) 지원부서장(시민안전실장)\",\"(적설량 1cm이상 3cm미만) 대설 지원 4개 부서장(시민안전실장)\"],\"notes\":[\"소방재난본부, 경찰청, 해양경찰청, 53사단, 구․군영상회의 참여\"],\"condition\":\"\",\"card\":{\"content\":\"상황판단및대책회의개최준비․진행․정리\",\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\",\"실․국․본부주무부서\"],\"collab\":[\"기상청(기상자문관)\",\"유관기관\"],\"propagateTo\":[\"실·국·본부 주무부서\",\"구·군(NDMS)\",\"유관기관\",\"언론(보도자료)\"],\"propagateMsg\":\"\",\"resources\":[\"재대본 회의실\",\"영상회의시스템\"],\"damageMeasures\":[],\"page\":82}},{\"code\":\"6-2\",\"name\":\"기상특보에 따른 대응지시\",\"details\":[\"구․군, 부서별, 유관기관별 조치사항 매뉴얼에 따른 이행\",\"주간(공문), 야간(NDMS, SMS, Fax)\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"구․군, 전부서, 유관기관전파, 대응지시\",\"lead\":\"재난안전상황실\",\"support\":[\"자연재난과\",\"전부서\"],\"collab\":[\"구․군\",\"유관기관\"],\"propagateTo\":[\"구·군\",\"전부서\",\"유관기관\"],\"propagateMsg\":\"붙임 6-2-① 호우주의보 발표에 따른 재난대응활동 철저(공문): 재해취약지 사전점검·예찰, 비상근무 강화, 근무자 현황 제출, 재난상황보고서(최초·중간·최종) 즉시 보고\",\"resources\":[\"NDMS\",\"Fax\",\"방재기상정보시스템\"],\"damageMeasures\":[\"산사태 위험지·급경사지·대형공사장·침수우려지·지하차도·노후건물 예찰 및 보강·정비\",\"인명피해우려지역 재난안전선 설치 등 출입통제\",\"산사태 위험지·급경사지 배수로 준설, 고사목 제거\",\"주요 수방자재(양수기·배수펌프·비상발전기) 가동 확인 및 전진배치\",\"대규모 공사장 배수처리기능 확보\",\"예·경보시스템·문자전광판·민방위경보·SNS·케이블방송으로 특보·행동요령 홍보\"],\"page\":94}},{\"code\":\"6-3\",\"name\":\"재난안전대책본부 운영 강화\",\"details\":[\"SMS 근무명령→재대본 응소→응소부 서명→재대본 근무\",\"재대본 세팅(명패, 응소부, 재난대응행동수칙)\",\"대책회의 준비, 상황보고(시→행정안전부), 피해 파악\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"재난안전대책본부비상근무강화\",\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\",\"기상특보지원부서\"],\"collab\":[],\"propagateTo\":[\"재난상황관리반\",\"비상지원반(지원부서)\",\"행정포털\"],\"propagateMsg\":\"붙임 6-3-① 위기경보 수준 격상(주의→경계) 및 지대본 비상1단계 근무 발령 알림 공문 + 시민안전실장 지시사항(침수대비·주민대피·상황전파 철저)\",\"resources\":[\"재난문자시스템(SMS)\",\"행정포털\",\"응소부\"],\"damageMeasures\":[],\"page\":96}},{\"code\":\"6-4\",\"name\":\"관련기관 대비태세 확인\",\"details\":[\"구․군 재난담당국장 영상회의(시민안전실장)\",\"유관기관 지원체계 확인(공문, 팩스 발송)\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"구․군영상회의, 유관기관지원체계확인\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[\"육군 제53사단\",\"KT부산본부\",\"한국전력공사 부산울산본부\",\"한국가스안전공사 부산광역본부\",\"한국농어촌공사 김해양산부산지사\",\"부산교통공사\",\"대한적십자사 부산광역시지사\",\"부산광역시교육청\",\"부산지방기상청\",\"부산경찰청\",\"구·군\"],\"propagateTo\":[\"구·군 재난담당국장\",\"유관기관\"],\"propagateMsg\":\"붙임 6-4-① 태풍 북상 및 집중호우에 따른 유관기관 협조 요청 공문(유관기관 주요 임무: 육군53사단(응급복구 인력·장비), KT부산본부(통신 응급복구), 한국전력(전기), 한국가스안전공사(가스), 한국농어촌공사(저수지·양배수장), 부산교통공사(비상수송), 대한적십자사(피해신고 핫라인·복구인력), 교육청(휴교·등하교 안전), 부산지방기상청(기상정보), 부산경찰청(교통통제))\",\"resources\":[],\"damageMeasures\":[],\"page\":98}},{\"code\":\"6-5\",\"name\":\"재해취약지 등 안전점검 강화\",\"details\":[\"구․군, 현장 행정지원 책임관 중복․교차점검\",\"재해취약지 점검결과 복명서 제출(지역담당팀장)(필요시)\",\"인명․재산피해 우려지 응급조치(출입통제) 시행\",\"배수펌프장 사전배수 실시\",\"부서별 소관시설(산사태 우려지, 공사장, 대형간판 등) 재점검\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"재해취약지구․군, 행정지원책임관중첩점검등\",\"lead\":\"자연재난과\",\"support\":[\"현장행정지원책임관지정부서\"],\"collab\":[\"구․군\",\"유관기관\"],\"propagateTo\":[\"현장 행정지원 책임관\",\"구·군\",\"소관부서\",\"한국농어촌공사\"],\"propagateMsg\":\"\",\"resources\":[\"재해취약지 목록·위치도\",\"복명서 서식\",\"배수펌프장\",\"예경보시스템\"],\"damageMeasures\":[\"인명·재산피해 우려지 응급조치(출입통제)\",\"배수펌프장 사전배수\",\"저수지 사전방류\",\"부서별 소관시설 재점검\"],\"page\":100}},{\"code\":\"6-6\",\"name\":\"재난자원 점검 및 전진배치 지시\",\"details\":[\"수방자재, 응급복구장비 재해취약지 전진배치\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"수방자재․응급복구장비점검, 비축량파악\",\"lead\":\"자연재난과\",\"support\":[\"복지정책과\",\"건설안전사업소\"],\"collab\":[\"구․군\",\"유관기관\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"양수기\",\"배수펌프\",\"비상발전기\",\"모래주머니 등 수방자재\",\"응급복구장비\",\"재해구호물품\"],\"damageMeasures\":[],\"page\":101}},{\"code\":\"6-7\",\"name\":\"기상특보 대응 상황보고\",\"details\":[\"구․군→재난안전상황실, 재대본→행정안전부\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"기상특보조치사항행정안전부보고\",\"lead\":\"재난안전상황실\",\"support\":[\"자연재난과\"],\"collab\":[\"구․군\"],\"propagateTo\":[\"행정안전부(NDMS)\"],\"propagateMsg\":\"\",\"resources\":[\"NDMS\"],\"damageMeasures\":[],\"page\":102}}]},{\"code\":\"40\",\"name\":\"주민대피\",\"actions\":[{\"code\":\"40-1\",\"name\":\"인명피해 우려지역 대피담당자 대기 지시\",\"details\":[\"→사전대피 조치 지시\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"인명피해우려지역대피담당자대기 지시→사전대피조치지시\",\"lead\":\"자연재난과\",\"support\":[\"공보담당관\",\"미디어담당관\"],\"collab\":[\"구·군\",\"군부대\",\"경찰서\",\"전국재해구호협회\",\"대한적십자사\",\"의료기관\",\"교육지원청\",\"지역자율방재단\"],\"propagateTo\":[\"주민(CBS·방송·앰프 등)\",\"현장책임관(읍면동장)\",\"현장관리관\",\"협업기관(군·경찰·적십자·의료기관·교육지원청)\"],\"propagateMsg\":\"(재난문자 표준문안) (사전 대피권고) ○○:○○ ○○지역 호우 피해 우려. ○○일대 주민들께 안전한 장소로 미리 대피할 것을 권고합니다. [기관명]\",\"resources\":[\"대피소\",\"수송차량\",\"주민대피 안내도\",\"현장관리관증\"],\"damageMeasures\":[\"위험구역 설정\",\"인명피해 우려지역 주민 사전대피\"],\"page\":123}},{\"code\":\"40-5\",\"name\":\"대피명령지시\",\"details\":[\"대피안내 방송(경보·사이렌·방송, 안전취약계층 고려 수어·외국어·자막 활용)\",\"지자체 담당자·유관기관에 대피명령(재난안전법 제40조: 발령일시·발령지역·대피장소)\",\"주민대피 경보발령 방송 문안 작성(재난유형·피해형태별 행동요령 포함)\",\"주민대피 시행 시 행정안전부 통보(중앙재난안전상황실 044-205-1540/1704, 자연재난대응과)\",\"대피소·임시대피소·대피로 안내 표지판 규격(어두운 노랑 바탕·검정 글씨, 하단 2m 이상)\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"대피명령지시\",\"lead\":\"자연재난과\",\"support\":[\"공보담당관\",\"미디어담당관\"],\"collab\":[\"KBS\"],\"propagateTo\":[\"주민\",\"지자체 담당자·유관기관\",\"행정안전부 중앙재난안전상황실\"],\"propagateMsg\":\"재난「○○」의 영향으로 ○○이 예상되어 주민의 생명과 신체를 보호하기 위하여 「재난 및 안전관리 기본법」 제40조에 따라 주민 대피명령을 발령하오니 해당 지역 주민과 당해 지역 안에 있는 주민은 관계공무원의 유도에 따라 신속히 대피하여 주시기 바랍니다. 1. 발령일시 2. 발령지역 3. 대피장소\",\"resources\":[\"민방위경보·사이렌·방송설비\",\"대피소 표지판\"],\"damageMeasures\":[\"주민 대피명령 발령\"],\"page\":129}},{\"code\":\"40-10\",\"name\":\"안전취약계층의 특성별 대피시 고려사항\",\"details\":[\"안전취약계층 유형별 특성 고려(시각·청각·시청각중복·언어·지체·내부·지적·정신·고차뇌기능·발달장애인 등)\",\"유형별 정보전달 방법(문자·수어·그림·지도 등) 및 대피유도(보행지원) 담당 사전 지정\",\"시청각중복장애인 통역사·보조인 대피소 파견, 의약품·의료기기 휴대 지원\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"안전취약계층의특성별대피시고려사항\",\"lead\":\"자연재난과\",\"support\":[\"복지정책과\"],\"collab\":[\"KBS부산방송국\"],\"propagateTo\":[\"안전취약계층\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"page\":133}},{\"code\":\"40-11\",\"name\":\"안전취약계층 대피계획 수립 및 대피\",\"details\":[\"복지부서 협의로 재난우려지역 안전취약계층 현황 조사(외딴집 거동불편자, 보호자 연락처, 자력대피 가능여부, 대피수단), DB 구축·정기 갱신\",\"취약계층별 대피담당자 복수 지정(1차: 지역주민·공무원·유관기관 직원 / 2차: 수시 현장확인 가능한 공무원)\",\"대피담당자: 행동요령 전달(문자·유선·방문), 대피 지원, 상황관리·보고\",\"대피수단은 지자체 공용차량 우선 지정, 사전 동선 파악\",\"대피소 선정: 침수·범람에 안전한 마을회관 등, 장애인 접근·화장실 배려 시설, 비상의약품 비치, 필요시 응급의료·중증장애인 지원 전문인력\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"안전취약계층대피계획수립및대피\",\"lead\":\"자연재난과\",\"support\":[\"복지정책과\"],\"collab\":[],\"propagateTo\":[\"안전취약계층(문자·유선·방문)\"],\"propagateMsg\":\"\",\"resources\":[\"지자체 공용차량\",\"비상의약품\",\"취약계층 DB\"],\"damageMeasures\":[],\"page\":145}}]}]},{\"step\":\"비상대응\",\"label\":\"3단계 비상대응\",\"alert\":[\"경계\",\"심각\"],\"missions\":[{\"code\":\"7\",\"name\":\"기상특보(태풍특보, 호우경보, 적설량 1cm~) 접수\",\"actions\":[{\"code\":\"7-1\",\"name\":\"기상특보 접수\",\"details\":[\"기상자문관, NDMS, 방재기상정보시스템, 태풍연구센터\",\"레이더 및 위성영상, 태풍경로 수시 확인\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"기상특보접수및전파\",\"lead\":\"재난안전상황실\",\"support\":[\"자연재난과\"],\"collab\":[\"기상청(기상자문관)\"],\"propagateTo\":[\"구·군 상황실(NDMS)\",\"재난공무원(UMS)\"],\"propagateMsg\":\"\",\"resources\":[\"NDMS\",\"방재기상정보시스템\",\"UMS\"],\"damageMeasures\":[],\"page\":148}}]},{\"code\":\"8\",\"name\":\"기상특보(태풍특보, 호우경보, 적설량 1cm~) 보고․전파\",\"actions\":[{\"code\":\"8-1\",\"name\":\"기상특보 상황보고(시장, 부시장)\",\"details\":[\"기상특보 현황 중심 1장 보고서 작성·보고(자연재난과장→시장 / 자연재난팀장→행정부시장)\",\"기상특보 현황, 실·국·본부장 대책회의 개최 등 방침 결정\",\"기상특보 발표내용 휴대전화(SMS) 통보(재난안전상황실→시장·부시장)\",\"주말·공휴일·일과후 특보 시: 상황팀장이 회의 주재자에게 즉시 보고 → 주재자가 상황판단회의 개최 또는 즉시 비상단계 돌입 결정\",\"긴급 시: 자연재난과장(부재시 팀장)이 기상·피해(예상)·부서별 대처상황 보고, 주재자 지시로 상황판단회의 갈음(대면 또는 유선)\"],\"notes\":[\"SMS 별도통보\"],\"condition\":\"\",\"card\":{\"content\":\"기상특보상황․조치사항시장․부시장보고\",\"lead\":\"자연재난과\",\"support\":[\"재난안전상황실\"],\"collab\":[],\"propagateTo\":[\"시장\",\"행정부시장\"],\"propagateMsg\":\"붙임 8-1-① 호우주의보 대처상황 보고(1보): 기상특보, 강수현황(구·군별), 피해현황, 통제상황, 조치상황(비상근무 인원·전광판 홍보·예찰활동), 향후계획\",\"resources\":[\"SMS\",\"1장 보고서\"],\"damageMeasures\":[],\"page\":149}},{\"code\":\"8-2\",\"name\":\"기상특보 전파(시민, 유관기관)\",\"details\":[\"지역방송(One-Click), 홈페이지, SNS, UMS, 재난경보방송\",\"(교통․재해․시정홍보)전광판, 버스정보시스템(BIT) 활용\",\"긴급통신수단(PS-LTE 또는 단톡방) 활용한 유관기관 기상특보 공유\",\"전자팩스 아파트 관리사무소 발송(내부방송)\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"기상특보다양한수단통한전파\",\"lead\":\"자연재난과\",\"support\":[\"홍보담당관\",\"공보담당관\",\"미디어담당관\"],\"collab\":[\"교통정보서비스센터\",\"부산시설공단\",\"부산교통공사\"],\"propagateTo\":[\"공무원·기자·시민(신청자)(UMS 문자)\",\"KBS·MBC·KNN 등 7개 방송사(One-Click 자막)\",\"시민(재해·홍보·교통 문자전광판, BIT, 재난경보방송, 전자팩스→아파트 내부방송, 홈페이지·SNS)\",\"경찰청·소방본부 등 15개 기관(긴급통신수단 공동주파수)\",\"부산교통공사·부산시설공단(홍보요청 공문)\"],\"propagateMsg\":\"○월 ○일 ○시 (태풍, 호우) (예비특보, 주의보, 경보)가 발효 됨에 따라, 시설물, 어선·선박 관리 등 안전사고가 없도록 주의 하시기 바랍니다. / (전광판·BIT·SNS) ○월 ○일 ○시 (태풍, 호우) (예비특보, 주의보, 경보) 발효! (호우, 태풍, 강풍, 풍랑)로 인한 피해가 없도록 주의 바람\",\"resources\":[\"UMS(재난문자발송시스템)\",\"One-Click 재난상황전파시스템\",\"재해·홍보·교통 문자전광판\",\"버스정보시스템(BIT)\",\"민방위경보시설·경고방송장치\",\"전자팩스\",\"홈페이지·SNS\",\"긴급통신수단(PS-LTE/공동주파수)\"],\"damageMeasures\":[],\"page\":151}}]},{\"code\":\"9\",\"name\":\"기상특보(태풍특보, 호우경보,적설량 1cm~) 대응\",\"actions\":[{\"code\":\"9-1\",\"name\":\"상황판단 및 대책회의 개최\",\"details\":[\"실․국․본부장, 유관기관, 부단체장(시장)\"],\"notes\":[\"소방본부, 경찰청, 해양경찰청, 53사단, 구․군영상회의 참여\"],\"condition\":\"\",\"card\":{\"content\":\"기상특보해제상황접수\",\"lead\":\"재난안전상황실\",\"support\":[\"자연재난과\"],\"collab\":[],\"propagateTo\":[\"구·군 상황실\",\"재난공무원(UMS)\"],\"propagateMsg\":\"\",\"resources\":[\"NDMS\",\"UMS\"],\"damageMeasures\":[],\"page\":195}},{\"code\":\"9-2\",\"name\":\"기상특보에 따른 대응지시\",\"details\":[\"구․군, 부서별 조치사항 매뉴얼에 따른 이행\",\"주간(공문), 야간(NDMS, SMS, Fax)\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"2차피해방지점검, 피해확인순찰실시등\",\"lead\":\"자연재난과\",\"support\":[\"전부서\"],\"collab\":[\"구․군\"],\"propagateTo\":[\"구·군\",\"전부서\"],\"propagateMsg\":\"붙임 9-2-① 호우경보 해제에 대비한 사후조치 철저(지반 연약, 예찰·추가피해 보고, 침수지 방역)\",\"resources\":[\"자율방역단\",\"임시적환장\",\"119 토목구조대\"],\"damageMeasures\":[\"2차 피해 방지 순찰·응급복구\",\"침수지 방역\",\"재해쓰레기 제거\",\"이재민 구호\",\"사상자 현황 파악\"],\"page\":196}},{\"code\":\"9-3\",\"name\":\"재난안전대책본부 운영 강화\",\"details\":[\"협업기능별 실무반+ 유관기관\",\"SMS 근무명령→재대본 응소→응소부 서명→재대본 근무\",\"재대본 세팅(명패, 응소부, 재난대응행동수칙)\",\"대책회의 준비, 상황보고(시→행정안전부), 피해․응급조치 파악\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"구․군피해현황주기적취합․보고\",\"lead\":\"자연재난과\",\"support\":[\"전부서\"],\"collab\":[\"구․군\"],\"propagateTo\":[\"시장\"],\"propagateMsg\":\"붙임 9-3-① 호우 대처상황 보고: 기상현황, 강수현황, 피해상황, 통제상황, 대처상황(재대본 가동·회의·재난문자·홍보), 향후계획\",\"resources\":[],\"damageMeasures\":[],\"page\":199}},{\"code\":\"9-4\",\"name\":\"전직원 1/10 비상근무 명령(호우 3단계, 태풍 2단계, 대설 2단계)\",\"details\":[\"SMS 근무명령, 행정포털 근무요령 게시, 응소부 출력․서명\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"비상근무해제SMS 통보, 행정포털게시\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[\"비상근무조(SMS)\",\"행정포털\"],\"propagateMsg\":\"\",\"resources\":[\"재난문자시스템\",\"행정포털\"],\"damageMeasures\":[],\"page\":201}},{\"code\":\"9-5\",\"name\":\"관련기관 대비태세 확인\",\"details\":[\"(필요시)구․군 부단체장, 유관기관 영상회의(시장)\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"피해상황점검회의개최\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[\"실·국·본부장\",\"구·군 부단체장\",\"유관기관\"],\"propagateMsg\":\"\",\"resources\":[\"재대본 회의실\",\"영상회의시스템\"],\"damageMeasures\":[],\"page\":202}},{\"code\":\"9-6\",\"name\":\"재해우려지역 등 안전조치 지시\",\"details\":[\"갯바위, 테트라포드, 하상도로, 해안변 월파 우려지역 등\",\"인명피해우려지 접근통제, 책임자 배치\",\"(구군별, 부서별)피해발생지역(시설) 응급조치\",\"방재시설물(배수펌프장), 수방자재, 응급복구장비 가동\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"피해복구대책회의개최\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[\"실·국·본부장\",\"구·군\",\"유관기관\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[\"피해조사 및 NDMS 입력(공공시설 7일, 사유시설 10일 이내)\",\"중앙합동피해조사\",\"국비지원·특별재난구역 선포 결정\"],\"page\":207}},{\"code\":\"9-7\",\"name\":\"유관기관 협력체계 가동 지시\",\"details\":[\"피해발생지역․피해우려지역 교통통제, 통제현황 보고(경찰)\",\"피해발생 Life-line(전기․가스․통신) 응급조치 요청\",\"구․군, 유관기관 상호간 인력․장비․물자 응원 요청\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"구․군영상회의개최준비\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[\"구․군\"],\"propagateTo\":[\"구·군 부단체장·재난담당과장\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"page\":213}},{\"code\":\"9-8\",\"name\":\"현장상황관리관(행정안전부) 활동 지원\",\"details\":[],\"notes\":[],\"condition\":\"\"},{\"code\":\"9-9\",\"name\":\"구․군, 실무반별 피해현황 파악 지시\",\"details\":[],\"notes\":[],\"condition\":\"\"},{\"code\":\"9-10\",\"name\":\"기상특보 대응 상황보고(구․군→재난안전상황실, 지대본→중대본)\",\"details\":[],\"notes\":[],\"condition\":\"\"}]},{\"code\":\"41\",\"name\":\"(필요시) 통제활동\",\"actions\":[{\"code\":\"41-1\",\"name\":\"통제활동(교통통제 등)\",\"details\":[\"교통통제 권한: 시장·군수·구청장, 통제단장(위임 시 소방 지휘대장)\",\"풍수해 발생지역 주변 교통통제(경찰서 협조)\",\"침수우려 취약도로 통제: 수위정보 제공(지자체·도로관리청)→교통통제(도로관리청·경찰)→통제 홍보(TV·VMS·SNS·SMS)\",\"통행주의보(순찰차 대기·통제 준비)/통행경보(차단시설 전면통제·우회) - 도로법 제58조, 도로교통법 제6조\",\"하천수위 상승·하수역류로 침수(우려) 도로·하상도로·지하차도 통제 요청\",\"제3통제선(현장주변) 교통외근요원 배치, 긴급차량 통로 확보\",\"통제상황 실시간 전파(교통방송, 교통정보 전광판, 입간판)\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"교통통제\",\"lead\":\"자연재난과\",\"support\":[\"부산경찰청\"],\"collab\":[\"부산경찰청\",\"도로관리청\"],\"propagateTo\":[\"운전자·시민(교통방송·VMS·SNS·SMS·입간판)\",\"경찰서\"],\"propagateMsg\":\"\",\"resources\":[\"차단기\",\"재난안전선\",\"입간판\",\"VMS\"],\"damageMeasures\":[\"침수도로 교통통제\",\"현장주변 교통통제·우회\"],\"page\":189}}],\"synthetic\":true}]},{\"step\":\"수습복구\",\"label\":\"4단계 수습·복구\",\"alert\":[\"경계\",\"심각\"],\"missions\":[{\"code\":\"9\",\"name\":\"재난 및 사고복구\",\"actions\":[{\"code\":\"9-11\",\"name\":\"기상특보 해제 접수\",\"details\":[],\"notes\":[],\"condition\":\"\"},{\"code\":\"9-12\",\"name\":\"재해취약지 사후점검,피해현황 파악지시\",\"details\":[],\"notes\":[],\"condition\":\"\"},{\"code\":\"9-13\",\"name\":\"구․군 피해현황 취합․보고(구․군→재대본), NDMS 입력\",\"details\":[],\"notes\":[],\"condition\":\"\"},{\"code\":\"9-14\",\"name\":\"전직원 비상근무 해제\",\"details\":[],\"notes\":[],\"condition\":\"\"},{\"code\":\"9-15\",\"name\":\"피해상황 점검회의(실․국․본부장, 시장)\",\"details\":[\"주요피해 및 응급조치 현황, 현장방문 계획, 향후계획\",\"(필요시)구․군, 유관기관 영상회의 참여\"],\"notes\":[],\"condition\":\"\"},{\"code\":\"9-16\",\"name\":\"피해복구 대책회의(시장(행정부시장), 실․국․본부장)\",\"details\":[\"피해․응급조치 현황, 복구일정, 재난구역 선포, 인력지원\",\"(필요시)구․군, 유관기관 영상회의 참여\"],\"notes\":[],\"condition\":\"\"},{\"code\":\"9-17\",\"name\":\"피해복구 구․군 영상회의\",\"details\":[\"행정부시장(부단체장), 시민안전실장(자연재난과장)\"],\"notes\":[],\"condition\":\"\"}]},{\"code\":\"14\",\"name\":\"피해보상 및 대민지원\",\"actions\":[{\"code\":\"14-1\",\"name\":\"피해현장․복구현장 방문\",\"details\":[\"시장, 부시장 복구현장 방문\",\"VIP, 총리, 장관, 국회(상임위, 국회의원) 방문 지원\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"시장․부시장등피해현장․복구현장방문\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[\"구․군\"],\"propagateTo\":[\"구·군\",\"비서실\",\"언론\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"page\":214}},{\"code\":\"14-2\",\"name\":\"유관기관 협력체계 가동 지원\",\"details\":[\"응급복구 수요파악, 종합지원계획 수립, 지원현황 파악\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"피해복구인력․장비지원, 시설응급복구협조\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[\"부산경찰청\",\"육군 제53사단\",\"부산교통공사\",\"한국전력공사\",\"한국가스안전공사\",\"KT 부산본부\",\"대한적십자사\",\"부산시설공단\"],\"propagateTo\":[\"구·군\",\"사업소\",\"유관기관\"],\"propagateMsg\":\"\",\"resources\":[\"군 병력·장비\",\"경찰관기동대\",\"덤프트럭·굴삭기·청소차\"],\"damageMeasures\":[],\"page\":216}},{\"code\":\"14-3\",\"name\":\"구․군 응급복구비 지원(국고 지원 포함)\",\"details\":[\"특별교부세, 예비비 사용계획․교부\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"구․군응급복구비용지원\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"특별교부세\",\"재난관리기금\",\"예비비\"],\"damageMeasures\":[\"구·군 응급복구비 지원\"],\"page\":218}},{\"code\":\"14-4\",\"name\":\"피해복구 일일 상황보고(시장․부시장/행정안전부)\",\"details\":[\"복구현황 일일상황보고서 보고(시장·부시장)\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"피해복구현황일일상황보고\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[\"시장\",\"부시장\"],\"propagateMsg\":\"붙임 14-4-① 피해복구 현황 일일상황보고: 피해 접수현황(구·군별), 인명피해, 재산피해(공공·사유), 인력·장비 동원현황, 주요 조치사항\",\"resources\":[],\"damageMeasures\":[],\"page\":219}},{\"code\":\"14-5\",\"name\":\"당정 긴급재난 대책회의\",\"details\":[\"당정 대책회의 일정 접수(정당 시당→기획담당관→자연재난과)\",\"회의계획 시장 보고(1장)\",\"피해현황·복구계획 중심 자료 작성(기획담당관 경유)\",\"의원별 지적·요청사항 중심 결과보고\",\"부서별 소관사항 세부실행계획 수립·시행 통보\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"당정긴급재난대책회의개최\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"page\":221}},{\"code\":\"14-6\",\"name\":\"담화문 발표\",\"details\":[\"피해주민 위로·복구인력 격려 담화문 발표 건의(1장)\",\"담화문 문안 작성·시장 보고\",\"담화문 언론 보도자료 제공\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"시장명의담화문발표\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[\"시민\",\"언론\"],\"propagateMsg\":\"붙임 14-6-① 시장 담화문 예시(피해 위로, 특별재난지역 선포 노력, 라이프라인 우선 복구, 인력·장비 집중투입, 근본대책)\",\"resources\":[],\"damageMeasures\":[],\"page\":222}},{\"code\":\"14-7\",\"name\":\"언론 인터뷰, 대담 참가\",\"details\":[\"TV·라디오 피해복구 인터뷰 요청 접수\",\"대상자·일정 협의(시장·부시장은 1장 보고, 비서실 통보)\",\"사전 질문 답변자료 작성·제출\",\"(대담 시) 비서실 의전 요청\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"TV, 라디오방송인터뷰, 대담참석준비\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"page\":225}},{\"code\":\"14-8\",\"name\":\"재난안전대책본부 해산\",\"details\":[\"구·군·부서별 피해 취합 완료 후 시장 보고(1장, 재대본 해산 포함)\",\"시장 보고 후 결재(전결권자 시민안전실장)\",\"재대본 실무반 SMS 비상근무 해제 통보, 응소부 서명 확인\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"재대본임무종료에따른재대본해산\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[\"재대본 실무반(SMS)\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"page\":226}},{\"code\":\"14-9\",\"name\":\"피해조사 지원 위한 재대본 재가동\",\"details\":[\"비상근무 범위 건의(자연재난과→재대본, 시민안전실장 결재)\",\"해당 부서 공문·비상근무조 SMS 통보\",\"행정포털 비상근무 실시 게시\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"피해조사지원위한재대본재가동\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[\"해당 부서\",\"비상근무조\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"page\":227}},{\"code\":\"14-10\",\"name\":\"신속한 피해신고 처리 지시 및 지원\",\"details\":[\"피해조사․복구계획 수립 철저, 합동피해조사 인력 지원\",\"간접지원 원스톱 서비스 협조, 재난심리상담 활용\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"기한내피해신고, NDMS 입력처리요청\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[\"구·군\",\"대한적십자사\",\"재난심리회복지원센터\"],\"propagateTo\":[\"구·군\",\"대한적십자사 부산광역시지사\"],\"propagateMsg\":\"\",\"resources\":[\"NDMS\",\"재난지원금\"],\"damageMeasures\":[\"사유시설 재난지원금 지급\",\"공공시설 피해 복구계획\",\"간접지원(감면·융자)\",\"재난심리회복 지원\"],\"page\":228}},{\"code\":\"14-11\",\"name\":\"피해조사단 운영\",\"details\":[\"피해조사단 교육․운영, NDMS 입력 순회교육\",\"피해조사단 인력 보강\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"피해조사단현장조사및NDMS 입력\",\"lead\":\"자연재난과\",\"support\":[\"피해조사단소속부서\"],\"collab\":[],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[\"피해조사단(60명)\",\"NDMS\"],\"damageMeasures\":[],\"page\":229}},{\"code\":\"14-12\",\"name\":\"중앙재난피해조사단 현장조사 지원\",\"details\":[\"중앙합동조사 실시계획 접수(행정안전부→시) 및 통보(시→구·군)\",\"지원계획 수립·통보\",\"교육장소 제공(피해조사·복구계획 수립 방법)\",\"현장조사 안내요원 구성·지원\",\"조사공간·청사 출입·무료주차·컴퓨터·프린터 지원\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"중앙재난피해조사단활동지원\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[\"행정안전부(중앙재난피해합동조사단)\",\"구·군\"],\"propagateTo\":[],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"page\":230}},{\"code\":\"14-13\",\"name\":\"특별재난지역 선포 건의\",\"details\":[\"피해액 기준금액 초과 시 구·군→시 자연재난과 건의 요청\",\"구·군 요청 취합 후 시장 결재\",\"시→행정안전부 건의\",\"시장 행정안전부 방문, 부산지역 국회의원 활용\",\"절차: 지역재대본부장(시장)→중앙안전관리위원회(국무총리)→대통령(선포·공고)\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"특별재난지역선포대정부건의\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[\"구․군\"],\"propagateTo\":[\"행정안전부\"],\"propagateMsg\":\"\",\"resources\":[],\"damageMeasures\":[],\"page\":231}},{\"code\":\"14-14\",\"name\":\"복구계획 수립․시행\",\"details\":[\"중앙피해조사단 확인 거친 확정 피해내역 NDMS 입력\",\"복구계획 확정 통보 접수(행정안전부→자연재난과)\",\"시 복구계획 시장 방침 결정\",\"시 복구계획 통보(자연재난과→피해시설 소관부서·구·군)\",\"복구재원 예비비 확보 요청\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"항구복구계획수립․시행,\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[\"피해시설 소관부서\",\"구·군\"],\"propagateMsg\":\"\",\"resources\":[\"예비비\"],\"damageMeasures\":[\"항구복구계획 수립·시행\"],\"page\":232}},{\"code\":\"14-15\",\"name\":\"대처상황 결과보고\",\"details\":[\"대처상황 문제점․대책 피드백 결과보고\"],\"notes\":[],\"condition\":\"\",\"card\":{\"content\":\"기상특보대처과정피드백보고\",\"lead\":\"자연재난과\",\"support\":[],\"collab\":[],\"propagateTo\":[],\"propagateMsg\":\"붙임 14-15-① 태풍 대처상황 결과보고 예시(상황관리·인명시설물자동원·상황전파(홍보) 분야 등)\",\"resources\":[],\"damageMeasures\":[],\"page\":233}}]}]}]}");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/common-sop.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 공통 기본 SOP — 재난 유형별 매뉴얼 시드가 없을 때 쓰는 최소 대응 절차.
 * 재난 및 안전관리 기본법의 일반 대응 흐름(상황관리 → 대책본부 → 현장조치 → 복구)으로 구성했으며,
 * T3Q 연계 시 매뉴얼 기반 응답으로 대체된다. 문구의 「○○」은 재난유형명으로 바뀐다.
 */ __turbopack_context__.s([
    "COMMON_SOURCE",
    ()=>COMMON_SOURCE,
    "commonActions",
    ()=>commonActions
]);
const COMMON_SOURCE = "공통 기본 SOP (유형별 매뉴얼 연계 전)";
const BASE = [
    {
        stage: "관심",
        phase: "대응",
        title: "○○ 상황 모니터링 및 정보 수집",
        content: "○○ 관련 위험 정보와 발생 징후를 수시로 확인하고 공유한다.",
        details: [
            "관계기관 발표·예보·통보 사항 확인",
            "관내 취약 대상·시설 현황 확인",
            "담당자 비상연락체계 점검"
        ],
        lead: "재난 주관부서",
        support: [
            "재난안전상황실"
        ],
        collab: [
            "관계기관"
        ],
        propagateTo: [
            "재난 관련 부서"
        ],
        propagateMsg: "○○ 관련 위험 정보가 발표되었습니다. 상황을 주시하고 비상연락체계를 유지해 주시기 바랍니다.",
        resources: [],
        damageMeasures: []
    },
    {
        stage: "관심",
        phase: "대응",
        title: "예방 홍보 및 사전 점검",
        content: "주민·이용자 대상 예방 홍보를 하고 취약 시설·대상을 사전 점검한다.",
        details: [
            "행동요령 홍보(문자·누리집·SNS)",
            "취약 시설·대상 사전 점검",
            "점검 결과 보고"
        ],
        lead: "재난 주관부서",
        support: [
            "홍보 담당부서"
        ],
        collab: [
            "시·군·구"
        ],
        propagateTo: [
            "시·군·구 담당부서"
        ],
        propagateMsg: "",
        resources: [],
        damageMeasures: []
    },
    {
        stage: "주의",
        phase: "대응",
        title: "○○ 상황 접수 및 보고·전파",
        content: "상황을 접수하여 발생 일시·장소·규모를 파악하고 보고·전파한다.",
        details: [
            "발생 일시·장소·규모·피해 여부 파악",
            "기관장 보고",
            "행정안전부 NDMS 보고",
            "유관기관 상황 전파"
        ],
        lead: "재난 주관부서",
        support: [
            "재난안전상황실"
        ],
        collab: [
            "소방",
            "경찰",
            "관계기관"
        ],
        propagateTo: [
            "기관장",
            "유관기관",
            "시·군·구"
        ],
        propagateMsg: "[○○ 발생] 일시·장소·규모를 알려드립니다. 소관 업무에 따라 대응 준비 바랍니다.",
        resources: [
            "NDMS",
            "상황전파 SMS"
        ],
        damageMeasures: []
    },
    {
        stage: "주의",
        phase: "대응",
        title: "상황판단회의 개최",
        content: "상황을 종합해 위기경보 수준과 대응 방향을 결정한다.",
        details: [
            "관계부서 소집",
            "상황 평가 및 위기경보 수준 판단",
            "부서별 조치사항 지시"
        ],
        lead: "재난 주관부서",
        support: [
            "관계부서"
        ],
        collab: [],
        propagateTo: [
            "관계부서"
        ],
        propagateMsg: "",
        resources: [],
        damageMeasures: []
    },
    {
        stage: "경계",
        phase: "대응",
        title: "재난안전대책본부 가동",
        content: "재난안전대책본부를 가동하고 실무반별 임무를 부여한다.",
        details: [
            "비상근무 명령 및 인원 소집",
            "실무반 편성·임무 부여",
            "상황판·상황일지 운영"
        ],
        lead: "자연·사회재난 담당과",
        support: [
            "총무과",
            "재난 주관부서"
        ],
        collab: [
            "관계기관 연락관"
        ],
        propagateTo: [
            "실무반 담당부서"
        ],
        propagateMsg: "재난안전대책본부를 가동합니다. 실무반 담당자는 즉시 응소 바랍니다.",
        resources: [
            "비상근무 인원",
            "상황실"
        ],
        damageMeasures: []
    },
    {
        stage: "경계",
        phase: "대응",
        title: "현장 상황관리 및 통제",
        content: "현장에 인력을 배치해 상황을 관리하고 위험 구역을 통제한다.",
        details: [
            "현장 대응 인력 배치",
            "위험 구역 출입 통제",
            "현장 상황 수시 보고"
        ],
        lead: "재난 주관부서",
        support: [
            "시·군·구"
        ],
        collab: [
            "소방",
            "경찰"
        ],
        propagateTo: [
            "현장 대응 부서"
        ],
        propagateMsg: "",
        resources: [
            "현장 인력",
            "통제 장비"
        ],
        damageMeasures: []
    },
    {
        stage: "경계",
        phase: "대응",
        title: "주민·대상자 보호 조치",
        content: "피해 우려 주민·이용자·취약계층을 보호하기 위한 조치를 한다.",
        details: [
            "대상자 현황 파악",
            "대피·격리·이동 등 보호 조치 안내",
            "취약계층 우선 지원"
        ],
        lead: "재난 주관부서",
        support: [
            "복지 담당부서"
        ],
        collab: [
            "시·군·구",
            "관계기관"
        ],
        propagateTo: [
            "주민·대상자"
        ],
        propagateMsg: "[안내] ○○ 관련 안전 조치를 안내드립니다. 행동요령에 따라 주시기 바랍니다.",
        resources: [],
        damageMeasures: []
    },
    {
        stage: "심각",
        phase: "대응",
        title: "유관기관 협조 및 자원 동원",
        content: "피해 확대 시 유관기관과 상급기관에 협조를 요청하고 인력·장비를 동원한다.",
        details: [
            "상급기관·인근 기관 지원 요청",
            "인력·장비·물자 동원",
            "투입 자원 현황 관리"
        ],
        lead: "재난안전대책본부",
        support: [
            "재난 주관부서"
        ],
        collab: [
            "행정안전부",
            "관계기관"
        ],
        propagateTo: [
            "행정안전부",
            "유관기관"
        ],
        propagateMsg: "",
        resources: [
            "동원 인력",
            "장비",
            "물자"
        ],
        damageMeasures: []
    },
    {
        stage: "심각",
        phase: "복구",
        title: "피해 조사 및 NDMS 입력",
        content: "인명·재산 피해를 조사하여 집계하고 NDMS에 입력·보고한다.",
        details: [
            "인명피해 현황 파악",
            "시설·재산 피해 조사",
            "NDMS 피해 입력 및 보고"
        ],
        lead: "재난 주관부서",
        support: [
            "시·군·구"
        ],
        collab: [],
        propagateTo: [
            "행정안전부"
        ],
        propagateMsg: "",
        resources: [
            "피해조사반"
        ],
        damageMeasures: [
            "피해 현황 NDMS 입력",
            "중앙합동조사 대비 자료 준비"
        ]
    },
    {
        stage: "심각",
        phase: "복구",
        title: "응급복구 및 피해자 지원",
        content: "필수 기능을 응급 복구하고 피해자 지원을 실시한다.",
        details: [
            "응급복구 대상 선정 및 착수",
            "피해자 구호·지원",
            "2차 피해 예방 조치"
        ],
        lead: "재난 주관부서",
        support: [
            "시설 소관부서",
            "복지 담당부서"
        ],
        collab: [
            "관계기관"
        ],
        propagateTo: [
            "관계부서"
        ],
        propagateMsg: "",
        resources: [
            "복구 장비",
            "구호물자"
        ],
        damageMeasures: [
            "응급복구 결과 보고"
        ]
    },
    {
        stage: "심각",
        phase: "복구",
        title: "상황 종료 및 결과 보고",
        content: "상황 종료를 판단하고 대응 결과를 정리해 보고한다.",
        details: [
            "상황 종료 판단 및 전파",
            "대응 결과 정리",
            "개선사항 도출"
        ],
        lead: "재난 주관부서",
        support: [
            "재난안전상황실"
        ],
        collab: [],
        propagateTo: [
            "기관장",
            "관계기관"
        ],
        propagateMsg: "",
        resources: [],
        damageMeasures: []
    }
];
function commonActions(hazard) {
    const fill = (s)=>s.replaceAll("○○", hazard);
    return BASE.map((b, i)=>({
            ...b,
            code: `CMN-${String(i + 1).padStart(3, "0")}`,
            title: fill(b.title),
            content: fill(b.content),
            propagateMsg: fill(b.propagateMsg),
            hazard: [
                hazard
            ],
            page: 0
        }));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/gb-wildfire.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 경상북도 산불 대응 샘플 시드.
 * 산림청 산불 위기경보(관심·주의·경계·심각) 체계와 지자체 산불방지대책본부·재난안전대책본부 일반 절차로 구성한 예시이며,
 * 경상북도 산불 현장조치 행동매뉴얼 확보 시 동일 형식으로 교체한다.
 */ __turbopack_context__.s([
    "GB_WILDFIRE",
    ()=>GB_WILDFIRE,
    "GB_WILDFIRE_SOURCE",
    ()=>GB_WILDFIRE_SOURCE
]);
const GB_WILDFIRE_SOURCE = "경상북도 산불 대응 샘플 (매뉴얼 확보 후 교체)";
const GB_WILDFIRE = [
    {
        code: "GB-WF-001",
        stage: "관심",
        phase: "대응",
        title: "산불위험 기상정보 모니터링",
        content: "건조특보·강풍 예보와 산불위험지수를 수시로 확인하고 시·군에 공유한다.",
        details: [
            "기상청 건조·강풍 특보 및 예비특보 확인",
            "국가산불위험예보시스템 산불위험지수 확인",
            "시·군 산불담당 부서에 위험지역 공유"
        ],
        lead: "산림자원과",
        support: [
            "자연재난과"
        ],
        collab: [
            "대구지방기상청",
            "산림청"
        ],
        propagateTo: [
            "22개 시·군 산림부서"
        ],
        propagateMsg: "[경북도] 건조특보 발효 중. 산불위험지수 높음 지역 예찰 강화 바랍니다.",
        resources: [
            "산불위험예보시스템"
        ],
        damageMeasures: []
    },
    {
        code: "GB-WF-002",
        stage: "관심",
        phase: "대응",
        title: "산불감시 인력 배치 점검",
        content: "산불감시원·전문예방진화대 배치와 감시탑·CCTV 가동 상태를 점검한다.",
        details: [
            "시·군별 산불감시원·전문예방진화대 배치 현황 확인",
            "감시탑·무인감시카메라 가동 점검",
            "입산통제구역·등산로 폐쇄 현황 확인"
        ],
        lead: "산림자원과",
        support: [],
        collab: [
            "22개 시·군"
        ],
        propagateTo: [
            "22개 시·군 산림부서"
        ],
        propagateMsg: "",
        resources: [
            "산불감시원",
            "전문예방진화대",
            "무인감시카메라"
        ],
        damageMeasures: []
    },
    {
        code: "GB-WF-003",
        stage: "주의",
        phase: "대응",
        title: "산불방지대책본부 상황근무 강화",
        content: "산불 위기경보 주의 발령에 따라 도·시군 산불방지대책본부 상황근무를 강화한다.",
        details: [
            "도 산불방지대책본부 상황근무 인원 증원",
            "시·군 산불상황실 운영 상황 확인",
            "산불 발생 시 보고 체계 재확인"
        ],
        lead: "산림자원과",
        support: [
            "자연재난과"
        ],
        collab: [
            "산림청"
        ],
        propagateTo: [
            "22개 시·군",
            "소방본부"
        ],
        propagateMsg: "[경북도] 산불 위기경보 '주의' 발령. 상황근무 강화 및 소각행위 단속 바랍니다.",
        resources: [
            "상황근무 인원"
        ],
        damageMeasures: []
    },
    {
        code: "GB-WF-004",
        stage: "주의",
        phase: "대응",
        title: "불법 소각행위 단속 및 홍보",
        content: "영농부산물·쓰레기 소각 단속과 산불예방 홍보를 실시한다.",
        details: [
            "마을방송·재난문자 산불예방 홍보",
            "논·밭두렁 소각 단속반 운영",
            "산림인접지 화기 취급 계도"
        ],
        lead: "산림자원과",
        support: [
            "자연재난과"
        ],
        collab: [
            "읍·면·동",
            "경북경찰청"
        ],
        propagateTo: [
            "읍·면·동 주민"
        ],
        propagateMsg: "건조한 날씨가 지속되고 있습니다. 논·밭두렁 및 쓰레기 소각을 금지하여 주시기 바랍니다.",
        resources: [
            "단속반",
            "마을방송"
        ],
        damageMeasures: []
    },
    {
        code: "GB-WF-005",
        stage: "경계",
        phase: "대응",
        title: "산불 발생 상황 접수 및 전파",
        content: "산불 발생 신고를 접수하여 규모·위치·진화 상황을 파악하고 보고·전파한다.",
        details: [
            "발생 위치·시각·피해면적·진화자원 투입 현황 파악",
            "도지사·부지사 보고",
            "산림청·행정안전부 NDMS 보고",
            "유관기관 상황 전파"
        ],
        lead: "산림자원과",
        support: [
            "자연재난과",
            "재난안전상황실"
        ],
        collab: [
            "산림청",
            "소방본부",
            "경북경찰청"
        ],
        propagateTo: [
            "도지사·부지사",
            "관계 시·군",
            "유관기관"
        ],
        propagateMsg: "[경북도] ○○군 ○○면 산불 발생(○시 ○분). 진화헬기·인력 투입 중. 상황 공유 바랍니다.",
        resources: [
            "NDMS",
            "상황전파 SMS"
        ],
        damageMeasures: []
    },
    {
        code: "GB-WF-006",
        stage: "경계",
        phase: "대응",
        title: "재난안전대책본부 가동",
        content: "대형산불 우려 시 도 재난안전대책본부를 가동하고 실무반을 소집한다.",
        details: [
            "재난안전대책본부 가동 및 비상근무 명령",
            "실무반 소집 및 임무 부여",
            "상황판단회의 개최"
        ],
        lead: "자연재난과",
        support: [
            "산림자원과",
            "총무과"
        ],
        collab: [
            "산림청",
            "소방본부"
        ],
        propagateTo: [
            "실무반 담당부서",
            "22개 시·군 재난부서"
        ],
        propagateMsg: "[경북도] 재난안전대책본부 가동. 실무반 담당자는 즉시 상황실로 응소 바랍니다.",
        resources: [
            "비상근무 인원",
            "상황실"
        ],
        damageMeasures: []
    },
    {
        code: "GB-WF-007",
        stage: "경계",
        phase: "대응",
        title: "진화자원 동원 지원",
        content: "진화헬기·진화차·진화인력 동원을 요청하고 투입 현황을 관리한다.",
        details: [
            "산림청·소방 진화헬기 지원 요청",
            "인근 시·군 진화인력 응원 요청",
            "군 부대 진화인력 지원 요청",
            "자원 투입 현황 집계"
        ],
        lead: "산림자원과",
        support: [
            "자연재난과"
        ],
        collab: [
            "산림청",
            "소방본부",
            "제50사단"
        ],
        propagateTo: [
            "산림청",
            "소방본부",
            "제50사단"
        ],
        propagateMsg: "",
        resources: [
            "진화헬기",
            "산불진화차",
            "진화인력"
        ],
        damageMeasures: []
    },
    {
        code: "GB-WF-008",
        stage: "심각",
        phase: "대응",
        title: "주민 대피 및 통제",
        content: "산불 확산 경로상 주민을 대피시키고 도로를 통제한다.",
        details: [
            "확산 우려 마을 대피 명령 및 재난문자 발송",
            "대피소 개방 및 이재민 수용",
            "요양시설 등 취약시설 우선 대피",
            "주요 도로 통제 및 우회 안내"
        ],
        lead: "자연재난과",
        support: [
            "복지정책과"
        ],
        collab: [
            "관계 시·군",
            "경북경찰청",
            "소방본부"
        ],
        propagateTo: [
            "관계 시·군",
            "주민"
        ],
        propagateMsg: "[경북도] 산불 확산으로 ○○리 주민은 ○○초등학교로 즉시 대피하시기 바랍니다.",
        resources: [
            "대피소",
            "수송차량"
        ],
        damageMeasures: []
    },
    {
        code: "GB-WF-009",
        stage: "심각",
        phase: "대응",
        title: "주요시설 보호",
        content: "문화재·송전시설·공공시설 등 주요시설 방어선을 구축한다.",
        details: [
            "문화재·사찰 방화선 구축 및 살수",
            "송전선로·변전소 관계기관 협조",
            "공공시설 주변 방어진화"
        ],
        lead: "자연재난과",
        support: [
            "문화유산과"
        ],
        collab: [
            "한국전력공사",
            "소방본부"
        ],
        propagateTo: [
            "한국전력공사",
            "문화유산 관리기관"
        ],
        propagateMsg: "",
        resources: [
            "소방차",
            "살수장비"
        ],
        damageMeasures: []
    },
    {
        code: "GB-WF-010",
        stage: "심각",
        phase: "복구",
        title: "피해 상황 조사",
        content: "산림·주택·시설 피해와 인명피해를 조사하여 집계한다.",
        details: [
            "산림 피해면적 조사",
            "주택·농림시설 피해 조사",
            "인명피해 및 이재민 현황 집계",
            "NDMS 피해 입력"
        ],
        lead: "자연재난과",
        support: [
            "산림자원과"
        ],
        collab: [
            "관계 시·군",
            "산림청"
        ],
        propagateTo: [
            "행정안전부",
            "산림청"
        ],
        propagateMsg: "",
        resources: [
            "피해조사반"
        ],
        damageMeasures: [
            "피해 현황 NDMS 입력",
            "중앙합동조사 대비 자료 준비"
        ]
    },
    {
        code: "GB-WF-011",
        stage: "심각",
        phase: "복구",
        title: "이재민 구호",
        content: "이재민 임시주거와 구호물자를 지원한다.",
        details: [
            "임시주거시설 운영",
            "구호물자·급식 지원",
            "심리지원 연계"
        ],
        lead: "복지정책과",
        support: [
            "자연재난과"
        ],
        collab: [
            "대한적십자사 경북지사",
            "전국재해구호협회"
        ],
        propagateTo: [
            "관계 시·군 복지부서"
        ],
        propagateMsg: "",
        resources: [
            "구호물자",
            "임시주거시설"
        ],
        damageMeasures: [
            "재난지원금 지급 준비"
        ]
    },
    {
        code: "GB-WF-012",
        stage: "심각",
        phase: "복구",
        title: "잔불 정리 및 재발화 감시",
        content: "주불 진화 후 잔불을 정리하고 재발화 감시 인력을 배치한다.",
        details: [
            "잔불 정리 인력 투입",
            "뒷불 감시조 편성 및 배치",
            "재발화 시 즉시 보고"
        ],
        lead: "산림자원과",
        support: [],
        collab: [
            "관계 시·군",
            "산림청"
        ],
        propagateTo: [
            "관계 시·군"
        ],
        propagateMsg: "",
        resources: [
            "뒷불감시조"
        ],
        damageMeasures: []
    },
    {
        code: "GB-WF-013",
        stage: "심각",
        phase: "복구",
        title: "응급복구 및 2차 피해 예방",
        content: "산불 피해지 토사유출·산사태 등 2차 피해를 막기 위한 응급복구를 실시한다.",
        details: [
            "피해지 사방시설 응급 설치",
            "도로·전기·통신 응급복구",
            "우기 전 산사태 취약지 점검"
        ],
        lead: "자연재난과",
        support: [
            "산림자원과",
            "건설도시과"
        ],
        collab: [
            "한국전력공사",
            "관계 시·군"
        ],
        propagateTo: [
            "관계 시·군"
        ],
        propagateMsg: "",
        resources: [
            "복구장비"
        ],
        damageMeasures: [
            "2차 피해 우려지역 출입 통제"
        ]
    }
].map(_c = (a)=>({
        ...a,
        hazard: [
            "산불"
        ],
        page: 0
    }));
_c1 = GB_WILDFIRE;
var _c, _c1;
__turbopack_context__.k.register(_c, 'GB_WILDFIRE$[\n  {\n    code: "GB-WF-001", stage: "관심", phase: "대응", title: "산불위험 기상정보 모니터링",\n    content: "건조특보·강풍 예보와 산불위험지수를 수시로 확인하고 시·군에 공유한다.",\n    details: ["기상청 건조·강풍 특보 및 예비특보 확인", "국가산불위험예보시스템 산불위험지수 확인", "시·군 산불담당 부서에 위험지역 공유"],\n    lead: "산림자원과", support: ["자연재난과"], collab: ["대구지방기상청", "산림청"],\n    propagateTo: ["22개 시·군 산림부서"], propagateMsg: "[경북도] 건조특보 발효 중. 산불위험지수 높음 지역 예찰 강화 바랍니다.",\n    resources: ["산불위험예보시스템"], damageMeasures: [],\n  },\n  {\n    code: "GB-WF-002", stage: "관심", phase: "대응", title: "산불감시 인력 배치 점검",\n    content: "산불감시원·전문예방진화대 배치와 감시탑·CCTV 가동 상태를 점검한다.",\n    details: ["시·군별 산불감시원·전문예방진화대 배치 현황 확인", "감시탑·무인감시카메라 가동 점검", "입산통제구역·등산로 폐쇄 현황 확인"],\n    lead: "산림자원과", support: [], collab: ["22개 시·군"],\n    propagateTo: ["22개 시·군 산림부서"], propagateMsg: "", resources: ["산불감시원", "전문예방진화대", "무인감시카메라"], damageMeasures: [],\n  },\n  {\n    code: "GB-WF-003", stage: "주의", phase: "대응", title: "산불방지대책본부 상황근무 강화",\n    content: "산불 위기경보 주의 발령에 따라 도·시군 산불방지대책본부 상황근무를 강화한다.",\n    details: ["도 산불방지대책본부 상황근무 인원 증원", "시·군 산불상황실 운영 상황 확인", "산불 발생 시 보고 체계 재확인"],\n    lead: "산림자원과", support: ["자연재난과"], collab: ["산림청"],\n    propagateTo: ["22개 시·군", "소방본부"], propagateMsg: "[경북도] 산불 위기경보 \'주의\' 발령. 상황근무 강화 및 소각행위 단속 바랍니다.",\n    resources: ["상황근무 인원"], damageMeasures: [],\n  },\n  {\n    code: "GB-WF-004", stage: "주의", phase: "대응", title: "불법 소각행위 단속 및 홍보",\n    content: "영농부산물·쓰레기 소각 단속과 산불예방 홍보를 실시한다.",\n    details: ["마을방송·재난문자 산불예방 홍보", "논·밭두렁 소각 단속반 운영", "산림인접지 화기 취급 계도"],\n    lead: "산림자원과", support: ["자연재난과"], collab: ["읍·면·동", "경북경찰청"],\n    propagateTo: ["읍·면·동 주민"], propagateMsg: "건조한 날씨가 지속되고 있습니다. 논·밭두렁 및 쓰레기 소각을 금지하여 주시기 바랍니다.",\n    resources: ["단속반", "마을방송"], damageMeasures: [],\n  },\n  {\n    code: "GB-WF-005", stage: "경계", phase: "대응", title: "산불 발생 상황 접수 및 전파",\n    content: "산불 발생 신고를 접수하여 규모·위치·진화 상황을 파악하고 보고·전파한다.",\n    details: ["발생 위치·시각·피해면적·진화자원 투입 현황 파악", "도지사·부지사 보고", "산림청·행정안전부 NDMS 보고", "유관기관 상황 전파"],\n    lead: "산림자원과", support: ["자연재난과", "재난안전상황실"], collab: ["산림청", "소방본부", "경북경찰청"],\n    propagateTo: ["도지사·부지사", "관계 시·군", "유관기관"], propagateMsg: "[경북도] ○○군 ○○면 산불 발생(○시 ○분). 진화헬기·인력 투입 중. 상황 공유 바랍니다.",\n    resources: ["NDMS", "상황전파 SMS"], damageMeasures: [],\n  },\n  {\n    code: "GB-WF-006", stage: "경계", phase: "대응", title: "재난안전대책본부 가동",\n    content: "대형산불 우려 시 도 재난안전대책본부를 가동하고 실무반을 소집한다.",\n    details: ["재난안전대책본부 가동 및 비상근무 명령", "실무반 소집 및 임무 부여", "상황판단회의 개최"],\n    lead: "자연재난과", support: ["산림자원과", "총무과"], collab: ["산림청", "소방본부"],\n    propagateTo: ["실무반 담당부서", "22개 시·군 재난부서"], propagateMsg: "[경북도] 재난안전대책본부 가동. 실무반 담당자는 즉시 상황실로 응소 바랍니다.",\n    resources: ["비상근무 인원", "상황실"], damageMeasures: [],\n  },\n  {\n    code: "GB-WF-007", stage: "경계", phase: "대응", title: "진화자원 동원 지원",\n    content: "진화헬기·진화차·진화인력 동원을 요청하고 투입 현황을 관리한다.",\n    details: ["산림청·소방 진화헬기 지원 요청", "인근 시·군 진화인력 응원 요청", "군 부대 진화인력 지원 요청", "자원 투입 현황 집계"],\n    lead: "산림자원과", support: ["자연재난과"], collab: ["산림청", "소방본부", "제50사단"],\n    propagateTo: ["산림청", "소방본부", "제50사단"], propagateMsg: "",\n    resources: ["진화헬기", "산불진화차", "진화인력"], damageMeasures: [],\n  },\n  {\n    code: "GB-WF-008", stage: "심각", phase: "대응", title: "주민 대피 및 통제",\n    content: "산불 확산 경로상 주민을 대피시키고 도로를 통제한다.",\n    details: ["확산 우려 마을 대피 명령 및 재난문자 발송", "대피소 개방 및 이재민 수용", "요양시설 등 취약시설 우선 대피", "주요 도로 통제 및 우회 안내"],\n    lead: "자연재난과", support: ["복지정책과"], collab: ["관계 시·군", "경북경찰청", "소방본부"],\n    propagateTo: ["관계 시·군", "주민"], propagateMsg: "[경북도] 산불 확산으로 ○○리 주민은 ○○초등학교로 즉시 대피하시기 바랍니다.",\n    resources: ["대피소", "수송차량"], damageMeasures: [],\n  },\n  {\n    code: "GB-WF-009", stage: "심각", phase: "대응", title: "주요시설 보호",\n    content: "문화재·송전시설·공공시설 등 주요시설 방어선을 구축한다.",\n    details: ["문화재·사찰 방화선 구축 및 살수", "송전선로·변전소 관계기관 협조", "공공시설 주변 방어진화"],\n    lead: "자연재난과", support: ["문화유산과"], collab: ["한국전력공사", "소방본부"],\n    propagateTo: ["한국전력공사", "문화유산 관리기관"], propagateMsg: "", resources: ["소방차", "살수장비"], damageMeasures: [],\n  },\n  {\n    code: "GB-WF-010", stage: "심각", phase: "복구", title: "피해 상황 조사",\n    content: "산림·주택·시설 피해와 인명피해를 조사하여 집계한다.",\n    details: ["산림 피해면적 조사", "주택·농림시설 피해 조사", "인명피해 및 이재민 현황 집계", "NDMS 피해 입력"],\n    lead: "자연재난과", support: ["산림자원과"], collab: ["관계 시·군", "산림청"],\n    propagateTo: ["행정안전부", "산림청"], propagateMsg: "",\n    resources: ["피해조사반"], damageMeasures: ["피해 현황 NDMS 입력", "중앙합동조사 대비 자료 준비"],\n  },\n  {\n    code: "GB-WF-011", stage: "심각", phase: "복구", title: "이재민 구호",\n    content: "이재민 임시주거와 구호물자를 지원한다.",\n    details: ["임시주거시설 운영", "구호물자·급식 지원", "심리지원 연계"],\n    lead: "복지정책과", support: ["자연재난과"], collab: ["대한적십자사 경북지사", "전국재해구호협회"],\n    propagateTo: ["관계 시·군 복지부서"], propagateMsg: "", resources: ["구호물자", "임시주거시설"], damageMeasures: ["재난지원금 지급 준비"],\n  },\n  {\n    code: "GB-WF-012", stage: "심각", phase: "복구", title: "잔불 정리 및 재발화 감시",\n    content: "주불 진화 후 잔불을 정리하고 재발화 감시 인력을 배치한다.",\n    details: ["잔불 정리 인력 투입", "뒷불 감시조 편성 및 배치", "재발화 시 즉시 보고"],\n    lead: "산림자원과", support: [], collab: ["관계 시·군", "산림청"],\n    propagateTo: ["관계 시·군"], propagateMsg: "", resources: ["뒷불감시조"], damageMeasures: [],\n  },\n  {\n    code: "GB-WF-013", stage: "심각", phase: "복구", title: "응급복구 및 2차 피해 예방",\n    content: "산불 피해지 토사유출·산사태 등 2차 피해를 막기 위한 응급복구를 실시한다.",\n    details: ["피해지 사방시설 응급 설치", "도로·전기·통신 응급복구", "우기 전 산사태 취약지 점검"],\n    lead: "자연재난과", support: ["산림자원과", "건설도시과"], collab: ["한국전력공사", "관계 시·군"],\n    propagateTo: ["관계 시·군"], propagateMsg: "", resources: ["복구장비"], damageMeasures: ["2차 피해 우려지역 출입 통제"],\n  },\n].map');
__turbopack_context__.k.register(_c1, "GB_WILDFIRE");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/seed.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BUSAN_FLOOD",
    ()=>BUSAN_FLOOD,
    "BUSAN_PROCESS",
    ()=>BUSAN_PROCESS,
    "BUSAN_SOURCE",
    ()=>BUSAN_SOURCE,
    "prettifyTitle",
    ()=>prettifyTitle,
    "seedLibrary",
    ()=>seedLibrary,
    "selectSeed",
    ()=>selectSeed,
    "stepLabelOf",
    ()=>stepLabelOf,
    "stepOf",
    ()=>stepOf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$busan$2d$flood$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/busan-flood.json.[json].cjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$busan$2d$process$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/busan-process.json.[json].cjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$gb$2d$wildfire$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/gb-wildfire.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$common$2d$sop$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/common-sop.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/types.ts [app-client] (ecmascript)");
;
;
;
;
;
const VERBS = "접수|보고|전파|지시|확인|점검|운영|강화|실시|편성|파악|지원|가동|해제|개최|배치|결정|수립|조사|처리|통제|대피|구호|복구|홍보|관리|정비|요청|시행|교육|제출|취합|확보|활동|발령|발표|소집|명령|건의|방문|발송|모니터링";
function prettifyTitle(t) {
    let out = t.replace(/\s+/g, " ").trim();
    out = out.replace(/([가-힣])(\()/g, "$1 $2").replace(/(\))([가-힣])/g, "$1 $2").replace(/,(\S)/g, ", $1").replace(/에따른/g, "에 따른 ").replace(/([가-힣])및([가-힣])/g, "$1 및 $2").replace(/([가-힣]{2,})등([가-힣])/g, "$1 등 $2").replace(/([가-힣]{3,})(현황|체계|시설물|연락망|상황)([가-힣])/g, "$1 $2 $3").replace(new RegExp(`([가-힣]{2,})(${VERBS})(?=[\\s(,․]|$|(${VERBS}))`, "g"), "$1 $2");
    return out.replace(/\s{2,}/g, " ").trim();
}
const BUSAN_SOURCE = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$busan$2d$flood$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].source;
const BUSAN_FLOOD = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$busan$2d$flood$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].actions.map(_c = (a)=>({
        ...a,
        title: prettifyTitle(a.title),
        content: prettifyTitle(a.content)
    }));
_c1 = BUSAN_FLOOD;
const BUSAN_PROCESS = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$busan$2d$process$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stages.flatMap(_c2 = (st)=>st.missions.flatMap((m)=>m.actions.map((a)=>({
                code: `BSN-${a.code}`,
                manualCode: a.code,
                manualStage: st.label,
                stage: st.alert[0],
                phase: st.step === "수습복구" ? "복구" : "대응",
                hazard: [
                    "호우",
                    "태풍",
                    "대설"
                ],
                title: a.name,
                content: a.card?.content ? prettifyTitle(a.card.content) : "",
                details: a.details,
                lead: a.card?.lead ?? "자연재난과",
                support: a.card?.support ?? [],
                collab: a.card?.collab ?? [],
                propagateTo: a.card?.propagateTo ?? [],
                propagateMsg: a.card?.propagateMsg ?? "",
                resources: a.card?.resources ?? [],
                damageMeasures: a.card?.damageMeasures ?? [],
                page: a.card?.page ?? 34,
                mission: {
                    code: m.code,
                    name: m.name
                },
                condition: a.condition || undefined,
                notes: a.notes.length ? a.notes : undefined
            }))));
_c3 = BUSAN_PROCESS;
function seedLibrary(hazard, sido) {
    if (sido === "경상북도" && hazard === "산불") return {
        source: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$gb$2d$wildfire$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GB_WILDFIRE_SOURCE"],
        actions: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$gb$2d$wildfire$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GB_WILDFIRE"]
    };
    if (sido === "부산광역시" && hazard === "태풍/호우") return {
        source: BUSAN_SOURCE,
        actions: BUSAN_PROCESS
    };
    return {
        source: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$common$2d$sop$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMMON_SOURCE"],
        actions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$common$2d$sop$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["commonActions"])(hazard)
    };
}
function stepOf(a) {
    const m = a.manualStage ?? "";
    if (m.includes("징후")) return "징후감지";
    if (m.includes("초기")) return "초기대응";
    if (m.includes("비상")) return "비상대응";
    if (m.includes("수습") || m.includes("복구")) return "수습복구";
    if (a.phase === "복구") return "수습복구";
    if (a.stage === "관심") return "징후감지";
    if (a.stage === "주의") return "초기대응";
    return "비상대응";
}
function stepLabelOf(a) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STEP_LABEL"][stepOf(a)];
}
function selectSeed(hazard, sido, step) {
    const lib = seedLibrary(hazard, sido);
    const mine = (a)=>a.nd !== false;
    return {
        source: lib.source,
        actions: lib.actions.filter((a)=>mine(a) && stepOf(a) === step)
    };
}
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "BUSAN_FLOOD$(busan as { actions: SeedAction[] }).actions.map");
__turbopack_context__.k.register(_c1, "BUSAN_FLOOD");
__turbopack_context__.k.register(_c2, "BUSAN_PROCESS$(busanProcess as { stages: ProcessStage[] }).stages.flatMap");
__turbopack_context__.k.register(_c3, "BUSAN_PROCESS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/sop/convert.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HAZARD_CODE",
    ()=>HAZARD_CODE,
    "LEVEL_CODE",
    ()=>LEVEL_CODE,
    "STEP_CODE",
    ()=>STEP_CODE,
    "buildContext",
    ()=>buildContext,
    "emptyMission",
    ()=>emptyMission,
    "responseToSop",
    ()=>responseToSop,
    "seedToMission",
    ()=>seedToMission
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/nanoid/index.browser.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seed.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$regions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/regions.ts [app-client] (ecmascript)");
;
;
;
;
const STEP_CODE = {
    징후감지: "SIGN_DETECTION",
    초기대응: "INITIAL_RESPONSE",
    비상대응: "EMERGENCY_RESPONSE",
    수습복구: "RECOVERY"
};
const LEVEL_CODE = {
    관심: "INTEREST",
    주의: "CAUTION",
    경계: "ALERT",
    심각: "SERIOUS"
};
const HAZARD_CODE = {
    폭염: {
        code: "HEAT_WAVE",
        group: "자연재난"
    },
    "태풍/호우": {
        code: "TYPHOON_HEAVY_RAIN",
        group: "자연재난"
    },
    지진: {
        code: "EARTHQUAKE",
        group: "자연재난"
    },
    황사: {
        code: "YELLOW_DUST",
        group: "자연재난"
    },
    산불: {
        code: "WILDFIRE",
        group: "사회재난"
    },
    감염병: {
        code: "INFECTIOUS_DISEASE",
        group: "사회재난"
    },
    가축질병: {
        code: "LIVESTOCK_DISEASE",
        group: "사회재난"
    },
    다중밀집건축물붕괴대형사고: {
        code: "CROWDED_BUILDING_COLLAPSE",
        group: "사회재난"
    },
    정부주요시설: {
        code: "GOV_MAJOR_FACILITY",
        group: "사회재난"
    },
    학교시설: {
        code: "SCHOOL_FACILITY",
        group: "사회재난"
    }
};
/** 시도·발생지역 → 행정구역 이름 (T3Q가 이름으로 매뉴얼을 고른다: 시군구 → 시도 → 중앙) */ function regionsOf(sidoName, areas) {
    const node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$regions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sidoNode"])(sidoName) ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$regions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sidoNode"])("부산광역시");
    return {
        responsible: node.n,
        affected: areas.map((a)=>`${node.n} ${a}`)
    };
}
function buildContext(s) {
    const { responsible, affected } = regionsOf(s.sido || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$regions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ORG_SIDO"][s.orgId] || "부산광역시", s.areas);
    return {
        situationId: s.id,
        workType: s.kind === "drill" ? "DRILL" : "REAL",
        responsibleRegion: responsible,
        affectedRegions: affected,
        disasterType: s.hazard,
        alertLevel: LEVEL_CODE[s.alertLevel] ?? "CAUTION",
        responseStep: STEP_CODE[s.responseStep] ?? "INITIAL_RESPONSE",
        department: s.dept || undefined,
        baseTime: new Date().toISOString(),
        title: s.title,
        currentSituation: s.currentStatus || undefined,
        period: {
            start: new Date(s.periodStart).toISOString(),
            end: s.periodEnd ? new Date(s.periodEnd).toISOString() : undefined
        }
    };
}
function emptyMission(phase = "대응") {
    return {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])(8),
        code: "",
        phase,
        stage: "",
        title: "",
        content: "",
        lead: "",
        support: [],
        collab: [],
        details: [],
        propagation: {
            message: "",
            targetHint: [],
            contactIds: [],
            groupIds: [],
            channel: "SMS"
        },
        resources: [],
        status: "todo",
        result: "",
        damage: "",
        assignee: ""
    };
}
/** PDF 줄바꿈이 한글 낱말 가운데 남은 것을 잇는다 (예: 「발효⏎됨에」) */ const joinBroken = (t)=>t.replace(/([가-힣])\n([가-힣])/g, "$1$2");
/** 세부항목 한 줄 — 제목 + (다르면) 내용 + (있으면) 비고 */ function detailText(d) {
    const title = d.title?.trim() ?? "";
    const content = d.content?.trim() ?? "";
    const body = !title ? content : content && content !== title ? `${title} — ${content}` : title;
    return d.note?.trim() ? `${body} (${d.note.trim()})` : body;
}
function responseToSop(res) {
    // 주관(LEAD)은 T3Q(API-SOP v2, REQ-6)가 모든 조치에 채워 준다 — 주관이 비는 조치는 없다.
    // 혹시 LEAD가 비는 응답(옛 버전·예외)에만 쓰는 보완값: 표준매뉴얼은 고른 부서 칸 이름, 그 외는 비움
    // (현장조치 매뉴얼 departments 는 머리글이 섞일 수 있어 주관으로 쓰지 않는다).
    const rowOrg = res.manual?.manualKind === "표준" ? res.manual.departments?.[0] ?? "" : "";
    const groupOf = new Map(res.missions.map((g)=>[
            g.missionCode,
            {
                code: g.missionCode,
                name: g.missionName
            }
        ]));
    const missions = res.actions.slice().sort((a, b)=>a.orderHint - b.orderHint).map((a)=>{
        const prop = a.propagation[0];
        // 표준문안은 문안이 있는 첫 전파 행에서 (전파 행마다 문안이 있는 것은 아니다)
        const template = a.propagation.find((p)=>p.messageTemplate?.trim())?.messageTemplate ?? "";
        const leads = a.organizations.filter((o)=>o.role === "LEAD").map((o)=>o.name);
        const src = a.sources?.[0];
        return {
            ...emptyMission(a.phase === "RECOVERY" || a.category === "DAMAGE" ? "복구" : "대응"),
            code: a.actionCode,
            stage: a.phaseLabel ?? "",
            group: groupOf.get(a.missionCode),
            condition: a.condition?.trim() || undefined,
            notes: a.notes?.length ? a.notes : undefined,
            title: a.actionName,
            content: a.summary ?? "",
            // 주관이 여럿이면 첫째가 주관, 나머지는 지원 앞에
            lead: leads[0] ?? rowOrg,
            support: [
                ...leads.slice(1),
                ...a.organizations.filter((o)=>o.role === "SUPPORT").map((o)=>o.name)
            ],
            collab: a.organizations.filter((o)=>o.role === "COOPERATE").map((o)=>o.name),
            details: a.detailTasks.map((d)=>({
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])(6),
                    text: detailText(d),
                    done: false
                })).filter((d)=>d.text),
            propagation: {
                message: joinBroken(template),
                targetHint: [
                    ...new Set(a.propagation.map((p)=>p.target.trim()).filter(Boolean))
                ],
                contactIds: [],
                groupIds: [],
                channel: prop?.channelHint === "EMAIL" ? "EMAIL" : "SMS"
            },
            resources: a.resources.map((r)=>r.quantity ? `${r.name} ${r.quantity}${r.unit ?? ""}` : r.name),
            ...src?.docId ? {
                ref: {
                    docId: src.docId,
                    page: src.page,
                    pdfIndex: src.pdfIndex
                }
            } : {}
        };
    });
    return {
        source: "t3q",
        manual: res.manual?.docTitle,
        deptMatched: res.departmentMatched,
        generatedAt: new Date().toISOString(),
        missions
    };
}
function seedToMission(a) {
    return {
        ...emptyMission(a.phase === "복구" ? "복구" : "대응"),
        code: a.code,
        stage: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STEP_LABEL"][(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepOf"])(a)],
        group: a.mission,
        condition: a.condition,
        notes: a.notes,
        title: a.title,
        content: a.content,
        lead: a.lead,
        support: a.support,
        collab: a.collab,
        details: [
            ...a.details,
            ...a.damageMeasures
        ].map((d)=>({
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])(6),
                text: d,
                done: false
            })),
        propagation: {
            message: a.propagateMsg,
            targetHint: a.propagateTo,
            contactIds: [],
            groupIds: [],
            channel: "SMS"
        },
        resources: a.resources
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/sop/kind.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KIND_LABEL",
    ()=>KIND_LABEL,
    "counted",
    ()=>counted,
    "currentMission",
    ()=>currentMission,
    "isOnDemand",
    ()=>isOnDemand,
    "missionKind",
    ()=>missionKind,
    "progress",
    ()=>progress
]);
const KIND_LABEL = {
    process: "처리",
    decision: "상황판단",
    propagation: "상황전파"
};
function missionKind(m) {
    if (m.kind) return m.kind;
    if (/판단|회의|결정/.test(m.title)) return "decision";
    if (/전파|보고|홍보|통보|문자|안내|발령/.test(m.title)) return "propagation";
    return "process";
}
function isOnDemand(m) {
    return !!m.condition?.trim();
}
function counted(m) {
    return !isOnDemand(m) || m.status === "doing" || m.status === "done";
}
function currentMission(missions, skipId) {
    const main = missions.filter((m)=>m.id !== skipId && !isOnDemand(m));
    return main.find((m)=>m.status === "doing") ?? main.find((m)=>m.status === "todo");
}
function progress(missions) {
    const list = missions.filter(counted);
    return {
        done: list.filter((m)=>m.status === "done").length,
        total: list.length
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/sop/recipients.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** 전파 대상(전파그룹·조직·담당자) → 실제 수신자 — 화면과 서버가 같이 쓴다 */ __turbopack_context__.s([
    "recipientIds",
    ()=>recipientIds,
    "resolveRecipients",
    ()=>resolveRecipients,
    "unitMembers",
    ()=>unitMembers,
    "unitTree",
    ()=>unitTree
]);
function unitTree(units, id) {
    const out = [
        id
    ];
    for(let i = 0; i < out.length; i++)units.filter((u)=>u.parentId === out[i]).forEach((u)=>out.push(u.id));
    return out;
}
function unitMembers(b, id) {
    const ids = new Set(unitTree(b.units, id));
    return b.contacts.filter((c)=>ids.has(c.unitId)).map((c)=>c.id);
}
function recipientIds(b, s) {
    const ids = new Set(s.contactIds);
    b.groups.filter((g)=>s.groupIds.includes(g.id)).forEach((g)=>g.memberIds.forEach((x)=>ids.add(x)));
    (s.unitIds ?? []).forEach((u)=>unitMembers(b, u).forEach((x)=>ids.add(x)));
    return ids;
}
function resolveRecipients(b, s) {
    const ids = recipientIds(b, s);
    const unit = new Map(b.units.map((u)=>[
            u.id,
            u.name
        ]));
    return b.contacts.filter((c)=>ids.has(c.id)).map((c)=>({
            ...c,
            unit: unit.get(c.unitId) ?? ""
        }));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/sop/targets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "propagationTargets",
    ()=>propagationTargets,
    "sopChannel",
    ()=>sopChannel
]);
function propagationTargets(missions, b) {
    const g = new Map(b.groups.map((x)=>[
            x.id,
            x.name
        ]));
    const c = new Map(b.contacts.map((x)=>[
            x.id,
            `${x.name} ${x.title}`.trim()
        ]));
    const u = new Map((b.units ?? []).map((x)=>[
            x.id,
            x.name
        ]));
    return Object.fromEntries(missions.map((m)=>[
            m.id,
            [
                ...m.propagation.groupIds.map((id)=>g.get(id)).filter(Boolean),
                ...(m.propagation.unitIds ?? []).map((id)=>u.get(id)).filter(Boolean),
                ...m.propagation.contactIds.map((id)=>c.get(id)).filter(Boolean)
            ]
        ]));
}
const sopChannel = (situationId)=>`r4-sop-${situationId}`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** admin 운영관리(계정·매뉴얼 분석) · manager 기관관리(연락망 편집) · user 일반 · t3q T3Q 담당자(API 문서 열람). 상황·문서는 모두 자기 것만 */ __turbopack_context__.s([
    "ALERT_LEVELS",
    ()=>ALERT_LEVELS,
    "HAZARDS",
    ()=>HAZARDS,
    "RECORD_KINDS",
    ()=>RECORD_KINDS,
    "RESPONSE_STEPS",
    ()=>RESPONSE_STEPS,
    "STEP_BY_LEVEL",
    ()=>STEP_BY_LEVEL,
    "STEP_LABEL",
    ()=>STEP_LABEL
]);
const HAZARDS = [
    "폭염",
    "태풍/호우",
    "지진",
    "황사",
    "산불",
    "감염병",
    "가축질병",
    "다중밀집건축물붕괴대형사고",
    "정부주요시설",
    "학교시설"
];
const ALERT_LEVELS = [
    "관심",
    "주의",
    "경계",
    "심각"
];
const RESPONSE_STEPS = [
    "징후감지",
    "초기대응",
    "비상대응",
    "수습복구"
];
const STEP_LABEL = {
    징후감지: "1단계 징후감지",
    초기대응: "2단계 초기대응",
    비상대응: "3단계 비상대응",
    수습복구: "4단계 수습·복구"
};
const STEP_BY_LEVEL = {
    관심: "징후감지",
    주의: "초기대응",
    경계: "비상대응",
    심각: "비상대응"
};
const RECORD_KINDS = [
    "상황",
    "피해",
    "대피",
    "통제",
    "자원투입",
    "응급복구"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/use-visible-refresh.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVisibleRefresh",
    ()=>useVisibleRefresh
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useVisibleRefresh(ms, enabled = true) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useVisibleRefresh.useEffect": ()=>{
            if (!enabled) return;
            let t = null;
            const start = {
                "useVisibleRefresh.useEffect.start": ()=>{
                    if (!t) t = setInterval({
                        "useVisibleRefresh.useEffect.start": ()=>router.refresh()
                    }["useVisibleRefresh.useEffect.start"], ms);
                }
            }["useVisibleRefresh.useEffect.start"];
            const stop = {
                "useVisibleRefresh.useEffect.stop": ()=>{
                    if (t) clearInterval(t);
                    t = null;
                }
            }["useVisibleRefresh.useEffect.stop"];
            const onChange = {
                "useVisibleRefresh.useEffect.onChange": ()=>{
                    if (document.visibilityState === "visible") {
                        router.refresh();
                        start();
                    } else stop();
                }
            }["useVisibleRefresh.useEffect.onChange"];
            if (document.visibilityState === "visible") start();
            document.addEventListener("visibilitychange", onChange);
            return ({
                "useVisibleRefresh.useEffect": ()=>{
                    stop();
                    document.removeEventListener("visibilitychange", onChange);
                }
            })["useVisibleRefresh.useEffect"];
        }
    }["useVisibleRefresh.useEffect"], [
        ms,
        enabled,
        router
    ]);
}
_s(useVisibleRefresh, "vQduR7x+OPXj6PSmJyFnf+hU7bg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0i_wcsh._.js.map