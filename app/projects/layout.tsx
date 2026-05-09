// app/layout.tsx  —  Add CustomCursor here so it works on ALL pages
//
// ─── STEP 1: import it ────────────────────────────────────────────────────────

 import { CustomCursor } from "@/components/CustomCursor";  

// ─── STEP 2: render it inside <body> ─────────────────────────────────────────
// It must be a client component, which it already is.
// The <CustomCursor /> renders nothing on server, mounts only on client.

export default function LayoutCursorInstructions({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Global custom cursor — renders above everything via z-[9999] */}
 

      {children}
    </>
  );
}

// ─── STEP 3: add data-cursor attribute to any element for custom labels ───────
// Example — image cards, CTA buttons, nav links:
//
//   <div data-cursor="View">...</div>
//   <button data-cursor="Click">...</button>
//   <a href="..." data-cursor="Open">...</a>
//
// When hovered, the ring expands and shows that label inside it.
//
// ─── STEP 4: disable on touch devices (optional) ─────────────────────────────
// The cursor auto-hides when mouse leaves window.
// On touch devices, it never appears because mousemove never fires.
// No extra code needed.
