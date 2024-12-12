# python_backend/app.py

from flask import Flask, request, jsonify
import PyPDF2
import pandas as pd
from docx import Document
import os
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

@app.route('/convert', methods=['POST'])
def convert_pdf():
    try:
        print("Received request") # Debug log
        print("Files:", request.files)  # Debug log
        print("Format:", request.form.get('format'))  # Debug log
        
        file = request.files['pdf']
        output_format = request.form['format']
        
        # Save uploaded PDF temporarily
        pdf_path = 'temp.pdf'
        file.save(pdf_path)
        
        # Read PDF
        pdf_reader = PyPDF2.PdfReader(pdf_path)
        text_content = ""
        
        # Extract text from PDF
        for page in pdf_reader.pages:
            text_content += page.extract_text()
            
        # Convert based on requested format
        if output_format == 'text':
            return jsonify({'content': text_content})
            
        elif output_format == 'docx':
            doc = Document()
            doc.add_paragraph(text_content)
            doc.save('output.docx')
            return jsonify({'message': 'Converted to DOCX'})
            
        elif output_format == 'csv':
            # Simple conversion - each line as a row
            lines = text_content.split('\n')
            df = pd.DataFrame(lines, columns=['Content'])
            df.to_csv('output.csv', index=False)
            return jsonify({'message': 'Converted to CSV'})
            
        elif output_format == 'xlsx':
            lines = text_content.split('\n')
            df = pd.DataFrame(lines, columns=['Content'])
            df.to_excel('output.xlsx', index=False)
            return jsonify({'message': 'Converted to Excel'})
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)