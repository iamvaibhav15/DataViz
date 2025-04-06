from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import pandas as pd
import sweetviz as sv
import os
import uuid
import shutil

app = FastAPI()

# Directory for generated reports
REPORTS_DIR = "reports"
os.makedirs(REPORTS_DIR, exist_ok=True)

# Serve the reports directory statically so the HTML report can be viewed via URL.
app.mount("/reports", StaticFiles(directory=REPORTS_DIR), name="reports")

# Pydantic model for incoming JSON
class AnalyzeRequest(BaseModel):
    file_path: str

@app.post("/analyze-file")
def analyze_file(request: AnalyzeRequest):
    file_path = request.file_path
    print(f"Received file path: {file_path}")

    if not os.path.exists(file_path):
        print("❌ File not found!")
        raise HTTPException(status_code=404, detail="File not found")

    try:
        df = pd.read_csv(file_path)
        print("✅ CSV read successfully")
    except Exception as e:
        print(f"❌ CSV read failed: {e}")
        raise HTTPException(status_code=400, detail=f"Error reading CSV: {e}")

    try:
        report = sv.analyze(df)
        report_filename = f"{uuid.uuid4().hex}_sweetviz_report.html"
        report_path = os.path.join(REPORTS_DIR, report_filename)
        report.show_html(report_path, open_browser=False)
        print(f"⚙️ Generating report at: {report_path}")
        report.show_html(report_path, open_browser=False)
        print("✅ Report created")
    except Exception as e:
        print(f"❌ Sweetviz failed: {e}")
        raise HTTPException(status_code=500, detail=f"Error analyzing CSV: {e}")

    report_url = f"http://127.0.0.1:8000/reports/{report_filename}"
    print(f"📦 Returning report URL: {report_url}")
    return JSONResponse(content={"message": "Analysis complete", "report_url": report_url})
