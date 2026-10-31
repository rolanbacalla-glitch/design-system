import {
  COMPILED_COMPONENT_TOKENS,
  COMPILED_SEMANTIC_TOKENS,
  type CompiledComponentToken,
  type CompiledSemanticToken,
} from "@/lib/tokens.generated";

export type ComponentSlug = "form-field" | "modal-dialog" | "data-table" | "button";

export type InteractiveStateMode =
  | "default"
  | "hover"
  | "focus-visible"
  | "active"
  | "disabled"
  | "error";

export interface AnatomySlot {
  slot: string;
  element: string;
  geometry: string;
  tokenBinding: string;
}

export interface AccessibilityRule {
  criterion: string;
  wcagRef: string;
  requirement: string;
}

export interface ComponentSpec {
  slug: ComponentSlug;
  name: string;
  bucket: string;
  zLayer: "Z-Level 1 (Tonal Surface)" | "Z-Level 2 (Floating Liquid Glass / Modal Overlay)";
  tagline: string;
  summary: string;
  whenToUse: string[];
  whenNotToUse: string[];
  anatomy: AnatomySlot[];
  concentricFormula: string;
  semanticTokenNames: string[];
  ariaRole: string;
  ariaAttributes: string[];
  keyboardMap: { key: string; behavior: string }[];
  accessibilityRules: AccessibilityRule[];
  codeSnippet: string;
  figmaNodePath: string;
  stitchComponentKey: string;
}

export const COMPONENT_REGISTRY: Record<ComponentSlug, ComponentSpec> = {
  "form-field": {
    slug: "form-field",
    name: "Accessible Form Field Input",
    bucket: "02 // Forms & Inputs",
    zLayer: "Z-Level 1 (Tonal Surface)",
    tagline:
      "Floating & stacked label text field with real-time ARIA validation, polite live error recovery, and WCAG 2.2 SC 2.4.11 focus ring geometry.",
    summary:
      "Engineered for high-density enterprise forms and configuration inspectors. Binds strictly to Tier-2 semantic surface, border, and validation tokens without trapping keyboard focus.",
    whenToUse: [
      "Collecting structured single-line text, email, OKLCH token coordinates, or API keys with immediate inline validation.",
      "Forms requiring explicit programmatic label association (<label htmlFor>), helper guidance, and screen-reader error announcements.",
    ],
    whenNotToUse: [
      "Choosing from a fixed set of 2–5 mutually exclusive options (use SegmentedControl or RadioGroup instead).",
      "Multi-line freeform prose longer than 120 characters (use an auto-expanding Textarea primitive).",
    ],
    anatomy: [
      {
        slot: "01. Label Header",
        element: "<label htmlFor={id}> + Required Indicator",
        geometry: "Font: 13px Plus Jakarta Sans 600 • Margin-bottom: 6px",
        tokenBinding: "--comp-form-field-text-label -> var(--text-secondary)",
      },
      {
        slot: "02. Input Well Container",
        element: "div.relative.flex.items-center",
        geometry: "Min-Height: 44px (WCAG 2.5.8) • Radius: 12px (--radius-md) • Padding: 0 14px",
        tokenBinding: "--comp-form-field-bg-default -> var(--bg-surface-recessed)",
      },
      {
        slot: "03. Focus & Validation Ring",
        element: "input:focus-visible / [aria-invalid='true']",
        geometry: "Outline: 2px solid • Offset: 2px (WCAG 2.2 SC 2.4.11)",
        tokenBinding: "--comp-form-field-border-focus -> var(--border-focus-ring)",
      },
      {
        slot: "04. Helper & Live Error Region",
        element: "p[role='status'][aria-live='polite']",
        geometry: "Font: 12px • Icon: 14px WarningCircle/CheckCircle • Gap: 6px",
        tokenBinding: "--comp-form-field-text-error -> var(--text-feedback-error)",
      },
    ],
    concentricFormula:
      "R_outer (Field Card 16px) = R_inner (Input Well 12px) + Padding (4px focus offset clearance)",
    semanticTokenNames: [
      "bg-surface-recessed",
      "bg-surface-hover",
      "bg-feedback-error-subtle",
      "text-primary",
      "text-secondary",
      "text-muted",
      "text-feedback-error",
      "text-feedback-success",
      "border-default",
      "border-focus-ring",
      "border-feedback-error",
    ],
    ariaRole: "textbox (native <input>)",
    ariaAttributes: [
      'aria-invalid="true | false"',
      'aria-describedby="{id}-helper {id}-error"',
      'aria-errormessage="{id}-error"',
      'aria-required="true"',
      'aria-live="polite" (on validation feedback container)',
    ],
    keyboardMap: [
      {
        key: "Tab / Shift + Tab",
        behavior:
          "Moves focus cleanly into and out of the input (Strict WCAG 2.1.2 No Keyboard Trap compliance).",
      },
      {
        key: "Escape",
        behavior: "Clears transient validation tooltip or resets unsubmitted draft value when configured.",
      },
      {
        key: "Enter",
        behavior: "Triggers parent form submission and runs synchronous schema validation.",
      },
    ],
    accessibilityRules: [
      {
        criterion: "WCAG 2.2 SC 2.4.11 Focus Appearance",
        wcagRef: "2.4.11 (AA)",
        requirement:
          "Focus-visible outline is 2px solid var(--border-focus-ring) with 2px offset, achieving 8.4:1 contrast in Dark mode and 6.1:1 in Light mode.",
      },
      {
        criterion: "WCAG 2.2 SC 2.5.8 Target Size (Minimum)",
        wcagRef: "2.5.8 (AA)",
        requirement:
          "Input well enforces a 44px minimum height, and the trailing clear/visibility toggle button enforces a 28x28px hit target.",
      },
      {
        criterion: "WCAG 2.2 SC 3.3.1 & 3.3.3 Error Identification",
        wcagRef: "3.3.1 (A) / 3.3.3 (AA)",
        requirement:
          "Error state combines border colour, background tint, WarningCircle icon, and explicit corrective text linked via aria-describedby.",
      },
    ],
    codeSnippet: `"use client";

import React, { useId } from "react";

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  errorMessage?: string;
  isInvalid?: boolean;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, helperText, errorMessage, isInvalid = false, disabled, required, ...props }, ref) => {
    const id = useId();
    const helperId = \`\${id}-helper\`;
    const errorId = \`\${id}-error\`;

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={id}
          className="block text-xs font-semibold tracking-tight text-[var(--comp-form-field-text-label)]"
        >
          {label}
          {required && <span className="ml-1 text-[var(--text-feedback-error)]" aria-hidden="true">*</span>}
        </label>

        <input
          ref={ref}
          id={id}
          disabled={disabled}
          required={required}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? \`\${helperId} \${errorId}\` : helperId}
          aria-errormessage={isInvalid ? errorId : undefined}
          className={[
            "w-full min-h-[44px] px-3.5 py-2.5 rounded-[var(--comp-form-field-radius)] text-sm font-mono tabular-nums transition-all",
            "bg-[var(--comp-form-field-bg-default)] text-[var(--comp-form-field-text-value)]",
            "border border-[var(--comp-form-field-border-default)]",
            "hover:bg-[var(--comp-form-field-bg-hover)]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--comp-form-field-border-focus)]",
            "disabled:opacity-45 disabled:cursor-not-allowed",
            isInvalid && "border-[var(--comp-form-field-border-error)] bg-[var(--comp-form-field-bg-error)]",
          ].filter(Boolean).join(" ")}
          {...props}
        />

        {helperText && (
          <p id={helperId} className="text-xs text-[var(--comp-form-field-text-helper)]">
            {helperText}
          </p>
        )}

        <div aria-live="polite" role="status">
          {isInvalid && errorMessage && (
            <p id={errorId} className="text-xs font-medium text-[var(--comp-form-field-text-error)]">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    );
  }
);
FormField.displayName = "FormField";`,
    figmaNodePath: "Components / 02-Forms / FormField-Input",
    stitchComponentKey: "components.form-field",
  },

  "modal-dialog": {
    slug: "modal-dialog",
    name: "Focus-Trapped Modal Dialogue",
    bucket: "05 // Overlays & Containment",
    zLayer: "Z-Level 2 (Floating Liquid Glass / Modal Overlay)",
    tagline:
      "WAI-ARIA compliant modal dialogue implementing Radix FocusScope keyboard trapping, Escape dismissal, and return-focus restoration.",
    summary:
      "Designed for high-consequence confirmations, token asset exports, and schema editors. Implements strict focus containment while active and restores focus to the invoking trigger upon unmount.",
    whenToUse: [
      "Interrupting the current workflow for critical confirmations, token export configurations, or focused sub-forms.",
      "Scenarios requiring strict keyboard focus containment (Radix FocusScope pattern) so background controls cannot be accidentally activated.",
    ],
    whenNotToUse: [
      "Passive status notifications that do not require user action (use InlineAlert or ToastNotification instead).",
      "Multi-page linear workflows with more than 4 form inputs (use a dedicated route or full-height DrawerSheet).",
    ],
    anatomy: [
      {
        slot: "01. Backdrop Scrim",
        element: "div.fixed.inset-0.z-50",
        geometry: "Viewport fill • Optical Backdrop Blur 8px • Opacity 68%",
        tokenBinding: "--bg-canvas / 68% + backdrop-filter: blur(8px)",
      },
      {
        slot: "02. Dialogue Surface (FocusScope)",
        element: "div[role='dialog'][aria-modal='true']",
        geometry: "Max-Width: 520px • Radius: 24px (--radius-xl) • Padding: 24px (--spacing-6)",
        tokenBinding: "--comp-modal-dialog-bg-surface -> var(--bg-surface-elevated)",
      },
      {
        slot: "03. Header & Close Trigger",
        element: "h2[id={titleId}] + button[aria-label='Close dialog']",
        geometry: "Close Hit Target: 36x36px (exceeds 24px WCAG 2.5.8 minimum)",
        tokenBinding: "--comp-modal-dialog-text-title -> var(--text-primary)",
      },
      {
        slot: "04. Action Footer Bar",
        element: "footer.flex.justify-end.gap-3",
        geometry: "Button Height: 40px • Inner Radius: 12px (Concentric with 24px outer shell)",
        tokenBinding: "--comp-button-bg-primary -> var(--bg-action-primary)",
      },
    ],
    concentricFormula:
      "R_outer (Modal Shell 24px) = R_inner (Action Button 12px) + Internal Padding/Margin Factor (12px)",
    semanticTokenNames: [
      "bg-surface-elevated",
      "bg-surface-recessed",
      "bg-action-primary",
      "bg-action-primary-hover",
      "text-primary",
      "text-secondary",
      "text-on-action",
      "border-default",
      "border-focus-ring",
    ],
    ariaRole: 'dialog (aria-modal="true")',
    ariaAttributes: [
      'role="dialog"',
      'aria-modal="true"',
      'aria-labelledby="{dialogTitleId}"',
      'aria-describedby="{dialogDescriptionId}"',
    ],
    keyboardMap: [
      {
        key: "Tab",
        behavior:
          "Cycles focus forward strictly within focusable modal children; wraps from last button back to first button (FocusScope trap).",
      },
      {
        key: "Shift + Tab",
        behavior:
          "Cycles focus backward strictly within modal children; wraps from first focusable control to last focusable control.",
      },
      {
        key: "Escape",
        behavior:
          "Immediately closes the modal dialogue and restores focus to the trigger button that opened it.",
      },
    ],
    accessibilityRules: [
      {
        criterion: "WAI-ARIA 1.2 Modal Focus Containment",
        wcagRef: "2.1.1 (A) / 2.4.3 (A)",
        requirement:
          "Focus moves into the dialogue on open, traps Tab/Shift+Tab inside the FocusScope boundary, and returns focus to the trigger on close.",
      },
      {
        criterion: "WCAG 2.2 SC 2.4.11 Focus Appearance",
        wcagRef: "2.4.11 (AA)",
        requirement:
          "Close button and footer actions display a 2px solid var(--border-focus-ring) outline with 2px offset.",
      },
      {
        criterion: "WCAG 2.2 SC 2.5.8 Target Size (Minimum)",
        wcagRef: "2.5.8 (AA)",
        requirement:
          "Dismiss icon button is 36x36px and footer buttons are 40px tall, exceeding the 24x24px minimum.",
      },
    ],
    codeSnippet: `"use client";

import React, { useEffect, useRef, useId } from "react";

export interface ModalDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const ModalDialog: React.FC<ModalDialogProps> = ({
  open,
  onClose,
  title,
  description,
  children,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!open) return;
    const node = dialogRef.current;
    if (!node) return;

    const focusables = node.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    focusables[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      ref={dialogRef}
      className="rounded-[var(--comp-modal-dialog-radius)] p-6 bg-[var(--comp-modal-dialog-bg-surface)] border border-[var(--comp-modal-dialog-border-surface)] shadow-2xl"
    >
      <h2 id={titleId} className="text-lg font-bold text-[var(--comp-modal-dialog-text-title)]">
        {title}
      </h2>
      <p id={descId} className="mt-1 text-sm text-[var(--comp-modal-dialog-text-body)]">
        {description}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
};`,
    figmaNodePath: "Components / 05-Overlays / ModalDialog",
    stitchComponentKey: "components.modal-dialog",
  },

  "data-table": {
    slug: "data-table",
    name: "Interactive Token & Telemetry Data Table",
    bucket: "06 // Data Presentation",
    zLayer: "Z-Level 1 (Tonal Surface)",
    tagline:
      "Sortable, filterable enterprise data grid with aria-sort column headers, row selection, and mandatory tabular-nums alignment.",
    summary:
      "Renders dense technical telemetry and design token audits on a crisp Z-Level 1 tonal container. Supports keyboard-accessible column sorting, search filtering, and zero-trap Tab traversal.",
    whenToUse: [
      "Comparing multi-attribute records such as design token lineage, cluster telemetry, or WCAG contrast audits.",
      "Datasets requiring sortable numeric columns (tabular-nums) and deterministic empty-filter recovery.",
    ],
    whenNotToUse: [
      "Displaying 3–4 high-level summary KPIs (use KeyValueMetricCard bento tiles instead).",
      "Unstructured narrative content or marketing feature comparisons.",
    ],
    anatomy: [
      {
        slot: "01. Table Control Bar",
        element: "div.flex.items-center.justify-between",
        geometry: "Search Input (min-h 38px) + Filter Segmented Pills + Row Counter",
        tokenBinding: "--bg-surface-recessed / --border-subtle",
      },
      {
        slot: "02. Sticky Table Header (<thead>)",
        element: "th[scope='col'][aria-sort]",
        geometry: "Height: 44px • Padding: 12px 16px • Sort Button Hit Target: >= 36px",
        tokenBinding: "--comp-data-table-bg-header -> var(--bg-surface-elevated)",
      },
      {
        slot: "03. Interactive Data Row (<tr>)",
        element: "tr[aria-selected='true | false']",
        geometry: "Height: 48px • Font: JetBrains Mono tabular-nums • 1px bottom hairline",
        tokenBinding: "--comp-data-table-bg-row-hover -> var(--bg-surface-hover)",
      },
      {
        slot: "04. Semantic Status Cell",
        element: "span.rounded-full (StatusBadge)",
        geometry: "Padding: 2px 10px • Radius: 9999px",
        tokenBinding: "--text-feedback-success / --bg-feedback-success-subtle",
      },
    ],
    concentricFormula:
      "R_outer (Table Container 16px) = R_inner (Toolbar Input / Status Pill 8px) + Container Padding (8px)",
    semanticTokenNames: [
      "bg-surface-card",
      "bg-surface-elevated",
      "bg-surface-hover",
      "bg-action-primary-subtle",
      "text-primary",
      "text-secondary",
      "text-muted",
      "text-feedback-success",
      "text-feedback-error",
      "border-subtle",
      "border-focus-ring",
    ],
    ariaRole: "table (semantic <table>, <thead>, <tbody>, <th scope='col'>)",
    ariaAttributes: [
      'aria-sort="ascending | descending | none" (on sortable <th> elements)',
      'aria-selected="true | false" (on selectable <tr> rows)',
      'aria-label="Filter token records" (on toolbar search input)',
      'aria-live="polite" (on filtered row count announcement)',
    ],
    keyboardMap: [
      {
        key: "Tab / Shift + Tab",
        behavior:
          "Traverses cleanly through search input, column sort buttons, and row selection checkboxes without trapping focus.",
      },
      {
        key: "Enter / Space",
        behavior:
          "Activates the focused column sort button (toggling ascending/descending) or toggles the focused row checkbox.",
      },
    ],
    accessibilityRules: [
      {
        criterion: "WAI-ARIA Table Sort Announcement",
        wcagRef: "1.3.1 (A) / 4.1.2 (A)",
        requirement:
          "Sortable <th> elements declare aria-sort='ascending' or 'descending' and contain a focusable <button> trigger.",
      },
      {
        criterion: "Tabular Numeral Scannability",
        wcagRef: "1.3.2 (A)",
        requirement:
          "All contrast ratios, latency values, and token numbers enforce font-variant-numeric: tabular-nums so decimal points align vertically.",
      },
    ],
    codeSnippet: `"use client";

import React, { useState } from "react";

export interface TokenAuditRow {
  token: string;
  tier2: string;
  contrast: number;
  status: "AAA" | "AA";
}

export const TokenAuditTable: React.FC<{ rows: TokenAuditRow[] }> = ({ rows }) => {
  const [sortAsc, setSortAsc] = useState(false);
  const sorted = [...rows].sort((a, b) =>
    sortAsc ? a.contrast - b.contrast : b.contrast - a.contrast
  );

  return (
    <div className="rounded-[var(--comp-data-table-radius)] bg-[var(--comp-data-table-bg-container)] border border-[var(--comp-data-table-border-row)] overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[var(--comp-data-table-bg-header)] border-b border-[var(--comp-data-table-border-row)]">
          <tr>
            <th scope="col" className="py-3 px-4 text-xs font-mono uppercase text-[var(--comp-data-table-text-header)]">
              Token
            </th>
            <th
              scope="col"
              aria-sort={sortAsc ? "ascending" : "descending"}
              className="py-3 px-4 text-xs font-mono uppercase text-[var(--comp-data-table-text-header)]"
            >
              <button
                type="button"
                onClick={() => setSortAsc((prev) => !prev)}
                className="inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-[var(--border-focus-ring)] rounded px-1"
              >
                Contrast ({sortAsc ? "↑" : "↓"})
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--comp-data-table-border-row)] font-mono text-xs tabular-nums">
          {sorted.map((row) => (
            <tr key={row.token} className="hover:bg-[var(--comp-data-table-bg-row-hover)] transition-colors">
              <td className="py-3 px-4 text-[var(--comp-data-table-text-cell)]">{row.token}</td>
              <td className="py-3 px-4 text-[var(--text-feedback-success)]">{row.contrast}:1 ({row.status})</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};`,
    figmaNodePath: "Components / 06-Data / DataTable",
    stitchComponentKey: "components.data-table",
  },

  button: {
    slug: "button",
    name: "M3 Shape-Morphing Action Button",
    bucket: "01 // Actions & Triggers",
    zLayer: "Z-Level 1 (Tonal Surface)",
    tagline:
      "Primary, Tonal, Outline, and Destructive triggers with Material 3 Expressive active corner morphing (12px -> 9999px pill).",
    summary:
      "Provides immediate tactile confirmation on pointer or keyboard press by morphing its border radius from 12px (--radius-md) to a full 9999px pill (--radius-pill) using spring physics.",
    whenToUse: [
      "Primary form submissions, modal confirmations, and cross-platform export triggers.",
      "High-emphasis actions requiring unmistakable hover, focus-visible, and active-press feedback.",
    ],
    whenNotToUse: [
      "Navigating between external URLs or documentation pages without side effects (use Link instead).",
      "Toggling a persistent on/off preference (use Switch instead).",
    ],
    anatomy: [
      {
        slot: "01. Button Surface",
        element: "button[type='button']",
        geometry: "Min-Height: 40px (WCAG 2.5.8) • Padding: 10px 18px • Resting Radius: 12px",
        tokenBinding: "--comp-button-bg-primary -> var(--bg-action-primary)",
      },
      {
        slot: "02. Active Shape Morph",
        element: "button:active",
        geometry: "Active Radius: 9999px (--comp-button-radius-pressed) • Scale: 0.98",
        tokenBinding: "--comp-button-radius-pressed -> var(--radius-pill)",
      },
      {
        slot: "03. Label & Leading Icon",
        element: "span.font-semibold + Phosphor Icon (16px)",
        geometry: "Font: 13px Plus Jakarta Sans 600 • Gap: 8px",
        tokenBinding: "--comp-button-text-primary -> var(--text-on-action)",
      },
    ],
    concentricFormula:
      "R_outer (Card Footer 20px) = R_inner (Button Resting 12px) + Footer Padding (8px)",
    semanticTokenNames: [
      "bg-action-primary",
      "bg-action-primary-hover",
      "bg-action-primary-subtle",
      "bg-surface-elevated",
      "text-on-action",
      "text-primary",
      "text-feedback-error",
      "border-default",
      "border-focus-ring",
    ],
    ariaRole: "button (native <button>)",
    ariaAttributes: [
      'type="button | submit"',
      'aria-disabled="true | false"',
      'aria-busy="true | false"',
    ],
    keyboardMap: [
      {
        key: "Enter / Space",
        behavior: "Activates the button action and triggers tactile shape-morph feedback.",
      },
      {
        key: "Tab / Shift + Tab",
        behavior: "Moves focus to/from the button with a 2px solid focus-visible ring.",
      },
    ],
    accessibilityRules: [
      {
        criterion: "WCAG 2.2 SC 2.5.8 Target Size (Minimum)",
        wcagRef: "2.5.8 (AA)",
        requirement: "Enforces a 40px minimum height (exceeding the 24x24px WCAG 2.2 AA floor).",
      },
      {
        criterion: "WCAG 2.2 SC 1.4.3 Contrast (Minimum)",
        wcagRef: "1.4.3 (AA)",
        requirement:
          "text-on-action against bg-action-primary achieves 9.8:1 in Dark mode and 6.1:1 in Light mode.",
      },
    ],
    codeSnippet: `"use client";

import React from "react";

export interface MorphButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "tonal" | "outline" | "danger";
}

export const MorphButton: React.FC<MorphButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      type="button"
      className={[
        "min-h-[40px] px-4 py-2.5 text-xs font-semibold inline-flex items-center justify-center gap-2 cursor-pointer",
        "rounded-[var(--comp-button-radius-rest)] active:rounded-[var(--comp-button-radius-pressed)] active:scale-[0.98]",
        "transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--comp-button-border-focus)]",
        "disabled:opacity-45 disabled:pointer-events-none",
        variant === "primary" &&
          "bg-[var(--comp-button-bg-primary)] hover:bg-[var(--comp-button-bg-primary-hover)] text-[var(--comp-button-text-primary)]",
        className,
      ].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};`,
    figmaNodePath: "Components / 01-Actions / MorphButton",
    stitchComponentKey: "components.button-primary",
  },
};

export const COMPONENT_SLUGS = Object.keys(COMPONENT_REGISTRY) as ComponentSlug[];

export function getComponentSemanticTokens(slug: ComponentSlug): CompiledSemanticToken[] {
  const spec = COMPONENT_REGISTRY[slug];
  if (!spec) return [];
  return COMPILED_SEMANTIC_TOKENS.filter((t) => spec.semanticTokenNames.includes(t.name));
}

export function getComponentTier3Tokens(slug: ComponentSlug): CompiledComponentToken[] {
  return COMPILED_COMPONENT_TOKENS.filter((t) => t.component === slug);
}
