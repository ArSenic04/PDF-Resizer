# Import flask and datetime module for showing date and time
import base64
from flask import Flask, request, jsonify, send_file
import io
import tempfile
from flask import *
from fpdf import FPDF
from pdf2docx import Converter
from pdf2pptx import convert_pdf2pptx
from PIL import Image
import shutil
# import numpy as np
import fitz
# import cv2
import PyPDF2
from moviepy.editor import VideoFileClip
from docx2pdf import convert
import aspose.words
from pdfdocument.document import PDFDocument
import os
from docx import Document
import img2pdf
import pdfkit
from werkzeug.utils import secure_filename
from io import BytesIO
from PyPDF2 import PdfFileMerger, PdfFileReader, PdfFileWriter, PdfMerger, PdfReader, PdfWriter
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import zipfile


# Initializing flask app
app = Flask(__name__, template_folder='template')


# Route for seeing a data
@app.route('/')
def upload():
    return render_template("file_upload.html")


@app.route('/merge', methods=['GET', 'POST'])
def merge():
    files = request.files.getlist('files')

    merger = PdfMerger()
    for file in files:
        if file.filename.lower().endswith('.pdf'):
            merger.append(file)

    output_file = 'merged.pdf'
    merger.write(output_file)
    merger.close()

    return send_file(output_file, as_attachment=True)

# Image to PDF
# ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# @app.route('/convert-to-pdf', methods=['POST'])
# def convert_to_pdf():
#     # Get the uploaded image file
#     image_file = request.files['image']

#     # Open the image using PIL
#     image = Image.open(image_file)

#     # Create an in-memory buffer for the PDF content
#     pdf_buffer = BytesIO()

#     # Create a PDF canvas
#     c = canvas.Canvas(pdf_buffer)

#     # Set the PDF page size to match the image size
#     c.setPageSize(image.size)

#     # Draw the image on the PDF canvas
#     c.drawImage(image, 0, 0)

#     # Save the PDF content to the buffer
#     c.save()

#     # Set the buffer's file position to the beginning
#     pdf_buffer.seek(0)

#     # Return the PDF content as a response
#     return send_file(pdf_buffer, download_name='converted.pdf', as_attachment=True)


ALLOWED_EXTENSIONS = {'pdf'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/convert-to-pdf', methods=['POST'])
def img_pdf():
    # if request.method=='POST':
    # if 'image' not in request.files:
    #     return 'No image file found', 400

    image_file = request.files['image']
    image_data = image_file.read()
 # Convert image to PDF
    pdf_data = img2pdf.convert(image_data)

  # Save the PDF temporarily
    temp_pdf_path = "temp.pdf"
    with open(temp_pdf_path, 'wb') as f:
        f.write(pdf_data)

    # Serve the PDF file for display in the frontend
    return send_file(temp_pdf_path, as_attachment=True)
    # return render_template('file_upload.html', name='Convert', url="/imagetopdf")


# @app.route('/crop', methods=['GET', 'POST'])
# def crop():
#     if request.method == 'POST':
#         pdf_file = request.files['file']
#         extension = os.path.splitext(pdf_file.filename)[1]
#         print(extension)
#         if extension == '.pdf':
#             # Load the PDF using PyPDF2
#             pdf = PdfFileReader(pdf_file)

#             # Get the crop coordinates from the request
#             left = float(request.form['left'])
#             top = float(request.form['top'])
#             right = float(request.form['right'])
#             bottom = float(request.form['bottom'])

#             # Create a new PDF writer
#             output_pdf = PdfFileWriter()

#             # Crop each page in the PDF
#             for page_num in range(pdf.getNumPages()):
#                 page = pdf.getPage(page_num)
#                 page.cropBox.lowerLeft = (left, bottom)
#                 page.cropBox.upperRight = (right, top)
#                 output_pdf.addPage(page)

#             # Save the cropped PDF to a new file
#             output_filename = 'cropped.pdf'
#             with open(output_filename, 'wb') as output:
#                 output_pdf.write(output)
#         else:
#             image = Image.open(pdf_file)

#             # Get the crop coordinates from the request
#             left = int(request.form['left'])
#             top = int(request.form['top'])
#             right = int(request.form['right'])
#             bottom = int(request.form['bottom'])

#             # Crop the image
#             cropped_image = image.crop((left, top, right, bottom))

#             # Save the cropped image to a new file
#             output_filename = 'cropped.png'
#             cropped_image.save(output_filename)

#         return send_file(output_filename, as_attachment=True)
#     return render_template('file_upload.html', name='Crop', url="/crop")


# @app.route('/crop', methods=['POST'])
# def crop_image():
#     file = request.files['file']
#     x = int(request.form['x'])
#     y = int(request.form['y'])
#     width = int(request.form['width'])
#     height = int(request.form['height'])

#     image = Image.open(file)
#     cropped_image = image.crop((x, y, x+width, y+height))

#     # Get the original file extension
#     original_extension = os.path.splitext(file.filename)[-1]
#     # Generate a unique filename for the cropped image
#     save_filename = 'cropped_image' + original_extension
#     cropped_image.save(save_filename)

#     return send_file(save_filename, as_attachment=True)

@app.route('/crop_image', methods=['POST'])
def crop_image():
    # Get the cropping data from the request
    file = request.files['file']
    crop_data = json.loads(request.form['cropData'])

    # Open the uploaded image
    img = Image.open(file)

    # Perform cropping based on the crop data
    cropped_img = img.crop(
        (crop_data['x'], crop_data['y'], crop_data['width']+crop_data['x'], crop_data['height']+crop_data['y']))

    # Create a byte stream to store the cropped image
    cropped_img_byte_io = io.BytesIO()
    cropped_img.save(cropped_img_byte_io, format='PNG')
    cropped_img_byte_io.seek(0)

    return send_file(cropped_img_byte_io, mimetype='image/png')


# Split PDF


@app.route('/split_pdf', methods=['POST'])
def split_pdf():

    file = request.files['file']
    pdf = PyPDF2.PdfFileReader(file)

    output_pages = []

    for page_num in range(pdf.getNumPages()):
        output_pdf = PyPDF2.PdfFileWriter()
        output_pdf.addPage(pdf.getPage(page_num))

        output_file = io.BytesIO()
        output_pdf.write(output_file)

        output_pages.append(output_file.getvalue())

    zip_data = io.BytesIO()
    with zipfile.ZipFile(zip_data, 'w') as zip_file:
        for idx, page_data in enumerate(output_pages):
            zip_file.writestr(f'page_{idx + 1}.pdf', page_data)

    zip_data.seek(0)
    return send_file(
        zip_data,
        mimetype='application/zip',
        as_attachment=True,
        download_name='split_pdf.zip'
    )


@app.route('/extract', methods=['POST'])
def extract():

    file = request.files['file']
    pdf_reader = PyPDF2.PdfFileReader(file)
    text = ''
    for page_num in range(pdf_reader.numPages):
        page = pdf_reader.getPage(page_num)
        text += page.extract_text()

    return text
    # return render_template('file_upload.html', name='Extract', url="/extract")


# Delete pages from PDF

# def delete_pages(input_path, output_path, page_to_delete):
#     with open(input_path, 'rb') as file:
#         reader = PyPDF2.PdfFileReader(file)
#         writer = PyPDF2.PdfFileWriter()

#         for page_num in range(reader.numPages):
#             if page_num is page_to_delete:
#                 page = reader.getPage(page_num)
#                 writer.addPage(page)

#         with open(output_path, 'wb') as output_file:
#             writer.write(output_file)
#     return send_file(output_path, as_attachment=True)


# @app.route('/deletepages', methods=['GET', 'POST'])
# def delete():
#     # if request.method == 'POST':
#     input_file = request.files['file']

#     pdf_reader = PyPDF2.PdfFileReader(input_file)

#     # Create a PDF writer object
#     pdf_writer = PyPDF2.PdfFileWriter()

#     # Remove the specified page from the PDF
#     page_number = int(request.form['pages']) - 1
#     for page in range(pdf_reader.numPages):
#         if page != page_number:
#             pdf_writer.addPage(pdf_reader.getPage(page))

#     # Create a new output file to save the modified PDF
#     output_file = f'Deleted-{os.path.splitext(input_file.filename)[0]}.pdf'
#     with open(output_file, 'wb') as f:
#         # Write the modified PDF to the output file
#         pdf_writer.write(f)
#     # os.remove(output_file)
#     return send_file(output_file, as_attachment=True, download_name=input_file.filename)

    # return render_template('file_upload.html', name="Delete", url="/deletepages")
@app.route('/deletepages', methods=['GET', 'POST'])
def delete():
    input_file = request.files['file']

    pdf_reader = PyPDF2.PdfFileReader(input_file)

    # Create a PDF writer object
    pdf_writer = PyPDF2.PdfFileWriter()

    # Remove the specified page from the PDF
    page_number = int(request.form['pages']) - 1
    for page in range(pdf_reader.numPages):
        if page != page_number:
            pdf_writer.addPage(pdf_reader.getPage(page))

    # Create an in-memory buffer to store the modified PDF
    output_buffer = io.BytesIO()

    # Write the modified PDF to the buffer
    pdf_writer.write(output_buffer)
    output_buffer.seek(0)

    return send_file(
        output_buffer,
        download_name='Deleted.pdf',
        as_attachment=True,
        mimetype='application/pdf'
    )


# Rotate PDF

# @app.route('/rotate', methods=['POST'])
# def rotate():
#     # if request.method == 'POST':
#     file = request.files['file']
#     angle = request.form['angle']
#     pdf = PdfReader(file)
#     print(angle)
#     writer = PdfWriter()

#     for page in pdf.pages:
#         rotated_page = page.rotateClockwise(int(angle))
#         writer.add_page(rotated_page)

#     temp_filename = f'Rotated-{os.path.splitext(file.filename)[0]}.pdf'
#     with open(temp_filename, 'wb') as output_file:
#         writer.write(output_file)

#     return send_file(temp_filename, as_attachment=True)
    # return render_template('file_upload.html', name='Rotate', url="/rotate")

@app.route('/rotate', methods=['POST'])
def rotate():
    file = request.files['file']
    angle = request.form['angle']
    pdf = PdfReader(file)
    writer = PdfWriter()

    for page in pdf.pages:
        rotated_page = page.rotateClockwise(int(angle))
        writer.add_page(rotated_page)

    output_buffer = io.BytesIO()
    writer.write(output_buffer)
    output_buffer.seek(0)

    return send_file(
        output_buffer,
        download_name='Rotated.pdf',
        as_attachment=True,
        mimetype='application/pdf'
    )


# DPI Resolution


@app.route('/convert', methods=['POST'])
def convert_pdf():
    # Get the uploaded PDF file
    # if request.method == 'POST':
    pdf_file = request.files['file']

    # Get the desired DPI value from the form
    dpi = int(request.form['dpi'])

    # Create a PDF writer object
    pdf_writer = PyPDF2.PdfFileWriter()

    # Read the input PDF file
    pdf_reader = PyPDF2.PdfFileReader(pdf_file)
    total_pages = pdf_reader.numPages

    # Convert each page to the desired DPI resolution
    for page_number in range(total_pages):
        page = pdf_reader.getPage(page_number)

        # Create a new PDF canvas with the desired DPI resolution
        width, height = letter
        c = canvas.Canvas("temp.pdf", pagesize=(
            width*dpi/72, height*dpi/72))

        # Scale the page content to the new DPI resolution
        scale_factor = dpi / 72.0
        c.scale(scale_factor, scale_factor)

        # Draw the page content onto the canvas
        c.setPageSize((width*dpi/72, height*dpi/72))
        c.showPage()
        c.save()

        # Add the converted page to the PDF writer
        converted_page = PyPDF2.PdfFileReader("temp.pdf").getPage(0)
        pdf_writer.addPage(converted_page)

    # Create a new output PDF file
    output_pdf = open('converted123.pdf', 'wb')
    pdf_writer.write(output_pdf)
    output_pdf.close()
    return send_file(output_pdf, as_attachment=True, download_name='Converted.pdf')
    # return render_template('file_upload.html', name='Resize', url="/convert")

# PDF to DOCX


@app.route('/pdf2docx', methods=['POST'])
def pdf2docx():
    if 'file' not in request.files:
        return 'No file uploaded'

    file = request.files['file']

    # Check if the file is a PDF
    if file.filename.rsplit('.', 1)[1].lower() != 'pdf':
        return 'Only PDF files are allowed'

    # Save the uploaded PDF file to a temporary location
    pdf_path = 'temp.pdf'
    file.save(pdf_path)

    # Convert PDF to DOCX
    docx_path = 'converted.docx'
    obj = Converter(pdf_path)
    obj.convert(docx_path)
    obj.close()
    os.remove(pdf_path)
    # os.remove(docx_path)
    return send_file(docx_path, as_attachment=True, download_name='Converted.docx')

    # if 'file' not in request.files:
    #     return 'No file uploaded'

    # file = request.files['file']

    # # Check if the file has a PDF extension
    # if file.filename.endswith('.pdf'):
    #     # Save the PDF file to a temporary location
    #     temp_pdf = tempfile.NamedTemporaryFile(delete=False)
    #     file.save(temp_pdf.name)
    #     temp_pdf.close()

    #     # Convert PDF to DOCX
    #     docx_file = tempfile.NamedTemporaryFile(suffix='.docx', delete=False)
    #     pdf2docx.convert(temp_pdf.name, docx_file.name)
    #     docx_file.close()

    #     # Remove the temporary PDF file
    #     os.remove(temp_pdf.name)

    #     # Return the converted file to the user
    #     return send_file(docx_file.name, as_attachment=True, download_name='converted.docx')


@app.route('/pdf-to-ppt', methods=['POST'])
def pdf_to_ppt():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})

    file = request.files['file']
    ppt_file = 'converted.pptx'

    try:
        # Convert PDF to PPT
        cv = convert_pdf2pptx(file)
        cv.convert(ppt_file)
        cv.close()

        # Create a file-like object to hold the output file
        ppt_io = io.BytesIO()

        # Save the converted PPT file to the file-like object
        cv.save(ppt_io)
        ppt_io.seek(0)

        # Send the converted file back to the client
        return send_file(ppt_io, mimetype='application/vnd.openxmlformats-officedocument.presentationml.presentation', as_attachment=True, download_name=ppt_file)
    except Exception as e:
        return jsonify({'error': str(e)})


# TXT to PDF


@app.route('/txt2pdf', methods=['POST'])
def txt2pdf():
    if 'file' not in request.files:
        return 'No file uploaded'

    # Get the uploaded file
    text_file = request.files['file']

    # Check if a file is selected
    if text_file.filename == '':
        return 'No file selected'

    # Check if the file is a text file
    if text_file.filename.endswith('.txt'):
        # Read the text from the file
        text = text_file.read().decode('utf-8')

        # Create a PDF file
        pdf_filename = 'output.pdf'
        pdf = canvas.Canvas(pdf_filename)

        # Set up the PDF content
        pdf.setFont("Helvetica", 12)
        lines = text.split("\n")
        y = 700
        for line in lines:
            pdf.drawString(50, y, line)
            y -= 15

        # Save and close the PDF file
        pdf.save()

        # Return the PDF file as a response
        return send_file(pdf_filename, as_attachment=True)
    else:
        return 'Unsupported file format'


# Compress PDF

@app.route('/compress_pdf', methods=['POST'])
def compress_pdf():
    file = request.files['file']

    # Read the uploaded file using PyPDF2
    pdf = PdfFileReader(file)

    # Create a new PDF writer object
    output_pdf = PdfFileWriter()

    # Iterate over each page in the PDF
    for page_num in range(pdf.getNumPages()):
        # Get the page and add it to the output PDF
        page = pdf.getPage(page_num)
        output_pdf.addPage(page)

    # Create a file-like object to save the compressed PDF
    compressed_file = io.BytesIO()
    output_pdf.write(compressed_file)
    compressed_file.seek(0)

    # Return the compressed PDF file as a response
    return send_file(compressed_file, download_name='compressed.pdf', as_attachment=True)


# Video To Audio

@app.route('/convert', methods=['POST'])
def convert_video_to_audio():
    video_file = request.files['video']

    # Convert the video to audio
    video = VideoFileClip(video_file)
    audio = video.audio

    # Write the audio data to a BytesIO object
    audio_data = BytesIO()
    audio.write_audiofile(audio_data, codec='wav')
    audio_data.seek(0)

    # Return the converted audio file
    return send_file(audio_data, mimetype='audio/wav', as_attachment=True, download_name='audio.wav')


# Convert Docx to pdf
@app.route('/docx2pdf', methods=['POST'])
def convert_to_pdf():
    # file = request.files['file']
    # docx_data = file.read()

    # pdf_data = convert(BytesIO(docx_data))

    # return send_file(
    #     BytesIO(pdf_data),
    #     mimetype='application/pdf',
    #     as_attachment=True,
    #     download_name='output.pdf'
    # )


    file = request.files['file']

    docx_data = file.read()
    doc = Document(docx_data)

    pdf_data = PDFDocument()
    pdf_data.add_page()
    pdf_data.append(doc.render())

    pdf_file = io.BytesIO()
    pdf_data.save(pdf_file)
    pdf_file.seek(0)

    return send_file(
        pdf_file,
        mimetype='application/pdf',
        as_attachment=True,
        attachment_filename='output.pdf',
        cache_timeout=0,
        add_etags=False,
        conditional=False,
        last_modified=None,
        no_cache=True
    )



# Remove Background


# @app.route('/remove-background', methods=['POST'])
# def remove_background():
#     # Get the uploaded image file
#     image_file = request.files['image']

#     # Read the image using OpenCV
#     img = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), 1)

#     # Image processing logic to remove the background...
#     # (Replace this with your actual image processing code)

#     # Encode the resulting image to a buffer in memory
#     _, buffer = cv2.imencode('.jpg', img)
#     image_data = buffer.tobytes()

#     # Create a file-like object from the image data
#     image_stream = io.BytesIO(image_data)
#     # Send the processed image as a downloadable file
#     return send_file(image_stream, mimetype='image/jpeg', attachment_filename='processed_image.jpg', as_attachment=True)
if __name__ == '__main__':
    app.run(debug=True)
