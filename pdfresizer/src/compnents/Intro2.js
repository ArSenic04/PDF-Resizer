import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useState, useEffect, useRef } from 'react';


import axios from 'axios';
import { Document, Page } from 'react-pdf';
import './Intro2.css'
import Cropper from 'react-easy-crop';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Intro2() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [filenames, setfilenames] = useState('')
    const [files, setFiles] = useState([]);
    const [mergedFileUrl, setMergedFileUrl] = useState('');
    const [numPages, setNumPages] = useState(null);

    const handleFileChange = (event) => {
        setFiles([...event.target.files]);
    };

    const handleMerge = async () => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post('/merge', formData, {
                responseType: 'arraybuffer', // Set the response type to 'arraybuffer'
            });

            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileUrl = URL.createObjectURL(file);
            setMergedFileUrl(fileUrl);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDownload = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = mergedFileUrl;
        downloadLink.download = 'merged.pdf';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handleDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const [extractedText, setExtractedText] = useState('');
    const [copyStatus, setCopyStatus] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChangeextract = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch('/extract', {
                method: 'POST',
                body: formData,
            });

            const text = await response.text();
            setExtractedText(text);
        }
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(extractedText).then(
            () => {
                setCopyStatus('Text copied!');
            },
            () => {
                setCopyStatus('Failed to copy text!');
            }
        );
    };


    const [selectedFileimg, setSelectedFileimg] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const [pdfFilename, setPdfFilename] = useState('');

    const handleFileChangeimg = (event) => {
        setSelectedFileimg(event.target.files[0]);
    };

    const handleSubmitimg2pdf = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', selectedFileimg);

        fetch('/convert-to-pdf', {
            method: 'POST',
            body: formData,
            // headers: {
            //     'Content-Disposition': `attachment; filename=${selectedFileimg.name}`
            // }
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
                // setPdfFilename(selectedFileimg.name);
            });
    };
    const [selectedFilerotate, setSelectedFilerotate] = useState(null);
    const [rotationAngle, setRotationAngle] = useState(0);
    const handleFileChangerotate = (e) => {
        setSelectedFilerotate(e.target.files[0]);
    };
    const handleSubmitrotate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFilerotate);
        formData.append('angle', rotationAngle);
        fetch('/rotate', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
            });
    };
    const handleAngleChange = (event) => {
        setRotationAngle(parseInt(event.target.value));
    };


    const [selectedFiledelete, setSelectedFiledelete] = useState(null);
    const [deletepages, setdeletepages] = useState(0);
    const handleFileChangedelete = (e) => {
        setSelectedFiledelete(e.target.files[0]);
    };
    const handleSubmitdelete = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFiledelete);
        formData.append('pages', deletepages);
        // filenames=setSelectedFiledelete.toString
        fetch('/deletepages', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
                // const originalname = selectedFileimg2pdf.name
            });
    };
    const handledeleteChange = (event) => {
        setdeletepages(parseInt(event.target.value));
    };

    // const [filedocx, setFiledocx] = useState(null);

    // const handleFileChange = (event) => {
    //     setselectedFileimg(event.target.files[0]);
    // };

    const handleSubmitdocx = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFileimg);

        // filenames=setSelectedFiledelete.toString
        fetch('/pdf2docx', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);

            });
    };

    const handleSubmittext = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('text', selectedFileimg);

        // filenames=setSelectedFiledelete.toString
        fetch('/txt2pdf', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);

            });
    };


    const [selectedFileresize, setSelectedFileresize] = useState(null);
    const [resize, setresize] = useState(0);
    const handleFileChangeresize = (e) => {
        setSelectedFileresize(e.target.files[0]);
    };
    const handleSubmitresize = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFileresize);
        formData.append('dpi', resize);
        fetch('/convert', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
            });
    };
    const handleresizeChange = (event) => {
        setresize(parseInt(event.target.value));
    };



    const [selectedFilecompress, setSelectedFilecompress] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [compressedSize, setCompressedSize] = useState('');
    const handleFileChangecompress = (event) => {
        setSelectedFilecompress(event.target.files[0]);
    };
    const handleSubmitcompress = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFilecompress);

        fetch('/compress_pdf', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
                setPreviewUrl(url);
                setCompressedSize((blob.size / 1024).toFixed(2) + ' KB');
            });
    };



    // const [filesplit, setFilesplit] = useState(null);
    // const [outputFiles, setOutputFiles] = useState([]);
    // const [totalPages, setTotalPages] = useState(0);
    // const handleFileChangesplit = (event) => {
    //     setFilesplit(event.target.files[0]);
    // };

    // const handleUploadsplit = async (event) => {
    //     const formData = new FormData();
    //     formData.append('file', filesplit);

    //     try {
    //         const response = await axios.post('/split', formData, {
    //             headers: { 'Content-Type': 'multipart/form-data' }
    //         });
    //         setTotalPages(response.data.total_pages);
    //         setOutputFiles(response.data.output_files);
    //         console.log('PDF split successful!');
    //     } catch (error) {
    //         console.error('PDF split failed:', error);
    //     }
    // };

    // const handleDownloadsplit = (index) => {
    //     const outputFilesArray = outputFiles.map((file) => file.data);
    //     const blob = new Blob([outputFilesArray[index]], { type: 'application/pdf' });
    //     const url = URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = `page_${index}.pdf`;
    //     link.click();
    // };
    const [file, setFile] = useState(null);
    const [pages, setPages] = useState([]);
    const [downloadUrl, setDownloadUrl] = useState('');
    const [outputDirectory, setOutputDirectory] = useState('');
    const handleFileUploadsplit = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };
    const handleDirectoryChange = (event) => {
        setOutputDirectory(event.target.value);
    };

    const handleFileSubmitsplit = () => {
        // const formData = new FormData();
        // formData.append('file', file);

        // axios.post('/split_pdf', formData)
        //     .then((response) => {
        //         console.log(response.data);
        //         setPages(response.data.pages);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });


        const formData = new FormData();
        formData.append('file', file);
        formData.append('output_directory', outputDirectory); // Add output_directory parameter

        axios.post('/split_pdf', formData, { responseType: 'arraybuffer' })
            .then((response) => {
                const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'split_pdf.zip');
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // const handleDownloadsplit = () => {
    //     axios.post('/download_pdf', { pages })
    //         .then((response) => {
    //             const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    //             const link = document.createElement('a');
    //             link.href = downloadUrl;
    //             link.setAttribute('download', 'split_pdf.pdf');
    //             document.body.appendChild(link);
    //             link.click();
    //             link.remove();
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };

    // const [filecrop, setFilecrop] = useState(null);
    // const [x, setX] = useState(0);
    // const [y, setY] = useState(0);
    // const [width, setWidth] = useState(0);
    // const [height, setHeight] = useState(0);
    // const [croppedImageURL, setCroppedImageURL] = useState('');

    // const handleFileChangecrop = (event) => {
    //     setFilecrop(event.target.files[0]);
    // };

    // const handleCrop = () => {
    //     const formData = new FormData();
    //     formData.append('file', filecrop);
    //     formData.append('x', x);
    //     formData.append('y', y);
    //     formData.append('width', width);
    //     formData.append('height', height);

    //     fetch('/crop', {
    //         method: 'POST',
    //         body: formData,
    //     })
    //         .then(response => response.blob())
    //         .then(blob => {
    //             const url = URL.createObjectURL(blob);
    //             setCroppedImageURL(url);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             // Handle error, e.g., show an error message
    //         });
    // };


    // const handleDownloadcrop = () => {
    //     const a = document.createElement('a');
    //     a.href = croppedImageURL;
    //     a.download = 'cropped_image.png';
    //     a.click();
    // };



    const [filecrop, setFilecrop] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppingInProgress, setCroppingInProgress] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [cropperDisabled, setCropperDisabled] = useState(false);
    const cropperRef = useRef();


    const handleFileUploadcrop = (event) => {
        const selectedFile = event.target.files[0];
        setFilecrop(selectedFile);
        setShowCropper(true);
    };
    const handleCropImage = async () => {
        const cropData = cropperRef.current.getCropData();
        const formData = new FormData();
        formData.append('file', filecrop);
        formData.append('cropData', JSON.stringify(cropData));

        axios
            .post('/crop_image', formData, { responseType: 'blob' })
            .then((response) => {
                const croppedImg = new File([response.data], 'cropped_image.png', { type: 'image/png' });
                setCroppedImage(croppedImg);
            })
            .catch((error) => {
                console.error(error);
            });

    };
    const handleDownloadImage = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(croppedImage);
        downloadLink.download = 'cropped_image.png';
        downloadLink.click();
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='app__Intro2__Tabs'>
                        <Tab label="Merge PDF" {...a11yProps(0)} />
                        <Tab label="Split PDF" {...a11yProps(1)} />
                        <Tab label="Crop" {...a11yProps(2)} />
                        <Tab label="Extract Text" {...a11yProps(3)} />
                        <Tab label="Delete Pages" {...a11yProps(4)} />
                        <Tab label="PDF to Docx" {...a11yProps(5)} />
                        <Tab label="Image to PDF" {...a11yProps(6)} />

                        <Tab label="Resize" {...a11yProps(7)} />
                        <Tab label="Compress" {...a11yProps(8)} />
                        <Tab label="Rotate PDF" {...a11yProps(9)} />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>

                    <div className='app__Intro2__merge'>
                        <div className='.app__Intro2__header'>
                            <h2>Merge files</h2>
                        </div>
                        <div className='app__Intro2__content'>
                            <div className='app__Intro2__input'>
                                <input type="file" multiple onChange={handleFileChange} /><br></br><br></br>
                                <p>Maximum combined file size: 100MB, up to 50 files
                                    Supported types: PDF, DOC, DOCX, ODT, PPT, PPTX
                                    (all files will be converted to PDF automatically)</p>
                                <button onClick={handleMerge}>Merge</button>
                            </div>
                            {mergedFileUrl && (
                                <div>
                                    <Document file={mergedFileUrl} onLoadSuccess={handleDocumentLoadSuccess}>
                                        {Array.from(new Array(numPages), (el, index) => (
                                            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                                        ))}
                                    </Document>
                                    <button onClick={handleDownload}>Download</button>
                                </div>
                            )}
                        </div>
                        <div className='app__Intro2__extra'>
                            <img src='https://www.adobe.com/content/dam/dx-dc/images/acrobat/online/riverflow-items/s_illu_merge-multiple-pdfs_452x320.svg' className='app__images'></img>

                            <div className='app__how'>
                                <h2>Online PDF merge / combine tool</h2><br></br>
                                <p>Welcome to a free, online tool for merging (combining) multiple PDF files into one.
                                    You can merge two or more files at once, they may have different sizes and page counts.

                                    We don't put any watermarks on documents you create. All uploaded files are automatically removed 1 hour after upload.</p>
                                <h2>How to merge PDF files?</h2><br></br>
                                <p>Upload all the files you need to merge (you select multiple files for upload at once by pressing and holding Ctrl or Command button and clicking on them in the file browser window), drag and drop them to arrange in your preferred order, and press the button below.

                                    After a short moment, a download icon will appear on the right, which you can click to save your freshly created PDF document or select other actions to perform on merged documents from the drop-down menu.</p>
                            </div>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    {/* <div>
                        <input type="file" onChange={handleFileChangesplit} />
                        <button onClick={handleUploadsplit}>Split PDF</button>
                        <hr />
                        <h2>Individual Pages:</h2>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <div key={index}>
                                <span>Page {index + 1}</span>
                                <button onClick={() => handleDownloadsplit(index)}>Download</button>
                            </div>
                        ))}
                    </div> */}

                    <div>
                        <div>
                            <input type="file" accept=".pdf" onChange={handleFileUploadsplit} />
                            <button onClick={handleFileSubmitsplit}>Split PDF</button>
                        </div>
                        <div>
                            {pages.map((page, index) => (
                                <embed
                                    key={index}
                                    src={`data:application/pdf;base64,${page}`}
                                    type="application/pdf"
                                    width="400"
                                    height="300"
                                />
                            ))}
                        </div>
                        {/* <div>
                            {pages.length > 0 && (
                                <button onClick={handleDownloadsplit}>Download PDF</button>
                            )}
                        </div> */}
                    </div>

                </TabPanel>
                <TabPanel value={value} index={2}>
                    {/* <div>
                        <input type="file" onChange={handleFileChangecrop} />
                        <br />
                        X: <input type="number" value={x} onChange={event => setX(event.target.value)} />
                        Y: <input type="number" value={y} onChange={event => setY(event.target.value)} />
                        Width: <input type="number" value={width} onChange={event => setWidth(event.target.value)} />
                        Height: <input type="number" value={height} onChange={event => setHeight(event.target.value)} />
                        <br />
                        <button onClick={handleCrop}>Crop</button>
                        {croppedImageURL && (
                            <button type='submit'><a href={croppedImageURL} download='cropped.jpg'>Download PDF</a></button>
                        )}
                    </div> */}


                    <div>
                        <div>
                            <input type="file" accept="image/*" onChange={handleFileUploadcrop} />
                        </div>
                        {showCropper && (
                            <div>
                                <Cropper
                                    image={URL.createObjectURL(filecrop)}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={4 / 3}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    ref={cropperRef}
                                />
                                <button onClick={handleCropImage}>Crop</button>
                            </div>
                        )}
                        {croppedImage && (
                            <div>
                                <button onClick={handleDownloadImage}>Download</button>
                                <img src={URL.createObjectURL(croppedImage)} alt="Cropped Image" />
                            </div>
                        )}
                    </div>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <div className='app__Intro2__merge'>
                        <div className='.app__Intro2__header'>
                            <h2>Extract Text</h2>
                        </div>
                        <div className='app__Intro2__content'>
                            <div className='app__Intro2__input'>
                                <input type="file" onChange={handleFileChangeextract} /><br></br><br></br>
                                <p>Maximum combined file size: 100MB, up to 50 files
                                    Supported types: PDF, DOC, DOCX, ODT, PPT, PPTX
                                    (all files will be converted to PDF automatically)</p>
                                <button onClick={handleUpload}>Extract</button>

                                {extractedText && (
                                    <div>
                                        <div><h4>Here is Text of PDF</h4><br></br>{extractedText}</div><br></br>
                                        <button onClick={handleCopy}>Copy Text</button>
                                        {copyStatus && <div>{copyStatus}</div>}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='app__Intro2__extra'>
                            <img src='https://www.adobe.com/content/dam/dx-dc/images/acrobat/online/seo-icon-set/extract-pdf-pages/s_illu-extract-pdf-pages_452x320.svg'></img>
                            <div className='app__how'>
                                <h2>Online PDF merge / combine tool</h2><br></br>
                                <p>Welcome to a free, online tool for merging (combining) multiple PDF files into one.
                                    You can merge two or more files at once, they may have different sizes and page counts.

                                    We don't put any watermarks on documents you create. All uploaded files are automatically removed 1 hour after upload.</p>
                                <h2>How to merge PDF files?</h2><br></br>
                                <p>Upload all the files you need to merge (you select multiple files for upload at once by pressing and holding Ctrl or Command button and clicking on them in the file browser window), drag and drop them to arrange in your preferred order, and press the button below.

                                    After a short moment, a download icon will appear on the right, which you can click to save your freshly created PDF document or select other actions to perform on merged documents from the drop-down menu.</p>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <div className='app__Intro2__merge'>
                        <div className='.app__Intro2__header'>
                            <h2>Delete Pages</h2>
                        </div>
                        <div className='app__Intro2__content'>
                            <div className='app__Intro2__input'>
                                <form onSubmit={handleSubmitdelete}>
                                    <input type="file" onChange={handleFileChangedelete} /><br></br>
                                    <br></br>
                                    <p>Maximum combined file size: 100MB, up to 50 files
                                        Supported types: PDF, DOC, DOCX, ODT, PPT, PPTX
                                        (all files will be converted to PDF automatically)</p>
                                    <label name="angle">Enter page No. to delete: </label>
                                    <input type='number' value={deletepages}
                                        onChange={handledeleteChange}></input>
                                    <button type="submit">Delete</button>
                                </form>
                            </div>
                            <br></br>
                            {pdfUrl && (
                                <div>
                                    <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
                                    <button type='submit'><a href={pdfUrl} download>Download PDF</a></button>
                                </div>
                            )}
                        </div>
                        <div className='app__Intro2__extra'>
                            <img src='https://s.smallpdf.com/static/cms/f/102628/300x180/224fe4cca6/70314b4a05193e1dec7f.svg'></img>
                            <div className='app__how'>
                                <h2>Online PDF page remover</h2><br></br>
                                <p>Upload your document and this tool will display a list of all pages it contains.
                                    Then you can select any pages you want to delete by clicking remove button under the thumbnail (it can still be undone at this step).

                                    When you have removed all the unwanted pages, click Generate PDF button and the tool will output a new PDF document with unwanted pages permanently removed.
                                    You can delete any number of pages, and even upload multiple documents at once.</p>

                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <div className='app__Intro2__merge'>
                        <div className='.app__Intro2__header'>
                            <h2>Pdf to Docx</h2>
                        </div>
                        <div className='app__Intro2__content'>
                            <div className='app__Intro2__input'>
                                
                                <input type="file" name="file" onChange={handleFileChangeimg} /><br></br>
                                <br></br>
                                <p>Maximum combined file size: 100MB, up to 50 files
                                    Supported types: PDF, DOC, DOCX, ODT, PPT, PPTX
                                    (all files will be converted to PDF automatically)</p>

                                <button type="submit" onClick={handleSubmitdocx}>Convert</button>
                                {pdfUrl &&
                                    (
                                        <div>
                                            {/* <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" /> */}
                                            <button type='submit'><a href={pdfUrl} download="converted.docx">Download Docx</a></button>
                                        </div>
                                    )}

                                <br></br>
                            </div>


                        </div>
                        <div className='app__how'>
                            <h2>Online image to PDF converter</h2><br></br>
                            <p>This is a free online tool for converting JPG and other images to PDF document.
                                You can upload and convert two or more files at once.
                                We don't put any watermarks on documents you create.
                                We support JPG, PNG, BMP and GIF files in any resolution.</p>

                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={6}>
                    <div className='app__Intro2__merge'>
                        <div className='.app__Intro2__header'>
                            <h2>Image to PDF</h2>
                        </div>
                        <div className='app__Intro2__content'>
                            <div className='app__Intro2__input'>
                                
                                <input type="file" name="file" onChange={handleFileChangeimg} /><br></br>
                                <br></br>
                                <p>Maximum combined file size: 100MB, up to 50 files
                                    Supported types: PDF, DOC, DOCX, ODT, PPT, PPTX
                                    (all files will be converted to PDF automatically)</p>

                                <button type="submit" onClick={handleSubmitimg2pdf}>Convert</button>
                                {pdfUrl &&
                                    (
                                        <div>
                                            <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
                                            <button type='submit'><a href={pdfUrl} download="converted.pdf">Download PDF</a></button>
                                        </div>
                                    )}

                                <br></br>
                            </div>


                        </div>
                        <div className='app__how'>
                            <h2>Online image to PDF converter</h2><br></br>
                            <p>This is a free online tool for converting JPG and other images to PDF document.
                                You can upload and convert two or more files at once.
                                We don't put any watermarks on documents you create.
                                We support JPG, PNG, BMP and GIF files in any resolution.</p>

                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={6}>
                    <div className='app__Intro2__merge'>
                        <div className='.app__Intro2__header'>
                            <h2>Rotate PDF</h2>
                        </div>
                        <div className='app__Intro2__content'>
                            <div className='app__Intro2__input'>
                                <form onSubmit={handleSubmitrotate}>
                                    <input type="file" onChange={handleFileChangerotate} /><br></br>
                                    <br></br>
                                    <p>Maximum combined file size: 100MB, up to 50 files
                                        Supported types: PDF, DOC, DOCX, ODT, PPT, PPTX
                                        (all files will be converted to PDF automatically)</p>

                                    <label name="angle">Enter angle: </label>
                                    <input type='number' value={rotationAngle}
                                        onChange={handleAngleChange}></input>
                                    <button type="submit">Rotate PDF</button>
                                </form>
                                <br></br>
                            </div>
                            {pdfUrl && (
                                <div>
                                    <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
                                    <button type='submit'><a href={pdfUrl} download="converted.pdf">Download PDF</a></button>
                                </div>
                            )}
                        </div>
                        <div className='app__Intro2__extra'>
                            <img src='https://s.smallpdf.com/static/cms/f/102628/300x180/7224b8be83/186604ddfd2697e3bce2.svg'></img>
                            <div className='app__how'>
                                <h2>Online PDF rotator tool</h2><br></br>
                                <p>With this tool you can upload and rotate / flip PDF files or specific pages inside the file in any direction you want, online and for free.

                                    You have the option to rotate PDF documents to the right (90 degrees), left (270 degrees), or upside-down (180 degrees). Additionally, if the file has been previously rotated, you can reset the orientation to its default setting.

                                    If you do not wish to rotate the entire document, you may select specific pages or page ranges to rotate by filling out the appropriate from and to fields with the corresponding page numbers.

                                    PDF rotation is permanent, but can be safely performed as many times as needed, this tool simply sets the PDF rotation flag and rotated documents will remain at the same quality as the original, free from watermarks.</p>

                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={7}>
                    <div className='app__Intro2__merge'>
                        <div className='.app__Intro2__header'>
                            <h2>Resize PDF</h2>
                        </div>
                        <div className='app__Intro2__content'>
                            <div className='app__Intro2__input'>
                                <form onSubmit={handleSubmitresize}>
                                    <input type="file" onChange={handleFileChangeresize} /><br></br>
                                    <br></br>
                                    <p>Maximum combined file size: 100MB, up to 50 files
                                        Supported types: PDF, DOC, DOCX, ODT, PPT, PPTX
                                        (all files will be converted to PDF automatically)</p>

                                    <label name="angle">Enter Dpi: </label>
                                    <input type='number' value={resize}
                                        onChange={handleresizeChange}></input>
                                    <button type="submit">Resize PDF</button>
                                </form>
                                <br></br>
                            </div>
                            {pdfUrl && (
                                <div>
                                    <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
                                    <button type='submit'><a href={pdfUrl} download="converted.pdf">Download PDF</a></button>
                                </div>
                            )}
                        </div>
                        <div className='app__Intro2__extra'>
                            <img src='https://blog.avepdf.com/wp-content/uploads/2021/07/how-to-resize-a-PDF.png' className='app__images__resize'></img>
                            <div className='app__how'>
                                <h2>Online PDF rotator tool</h2><br></br>
                                <p>With this tool you can upload and rotate / flip PDF files or specific pages inside the file in any direction you want, online and for free.

                                    You have the option to rotate PDF documents to the right (90 degrees), left (270 degrees), or upside-down (180 degrees). Additionally, if the file has been previously rotated, you can reset the orientation to its default setting.

                                    If you do not wish to rotate the entire document, you may select specific pages or page ranges to rotate by filling out the appropriate from and to fields with the corresponding page numbers.

                                    PDF rotation is permanent, but can be safely performed as many times as needed, this tool simply sets the PDF rotation flag and rotated documents will remain at the same quality as the original, free from watermarks.</p>

                            </div>
                        </div>
                    </div>

                </TabPanel>
                <TabPanel value={value} index={8}>
                    <div className='app__Intro2__merge'>
                        <div className='.app__Intro2__header'>
                            <h2>Compress PDF</h2>
                        </div>
                        <div className='app__Intro2__content'>
                            <div className='app__Intro2__input'>
                                <form onSubmit={handleSubmitcompress}>
                                    <input type="file" onChange={handleFileChangecompress} /><br></br>
                                    <br></br>
                                    <p>Maximum combined file size: 100MB, up to 50 files
                                        Supported types: PDF, DOC, DOCX, ODT, PPT, PPTX
                                        (all files will be converted to PDF automatically)</p>

                                    <button type="submit">Compress</button>
                                </form>
                            </div>
                            <br></br>
                            {pdfUrl && (
                                <div>
                                    <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
                                    <button type='submit'><a href={pdfUrl} download='Compressed.pdf'>Download PDF</a></button>
                                </div>
                            )}
                            {previewUrl && (
                                <div>
                                    <p>Compressed Size: {compressedSize}</p>
                                    {/* <iframe src={previewUrl} width="600" height="400" title="PDF Preview" /> */}
                                </div>
                            )}
                        </div>
                        <div className='app__Intro2__extra'>
                            <img src='https://www.adobe.com/dc-shared/assets/images/frictionless/og-images/og-compress-pdf.jpg' className='app__images__compress' />
                            <div className='app__how'>
                                <h2>Online PDF optimizer/compressor</h2><br></br>
                                <p>This page lets you optimize and compress PDF files to decrease file size, e.g. when you wish to save bandwidth or fit the file within e-mail attachment file size limits.

                                    With this tool, You can upload and optimize multiple files at the same time (batch processing).

                                    PDF optimizer will not change the resolution of your files. If you need to further reduce the file size and you can afford to lose the quality or resolution, try PDF resizer instead. PDF files can be created in many different ways, they can consist of images, text and formatting information in any proportion, so the results from using our optimization and resizing tools may vary heavily from one file to another.</p>

                            </div>
                        </div>
                    </div>
                </TabPanel>
            </Box >
        </>
    );
}
