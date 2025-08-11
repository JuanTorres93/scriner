import React from "react";
import styled, { css } from "styled-components";
import { EDIT_TYPES } from "./editTypes";
import { useCurrentEdits } from "./CurrentEditsContext";
import { useEdits } from "./hooks/useEdits";

const markHeightPx = 6;
const spaceBetweenMarksPx = 12;

const hoverStyle = css`
  opacity: 1;
  transform: scaleY(1.6);
`;

const StyledSpan = styled.span`
  position: relative;
  background-color: transparent;
  font-weight: var(--font-weight-thinest);

  .line-mark {
    position: absolute;
    height: ${markHeightPx}px;
    opacity: 0.5;
    transition: transform 0.2s ease, opacity 0.2s ease;
    pointer-events: auto; /* recibe hover/click */
    z-index: 2; /* por encima del texto */
    cursor: pointer;
  }

  .line-mark:hover {
    ${hoverStyle}
  }
  .line-mark.current {
    ${hoverStyle}
  }
  .line-mark.done {
    background-color: var(--color-grey) !important;
    opacity: 0.35;
  }

  .leaf-text {
    position: relative;
    z-index: 1; /* texto debajo de las bandas */
    pointer-events: auto;
  }
`;

/* Carriles por tipo: lado (over/under), índice vertical y variable CSS del color */
const LANES = {
  [EDIT_TYPES.SFX]: { idx: 0, side: "under", var: "--color-sfx" },
  [EDIT_TYPES.VFX]: { idx: 0, side: "over", var: "--color-vfx" },
  [EDIT_TYPES.GRAPHIC]: { idx: 1, side: "over", var: "--color-graphic" },
  [EDIT_TYPES.BROLL]: { idx: 2, side: "over", var: "--color-broll" },
  [EDIT_TYPES.MUSIC]: { idx: 1, side: "under", var: "--color-music" },
};

function InlineEdit(props) {
  const containerRef = React.useRef(null);
  const textRef = React.useRef(null);
  const [rects, setRects] = React.useState([]);

  const editIds = props.editIds || [];
  const { setCurrentEditsIds, isCurrentEdit } = useCurrentEdits();
  const { edits } = useEdits();

  // Medición de líneas reales (un rect por línea envuelta)
  React.useLayoutEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const measure = () => {
      const range = document.createRange();
      range.selectNodeContents(textRef.current);
      setRects(Array.from(range.getClientRects()));
    };

    measure();

    // Re-medimos si cambia el tamaño del contenedor/ventana o fonts
    const ro = new ResizeObserver(measure);
    ro.observe(containerRef.current);
    window.addEventListener("resize", measure);

    // Si tu contenido cambia por clase/estilo, esto lo captura
    const mo = new MutationObserver(measure);
    mo.observe(textRef.current, {
      characterData: true,
      subtree: true,
      childList: true,
    });

    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [props.children]);

  function handleClick(e) {
    e.preventDefault();
    if (!editIds.length || !setCurrentEditsIds) return;

    const next = {};
    editIds.forEach((edit) => {
      next[edit.type] = edit.editId;
    });
    setCurrentEditsIds((prev) => ({ ...prev, ...next }));
  }

  function extractEditIdFromType(type) {
    const ed = editIds.find((e) => e.type === type);
    return ed ? ed.editId : null;
  }

  function classFor(type) {
    const id = extractEditIdFromType(type);
    const cur = isCurrentEdit({ type, id });
    const done = edits?.some((e) => e.id === id && e.isDone);
    return `line-mark ${type} ${cur ? "current" : ""} ${
      done ? "done" : ""
    }`.trim();
  }

  const containerBox = containerRef.current?.getBoundingClientRect();

  function renderBandsFor(type) {
    if (!props.leaf?.[type] || !containerBox) return null;

    const lane = LANES[type];
    const color = `var(${lane.var})`;
    const id = extractEditIdFromType(type);

    return rects.map((r, i) => {
      // coordenadas relativas al contenedor
      const left = r.left - containerBox.left;
      const width = r.width;

      // posición vertical: por encima ("over") o por debajo ("under") de la línea
      const baseTop =
        lane.side === "under"
          ? r.bottom - containerBox.top
          : r.top - containerBox.top;

      const top =
        lane.side === "under"
          ? baseTop + lane.idx * (markHeightPx + spaceBetweenMarksPx)
          : baseTop - (lane.idx + 1) * (markHeightPx + spaceBetweenMarksPx);

      return (
        <span
          key={`${type}-${i}`}
          data-edit-id={id}
          className={classFor(type)}
          onClick={handleClick}
          style={{
            left,
            top,
            width,
            height: markHeightPx,
            background: color,
          }}
        />
      );
    });
  }

  return (
    // span porque todo leaf en Slate debe ser inline
    <StyledSpan ref={containerRef} onClick={handleClick} {...props.attributes}>
      {/* Bandas por línea y por tipo activo */}
      {renderBandsFor(EDIT_TYPES.VFX)}
      {renderBandsFor(EDIT_TYPES.SFX)}
      {renderBandsFor(EDIT_TYPES.MUSIC)}
      {renderBandsFor(EDIT_TYPES.GRAPHIC)}
      {renderBandsFor(EDIT_TYPES.BROLL)}

      {/* Texto del leaf */}
      <span ref={textRef} className="leaf-text">
        {props.children}
      </span>
    </StyledSpan>
  );
}

export default InlineEdit;
