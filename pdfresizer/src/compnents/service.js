import React from 'react'

function service() {
    return (
        <>
            <div>
                <meta charSet="utf-8" />
                <title>SEO Master - SEO Agency Website Template</title>
                <meta content="width=device-width, initial-scale=1.0" name="viewport" />
                <meta content name="keywords" />
                <meta content name="description" />
                {/* Favicon */}
                <link href="img/favicon.ico" rel="icon" />
                {/* Google Web Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
                {/* Icon Font Stylesheet */}
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />
                {/* Libraries Stylesheet */}
                <link href="lib/animate/animate.min.css" rel="stylesheet" />
                <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
                <link href="lib/lightbox/css/lightbox.min.css" rel="stylesheet" />
                {/* Customized Bootstrap Stylesheet */}
                <link href="css/bootstrap.min.css" rel="stylesheet" />
                {/* Template Stylesheet */}
                <link href="css/style.css" rel="stylesheet" />
                <div className="container-xxl bg-white p-0">
                    {/* Spinner Start */}
                    <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                        <div className="spinner-grow text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    {/* Spinner End */}
                    {/* Navbar & Hero Start */}
                    <div className="container-xxl position-relative p-0">
                        <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                            <a href className="navbar-brand p-0">
                                <h1 className="m-0"><i className="fa fa-search me-2" />SEO<span className="fs-5">Master</span></h1>
                                {/* <img src="img/logo.png" alt="Logo"> */}
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                <span className="fa fa-bars" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <div className="navbar-nav ms-auto py-0">
                                    <a href="seo/index.html" className="nav-item nav-link">Home</a>
                                    <a href="seo/about.html" className="nav-item nav-link">About</a>
                                    <a href="seo/service.html" className="nav-item nav-link active">Service</a>
                                    {/* <a href="project.html" class="nav-item nav-link">Project</a>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div seo/class="dropdown-menu m-0">
                                <a href="team.html" class="dropdown-item">Our Team</a>
                                <a href="testimonial.html" class="dropdown-item">Testimonial</a>
                                <a href="404.html" class="dropdown-item">404 Page</a>
                            </div>
                        </div>
                        <a href="contact.html" class="nav-item nav-link">Contact</a> */}
                                </div>
                                <button type="button" className="btn text-secondary ms-3" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fa fa-search" /></button>
                                <a href="https://htmlcodex.com/startup-company-website-template" className="btn btn-secondary text-light rounded-pill py-2 px-4 ms-3">Pro Version</a>
                            </div>
                        </nav>
                        <div className="container-xxl py-5 bg-primary hero-header mb-5">
                            <div className="container my-5 py-5 px-lg-5">
                                <div className="row g-5 py-5">
                                    <div className="col-12 text-center">
                                        <h1 className="text-white animated zoomIn">Service</h1>
                                        <hr className="bg-white mx-auto mt-0" style={{ width: '90px' }} />
                                        <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb justify-content-center">
                                                <li className="breadcrumb-item"><a className="text-white" href="#">Home</a></li>
                                                <li className="breadcrumb-item"><a className="text-white" href="#">Pages</a></li>
                                                <li className="breadcrumb-item text-white active" aria-current="page">Service</li>
                                            </ol>
                                        </nav>
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
                                            <i className="fa fa-home fa-2x" />
                                        </div>
                                        <h5 className="mb-3">SEO Optimization</h5>
                                        <p>Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.</p>
                                        <a className="btn px-3 mt-auto mx-auto" href>Read More</a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
                                    <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <div className="service-icon flex-shrink-0">
                                            <i className="fa fa-home fa-2x" />
                                        </div>
                                        <h5 className="mb-3">Web Design</h5>
                                        <p>Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.</p>
                                        <a className="btn px-3 mt-auto mx-auto" href>Read More</a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.6s">
                                    <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <div className="service-icon flex-shrink-0">
                                            <i className="fa fa-home fa-2x" />
                                        </div>
                                        <h5 className="mb-3">Social Media Marketing</h5>
                                        <p>Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.</p>
                                        <a className="btn px-3 mt-auto mx-auto" href>Read More</a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.1s">
                                    <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <div className="service-icon flex-shrink-0">
                                            <i className="fa fa-home fa-2x" />
                                        </div>
                                        <h5 className="mb-3">Email Marketing</h5>
                                        <p>Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.</p>
                                        <a className="btn px-3 mt-auto mx-auto" href>Read More</a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
                                    <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <div className="service-icon flex-shrink-0">
                                            <i className="fa fa-home fa-2x" />
                                        </div>
                                        <h5 className="mb-3">PPC Advertising</h5>
                                        <p>Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.</p>
                                        <a className="btn px-3 mt-auto mx-auto" href>Read More</a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.6s">
                                    <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                                        <div className="service-icon flex-shrink-0">
                                            <i className="fa fa-home fa-2x" />
                                        </div>
                                        <h5 className="mb-3">App Development</h5>
                                        <p>Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.</p>
                                        <a className="btn px-3 mt-auto mx-auto" href>Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Service End */}
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
                                        <a className="btn btn-outline-light btn-social" href><i className="fab fa-twitter" /></a>
                                        <a className="btn btn-outline-light btn-social" href><i className="fab fa-facebook-f" /></a>
                                        <a className="btn btn-outline-light btn-social" href><i className="fab fa-youtube" /></a>
                                        <a className="btn btn-outline-light btn-social" href><i className="fab fa-instagram" /></a>
                                        <a className="btn btn-outline-light btn-social" href><i className="fab fa-linkedin-in" /></a>
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
                                <div className="col-md-6 col-lg-3">
                                    <h5 className="text-white mb-4">Project Gallery</h5>
                                    <div className="row g-2">
                                        <div className="col-4">
                                            <img className="img-fluid" src="seo/img/portfolio-1.jpg" alt="Image" />
                                        </div>
                                        <div className="col-4">
                                            <img className="img-fluid" src="seo/img/portfolio-2.jpg" alt="Image" />
                                        </div>
                                        <div className="col-4">
                                            <img className="img-fluid" src="seo/img/portfolio-3.jpg" alt="Image" />
                                        </div>
                                        <div className="col-4">
                                            <img className="img-fluid" src="seo/img/portfolio-4.jpg" alt="Image" />
                                        </div>
                                        <div className="col-4">
                                            <img className="img-fluid" src="seo/img/portfolio-5.jpg" alt="Image" />
                                        </div>
                                        <div className="col-4">
                                            <img className="img-fluid" src="seo/img/portfolio-6.jpg" alt="Image" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <h5 className="text-white mb-4">Newsletter</h5>
                                    <p>Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulpu</p>
                                    <div className="position-relative w-100 mt-3">
                                        <input className="form-control border-0 rounded-pill w-100 ps-4 pe-5" type="text" placeholder="Your Email" style={{ height: '48px' }} />
                                        <button type="button" className="btn shadow-none position-absolute top-0 end-0 mt-1 me-2"><i className="fa fa-paper-plane text-primary fs-4" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container px-lg-5">
                            <div className="copyright">seo/
                                <div className="row">
                                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                        © <a className="border-bottom" href="#">Your Site Name</a>, All Right Reserved.
                                        {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
                                        Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a>
                                    </div>
                                    <div className="col-md-6 text-center text-md-end">
                                        <div className="footer-menu">
                                            <a href>Home</a>
                                            <a href>Cookies</a>
                                            <a href>Help</a>
                                            <a href>FQAs</a>
                                        </div>
                                    </div>
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

export default service;
