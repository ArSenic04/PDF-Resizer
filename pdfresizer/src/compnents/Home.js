// Home.jsx

import React from 'react';
import './Home.css';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Home = () => {
    return (
        <div className="container">
            <header>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">Support</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section className="hero">
                    <h1>Transforming Your PDFs with Ease: Unleash the Power of Editing!</h1>
                    <p>With our PDF Editor, you can easily edit, annotate, and convert PDF documents.</p>
                    <a href="#" className="btn">Get Started</a>
                </section>


                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                

                <section className="features">
                    <h2>Key Features</h2>
                    <div className="feature">
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/edit-pdf-file-7546250-6154018.png" className='app__home__image' alt="Edit PDF" />
                        <h3>Edit PDF</h3>
                        <p>Edit text, images, and links in your PDF documents with ease.</p>
                    </div>
                    <div className="feature">
                        <img src="https://a1office.co/_next/static/media/Group%201410084851.59df0c4a.svg" className='app__home__image' alt="Annotate PDF" />
                        <h3>Annotate PDF</h3>
                        <p>Add comments, highlights, and annotations to your PDF files.</p>
                    </div>
                    <div className="feature">
                        {/* Add more features */}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
