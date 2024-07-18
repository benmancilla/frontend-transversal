import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Background from './components/bg';
import CreateNavBar from './components/nav';
import CreateSlider from './components/slider';
import CreateCardGroup from './components/cards';
import icon from './assets/img/icon.svg';
import logo from './assets/img/logo.svg'
import './index.css';
import './assets/css/nav.css';
import './assets/css/btn.css'
import './assets/css/more.css';
import'./assets/css/scroll.css';
import'./assets/css/final.css';
import'./assets/css/cart.css';

const App = () => (
  <React.Fragment>
    <section className={`bg-all ${Background()}`}>
      <CreateNavBar />
      <section className="presentation" id="presentation">
        <div className="info">
          <div className="info-text">
            <h1>¿Quién soy?</h1>
            <p>
              Soy un artista digital apasionado por diversos movimientos artísticos, que a menudo inspiran mis dibujos.La música es una gran influencia en mi trabajo, por lo que suelo acompañar mis publicaciones con canciones que complementan mis creaciones. Ádemas, vendo poleras por internet.
            </p>
          </div>
          <a type="button" className="btn btn-outline-info" id="trabajos-btn" href="#more-bg1">Más</a>
        </div>
        <CreateSlider />
      </section>

      <section className="more" id={`more-${Background()}`}>
        <div className={`info-all info-more-${Background()}`}>
          <div className="info-text-more">
            <h1 id='glow'>TODAS LAS POLERAS</h1>
            <h2>
              Todas XXL, porque solo compré esa talla y es la mejor.
            </h2>
          </div>
        </div>
        <CreateCardGroup />
      </section>

      <div className="modal fade extra" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
              <button type="button" className="btn-close close-final" data-bs-dismiss="modal" aria-label="Close"></button>
            <div className="modal-body modal-final">

            </div>
          </div>
        </div>
      </div>
    </section>

    <section className='final'>
      <h1>Además</h1>
      <p>
        No olvides seguirnos en instagram, clickea el erizo.
      </p>
      <div className='final-images'>
        <a className="icon" href="https://www.instagram.com/leallicna/" target="_blank"><img src={logo} width="180px" height="180px" alt="Logo" /></a>
      </div>
    </section>

    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-body-secondary">© 2024 Leallicna</p>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3"><a className="text-body-secondary" href="https://www.instagram.com/leallicna/" target="_blank"><img src={icon} width="25px" id="footer-img" alt="Icon" /></a></li>
        </ul>
      </footer>
    </div>
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById('root'));





