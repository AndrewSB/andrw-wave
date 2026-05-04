import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

type Direction = {
  x: number;
  y: number;
};

type Cell = {
  x: number;
  y: number;
};

type PipeState = {
  cell: Cell;
  direction: Direction;
  color: string;
};

const CELL_SIZE = 30;
const STEP_INTERVAL_MS = 58;
const ACTIVATION_GRACE_MS = 450;
const DIRECTIONS: Direction[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];
const PIPE_COLORS = [
  "#34f36f",
  "#6ce7ff",
  "#ff62d5",
  "#fff5a8",
  "#a988ff",
  "#f4f7ff",
];
const EXIT_EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "wheel",
] as const;

function randomFrom<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function shadeColor(hex: string, amount: number) {
  const normalized = hex.replace("#", "");
  const value = parseInt(normalized, 16);
  const r = Math.max(0, Math.min(255, (value >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((value >> 8) & 255) + amount));
  const b = Math.max(0, Math.min(255, (value & 255) + amount));

  return `rgb(${r}, ${g}, ${b})`;
}

function isSameDirection(a: Direction, b: Direction) {
  return a.x === b.x && a.y === b.y;
}

function isReverseDirection(a: Direction, b: Direction) {
  return a.x === -b.x && a.y === -b.y;
}

export default function Pipes() {
  const router = useRouter();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const startedAtRef = React.useRef(0);

  React.useEffect(() => {
    startedAtRef.current = Date.now();

    const exitScreensaver = () => {
      if (Date.now() - startedAtRef.current < ACTIVATION_GRACE_MS) {
        return;
      }

      router.replace("/");
    };

    EXIT_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, exitScreensaver, { passive: true });
    });

    return () => {
      EXIT_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, exitScreensaver);
      });
    };
  }, [router]);

  React.useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let animationFrame = 0;
    let lastStepAt = 0;
    let columns = 0;
    let rows = 0;
    let occupied: boolean[][] = [];
    let currentPipe: PipeState | null = null;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = Math.ceil(window.innerWidth / CELL_SIZE);
      rows = Math.ceil(window.innerHeight / CELL_SIZE);
      occupied = Array.from({ length: columns }, () =>
        Array.from({ length: rows }, () => false)
      );
      currentPipe = null;

      context.fillStyle = "#02080b";
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const startPipe = () => {
      for (let attempt = 0; attempt < 80; attempt += 1) {
        const cell = {
          x: Math.floor(Math.random() * columns),
          y: Math.floor(Math.random() * rows),
        };

        if (!occupied[cell.x]?.[cell.y]) {
          occupied[cell.x][cell.y] = true;
          currentPipe = {
            cell,
            direction: randomFrom(DIRECTIONS),
            color: randomFrom(PIPE_COLORS),
          };
          return;
        }
      }

      resizeCanvas();
    };

    const chooseDirection = (currentDirection: Direction) => {
      if (Math.random() < 0.68) {
        return currentDirection;
      }

      const nextDirections = DIRECTIONS.filter(
        (direction) =>
          !isSameDirection(direction, currentDirection) &&
          !isReverseDirection(direction, currentDirection)
      );

      return randomFrom(nextDirections);
    };

    const drawJoint = (cell: Cell, color: string) => {
      const centerX = cell.x * CELL_SIZE + CELL_SIZE / 2;
      const centerY = cell.y * CELL_SIZE + CELL_SIZE / 2;

      context.beginPath();
      context.fillStyle = shadeColor(color, -34);
      context.arc(centerX, centerY, CELL_SIZE * 0.31, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.fillStyle = shadeColor(color, 26);
      context.arc(centerX - 3, centerY - 3, CELL_SIZE * 0.16, 0, Math.PI * 2);
      context.fill();
    };

    const drawSegment = (from: Cell, to: Cell, color: string) => {
      const fromX = from.x * CELL_SIZE + CELL_SIZE / 2;
      const fromY = from.y * CELL_SIZE + CELL_SIZE / 2;
      const toX = to.x * CELL_SIZE + CELL_SIZE / 2;
      const toY = to.y * CELL_SIZE + CELL_SIZE / 2;

      context.lineCap = "round";
      context.lineJoin = "round";

      context.beginPath();
      context.strokeStyle = shadeColor(color, -72);
      context.lineWidth = CELL_SIZE * 0.64;
      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.stroke();

      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = CELL_SIZE * 0.45;
      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.stroke();

      context.beginPath();
      context.strokeStyle = "rgba(255, 255, 255, 0.56)";
      context.lineWidth = CELL_SIZE * 0.12;
      context.moveTo(fromX - 4, fromY - 4);
      context.lineTo(toX - 4, toY - 4);
      context.stroke();
    };

    const step = () => {
      if (!currentPipe) {
        startPipe();
        return;
      }

      const direction = chooseDirection(currentPipe.direction);
      const nextCell = {
        x: currentPipe.cell.x + direction.x,
        y: currentPipe.cell.y + direction.y,
      };
      const hitBoundary =
        nextCell.x < 0 ||
        nextCell.y < 0 ||
        nextCell.x >= columns ||
        nextCell.y >= rows;
      const hitPipe = !hitBoundary && occupied[nextCell.x]?.[nextCell.y];

      if (hitBoundary || hitPipe) {
        startPipe();
        return;
      }

      drawSegment(currentPipe.cell, nextCell, currentPipe.color);
      drawJoint(nextCell, currentPipe.color);
      occupied[nextCell.x][nextCell.y] = true;
      currentPipe = {
        ...currentPipe,
        cell: nextCell,
        direction,
      };
    };

    const animate = (time: number) => {
      if (document.hidden) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      if (time - lastStepAt > STEP_INTERVAL_MS) {
        step();
        lastStepAt = time;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    resizeCanvas();

    if (reducedMotion) {
      Array.from({ length: 90 }).forEach(step);
    } else {
      animationFrame = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <Head>
        <title>andrw.wave pipes</title>
      </Head>
      <main className="pipes-page" aria-label="andrw.wave pipes screensaver">
        <canvas ref={canvasRef} className="pipes-canvas" />
        <div className="pipes-label">screensaver: andrw.wave pipes</div>
      </main>
      <style jsx>{`
        .pipes-page {
          background:
            radial-gradient(circle at 20% 10%, rgba(80, 255, 204, 0.12), transparent 32%),
            radial-gradient(circle at 80% 82%, rgba(255, 93, 213, 0.13), transparent 30%),
            #02080b;
          height: 100vh;
          overflow: hidden;
          position: fixed;
          inset: 0;
          width: 100vw;
        }

        .pipes-canvas {
          display: block;
          height: 100%;
          width: 100%;
        }

        .pipes-label {
          bottom: 18px;
          color: rgba(214, 255, 246, 0.72);
          font-family: var(--font-press-start-2p), monospace;
          font-size: 10px;
          left: 18px;
          letter-spacing: 0.04em;
          position: fixed;
          text-shadow: 0 0 10px rgba(73, 255, 190, 0.45);
        }
      `}</style>
    </>
  );
}
