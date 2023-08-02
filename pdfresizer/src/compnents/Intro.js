import React from 'react'
import SignIn from './SignIn'
import service from './service'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import about from './about';
import { useState, useEffect } from 'react';
import TabScrollButton from '@mui/material/TabScrollButton';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import Alert from 'react-bootstrap/Alert';

import { auth } from './firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -20%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    orientation: 'horizontal',
    boxShadow: 24,
    p: 4,
};
function Intro() {
    const [quote, setquote] = useState('');
    const Quotes = (e) => {
        e.preventDefault();
        const url = 'https://quotes15.p.rapidapi.com/quotes/random/';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '276b38a485msh26f6a34f80130a3p1e518djsn3462275ac98a',
                'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
            }
        };
        const maxRetries = 3; // Maximum number of retries
        let currentRetry = 0; // Current retry count
        async function fetchDataWithRetry() {
            try {
                const response = await fetch(url, options);
                const result = await response.text();
                const resultObject = JSON.parse(result);
                const content = resultObject.content;

                console.log(content);
                setquote(content);
            } catch (error) {
                if (currentRetry < maxRetries) {
                    console.log(`Retry attempt ${currentRetry + 1}`);
                    currentRetry++;
                    setTimeout(fetchDataWithRetry, 2000); // Delay before retrying (2 seconds in this example)
                } else {
                    console.error('Max retries exceeded. Unable to fetch data.');
                }
            }
        }

        fetchDataWithRetry();
    }

    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [authuser, setauthuser] = useState(null);
    const [isuser, setisuser] = useState(null)


    const handleOpen = () => {
        setIsOpen1(true);
    };

    const handleClose = () => {
        setIsOpen1(false);
    };
    const handleClickOpen = () => {
        setIsOpen2(true);
    };
    const handleOpenQuote = () => {
        setIsOpen3(true);
    };
    const handleClickClose = () => {
        setIsOpen2(false);
    };
    const handleCloseQuote = () => {
        setIsOpen3(false);
    };


    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [open0, setOpen0] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);
    const [open6, setOpen6] = React.useState(false);
    const [open7, setOpen7] = React.useState(false);
    const [open8, setOpen8] = React.useState(false);
    const [open9, setOpen9] = React.useState(false);
    const [open10, setOpen10] = React.useState(false);
    const handleOpen0 = () => setOpen0(true);
    const handleOpen1 = () => setOpen1(true);
    const handleOpen2 = () => setOpen2(true);
    const handleOpen3 = () => setOpen3(true);
    const handleOpen4 = () => setOpen4(true);
    const handleOpen5 = () => setOpen5(true);
    const handleOpen6 = () => setOpen6(true);
    const handleOpen7 = () => setOpen7(true);
    const handleOpen8 = () => setOpen8(true);
    const handleOpen9 = () => setOpen9(true);
    const handleOpen10 = () => setOpen10(true);
    const handleClose0 = () => setOpen0(false);
    const handleClose1 = () => setOpen1(false);
    const handleClose2 = () => setOpen2(false);
    const handleClose3 = () => setOpen3(false);
    const handleClose4 = () => setOpen4(false);
    const handleClose5 = () => setOpen5(false);
    const handleClose6 = () => setOpen6(false);
    const handleClose7 = () => setOpen7(false);
    const handleClose8 = () => setOpen8(false);
    const handleClose9 = () => setOpen9(false);
    const handleClose10 = () => setOpen10(false);


    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setauthuser(user)
            }
            else {
                setauthuser(null);
            }
        })

        return () => {
            listen()
            setemail('')
            setpassword('')
            // setisuser(null)
        }
    }, [])
    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log(signOut)
        }).catch((error) => {
            console.log(error)
        })
    }
    const checkuserexists = (email) => {
        auth.fetchSignInMethodsForEmail(email)
            .then((signInMethods) => {
                // If sign-in methods exist, user exists
                setisuser(signInMethods.length > 0);
            })
            .catch((error) => {
                console.error('Error checking user existence:', error);
                throw error;
            });
    }
    const signin = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log(userCredentials)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleCloseModal = () => {

        setemail('');
        setpassword('');
        handleClose(); // Close the Modal
        handleClickClose(); // Close the Modal
    };
    const signup = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log(userCredentials)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const [pdfUrl, setPdfUrl] = useState('');
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


    // const url = 'https://quotes15.p.rapidapi.com/quotes/random/';
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': '276b38a485msh26f6a34f80130a3p1e518djsn3462275ac98a',
    //         'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
    //     }
    // };
    // async function getapi(url) {
    //     try {
    //         const response = fetch(url, options);
    //         const result = response.text();
    //         console.log(result);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    // getapi(url)


    const [selectedFileimg, setSelectedFileimg] = useState(null);
    // const [pdfUrl, setPdfUrl] = useState('');
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
    const handleSubmitpdf = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFileimg);

        // filenames=setSelectedFiledelete.toString
        fetch('/docx2pdf', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);

            });
    };
    const handleSubmitppt = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFileimg);

        // filenames=setSelectedFiledelete.toString
        fetch('/pdf-to-ppt', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);

            });
    };


    const [selectedFilevideo, setSelectedFilevideo] = useState(null);
    const [downloadLink, setDownloadLink] = useState('');
    const handleFileChangevideo = (event) => {
        setSelectedFilevideo(event.target.files[0]);
    };

    const handleFileUploadvideo = () => {
        const formData = new FormData();
        formData.append('video', selectedFilevideo);

        axios.post('/convert', formData, { responseType: 'blob' })
            .then(response => {
                // Create a download link for the converted audio file
                const url = window.URL.createObjectURL(new Blob([response.data]));
                setDownloadLink(url);
            })
            .catch(error => {
                // Handle the error
                console.error(error);
            });
    };

    return (

        <>

            <div>

                <meta charSet="utf-8" />
                <title>PDFresizer</title>
                <meta content="width=device-width, initial-scale=1.0" name="viewport" />
                <meta content name="keywords" />
                <meta content name="description" />
                {/* Favicon */}
                <link href="seo/img/favicon.io" rel="icon" />
                {/* Google Web Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
                {/* Icon Font Stylesheet */}
                {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" /> */}
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />
                {/* Libraries Stylesheet */}
                <link href="seo/lib/animate/animate.min.css" rel="stylesheet" />
                <link href="seo/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
                <link href="seo/lib/lightbox/css/lightbox.min.css" rel="stylesheet" />
                {/* Customized Bootstrap Stylesheet */}
                <link href="seo/css/bootstrap.min.css" rel="stylesheet" />
                {/* Template Stylesheet */}
                <link href="seo/css/style.css" rel="stylesheet" />
                <div className="container-xxl bg-white p-0">
                    {/* Spinner Start */}
                    {/* <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                    <div className="spinner-grow text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> */}
                    {/* Spinner End */}
                    {/* Navbar & Hero Start */}
                    <div className="container-xxl position-relative p-0">
                        <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                            <a href className="navbar-brand p-0">
                                <h1 className="m-0"><i class="fa-regular fa-file"></i>PDF<span className="fs-5">resizer</span></h1>
                                {/* <img src="seo/img/logo.png" alt="Logo"/> */}
                                <p style={{ "color": "white", fontSize: "13px" }}>Helping By Converting</p>
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                <span className="fa fa-bars" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <div className="navbar-nav ms-auto py-0">
                                    <a href="seo/index.html" className="nav-item nav-link active">Home</a>
                                    {/* <Router>
                                        <Routes>
                                            <Route exact path='/about' element={<about></about>}></Route>
                                            <Route exact path='/sevice' element={<service></service>}></Route>
                                            
                                        </Routes>
                                    </Router> */}
                                    {/* <Link to="/about" className='nav-item nav-link'></Link> */}
                                    <about><a href="seo/about.html" className="nav-item nav-link">About</a></about>

                                    {/* <a href="seo/service.html" className="nav-item nav-link">Service</a> */}
                                    {/* <service><a href="seo/service.html" className="nav-item nav-link">About</a>e</service> */}
                                    {/* <a href="seo/project.html" className="nav-item nav-link">Project</a> */}
                                    {/* <div className="nav-item dropdown">
                                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                        <div className="dropdown-menu m-0">
                                            <a href="seo/team.html" className="dropdown-item">Our Team</a>
                                            <a href="seo/testimonial.html" className="dropdown-item">Testimonial</a>
                                            <a href="seo/404.html" className="dropdown-item">404 Page</a>
                                        </div>
                                    </div> */}
                                    {/* <a href="seo/contact.html" className="nav-item nav-link">Contact</a> */}
                                </div>
                                {/* <butaton type="button" className="btn text-secondary ms-3" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fa fa-search" /></butaton> */}
                                <a onClick={handleOpen} className="btn btn-secondary text-light rounded-pill py-2 px-4 ms-3">Login</a>
                                <div className='sign-in-container'>
                                    <Modal
                                        open={isOpen1}
                                        onClose={handleCloseModal}

                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                        sx={{ borderRadius: '15px' }}
                                        style={{ maxHeight: '80%', overflow: 'auto', borderRadius: '15px' }}
                                    >
                                        <Box sx={style}>
                                            <form onSubmit={signin}>
                                                <h1>Log In</h1>
                                                <input className="form-control border-0 rounded-pill w-100 ps-4 pe-5"
                                                    type='email' value={email} placeholder='Enter Email'
                                                    onChange={(e) => setemail(e.target.value)}
                                                ></input><br></br>
                                                <input className="form-control border-0 rounded-pill w-100 ps-4 pe-5"
                                                    type='password' value={password} placeholder='Enter Password'
                                                    onChange={(e) => setpassword(e.target.value)}
                                                ></input><br></br>
                                                <Button variant="outline-success" type='submit'>Log In</Button>
                                            </form>


                                        </Box>
                                    </Modal>
                                </div>
                                {authuser ?
                                    <a className="btn btn-secondary text-light rounded-pill py-2 px-4 ms-3" onClick={userSignOut}>SignOut</a> : <a onClick={handleClickOpen} className="btn btn-secondary text-light rounded-pill py-2 px-4 ms-3">Sign Up</a>
                                }

                                <div className='sign-Up-container'>
                                    <Modal
                                        open={isOpen2}
                                        onClose={handleCloseModal}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                        style={{ maxHeight: '80%', overflow: 'auto', borderRadius: '15px' }}
                                    >
                                        <Box sx={style}>
                                            <form onSubmit={signup}>
                                                <h1>Sign Up</h1>
                                                <input
                                                    className="form-control border-0 rounded-pill w-100 ps-4 pe-5"
                                                    type='email' value={email} placeholder='Enter Email'
                                                    onChange={(e) => setemail(e.target.value)}
                                                ></input><br></br>
                                                <input className="form-control border-0 rounded-pill w-100 ps-4 pe-5"
                                                    type='password' value={password} placeholder='Enter Password'
                                                    onChange={(e) => setpassword(e.target.value)}
                                                ></input><br></br>
                                                <Button variant="outline-success" type='submit'>Sign Up</Button>
                                            </form>
                                            {!isuser == true && <p>User Exists please Login</p>}
                                            {/* {isuser && <p>User Exists please Login</p>} */}
                                        </Box>
                                    </Modal>

                                </div>
                            </div>
                        </nav>
                        <div className="container-xxl py-5 bg-primary hero-header mb-5">
                            <div className="container my-5 py-5 px-lg-5">
                                <div className="row g-5 py-5">
                                    <div className="col-lg-6 text-center text-lg-start">
                                        <h1 className="text-white mb-4 animated zoomIn">Transforming Your PDFs with Ease: Unleash the Power of Editing!</h1>
                                        <p className="text-white pb-3 animated zoomIn">Experience seamless editing capabilities that empower you to make any changes you desire, whether it's adding, deleting, or rearranging pages, editing text and images, or merging multiple PDFs into a single cohesive document. Our user-friendly interface ensures that even the most complex editing tasks are accomplished with simplicity and efficiency.</p>
                                        <a onClick={handleOpenQuote} className="btn btn-light py-sm-3 px-sm-5 rounded-pill me-3 animated slideInLeft">Free Quote</a>
                                        <Modal
                                            open={isOpen3}
                                            onClose={handleCloseQuote}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            style={{ maxHeight: '80%', overflow: 'auto', borderRadius: '15px' }}
                                        >
                                            <Box sx={style}>
                                                <h3>Get Your Inspirational Quote</h3>
                                                <button onClick={Quotes}>Quote</button>
                                                {Quotes && <h4>{quote}</h4>}
                                            </Box>
                                        </Modal>
                                        {/* <a href className="btn btn-outline-light py-sm-3 px-sm-5 rounded-pill animated slideInRight">Contact Us</a> */}
                                    </div>
                                    <div className="col-lg-6 text-center text-lg-start">
                                        <img className="img-fluid" src="seo/img/2892186.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Navbar & Hero End */}
                    {/* Full Screen Search Start */}
                    <div className="modal fade" id="searchModal" tabIndex={-1}>
                        <div className="modal-dialog modal-fullscreen">
                            <div className="modal-content" style={{ background: 'rgba(29, 29, 39, 0.7)' }}>
                                <div className="modal-header border-0">
                                    <button type="button" className="btn bg-white btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body d-flex align-items-center justify-content-center">
                                    <div className="input-group" style={{ maxWidth: '600px' }}>
                                        <input type="text" className="form-control bg-transparent border-light p-3" placeholder="Type search keyword" />
                                        <button className="btn btn-light px-4"><i className="bi bi-search" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Full Screen Search End */}
                    {/* About Start */}
                    <div className="container-xxl py-5">
                        <div className="container px-lg-5">
                            <div className="row g-5">
                                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="section-title position-relative mb-4 pb-2">
                                        <h6 className="position-relative text-primary ps-4">About Us</h6>
                                        <h2 className="mt-2">Seamless PDF Transformation: Edit, Customize, and Inspire.</h2>
                                    </div>
                                    <p className="mb-4">Welcome to our cutting-edge PDF editing website, where we revolutionize the way you interact with your documents. With our innovative platform, you can effortlessly modify, enhance, and personalize your PDF files to perfection.</p>
                                    {/* <div className="row g-3">
                                        <div className="col-sm-6">
                                            <h6 className="mb-3"><i className="fa fa-check text-primary me-2" />Award Winning</h6>
                                            <h6 className="mb-0"><i className="fa fa-check text-primary me-2" />Professional Staff</h6>
                                        </div>
                                        <div className="col-sm-6">
                                            <h6 className="mb-3"><i className="fa fa-check text-primary me-2" />24/7 Support</h6>
                                            <h6 className="mb-0"><i className="fa fa-check text-primary me-2" />Fair Prices</h6>
                                        </div>
                                    </div> */}
                                    <div className="d-flex align-items-center mt-4">
                                        {/* <a className="btn btn-primary rounded-pill px-4 me-3" href>Read More</a> */}
                                        {/* <a className="btn btn-outline-primary btn-square me-3" href><i className="fab fa-facebook-f" /></a> */}
                                        <a className="btn btn-outline-primary btn-square me-3" href='https://twitter.com/ShivamArdeshna'><i className="fab fa-twitter" /></a>
                                        <a className="btn btn-outline-primary btn-square me-3" href='https://www.instagram.com/alwayshivam__/'><i className="fab fa-instagram" /></a>
                                        <a className="btn btn-outline-primary btn-square" href='https://www.linkedin.com/in/shivam-ardeshna-bb8b64220/'><i className="fab fa-linkedin-in" /></a>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <img className="img-fluid wow zoomIn" data-wow-delay="0.5s" src="seo/img/about.jpg" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* About End */}
                    {/* Newsletter Start */}
                    <div className="container-xxl bg-primary newsletter my-5 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="container px-lg-5">
                            <div className="row align-items-center" style={{ height: '250px' }}>
                                <div className="col-12 col-md-6">
                                    <h3 className="text-white">Ready to get started</h3>
                                    <small className="text-white">Seamlessly transform your files with our intuitive conversion platform!</small>
                                    <div className="position-relative w-100 mt-3">
                                        <input className="form-control border-0 rounded-pill w-100 ps-4 pe-5" type="text" placeholder="Enter Your Email" style={{ height: '48px' }} />
                                        <button type="button" className="btn shadow-none position-absolute top-0 end-0 mt-1 me-2"><i className="fa fa-paper-plane text-primary fs-4" /></button>
                                    </div>
                                </div>
                                <div className="col-md-6 text-center mb-n5 d-none d-md-block">
                                    <img className="img-fluid mt-5" style={{ height: '250px' }} src="seo/img/2808165.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Newsletter End */}
                    {/* Service Start */}
                    <div className="container-xxl py-5">
                        <div className="container px-lg-5">
                            <div className="section-title position-relative text-center mb-5 pb-2 wow fadeInUp" data-wow-delay="0.1s">
                                <h6 className="position-relative d-inline text-primary ps-4">Our Services</h6>
                                <h2 className="mt-2">What Solutions We Provide</h2>
                            </div>
                            <div className="row g-4">
                                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.1s">
                                    <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <div className="service-icon flex-shrink-0">
                                            {/* <i className="fa fa-compress fa-2x" /> */}
                                            <i class="fa-sharp fa-regular fa-object-group fa-2x"></i>
                                        </div>
                                        <h5 className="mb-3">Merge files</h5>
                                        <p>File merging works by taking the contents of multiple files and combining them into a single file.</p>
                                        <a className="btn px-3 mt-auto mx-auto" onClick={handleOpen0}>Read More</a>
                                        <Modal
                                            open={open0}
                                            onClose={handleClose0}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            style={{ maxHeight: '80%', overflow: 'auto', borderRadius: '15px' }}
                                        >
                                            <Box sx={style}>
                                                <input type="file" multiple onChange={handleFileChange} accept='application/pdf, image/png' /><br></br><br></br>
                                                <p>Maximum combined file size: 100MB, up to 50 files
                                                    Supported types: PDF, DOC, DOCX, ODT, PPT, PPTX
                                                    (all files will be converted to PDF automatically)</p>
                                                <button onClick={handleMerge}>Merge</button><br></br>
                                                {mergedFileUrl && (
                                                    <div>
                                                        {/* <Document file={mergedFileUrl} onLoadSuccess={handleDocumentLoadSuccess}>
                                                            {Array.from(new Array(numPages), (el, index) => (
                                                                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                                                            ))}
                                                        </Document> */}
                                                        <embed src={mergedFileUrl} type="application/pdf" width="100%" height="300px" />
                                                        <button onClick={handleDownload}>Download</button>
                                                    </div>
                                                )}
                                            </Box>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
                                    <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <div className="service-icon flex-shrink-0">
                                            {/* <i className="fa fa-home fa-2x" /> */}
                                            <i class="fa-sharp fa-solid fa-down-left-and-up-right-to-center fa-2x"></i>
                                        </div>
                                        <h5 className="mb-3">Compress Files</h5>
                                        <p>File compression reduces file size by using algorithms to remove redundancy and optimize data representation, resulting in a smaller file.</p>
                                        <a className="btn px-3 mt-auto mx-auto" onClick={handleOpen1}>Read More</a>
                                        <Modal
                                            open={open1}
                                            onClose={handleClose1}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            style={{ maxHeight: '80%', overflow: 'auto', borderRadius: '15px' }}
                                        >
                                            <Box sx={style}>
                                                <form onSubmit={handleSubmitcompress}>
                                                    <input type="file" onChange={handleFileChangecompress} /><br></br>
                                                    <br></br>
                                                    <p>Maximum combined file size: 100MB, up to 50 files
                                                        Supported types: PDF, DOC, DOCX, ODT, PPT, PPTX
                                                        (all files will be converted to PDF automatically)</p>

                                                    <button type="submit">Compress</button>
                                                </form>

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
                                                {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Text in a modal
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                                </Typography> */}
                                            </Box>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.6s">
                                    <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <div className="service-icon flex-shrink-0">
                                            <i class="fa-solid fa-rotate fa-2x"></i>
                                        </div>
                                        <h5 className="mb-3">Rotate PDF</h5>
                                        <p>File rotation repositions file content in a circular manner, preserving chronological order while managing log files or optimizing storage space.</p>
                                        <a className="btn px-3 mt-auto mx-auto" onClick={handleOpen3}>Read More</a>
                                        <Modal
                                            open={open3}
                                            onClose={handleClose3}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            style={{ maxHeight: '80%', overflow: 'auto', borderRadius: '15px' }}
                                        >
                                            <Box sx={style}>
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
                                                {pdfUrl && (
                                                    <div>
                                                        <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
                                                        <button type='submit'><a href={pdfUrl} download="converted.pdf">Download PDF</a></button>
                                                    </div>
                                                )}
                                            </Box>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.1s">
                                    <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <div className="service-icon flex-shrink-0">
                                            <i class="fa-solid fa-file-lines fa-2x"></i>
                                        </div>
                                        <h5 className="mb-3">Extract text</h5>
                                        <p>PDF text extraction involves parsing the file structure, locating text elements, and converting them into readable text format, enabling retrieval of textual information from PDFs.</p>
                                        <a className="btn px-3 mt-auto mx-auto" onClick={handleOpen2}>Read More</a>
                                        <Modal
                                            open={open2}
                                            onClose={handleClose2}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            style={{ maxHeight: '80%', overflow: 'auto', borderRadius: '15px' }}
                                        >
                                            <Box sx={style}>
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
                                            </Box>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
                                    <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <div className="service-icon flex-shrink-0">
                                            <i class="fa-solid fa-eraser fa-2x"></i>
                                        </div>
                                        <h5 className="mb-3">Delete pages</h5>
                                        <p>To delete pages in a PDF, targeted page indices or ranges are removed, resulting in a modified PDF without the specified pages.</p>
                                        <a className="btn px-3 mt-auto mx-auto" onClick={handleOpen4}>Read More</a>
                                        <Modal
                                            open={open4}
                                            onClose={handleClose4}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            style={{ maxHeight: '80%', overflow: 'auto', borderRadius: '15px' }}
                                        >
                                            <Box sx={style}>
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
                                                </form><br></br><br></br>
                                                {pdfUrl && (
                                                    <div>
                                                        <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
                                                        <button type='submit'><a href={pdfUrl} download>Download PDF</a></button>
                                                    </div>
                                                )}
                                            </Box>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
                                    <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <div className="service-icon flex-shrink-0">
                                            <i class="fa-sharp fa-solid fa-arrows-split-up-and-left fa-2x"></i>
                                        </div>
                                        <h5 className="mb-3">Split</h5>
                                        <p>
                                            Splitting PDFs into smaller files enhances sharing, accessibility, and efficiency by breaking down large documents into more manageable units.</p>
                                        <a className="btn px-3 mt-auto mx-auto" onClick={handleOpen5}>Read More</a>
                                        <Modal
                                            open={open5}
                                            onClose={handleClose5}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            style={{ maxHeight: '80%', overflow: 'auto', borderRadius: '15px' }}
                                        >
                                            <Box sx={style}>
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

                                                </div>
                                            </Box>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
                                    <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <div className="service-icon flex-shrink-0">
                                            <i class="fa-solid fa-money-bill-transfer fa-2x"></i>
                                        </div>
                                        <h5 className="mb-3">Image To PDF</h5>
                                        <p>Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.</p>
                                        <a className="btn px-3 mt-auto mx-auto" onClick={handleOpen6}>Read More</a>
                                        <Modal
                                            open={open6}
                                            onClose={handleClose6}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            style={{ maxHeight: '80%', overflow: 'auto', borderRadius: '15px' }}
                                        >
                                            <Box sx={style}>
                                                <div>

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
                                            </Box>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
                                    <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <div className="service-icon flex-shrink-0">
                                            <i class="fa-solid fa-file-word fa-2x"></i>
                                        </div>
                                        <h5 className="mb-3">PDF To DOCX</h5>
                                        <p>Effortlessly convert PDF documents to editable DOCX files, enabling easy editing and formatting using popular word processing software.</p>
                                        <a className="btn px-3 mt-auto mx-auto" onClick={handleOpen8}>Read More</a>
                                        <Modal
                                            open={open8}
                                            onClose={handleClose8}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            style={{ maxHeight: '80%', overflow: 'auto', borderRadius: '15px' }}
                                        >
                                            <Box sx={style}>
                                                <div>

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
                                            </Box>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
                                    <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <div className="service-icon flex-shrink-0">
                                            <i class="fa-solid fa-file-word fa-2x"></i>
                                        </div>
                                        <h5 className="mb-3">DOCX TO PDF</h5>
                                        <p>Effortlessly convert PDF documents to editable DOCX files, enabling easy editing and formatting using popular word processing software.</p>
                                        <a className="btn px-3 mt-auto mx-auto" onClick={handleOpen10}>Read More</a>
                                        <Modal
                                            open={open10}
                                            onClose={handleClose10}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            style={{ maxHeight: '80%', overflow: 'auto', borderRadius: '15px' }}
                                        >
                                            <Box sx={style}>
                                                <div>

                                                    <input type="file" name="file" onChange={handleFileChangeimg} /><br></br>
                                                    <br></br>
                                                    <p>Maximum combined file size: 100MB, up to 50 files
                                                        Supported types: PDF, DOC, DOCX, ODT, PPT, PPTX
                                                        (all files will be converted to PDF automatically)</p>

                                                    <button type="submit" onClick={handleSubmitpdf}>Convert</button>
                                                    {pdfUrl &&
                                                        (
                                                            <div>
                                                                {/* <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" /> */}
                                                                <button type='submit'><a href={pdfUrl} download="converted.pdf">Download PDF</a></button>
                                                            </div>
                                                        )}

                                                    <br></br>
                                                </div>
                                            </Box>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
                                    <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <div className="service-icon flex-shrink-0">
                                            <i class="fa-solid fa-circle-play fa-2x"></i>
                                        </div>
                                        <h5 className="mb-3">Video to Audio</h5>
                                        <p>Seamlessly extract audio tracks from videos, converting them into standalone audio files, enabling convenient playback or use in various audio-based applications.</p>
                                        <a className="btn px-3 mt-auto mx-auto" onClick={handleOpen9}>Read More</a>
                                        <Modal
                                            open={open9}
                                            onClose={handleClose9}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            style={{ maxHeight: '80%', overflow: 'auto', borderRadius: '15px' }}
                                        >
                                            <Box sx={style}>
                                                <div>

                                                    <input type="file" accept="video/*" onChange={handleFileChangevideo} /><br></br>
                                                    <br></br>
                                                    <p>Maximum combined file size: 100MB, up to 50 files
                                                        Supported types: PDF, DOC, DOCX, ODT, PPT, PPTX
                                                        (all files will be converted to PDF automatically)</p>

                                                    <button onClick={handleFileUploadvideo}>Convert</button>
                                                    {downloadLink && (
                                                        <a href={downloadLink} download="audio.wav">Download Converted Audio</a>
                                                    )}

                                                    <br></br>
                                                </div>
                                            </Box>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
                                    <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <div className="service-icon flex-shrink-0">
                                            <i class="fa-solid fa-file-powerpoint fa-2x"></i>
                                        </div>
                                        <h5 className="mb-3">PDF To PPT</h5>
                                        <p>Convert PDF files into PowerPoint presentations, facilitating seamless transitions between formats for versatile presentation creation.</p>
                                        <a className="btn px-3 mt-auto mx-auto" onClick={handleOpen7}>Read More</a>
                                        <Modal
                                            open={open7}
                                            onClose={handleClose7}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            style={{ maxHeight: '80%', overflow: 'auto', borderRadius: '15px' }}
                                        >
                                            <Box sx={style}>
                                                <div>

                                                    <input type="file" name="file" onChange={handleFileChangeimg} /><br></br>
                                                    <br></br>
                                                    <p>Maximum combined file size: 100MB, up to 50 files
                                                        Supported types: PDF, DOC, DOCX, ODT, PPT, PPTX
                                                        (all files will be converted to PDF automatically)</p>

                                                    <button type="submit" onClick={handleSubmitppt}>Convert</button>
                                                    {pdfUrl &&
                                                        (
                                                            <div>
                                                                {/* <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" /> */}
                                                                <button type='submit'><a href={pdfUrl} download="converted.pptx">Download PPTX</a></button>
                                                            </div>
                                                        )}

                                                    <br></br>
                                                </div>
                                            </Box>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.6s">
                                    <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <div className="service-icon flex-shrink-0">
                                            <i class="fa-solid fa-crop-simple fa-2x"></i>
                                        </div>
                                        <h5 className="mb-3">Crop</h5>
                                        <p>Easily trim and adjust the size of images, removing unwanted areas and focusing on specific details, enhancing visual composition and aesthetics.</p>
                                        <a className="btn px-3 mt-auto mx-auto" href>Read More</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* Service End */}
                    {/* Portfolio Start */}
                    <div className="container-xxl py-5">
                        <div className="container px-lg-5">
                            <div className="section-title position-relative text-center mb-5 pb-2 wow fadeInUp" data-wow-delay="0.1s">
                                <h6 className="position-relative d-inline text-primary ps-4">Our Projects</h6>
                                <h2 className="mt-2">Future Projects</h2>
                            </div>
                            {/* <div className="row mt-n2 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="col-12 text-center">
                                    <ul className="list-inline mb-5" id="portfolio-flters">
                                        <li className="btn px-3 pe-4 active" data-filter="*">All</li>
                                        <li className="btn px-3 pe-4" data-filter=".first">Design</li>
                                        <li className="btn px-3 pe-4" data-filter=".second">Development</li>
                                    </ul>
                                </div>
                            </div> */}
                            <div className="row g-4 portfolio-container">
                                <div className="col-lg-4 col-md-6 portfolio-item first wow zoomIn" data-wow-delay="0.1s">
                                    <div className="position-relative rounded overflow-hidden">
                                        <img className="img-fluid w-100" src="seo/img/portfolio-1.jpg" alt="" />
                                        <div className="portfolio-overlay">
                                            <a className="btn btn-light" href="seo/img/portfolio-1.jpg" data-lightbox="portfolio"><i className="fa fa-plus fa-2x text-primary" /></a>
                                            <div className="mt-auto">
                                                <small className="text-white"><i className="fa fa-folder me-2" />Intelligent Code Analysis in File Editors:</small>
                                                <a className="h5 d-block text-white mt-1 mb-0" href> Improving Developer Productivity</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 portfolio-item second wow zoomIn" data-wow-delay="0.3s">
                                    <div className="position-relative rounded overflow-hidden">
                                        <img className="img-fluid w-100" src="seo/img/portfolio-2.jpg" alt="" />
                                        <div className="portfolio-overlay">
                                            <a className="btn btn-light" href="seo/img/portfolio-2.jpg" data-lightbox="portfolio"><i className="fa fa-plus fa-2x text-primary" /></a>
                                            <div className="mt-auto">
                                                <small className="text-white"><i className="fa fa-folder me-2" />Mobile File Editors:</small>
                                                <a className="h5 d-block text-white mt-1 mb-0" href>User Acceptance and Usage Patterns</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 portfolio-item first wow zoomIn" data-wow-delay="0.6s">
                                    <div className="position-relative rounded overflow-hidden">
                                        <img className="img-fluid w-100" src="seo/img/portfolio-3.jpg" alt="" />
                                        <div className="portfolio-overlay">
                                            <a className="btn btn-light" href="seo/img/portfolio-3.jpg" data-lightbox="portfolio"><i className="fa fa-plus fa-2x text-primary" /></a>
                                            <div className="mt-auto">
                                                <small className="text-white"><i className="fa fa-folder me-2" />Collaborative Editing in File Editors:</small>
                                                <a className="h5 d-block text-white mt-1 mb-0" href>Techniques and Challenges</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 portfolio-item second wow zoomIn" data-wow-delay="0.1s">
                                    <div className="position-relative rounded overflow-hidden">
                                        <img className="img-fluid w-100" src="seo/img/portfolio-4.jpg" alt="" />
                                        <div className="portfolio-overlay">
                                            <a className="btn btn-light" href="seo/img/portfolio-4.jpg" data-lightbox="portfolio"><i className="fa fa-plus fa-2x text-primary" /></a>
                                            <div className="mt-auto">
                                                <small className="text-white"><i className="fa fa-folder me-2" />Advanced Text Editing Features in File Editors:</small>
                                                <a className="h5 d-block text-white mt-1 mb-0" href> A User Study</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 portfolio-item first wow zoomIn" data-wow-delay="0.3s">
                                    <div className="position-relative rounded overflow-hidden">
                                        <img className="img-fluid w-100" src="seo/img/W.jpg" alt="" />
                                        <div className="portfolio-overlay">
                                            <a className="btn btn-light" href="seo/img/W.jpg" data-lightbox="portfolio"><i className="fa fa-plus fa-2x text-primary" /></a>
                                            <div className="mt-auto">
                                                <small className="text-white"><i className="fa fa-folder me-2" />Version Control Mechanisms in Collaborative File Editing:</small>
                                                <a className="h5 d-block text-white mt-1 mb-0" href>Comparative Analysis</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 portfolio-item second wow zoomIn" data-wow-delay="0.6s">
                                    <div className="position-relative rounded overflow-hidden">
                                        <img className="img-fluid w-100" src="seo/img/portfolio-6.jpg" alt="" />
                                        <div className="portfolio-overlay">
                                            <a className="btn btn-light" href="seo/img/portfolio-6.jpg" data-lightbox="portfolio"><i className="fa fa-plus fa-2x text-primary" /></a>
                                            <div className="mt-auto">
                                                <small className="text-white"><i className="fa fa-folder me-2" />Customization and Extensibility in File Editors:</small>
                                                <a className="h5 d-block text-white mt-1 mb-0" href>User Preferences and Implications</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Portfolio End */}
                    {/* Testimonial Start */}
                    {/* <div className="container-xxl bg-primary testimonial py-5 my-5 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="container py-5 px-lg-5">
                        <div className="owl-carousel testimonial-carousel">
                            <div className="testimonial-item bg-transparent border rounded text-white p-4">
                                <i className="fa fa-quote-left fa-2x mb-3" />
                                <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                                <div className="d-flex align-items-center">
                                    <img className="img-fluid flex-shrink-0 rounded-circle" src="img/testimonial-1.jpg" style={{ width: '50px', height: '50px' }} />
                                    <div className="ps-3">
                                        <h6 className="text-white mb-1">Client Name</h6>
                                        <small>Profession</small>
                                    </div>
                                </div>
                            </div>
                            <div className="testimonial-item bg-transparent border rounded text-white p-4">
                                <i className="fa fa-quote-left fa-2x mb-3" />
                                <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                                <div className="d-flex align-items-center">
                                    <img className="img-fluid flex-shrink-0 rounded-circle" src="img/testimonial-2.jpg" style={{ width: '50px', height: '50px' }} />
                                    <div className="ps-3">
                                        <h6 className="text-white mb-1">Client Name</h6>
                                        <small>Profession</small>
                                    </div>
                                </div>
                            </div>
                            <div className="testimonial-item bg-transparent border rounded text-white p-4">
                                <i className="fa fa-quote-left fa-2x mb-3" />
                                <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                                <div className="d-flex align-items-center">
                                    <img className="img-fluid flex-shrink-0 rounded-circle" src="img/testimonial-3.jpg" style={{ width: '50px', height: '50px' }} />
                                    <div className="ps-3">
                                        <h6 className="text-white mb-1">Client Name</h6>
                                        <small>Profession</small>
                                    </div>
                                </div>
                            </div>
                            <div className="testimonial-item bg-transparent border rounded text-white p-4">
                                <i className="fa fa-quote-left fa-2x mb-3" />
                                <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                                <div className="d-flex align-items-center">
                                    <img className="img-fluid flex-shrink-0 rounded-circle" src="img/testimonial-4.jpg" style={{ width: '50px', height: '50px' }} />
                                    <div className="ps-3">
                                        <h6 className="text-white mb-1">Client Name</h6>
                                        <small>Profession</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                    {/* Testimonial End */}
                    {/* Team Start */}
                    {/* <div className="container-xxl py-5">
                    <div className="container px-lg-5">
                        <div className="section-title position-relative text-center mb-5 pb-2 wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="position-relative d-inline text-primary ps-4">Our Team</h6>
                            <h2 className="mt-2">Meet Our Team Members</h2>
                        </div>
                        <div className="row g-4">
                            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="team-item">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 d-flex flex-column align-items-center mt-4 pt-5" style={{ width: '75px' }}>
                                            <a className="btn btn-square text-primary bg-white my-1" href><i className="fab fa-facebook-f" /></a>
                                            <a className="btn btn-square text-primary bg-white my-1" href><i className="fab fa-twitter" /></a>
                                            <a className="btn btn-square text-primary bg-white my-1" href><i className="fab fa-instagram" /></a>
                                            <a className="btn btn-square text-primary bg-white my-1" href><i className="fab fa-linkedin-in" /></a>
                                        </div>
                                        <img className="img-fluid rounded w-100" src="img/team-1.jpg" alt="" />
                                    </div>
                                    <div className="px-4 py-3">
                                        <h5 className="fw-bold m-0">Jhon Doe</h5>
                                        <small>CEO</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                                <div className="team-item">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 d-flex flex-column align-items-center mt-4 pt-5" style={{ width: '75px' }}>
                                            <a className="btn btn-square text-primary bg-white my-1" href><i className="fab fa-facebook-f" /></a>
                                            <a className="btn btn-square text-primary bg-white my-1" href><i className="fab fa-twitter" /></a>
                                            <a className="btn btn-square text-primary bg-white my-1" href><i className="fab fa-instagram" /></a>
                                            <a className="btn btn-square text-primary bg-white my-1" href><i className="fab fa-linkedin-in" /></a>
                                        </div>
                                        <img className="img-fluid rounded w-100" src="img/team-2.jpg" alt="" />
                                    </div>
                                    <div className="px-4 py-3">
                                        <h5 className="fw-bold m-0">Emma William</h5>
                                        <small>Manager</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
                                <div className="team-item">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 d-flex flex-column align-items-center mt-4 pt-5" style={{ width: '75px' }}>
                                            <a className="btn btn-square text-primary bg-white my-1" href><i className="fab fa-facebook-f" /></a>
                                            <a className="btn btn-square text-primary bg-white my-1" href><i className="fab fa-twitter" /></a>
                                            <a className="btn btn-square text-primary bg-white my-1" href><i className="fab fa-instagram" /></a>
                                            <a className="btn btn-square text-primary bg-white my-1" href><i className="fab fa-linkedin-in" /></a>
                                        </div>
                                        <img className="img-fluid rounded w-100" src="img/team-3.jpg" alt="" />
                                    </div>
                                    <div className="px-4 py-3">
                                        <h5 className="fw-bold m-0">Noah Michael</h5>
                                        <small>Designer</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                    {/* Team End */}
                    {/* Footer Start */}
                    <div className="container-fluid bg-primary text-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
                        <div className="container py-5 px-lg-5">
                            <div className="row g-5">
                                <div className="col-md-6 col-lg-3">
                                    <h5 className="text-white mb-4">Get In Touch</h5>
                                    <p><i className="fa fa-map-marker-alt me-3" />123 Street, New York, USA</p>
                                    <p><i className="fa fa-phone-alt me-3" />+012 345 67890</p>
                                    <p><i className="fa fa-envelope me-3" />info@example.com</p>
                                    <div className="d-flex pt-2">
                                        <a className="btn btn-outline-light btn-social" href='https://twitter.com/ShivamArdeshna'><i className="fab fa-twitter" /></a>
                                        {/* <a className="btn btn-outline-light btn-social" href><i className="fab fa-facebook-f" /></a> */}
                                        <a className="btn btn-outline-light btn-social" href='https://github.com/ArSenic04'><i class="fa-brands fa-github"></i></a>
                                        <a className="btn btn-outline-light btn-social" href='https://www.instagram.com/alwayshivam__/'><i className="fab fa-instagram" /></a>
                                        <a className="btn btn-outline-light btn-social" href='https://www.linkedin.com/in/shivam-ardeshna-bb8b64220/'><i className="fab fa-linkedin-in" /></a>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <h5 className="text-white mb-4">Popular Link</h5>
                                    <a className="btn btn-link" href>About Us</a>
                                    <a className="btn btn-link" href>Contact Us</a>
                                    <a className="btn btn-link" href>Privacy Policy</a>
                                    <a className="btn btn-link" href>Terms &amp; Condition</a>
                                    <a className="btn btn-link" href>Career</a>
                                </div>


                            </div>
                        </div>
                        <div className="container px-lg-5">
                            <div className="copyright">
                                <div className="row">
                                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                        © <a className="border-bottom" href="#">PDFresizer</a>, All Right Reserved.
                                        {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
                                        Designed By <a className="border-bottom" href>Shivam Ardeshna</a>
                                    </div>
                                    {/* <div className="col-md-6 text-center text-md-end">
                                        <div className="footer-menu">
                                            <a href>Home</a>
                                            <a href>Cookies</a>
                                            <a href>Help</a>
                                            <a href>FQAs</a>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Footer End */}
                    {/* Back to Top */}
                    <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top pt-2"><i className="bi bi-arrow-up" /></a>
                </div>
                {/* JavaScript Libraries */}
                {/* Template Javascript */}
            </div>
        </>
    )
}

export default Intro;
