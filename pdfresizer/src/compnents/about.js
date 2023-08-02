import React from 'react'

function about() {
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
                                    <a href="index.html" className="nav-item nav-link">Home</a>
                                    <a href="about.html" className="nav-item nav-link active">About</a>
                                    <a href="service.html" className="nav-item nav-link">Service</a>
                                    {/* <a href="project.html" class="nav-item nav-link">Project</a>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div class="dropdown-menu m-0">
                                <a href="team.html" class="dropdown-item">Our Team</a>
                                <a href="testimonial.html" class="dropdown-item">Testimonial</a>
                                <a href="404.html" class="dropdown-item">404 Page</a>
                            </div>
                        </div>
                        <a href="contact.html" class="nav-item nav-link">Contact</a> */}
                                </div>
                                <butaton type="button" className="btn text-secondary ms-3" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fa fa-search" /></butaton>
                                <a href="https://htmlcodex.com/startup-company-website-template" className="btn btn-secondary text-light rounded-pill py-2 px-4 ms-3">Pro Version</a>
                            </div>
                        </nav>
                        <div className="container-xxl py-5 bg-primary hero-header mb-5">
                            <div className="container my-5 py-5 px-lg-5">
                                <div className="row g-5 py-5">
                                    <div className="col-12 text-center">
                                        <h1 className="text-white animated zoomIn">About Us</h1>
                                        <hr className="bg-white mx-auto mt-0" style={{ width: '90px' }} />
                                        <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb justify-content-center">
                                                <li className="breadcrumb-item"><a className="text-white" href="#">Home</a></li>
                                                <li className="breadcrumb-item"><a className="text-white" href="#">Pages</a></li>
                                                <li className="breadcrumb-item text-white active" aria-current="page">About</li>
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
                    {/* About Start */}
                    <div className="container-xxl py-5">
                        <div className="container px-lg-5">
                            <div className="row g-5">
                                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="section-title position-relative mb-4 pb-2">
                                        <h6 className="position-relative text-primary ps-4">About Us</h6>
                                        <h2 className="mt-2">The best SEO solution with 10 years of experience</h2>
                                    </div>
                                    <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo et tempor eirmod magna dolore erat amet</p>
                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <h6 className="mb-3"><i className="fa fa-check text-primary me-2" />Award Winning</h6>
                                            <h6 className="mb-0"><i className="fa fa-check text-primary me-2" />Professional Staff</h6>
                                        </div>
                                        <div className="col-sm-6">
                                            <h6 className="mb-3"><i className="fa fa-check text-primary me-2" />24/7 Support</h6>
                                            <h6 className="mb-0"><i className="fa fa-check text-primary me-2" />Fair Prices</h6>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mt-4">
                                        <a className="btn btn-primary rounded-pill px-4 me-3" href>Read More</a>
                                        <a className="btn btn-outline-primary btn-square me-3" href><i className="fab fa-facebook-f" /></a>
                                        <a className="btn btn-outline-primary btn-square me-3" href><i className="fab fa-twitter" /></a>
                                        <a className="btn btn-outline-primary btn-square me-3" href><i className="fab fa-instagram" /></a>
                                        <a className="btn btn-outline-primary btn-square" href><i className="fab fa-linkedin-in" /></a>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <img className="img-fluid wow zoomIn" data-wow-delay="0.5s" src="img/about.jpg" />
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
                                    <small className="text-white">Diam elitr est dolore at sanctus nonumy.</small>
                                    <div className="position-relative w-100 mt-3">
                                        <input className="form-control border-0 rounded-pill w-100 ps-4 pe-5" type="text" placeholder="Enter Your Email" style={{ height: '48px' }} />
                                        <button type="button" className="btn shadow-none position-absolute top-0 end-0 mt-1 me-2"><i className="fa fa-paper-plane text-primary fs-4" /></button>
                                    </div>
                                </div>
                                <div className="col-md-6 text-center mb-n5 d-none d-md-block">
                                    <img className="img-fluid mt-5" style={{ height: '250px' }} src="img/newsletter.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Newsletter End */}
                    {/* Team Start */}
                    <div className="container-xxl py-5">
                        <div className="container px-lg-5">
                            <div className="section-title position-relative text-center mb-5 pb-2 wow fadeInUp" data-wow-delay="0.1s">
                                <h6 className="position-relative d-inline text-primary ps-4">Our Team</h6>
                                <h2 className="mt-2">Meet Our Team Members</h2>
                            </div>
                            <div className="row g-4">
                                <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
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
                                <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
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
                                <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.6s">
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
                    </div>
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
                                            <img className="img-fluid" src="img/portfolio-1.jpg" alt="Image" />
                                        </div>
                                        <div className="col-4">
                                            <img className="img-fluid" src="img/portfolio-2.jpg" alt="Image" />
                                        </div>
                                        <div className="col-4">
                                            <img className="img-fluid" src="img/portfolio-3.jpg" alt="Image" />
                                        </div>
                                        <div className="col-4">
                                            <img className="img-fluid" src="img/portfolio-4.jpg" alt="Image" />
                                        </div>
                                        <div className="col-4">
                                            <img className="img-fluid" src="img/portfolio-5.jpg" alt="Image" />
                                        </div>
                                        <div className="col-4">
                                            <img className="img-fluid" src="img/portfolio-6.jpg" alt="Image" />
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
                            <div className="copyright">
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

export default about;