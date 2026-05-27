# ---------- Build image ----------
FROM python:3.12-slim AS builder

# Install build dependencies (gcc) – required for any compiled wheels
RUN apt-get update && apt-get install -y --no-install-recommends gcc && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ---------- Runtime image ----------
FROM python:3.12-slim

WORKDIR /app

# Copy only the installed packages from the builder stage
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY backend/ ./

# Run as a non‑root user (good security practice)
RUN useradd -m appuser && chown -R appuser /app
USER appuser

ENV PORT=8000
EXPOSE 8000

# Simple health‑check used by Docker and Render
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:${PORT}/health || exit 1

# Start FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]